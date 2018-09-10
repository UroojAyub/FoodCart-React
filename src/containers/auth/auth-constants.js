import * as validators from '../../utility/form/validators';

export const AUTH_MODE = {
    SIGN_IN: 'SIGN_IN',
    SIGN_UP: 'SIGN_UP'
}

export const SIGN_IN_FIELDS = {
    email: {
        element: 'input',
        type: 'email',
        label: null,
        placeholder: 'Email Address',
        validate: [validators.required, validators.email]
    },
    password: {
        element: 'input',
        type: 'password',
        label: null,
        placeholder: 'Password',
        validate: [
            validators.required, validators.minLength(6)
        ]
    }
}

export const SIGN_UP_FIELDS = {
    email: {
        element: 'input',
        type: 'email',
        label: null,
        placeholder: 'Email Address',
        validate: [validators.required, validators.email]
    },
    password: {
        element: 'input',
        type: 'password',
        label: null,
        placeholder: 'Password',
        validate: [
            validators.required, validators.minLength(6)
        ]
    },
    confirmPassword: {
        element: 'input',
        type: 'password',
        label: null,
        placeholder: 'Confirm Password',
        validate: [
            validators.required, validators.minLength(6),
            validators.passwordsMatch('password')
        ]
    }
}
