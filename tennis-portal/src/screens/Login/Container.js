import { getLoginForm } from "../../selectors/index";
import { login, updateLoginForm } from "../../actions/login";
import Login from './Login';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
    loginForm: getLoginForm(state),
});

const mapDispatchToProps = {
    login,
    updateLoginForm
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
