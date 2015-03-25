'use strict';

/**
 *
 * @param  {[type]} schemator - the original schemator object
 * @return {[type]}           [description]
 */
var customRules = function(schemator, lodash){
    var _ = lodash;

    if(!schemator){
        throw new Error('js-data-rules was not passed a schemator instance to inject custom rules into');
    } else if (!_){
        throw new Error('js-data-rules missing lodash');
    } else {

        // from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var checkEmail = function (emailAddress) {
          var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
          var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
          var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
          var sQuotedPair = '\\x5c[\\x00-\\x7f]';
          var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
          var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
          var sDomain_ref = sAtom;
          var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
          var sWord = '(' + sAtom + '|' + sQuotedString + ')';
          var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
          var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
          var sAddrSpec = sLocalPart + '\\x40' + sDomain; // complete RFC822 email address spec
          var sValidEmail = '^' + sAddrSpec + '$'; // as whole string

          var reValidEmail = new RegExp(sValidEmail);

          return reValidEmail.test(emailAddress);
        };

        var unwrapped = function(input, value){
            if(input && _.isString(input)){
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

        var lowercase = function(input, value){
            if(input){
                if(!_.isString(input) || input !== input.toLowerCase()){
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

        var email = function(input, value){
            if(input){
                if(!_.isString(input) || !checkEmail(input)){
                    return {
                        rule: 'email',
                        actual: input + ' (isString = ' + _.isString(input) + ', regex = ' + checkEmail(input) + ')',
                        expected: 'an email address'
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
            } else if (possible && !_.isArray(possible)){
                return {
                    rule: 'enum'
                };
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
        schemator.defineRule('isEmail', email);
        schemator.defineRule('enum', enumRule);
    }
};

module.exports = customRules;
