define([
    './validCurrencyDirective',
    './validDirective',
    './validEmailDirective',
    './validEmailOrPhoneDirective',
    './validFormDirective',
    './validIntegerDirective',
    './validMatchesDirective',
    './validMileageDirective',
    './validPasswordDirective',
    './validPhoneDirective',
    './validRequiredDirective',
    './validValidDirective',
    './validZipDirective'
], function () {
    var i = 0;
    return {
        validCurrencyDirective: arguments[i++],
        validDirective: arguments[i++],
        validEmailDirective: arguments[i++],
        validEmailOrPhoneDirective: arguments[i++],
        validFormDirective: arguments[i++],
        validIntegerDirective: arguments[i++],
        validMatchesDirective: arguments[i++],
        validMileageDirective: arguments[i++],
        validPasswordDirective: arguments[i++],
        validPhoneDirective: arguments[i++],
        validRequiredDirective: arguments[i++],
        validValidDirective: arguments[i++],
        validZipDirective: arguments[i++]
    }
});

/*
    Valid

    An angular validation framework -Alco

    Basics:
        <form name="myForm" ds:valid-form>
            ...
            <valid-errors />
            <button type="submit">Save</submit>
        </form>
    Required Field:
        Always Required:
            <label>My Field</label><input type="text" ng-model="model.field" ds:valid-required />
            My Field  
        Required based on condition:
            <label>My Field</label><input type="text" ng-model="model.field" ds:valid-required="model.otherField" />
            Other Field 
            My Field  

    Zip Code:
        <input type="text" ng-model="model.zip" ds:valid-zip />

    Integer:
        <input type="number" ng-model="model.number" ds:valid-integer />

    Email:
        <input type="text" ng-model="model.email" ds:valid-email />

    Phone:
        <input type="text" ng-model="model.phone" ds:valid-phone />

    Currency:
        <input type="text" ng-model="model.salary" ds:valid-currency />

    Passwords:
        This example will validate the password complexity, and validate
        the confirm password matches the first password:

        <input type="password" ng-model="model.password" ds:valid-password />
        <input type="password" ng-model="model.confirmPassword" ds:valid-matches="model.password" ds:valid-message="Passwords do not match." />
         

    Valid based on controller
        <input type="text" ng-model="model.something" ds:valid-valid="isAllCaps(model.something)" ds:valid-message="Must be all caps." />

*/
    /*
        Usage:
        
        validationDirective.create("dsValidNumber", {
            // Optional: Required services (dependency injection)
            services: ["$service1", "$service2"],

            // Optional: Validation method (returns true or false)
            validate: function(value, $scope, $element, attrs, ctrl, $service1, $service2) {
                return !isNaN(+value);
            }]),

            // Optional: Parsing function (takes string, returns value)
            parse: function(value) {
                return parseInt(value);
            },

            // Optional: Formatting function (takes value, returns string)
            format: function(value) {
                return value.toString();
            },

            // Optional: Load function
            load: function() {

            }
        })

        Available variables

        this.$scope
        this.$element  (jQuery element)
        this.$attrs
        this[Any service you require]


    */
