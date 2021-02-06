import Matches from './Matches';
import { connect } from 'react-redux';
import { fetchMatches } from '../../actions/fetchMatches';
import { getMatches, getCreateMatchForm, getFindPlayersForm, getFindPlayersResults, getUser } from "../../selectors";
import { updateFindPlayersForm, findPlayers, cleanPlayersList, cleanFindPlayersForm } from "../../actions/findPlayers";
import { updateCreateMatchForm, createMatch } from "../../actions/createMatch";


const mapStateToProps = state => ({
    matches: getMatches(state),
    players: getFindPlayersResults(state),
    findPlayersForm: getFindPlayersForm(state),
    createMatchForm: getCreateMatchForm(state),
    user: getUser(state),
});

const mapDispatchToProps = {
    fetchMatches,
    findPlayers,
    updateFindPlayersForm,
    cleanFindPlayersForm,
    cleanPlayersList,
    updateCreateMatchForm,
    createMatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
