/**
 * @author D.A.Timofeev
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const helpers = require('../helpers/map.js');

module.exports = {
    meta: {
        docs: {
            description: "Replacer lodash#map to native Array#map",
            category: "",
            recommended: true
        },
        messages: {
            prefer: "Replace lodash#map of the to native Array#map",
        },
        fixable: 'code',
    },

    create: function (context) {
        return {
            CallExpression: (node) => {
                const replacer = helpers.getReplacer(node, context);
                if (replacer) {
                    context.report({
                        node,
                        messageId: 'prefer',
                        fix: replacer
                    });
                }
            }
        };
    }
};
