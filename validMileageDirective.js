define(['./validDirective'], function (validDirective) {
    var removeChars = validDirective.removeChars;
    validDirective.create("dsValidMileage", {
        message: "Invalid mileage.",
        extraChars: ', ',
        formatNumber: function (n, c, d, t) {
            var c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        },
        parse: function (value) {
            var val = value && +removeChars(value, this.extraChars);
            if (isNaN(val)) {
                return value;
            } else {
                return val;
            }
        },
        format: function (value) {
            if (typeof value === "number") return this.formatNumber(value, 0, ".", ",");
            return value;
        },
        validate: function (value) {
            return (typeof value === 'number') && value <= 1999999;
        }
    });
});