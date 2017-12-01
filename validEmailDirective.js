define(['./validDirective'], function (validDirective) {
    return validDirective.create("dsValidEmail", {
        message: "Invalid e-mail address.",
        regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        validate: function (value) {
            return this.regex.test(value);
        }
    });
});