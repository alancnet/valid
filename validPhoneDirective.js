define(['./validDirective'], function (validDirective) {
    var removeChars = validDirective.removeChars;
    return validDirective.create("dsValidPhone", {
        message: "Invalid phone number.",
        extraChars: '()- x',
        valid:true,
        validate: function (value) {
            if(this.valid) {
                var numbers = removeChars(value, this.extraChars);
                return value != null && numbers.length >= 10 && numbers.length <= 15 && +numbers;
            }

            return true;
        },
        parse: function (value) {
            return value && removeChars(value, this.extraChars);
        },
        format: function (value) {
            if (value) {
                var numbers = removeChars(value, this.extraChars);
                // Remove prefixing 1-
                if (numbers[0] == '1' && numbers[1] != '1') numbers = numbers.substr(1);
                if (numbers.length >= 10) {
                    value = numbers.substr(0, 3) + "-" + numbers.substr(3, 3) + "-" + numbers.substr(6, 4);
                    if (numbers.length > 10) {
                        value += " x" + numbers.substr(10, 10000);
                    }
                } else {
                    value = numbers;
                }
            }
            return value;
        },
        load: function() {
            if (this.$attrs.dsValidPhone) {
                // Based on model
                this.$scope.$watch(this.$attrs.dsValidPhone,$.proxy(function (data) {

                    this.valid = data;

                    this.doValidation();

                }, this));
            }
        }
    });
});