define(['./validDirective'], function (validDirective) {
    validDirective.create("dsValidPassword", {
        message: "Password does not meet complexity requirements.",
        validate: function (value) {
            // TODO: Verify password complexity
            return true;
        }
    });
});