define(['./validDirective'], function (validDirective) {
    // <input ds:valid-valid="expression that returns true or false" />
    return validDirective.create("dsValidValid", {
        watch: function (value) {
            return !!this.$scope.$eval(this.$attrs.validValid);
        }
    });

})