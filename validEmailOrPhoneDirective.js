define([
    './validDirective',
    './validEmailDirective',
    './validPhoneDirective'
], function (validDirective, validEmail, validPhone) {
    validDirective.create('dsValidEmailOrPhone', {
        message: 'Invalid email or phone.',
        validate: function (value) {
            return validEmail.validate(value) || validPhone.validate(value);
        },
        format: function (value) {
            if (validPhone.validate(value || '')) {
                return validPhone.format(value || '');
            }
            return value;
        }
    });
});