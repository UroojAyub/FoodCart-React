const required = value => (value || typeof value === 'number'
    ? undefined
    : 'Required');
const maxLength = max => value => value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;
const minLength = min => value => value && value.length < min
    ? `Must be ${min} characters or more`
    : undefined;
const number = value => value && isNaN(Number(value))
    ? 'Must be a number'
    : undefined;
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const passwordsMatch = passwordField => (value, allValues) => {
    return value !== allValues[passwordField]
        ? 'Passwords don\'t match '
        : undefined;
};

export {
    required,
    maxLength,
    minLength,
    number,
    email,
    passwordsMatch
}