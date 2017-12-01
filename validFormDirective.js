define([
    'app'
], function(app) {
    app.directive("dsValidForm", [
        '$window', '$timeout', '$q', function($window, $timeout, $q) {
            return {
                // Attach this event before the ng-submit event
                priority: 1000,
                scope: false,
                compile: function(tElement, tAttrs, transclude) {
                    var self = this;
                    return {
                        pre: function($scope, $element, attrs) {
                            var name = $element.attr("name");
                            if (!name) throw new Error("validForm requires a name.");
                            var localDeferred = null;
                            $scope.$watch(name, function(form) {
                                if (form) {
                                    form.submit = function () {
                                        localDeferred = $q.defer();

                                        $timeout(function() {
                                            $element.submit();
                                        }, 0, false);

                                        return localDeferred.promise;
                                    };
                                    form.reset = function() {
                                        form.$setPristine();
                                        $element.removeClass("valid-submitted");
                                    };
                                }
                            });
                            $element.submit(function(ev) {
                                var form = $scope[name];
                                $element.addClass("valid-submitted");
                                if (form.$invalid) {
                                    // Stop other events form firing.
                                    ev.stopImmediatePropagation();
                                    ev.stopPropagation();
                                    if (localDeferred) {
                                        localDeferred.reject();
                                    }
                                } else {
                                    if (localDeferred) {
                                        localDeferred.resolve();
                                    }
                                };
                                localDeferred = null;
                                ev.preventDefault();
                            });
                            $scope.$watch(name + ".$dirty", function(dirty) {
                                if (dirty) {
                                    $window.history.pushState();
                                    $window.history.back();
                                }
                            });
                        }
                    };
                }
            }
        }
    ]);
});
