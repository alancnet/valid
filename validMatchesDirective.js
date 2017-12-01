define(['./validDirective'], function (validDirective) {
    validDirective.create("dsValidMatches", {
        message: "Value does not match.",
        validate: function (value) {
            return value == this.$scope.$eval(this.$attrs.dsValidMatches);
        },
        load: function() {
            this.$scope.$watch(this.$attrs.dsValidMatches, function(val) {
                this.doValidation();
            }.bind(this));
        }
    });
});