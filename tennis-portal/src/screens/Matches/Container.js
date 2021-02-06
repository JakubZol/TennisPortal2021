import Matches from './Matches';
import { connect } from 'react-redux';
import { fetchMatches } from '../../actions/fetchMatches';
import {
    getMatches,
    getCreateMatchForm,
    getFindPlayersForm,
    getFindPlayersResults,
    getUser,
    getUpdateMatchForm
} from "../../selectors";
import { updateFindPlayersForm, findPlayers, cleanPlayersList, cleanFindPlayersForm } from "../../actions/findPlayers";
import { updateCreateMatchForm, createMatch } from "../../actions/createMatch";
import { updateUpdateMatchForm, updateMatch, cleanUpdateMatchForm } from "../../actions/updateMatch";


const mapStateToProps = state => ({
    matches: getMatches(state),
    players: getFindPlayersResults(state),
    findPlayersForm: getFindPlayersForm(state),
    createMatchForm: getCreateMatchForm(state),
    user: getUser(state),
    updateMatchForm: getUpdateMatchForm(state),
});

const mapDispatchToProps = {
    fetchMatches,
    findPlayers,
    updateFindPlayersForm,
    cleanFindPlayersForm,
    cleanPlayersList,
    updateCreateMatchForm,
    createMatch,
    updateUpdateMatchForm,
    updateMatch,
    cleanUpdateMatchForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
