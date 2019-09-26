/**
 * @author D.A.Timofeev
 */

"use strict";

const rule = require('../../../lib/rules/map.js');
const {RuleTester} = require('eslint');

const ruleTester = new RuleTester({parserOptions: { ecmaVersion: 2015 }});

ruleTester.run("lodash-to-native/map", rule, {
    valid: [
        {
            code: "[].map(function (e) {return e;});",
        }, {
            code: "map(function (e) {return e;});",
        }
    ],
    invalid: [
        {
            code: "_.map([], (item) => item)",
            output: '[].map((item) => item)',
            errors: [{
                messageId: 'prefer'
            }]
        },
        {
            code: `_.map([{item:1}], callbackFunction)`,
            errors: [
                {
                    message: "Replace lodash#map of the to native Array#map"
                }
            ],
            output: '[{item:1}].map(callbackFunction)',
        },
        {
            code: '_.map(collection, (item) => item)',
            output: '_.isArray(collection) ? collection.map((item) => item) : _.map(collection, (item) => item)',
            errors: [{
                messageId: 'prefer'
            }]
        }
    ],
});
