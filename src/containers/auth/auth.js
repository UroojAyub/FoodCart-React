import React, {Component} from 'react'
import {connect} from 'react-redux';
import './auth.css';
import {Link} from 'react-router-dom';
import {AUTH_MODE, SIGN_IN_FIELDS, SIGN_UP_FIELDS} from './auth-constants';
import {Field, reduxForm} from 'redux-form';
import _ from 'lodash';
import {compose} from 'redux';
import * as actions from '../../actions/index';

class Auth extends Component {

    renderField = (field) => {
        const {
            meta: {
                touched,
                error
            },
            type,
            input,
            placeholder
        } = field;
        const className = `form-group ${touched && error
            ? 'has-danger'
            : ''}`
        return (
            <div className={className}>
                <field.element
                    className="form-control"
                    type={type}
                    placeholder={placeholder}
                    {...input}/>
                <small className="text-danger">
                    {touched
                        ? error
                        : ''}
                </small>
            </div>
        )
    }

    renderForm = (fields) => {

        return (
            <div>
                {_.map(fields, (config, title) => {
                    return (<Field
                        element={config.element}
                        name={title}
                        type={config.type}
                        placeholder={config.placeholder}
                        validate={config.validate}
                        component={this.renderField}
                        key={title}/>)
                })}
            </div>
        )

    }

    render() {
        const {handleSubmit} = this.props;
        const authMode = this.props.mode;
        const formTitle = authMode === AUTH_MODE.SIGN_IN
            ? 'Sign In'
            : 'Sign Up';
        const fields = authMode === AUTH_MODE.SIGN_IN
            ? SIGN_IN_FIELDS
            : SIGN_UP_FIELDS;

        const switchText = authMode === AUTH_MODE.SIGN_IN
            ? (
                <p className="text-foot">
                    Don't have an account?
                    <Link to="/signup">
                        Register
                    </Link>
                </p>
            )
            : (
                <p className="text-foot">
                    Already have an account?
                    <Link to="/signin">
                        Sign In</Link>
                </p>
            )

        const error = this.props.authError
            ? <p className="text-foot text-danger text-center">
                    {this.props.authError}
                </p>
            : null;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card my-5 px-2">
                            <div className="card-body">
                                <h4 className="card-title text-center my-4">{formTitle}</h4>
                                <form className="needs-validation" onSubmit={handleSubmit(this.onSubmit)}>
                                    {this.renderForm(fields)}
                                    {switchText}
                                    {error}
                                    <div className="text-center my-2">
                                        <button className="btn btn-primary btn-danger" type="submit">
                                            {formTitle}
                                        </button>
                                    </div>
                                    <hr className="my-4"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onSubmit = (values) => {
        if (this.props.mode === AUTH_MODE.SIGN_IN) {
            this
                .props
                .signIn(values, () => this.props.history.push('/'));
        } else {
            this
                .props
                .signUp(values, () => this.props.history.push('/'));
        }
    }
}
const mapStateToProps = state => {
    return {authError: state.auth.error}
}

export default compose(reduxForm({form: 'AuthForm'}), connect(mapStateToProps, actions))(Auth);