import React, { useEffect, useState } from 'react';
import { arrayOf, shape, func, string, number, oneOf } from 'prop-types';

const Matches = ({ matches, players, findPlayersForm, createMatchForm, fetchMatches, findPlayers, updateFindPlayersForm, cleanPlayersList, updateCreateMatchForm, cleanFindPlayersForm, user, createMatch }) => {

    useEffect(() => {
        updateCreateMatchForm({ players: [ user ]});

        if(matches.length === 0) {
            fetchMatches();
        }
    },[user]);

    const [ isDoublesMatch, setIsDoublesMatch ] = useState(false);

    const onFindPlayerFilterChange = (value, key, identifier) => {
        updateFindPlayersForm(identifier, { [key]: value });
    };

    const searchPlayers = (identifier) => {
        findPlayers(identifier, findPlayersForm[identifier]);
    };

    const selectPlayer = (identifier, player) => {
        if(identifier === 'partner'){
            updateCreateMatchForm({ players: [ user, player ] })
        }
        else if(identifier === 'opponent'){
            updateCreateMatchForm({ opponents: [ player ] })
        }
        else {
            updateCreateMatchForm({ opponents: [ ...(createMatchForm?.opponents ?? []), player ] })
        }
        cleanPlayersList(identifier);
    };

    const renderPlayerSearchForm = (label, identifier) => {


        const { name, minAge, maxAge, minNtrp, maxNtrp, gender } = findPlayersForm?.[identifier] ?? {};

        return (
            <>
                <div>
                    <div>{label}</div>
                    <input type="text" placeholder='Imię lub nick' value={name}
                           onChange={({target}) => onFindPlayerFilterChange(target.value, 'name', identifier)}/>
                    <input type="number" min="1" max="7" step="0.5" placeholder="Min. NTRP" value={minNtrp}
                           onChange={({target}) => onFindPlayerFilterChange(target.value, 'minNtrp', identifier)}/>
                    <input type="number" min="1" max="7" step="0.5" placeholder="Max. NTRP" value={maxNtrp}
                           onChange={({target}) => onFindPlayerFilterChange(target.value, 'maxNtrp', identifier)}/>
                    <input type="number" placeholder="Min. wiek" value={minAge}
                           onChange={({target}) => onFindPlayerFilterChange(target.value, 'minAge', identifier)}/>
                    <input type="number" placeholder="Max. wiek" value={maxAge}
                           onChange={({target}) => onFindPlayerFilterChange(target.value, 'maxAge', identifier)}/>
                    <select placeholder="Płeć" value={gender}
                            onChange={({target}) => onFindPlayerFilterChange(target.value, 'gender', identifier)}>
                        <option>M</option>
                        <option>W</option>
                    </select>
                    <button onClick={() => searchPlayers(identifier)}>Szukaj</button>
                </div>
                <div>
                    {(players?.[identifier] ?? []).map((player) => <button key={`${identifier}-${player.id}`} onClick={() => selectPlayer(identifier, player)}>{player.username}</button> )}
                </div>
            </>
        );
    };

    const submitForm = () => {
        console.log(createMatchForm);

        if(createMatchForm.players?.length === 0){
            createMatch({ ...createMatchForm, players: [user] });
        }
        else {
            createMatch(createMatchForm);
        }
    };

    return (
        <div>
            <div>Matches: {matches.length}</div>
            <div>
                {createMatchForm.players?.map(({ username, firstName, lastName }) => `${username}: ${firstName} ${lastName}`).join(', ') ?? ''}
                {' vs '}
                {createMatchForm.opponents?.map(({ username, firstName, lastName }) => `${username}: ${firstName} ${lastName}`).join(', ') ?? ''}
            </div>
            <div>
                <input type="checkbox" onChange={() => setIsDoublesMatch(!isDoublesMatch)} checked={isDoublesMatch}/> Doubles Match
                {!isDoublesMatch ? renderPlayerSearchForm("Przeciwnik", 'opponent') : (
                    <>
                        {renderPlayerSearchForm("Partner", 'partner')}
                        {renderPlayerSearchForm("Przeciwnik1", 'opponent1')}
                        {renderPlayerSearchForm("Przeciwnik2", 'opponent2')}
                    </>
                )}
                <input type="text" placeholder="Wynik" onChange={({ target }) => updateCreateMatchForm({ score: target.value })}/>
                <input type="date" placeholder="Data" onChange={({ target }) => updateCreateMatchForm({ date: target.value })}/>
                <button onClick={submitForm}>Stwórz Mecz</button>
            </div>
        </div>
    )
};


Matches.propTypes = {
    matches: arrayOf(shape({})),
    players: arrayOf(shape({})),
    findPlayersForm: shape({
        name: string,
        minNtrp: number,
        maxNtrp: number,
        minAge: number,
        maxAge: number,
        gender: oneOf(['M', 'W']),
    }),
    createMatchForm: shape({}),
    fetchMatches: func.isRequired,
    findPlayers: func.isRequired,
    updateFindPlayersForm: func.isRequired,
    cleanPlayersList: func.isRequired,
    updateCreateMatchForm: func.isRequired,
    cleanFindPlayersForm: func.isRequired,
};

Matches.defaultProps = {
    matches: []
};


export default Matches;
