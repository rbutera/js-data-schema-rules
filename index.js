'use strict';

/**
 *
 * @param  {[type]} schemator - the original schemator object
 * @return {[type]}           [description]
 */
var customRules = function(schemator, lodash){
    var _ = window._ || this._ || lodash;

    if(!schemator){
        throw new Error('js-data-rules was not passed a schemator instance to inject custom rules into');
    } else if (!_){
        throw new Error('js-data-rules missing lodash');
    } else {
        var unwrapped = function(input){
            if(input){
                var firstChar = input.charAt(0);
                var lastChar = input.charAt(input.length - 1);
                if(firstChar === ' ' || lastChar === ' '){
                    return {
                        rule: 'unwrapped'
                    };
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };

        var lowercase = function(input){
            if(input){
                if(input !== input.toLowerCase()){
                    return {
                        rule: 'lowercase'
                    };
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };

        var email = function(input){
            var EMAIL_REGEX = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e])|(\\[\x01-\x09\x0b\x0c\x0d-\x7f])))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))$/i;

            if(input){

                if(!EMAIL_REGEX.test(input)){
                    return {
                        rule: 'email'
                    };
                } else {
                    return null;
                }
            } else {
                return null;
            }
        };


        var enumRule = function(input, possible){
            if(!input || !possible){
                return null;
            } else {
                if(_.indexOf(possible, input) === -1){
                    return {
                        rule: 'enum',
                        actual: input,
                        expected: possible
                    };
                } else {
                    return null;
                }
            }
        };

        schemator.defineRule('unwrapped', unwrapped);
        schemator.defineRule('lowercase', lowercase);
        schemator.defineRule('email', email);
        schemator.defineRule('enum', enumRule);
    }
};

module.exports = customRules;
