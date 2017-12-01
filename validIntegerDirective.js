define(['./validDirective'], function (validDirective) {
    return validDirective.create("dsValidInteger", {
        message: "Invalid integer.",
        validate: function (value) {
            return typeof value === 'number' && !isNaN(value) && Math.floor(value) === value;
        },
        parse: function (value) {
            var val = +value;
            if (isNaN(val)) {
                return value;
            } else {
                return val;
            }
        },
        format: function (value) {
            if (value == null) return "";
            return value.toString();
        }
    });
});