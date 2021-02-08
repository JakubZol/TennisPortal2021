import React, { useEffect, useState } from 'react';


const Tournaments = ({ user, createTournamentForm, tournaments, ownedTournaments, updateEntry, deleteEntry, createTournament, fetchTournaments, fetchOwnedTournaments,
                         updateCreateTournamentForm, updateTournamentForm, updateUpdateTournamentForm, updateTournament, findPlayersForm, updateFindPlayersForm, findPlayers,
                         createEntry, players, tournamentMatchForm, createMatch, updateTournamentMatchForm }) => {

    // TODO: connected with backend, component needs major refactoring
    useEffect(() => {
        fetchTournaments();
        fetchOwnedTournaments();
    }, []);

    const [ newEntrySeed, setNewEntrySeed ] = useState(undefined);


    const onCreateTournamentFieldChange = (field, value) => {
        updateCreateTournamentForm({ [field]: value });
    };

    const submitCreateTournamentForm = () => {
        console.log(createTournamentForm, user);
        createTournament({ ...createTournamentForm, owner: user });
    };

    const onUpdateTournamentFieldChange = (field, value) => {
        updateUpdateTournamentForm({ [field]: value });
    };

    const submitUpdateTournamentForm = tournamentId => {
        console.log(updateTournamentForm);
        updateTournament({ ...updateTournamentForm, tournamentId });
    };

    const cancelTournament = tournamentId => {
        updateTournament({ cancelled: true, tournamentId });
    };

    const finishTournament = tournamentId => {
        updateTournament({ finished: true, tournamentId });
    };

    const searchPlayers = (identifier) => {
        findPlayers(identifier, findPlayersForm[identifier]);
    };

    const onFindPlayerFilterChange = (value, key) => {
        updateFindPlayersForm('newEntry', { [key]: value });
    };

    const createNewEntry = (player, tournament) => {
        createEntry({ tournament, player, seed: newEntrySeed });
        setNewEntrySeed(undefined);
    };

    const { name, minAge, maxAge, minNtrp, maxNtrp, gender } = findPlayersForm?.newEntry ?? {};

    return (
        <div>
            <ul>
                Accepted Tournaments:
                {tournaments.filter(({ entry }) => entry.filter(({ player }) => player.id === user.id )[0].accepted).map(({ tournamentId, tournamentName, roundsNumber, prizeMoney, prizeCurrency }) => <li key={tournamentId}>{tournamentName}, {roundsNumber} rounds, prize: {prizeMoney} {prizeCurrency}</li>)}
            </ul>
            <ul>
                Not Accepted Tournaments:
                {tournaments.filter(({ entry }) => {
                    return !(entry.filter(({ player }) => player.id === user.id )[0].accepted)
                }).map(tournament => {
                    const { tournamentId, tournamentName, roundsNumber, prizeMoney, prizeCurrency } = tournament;
                    return (
                        <li key={tournamentId}>
                            {tournamentName}, {roundsNumber} rounds, prize: {prizeMoney} {prizeCurrency}
                            <button onClick={() => { updateEntry({ tournament, player: user, accepted: true }) }} >Zaakceptuj zaproszednie</button>
                            <button onClick={() => { deleteEntry({ tournament, player: user })}} >Odrzuć zaproszenie</button>
                        </li>
                )})}
            </ul>
            <ul>
                Owned Tournaments:
                {ownedTournaments.map(tournament => {
                    const { tournamentId, tournamentName, cancelled, finished, roundsNumber, prizeMoney, prizeCurrency, entry, matches } = tournament;
                    const acceptedPlayers = entry.filter(({ accepted }) => accepted);
                    const awaitingPlayers = entry.filter(({ accepted }) => !accepted);
                    return (
                        <li key={tournamentId}>
                            {tournamentName}, {roundsNumber} rounds, prize: {prizeMoney} {prizeCurrency}
                            {cancelled && ', cancelled'}
                            {finished && ', finished'}
                            {!cancelled && !finished && <div>
                                Update Tournament:
                                <input type="text" placeholder="Nazwa turnieju" value={updateTournamentForm.tournamentName} onChange={({ target }) => onUpdateTournamentFieldChange('tournamentName', target.value)} />
                                <input type="number" placeholder="Ilość rund" min="1" value={updateTournamentForm.roundsNumber} onChange={({ target }) => onUpdateTournamentFieldChange('roundsNumber', target.value)} />
                                <input type="number" placeholder="Nagroda pieniężna" value={updateTournamentForm.prizeMoney} onChange={({ target }) => onUpdateTournamentFieldChange('prizeMoney', target.value)} />
                                <input type="text" placeholder="Waluta" maxLength="3" value={updateTournamentForm.prizeCurrency} onChange={({ target }) => onUpdateTournamentFieldChange('prizeCurrency', target.value)} />
                                <button onClick={() => submitUpdateTournamentForm(tournamentId)}>Edytuj Dane</button>
                                <button onClick={() => cancelTournament(tournamentId)}>Przerwij turniej</button>
                                <button onClick={() => finishTournament(tournamentId)}>Zakończ turniej</button>
                            </div>}
                            Zawodnicy:
                            <ul>
                                {acceptedPlayers.map(({ player: { id, username }, seed }) => <li key={`${tournamentId}-${id}`}>{username} {seed && `(${seed})`}</li>)}
                            </ul>
                            Oczekujący:
                            <ul>
                                {awaitingPlayers.map(({ player: { id, username }, seed }) => <li key={`${tournamentId}-${id}`}>{username} {seed && `(${seed})`}</li>)}
                            </ul>
                            Dodaj zawodnika:
                            <div>
                                <input type="text" placeholder='Imię lub nick' value={name}
                                       onChange={({target}) => onFindPlayerFilterChange(target.value, 'name')}/>
                                <input type="number" min="1" max="7" step="0.5" placeholder="Min. NTRP" value={minNtrp}
                                       onChange={({target}) => onFindPlayerFilterChange(target.value, 'minNtrp')}/>
                                <input type="number" min="1" max="7" step="0.5" placeholder="Max. NTRP" value={maxNtrp}
                                       onChange={({target}) => onFindPlayerFilterChange(target.value, 'maxNtrp')}/>
                                <input type="number" placeholder="Min. wiek" value={minAge}
                                       onChange={({target}) => onFindPlayerFilterChange(target.value, 'minAge')}/>
                                <input type="number" placeholder="Max. wiek" value={maxAge}
                                       onChange={({target}) => onFindPlayerFilterChange(target.value, 'maxAge')}/>
                                <select placeholder="Płeć" value={gender} onChange={({target}) => onFindPlayerFilterChange(target.value, 'gender')}>
                                    <option>M</option>
                                    <option>W</option>
                                </select>
                                <button onClick={() => searchPlayers('newEntry')}>Szukaj</button>
                            </div>
                            <div>
                                {(players?.newEntry ?? []).map((player) =>
                                    <div>
                                        {player.username}
                                        <input type="number" min="1" max={2^(roundsNumber - 1)} value={newEntrySeed} onChange={({ target }) => setNewEntrySeed(target.value)} />
                                        <button key={`newEntry-${player.id}`} onClick={() => createNewEntry(player, tournament)}>Zaproś zawodnika</button>
                                    </div>)}
                            </div>
                            Dodaj Siebie:
                            <input type="number" min="1" max={2^(roundsNumber - 1)} value={newEntrySeed} onChange={({ target }) => setNewEntrySeed(target.value)} />
                            <button key={`newEntry-${user.id}`} onClick={() => createNewEntry(user, tournament)}>Zaproś zawodnika</button>

                            <div>
                            Stwórz mecz:
                            <div>
                                Player: {tournamentMatchForm.players?.[0]?.username ?? ''}
                                {acceptedPlayers.map(({ player, seed }) => <button onClick={() => updateTournamentMatchForm({ players: [player] }) }>{player.username} {seed && `(${seed})`}</button>)}
                            </div>
                            <div>
                                Opponent: {tournamentMatchForm.opponents?.[0]?.username ?? ''}
                                {acceptedPlayers.map(({ player, seed }) => <button onClick={() => updateTournamentMatchForm({ opponents: [player] }) }>{player.username} {seed && `(${seed})`}</button>)}
                            </div>
                                <input value={tournamentMatchForm.score} type="text" placeholder="Wynik" onChange={({ target }) => updateTournamentMatchForm({ score: target.value })}/>
                                <input type="date" placeholder="Data" value={tournamentMatchForm.date} onChange={({ target }) => updateTournamentMatchForm({ date: target.value })}/>
                                <input type="number" placeholder="Runda" value={tournamentMatchForm.round} onChange={({ target }) => updateTournamentMatchForm({ round: target.value })}/>
                                <button onClick={() => createMatch({ ...tournamentMatchForm, tournament })}>Stwórz Mecz</button>
                            </div>
                            <ul>
                                Mecze:
                                {matches.map(({ matchId, players, opponents, score }) => <li key={matchId}>{players[0].username} vs {opponents[0].username}: {score}</li>)}
                            </ul>
                        </li>
                    )
                })}
            </ul>
            <div>
                Create new Tournament:
                <input type="text" placeholder="Nazwa turnieju" value={createTournamentForm.tournamentName} onChange={({ target }) => onCreateTournamentFieldChange('tournamentName', target.value)} />
                <input type="number" placeholder="Ilość rund" min="1" value={createTournamentForm.roundsNumber} onChange={({ target }) => onCreateTournamentFieldChange('roundsNumber', target.value)} />
                <input type="number" placeholder="Nagroda pieniężna" value={createTournamentForm.prizeMoney} onChange={({ target }) => onCreateTournamentFieldChange('prizeMoney', target.value)} />
                <input type="text" placeholder="Waluta" maxLength="3" value={createTournamentForm.prizeCurrency} onChange={({ target }) => onCreateTournamentFieldChange('prizeCurrency', target.value)} />
                <button onClick={submitCreateTournamentForm}>Stwórz Turniej</button>
            </div>
        </div>
    );
};

export default Tournaments;
