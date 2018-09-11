import React, {Component} from 'react'
import {Field} from 'redux-form';

class FormInput extends Component {

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
        const className = `form-group ${ (touched && error)
            ? 'has-danger'
            : ''}`;

        let inputField = <input/>
        switch (field.element) {
            case 'input':
                inputField = (<input
                    className="form-control"
                    type={type}
                    placeholder={placeholder}
                    {...input}/>);
                break;
            case 'textarea':
                inputField = (
                    <textarea className="form-control" placeholder={placeholder} {...input}></textarea>
                );
                break;
            case 'select':
                inputField = (
                    <select className="form-control" {...input}>
                        {this
                            .props
                            .options
                            .map(opt => <option key={opt.value} {...opt}>{opt.name}</option>)}
                    </select>
                );
                break;
            default:
        }

        return (
            <div className={className}>
                <label >{this.props.label}</label>
                {inputField}
                <small className="text-danger">
                    {touched
                        ? error
                        : ''}
                </small>
            </div>
        )
    }

    render() {
        return (<Field
            element={this.props.element}
            name={this.props.title}
            type={this.props.type}
            placeholder={this.props.placeholder}
            validate={this.props.validate}
            component={this.renderField}/>)
    }
}

export default FormInput
