define(['./validDirective'], function (validDirective) {
    return validDirective.create("dsValidRequired", {
        message: "Field is required.",
        validate: function (value) {
            return !this.isRequired || (value != null && ((typeof value === "string" && value.trim() != "") || (typeof value !== "string")));
        },
        load: function () {
            var $label, e, $this;
            $this = this;
            e = this.$element.first();
            do {
                $label = e.children("label");
                e = e.parent();
            } while (!$label.length && !!e.length);

            function setRequired(required) {
                if (required) {
                    $label.addClass("valid-asterisk");
                } else {
                    $label.removeClass("valid-asterisk");
                }
                $this.ctrl.$required = required;
            }

            if (this.$attrs.dsValidRequired) {
                // Based on model
                this.$scope.$watch(this.$attrs.dsValidRequired, function (data) {
                    $this.isRequired = !!data;
                    setRequired(!!data);
                });
            } else {
                // Permenant
                setRequired(true);
                this.isRequired = true;
            }
        }
    });

});