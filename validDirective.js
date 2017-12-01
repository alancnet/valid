define([
    'app'
], function (app) {
    var validDirective = 
    {
        create: create,
        snakeCase: snakeCase,
        removeChars: removeChars,
        protoObject: protoObject
    }
    return validDirective;

    function create(name, args) {
        create[name] = args;
        var invokeArgs = [];
        if (!args.services) {
            args.services = [];
        }
        if (args.services.indexOf('$timeout') == -1) args.services.push('$timeout');
        for (var i = 0; i < args.services.length; i++) {
            var arg = args.services[i];
            invokeArgs.push(arg);
        }

		if (args.format) {
			app.filter(name, function() {
				return function(input) {
					return args.format(input);
				}
			});
		}


        invokeArgs.push(function () {
            if (args.services) {
                for (var i = 0; i < args.services.length; i++) {
                    // Services will be passed to this function in the same order.
                    args[args.services[i]] = arguments[i];
                }
            }
            return {
                require: 'ngModel',
                link: function ($scope, $element, $attrs, ctrl) {
                    var o = protoObject(ctrl);
                    o.ctrl = ctrl;
                    angular.extend(o, args);
                    angular.extend(o, {
                        $scope: $scope,
                        $element: $element,
                        $attrs: $attrs
                    });
                    var resultant = {
                        text: "",
                        toString: function () { return this.text; }
                    };
                    if ($scope.validationResults && $scope.validationResults.push) {
                        // Add resultant to validation results
                        $scope.validationResults.push(resultant);
                        $scope.$on("$destroy", function () {
                            // Remove resultant from validation results when the input disappears.
                            var i = $scope.validationResults.indexOf(resultant);
                            if (i > -1) {
                                $scope.validationResults.splice(i, 1);
                            }
                        });
                    }
                    o.$setResult = function (name, result) {
                        o.$setValidity(name, result);
                        updatePopover();
                    };

                    o.doValidation = function() {
                        var value = $scope.$eval($attrs.ngModel);
                        value = value || null;
                        if (value == null) {
                            o.$setResult(name, !o.$required);
                        } else {
                            var result = o.validate(value || null);
                            o.$setResult(name, !!result);
                        }
                    };

                    if (o.load) {
                        o.load();
                    }
                    if (o.watch) {
                        $scope.$watch($attrs.ngModel, function (newVal, oldVal) {
                            var result = o.watch(newVal || null, oldVal || null);
                            o.$setResult(name, !!result);
                        });
                    }
                    if (o.validate) {
                        $scope.$watch(
                            function() {
                                // return hash of value and required
                                return "" + o.$required + "-" + $scope.$eval($attrs.ngModel);
                            },
                            o.doValidation
                        );
                    }

                    if (o.parse) {
                        o.$parsers.unshift(
                            function (value) {
                                return o.parse(value || null);
                            }
                        );
                    }

                    if (o.format) {
                        o.$formatters.unshift(
                            function (value) {
                                return o.format(value || null);
                            }
                        );
                        $element.blur(function () {
                            var val = $scope.$eval($attrs.ngModel);
                            if (val) {
                                $element.val(o.format(val));
                            }
                        });
                    }


                    // Blur
                    $element.blur(function () {
                        // Set as dirty
                        $element.addClass("valid-blur");
                    });

                    // Popover 
                    if ($element.popover && ($attrs.validMessage || o.message)) { // Is there popover support?
                        if (!ctrl.popover) {
                            // Popover doesn't exist yet. Create it.
                            var self = $element.popover({
                                animation: true,
                                html: false,
                                placement: 'auto top',
                                trigger: 'manual',
                                content: function () {
                                    return ctrl.errorMessage;
                                }
                            });
                            ctrl.popover = self.popover.bind(self);
                            $scope.$on('$destroy', function () {
                                ctrl.popover('destroy');
                            });
                        }


                        ctrl.showing = false;
                        ctrl.shouldShow = 0;
                        var hasFocus = false;
                        var hasMouse = false;

                        function updatePopover() {
                            var invalidClassName = 'ng-invalid-' + snakeCase(name, '-');
                            var shouldShow = (hasFocus || hasMouse)
                                && !o.$valid
                                && $element.closest("form").hasClass("valid-submitted")
                                && $element.hasClass(invalidClassName)
                                // Should not show a popover for an empty non-required field (unless this is the required directive)
                                && (name == 'dsValidRequired' || $element.val() || !o.$required)
                            ;
                            if (shouldShow) {
                                ctrl.shouldShow++;
                                ctrl.errorMessage = $attrs.validMessage || o.message;
                            }
                            if (ctrl.timeoutPromise) args.$timeout.cancel(ctrl.timeoutPromise);
                            ctrl.timeoutPromise = args.$timeout(function () {
                                // Has the text updated since the popover was shown?
                                if (!!ctrl.shouldShow && ctrl.showing && ctrl.currentMessage != ctrl.errorMessage) {
                                    // Force a re-show of the popover
                                    ctrl.showing = false;
                                }
                                if ($element.popover && ctrl.showing != !!ctrl.shouldShow) { // Do we need to change the state of the popover?
                                    if (!ctrl.showing) {
                                        // Need to show the popover
                                        ctrl.popover('show');
                                        ctrl.currentMessage = ctrl.errorMessage;
                                    } else {
                                        // Need to hide the popover
                                        ctrl.popover('hide');
                                    }
                                    ctrl.showing = !!ctrl.shouldShow;
                                }
                                // Reset the shouldShow counter.
                                ctrl.shouldShow = 0;
                            }, 0, false);
                        }
                        $element.focus(function () {
                            hasFocus = true;
                            updatePopover();
                        })
                        .blur(function () {
                            hasFocus = false;
                            updatePopover();
                        }).mouseenter(function () {
                            hasMouse = true;
                            updatePopover();
                        }).mouseleave(function () {
                            hasMouse = false;
                            updatePopover();
                        });
                    }

                }
            }
        });
        var ret = app.directive(name, invokeArgs);
        return args;
    }

    function snakeCase(name, separator) {
        var snakeCaseRegexp = /[A-Z]/g;
        separator = separator || '_';
        return name.replace(snakeCaseRegexp, function (letter, pos) {
            return (pos ? separator : '') + letter.toLowerCase();
        });
    }


    function removeChars(string, sChars) {
        var ret = "";
        for (var i = 0; i < string.length; i++) {
            var c = string.charAt(i);
            if (sChars.indexOf(c) == -1) {
                ret = ret + c;
            }
        }
        return ret;
    }

    function protoObject(o) {
        function a() { }
        a.prototype = o;
        return new a();
    }

});