import Tournaments from './Tournaments';
import { connect } from 'react-redux';
import {getTournaments, getOwnedTournaments, getUser, getCreateTournamentForm, getUpdateTournamentForm, getFindPlayersForm, getFindPlayersResults, getTournamentMatchForm } from "../../selectors";
import { fetchTournaments } from '../../actions/fetchTournaments';
import { fetchOwnedTournaments } from '../../actions/fetchOwnedTournaments';
import { updateEntry } from '../../actions/updateEntry'
import { deleteEntry } from '../../actions/deleteEntry'
import { createEntry } from '../../actions/createEntry'
import { updateCreateTournamentForm, createTournament } from "../../actions/createTournament";
import { updateUpdateTournamentForm, updateTournament } from "../../actions/updateTournament";
import { updateFindPlayersForm, findPlayers } from "../../actions/findPlayers";
import { createMatch, updateTournamentMatchForm } from "../../actions/createMatch";

const mapStateToProps = state => ({
    tournaments: getTournaments(state),
    ownedTournaments: getOwnedTournaments(state),
    user: getUser(state),
    findPlayersForm: getFindPlayersForm(state),
    createTournamentForm: getCreateTournamentForm(state),
    updateTournamentForm: getUpdateTournamentForm(state),
    players: getFindPlayersResults(state),
    tournamentMatchForm: getTournamentMatchForm(state),
});

const mapDispatchToProps = {
    fetchTournaments,
    fetchOwnedTournaments,
    updateEntry,
    deleteEntry,
    updateCreateTournamentForm,
    createTournament,
    updateUpdateTournamentForm,
    updateTournament,
    updateFindPlayersForm,
    findPlayers,
    createEntry,
    createMatch,
    updateTournamentMatchForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Tournaments);
