define(['./validDirective'], function (validDirective) {
    return validDirective.create("dsValidZip", {
        message: "Invalid ZIP Code.",
        validate: function (value) {
            return !isNaN(+value) && ((typeof value == "string" && value.length == 5) || (typeof value == "number" && value.toString().length == 5));
        },
        parse: function (value) {
            // Always cast ZIP to string
            return value && ("" + value);
        },
        format: function (value) {
            return (value || "").toString();
        }
    });

})