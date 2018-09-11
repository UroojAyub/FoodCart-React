import * as validators from '../../utility/form/validators';

export const CHECKOUT_FIELDS = {
    name: {
        element: 'input',
        type: 'text',
        label: 'Name',
        placeholder: '',
        validate: [validators.required]
    },
    email: {
        element: 'input',
        type: 'text',
        label: 'Email',
        placeholder: '',
        validate: [validators.required, validators.email]
    },
    address: {
        element: 'textarea',
        label: 'Address',
        placeholder: '',
        validate: [validators.required]
    },
    deliveryMethod: {
        element: 'select',
        label: 'Delivery Method',
        options: [
            {
                name: 'Select method',
                disabled: true,
                value: "",
                defaultValue: true
            }, {
                name: 'Fastest',
                value: 'fastest'
            }, {
                name: 'Standard',
                value: 'standard'
            }
        ],
        validate: [validators.required]
    }
}
