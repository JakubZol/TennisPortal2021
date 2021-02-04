import { getRegisterForm } from "../../selectors/index";
import { register, updateRegisterForm } from "../../actions/register";
import Register from './Register';
import { connect } from "react-redux";


const mapStateToProps = state => ({
    registerForm: getRegisterForm(state),
});

const mapDispatchToProps = {
    register,
    updateRegisterForm
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);

