/**
 * @author D.A.Timofeev
 */

"use strict";

const LODASH = '_';
const FUNCTION = 'map';

/**
 *
 * @param {ASTNode} node
 * @returns {boolean}
 */
const isLodashCall = function (node) {
    return node.callee && node.callee.object && node.callee.object.name === LODASH;
};
/**
 *
 * @param {ASTNode} node
 * @returns {boolean}
 */
const isMapCall = function (node) {
    const prop = node.callee.property;
    return prop &&
        prop.type === 'Identifier' &&
        prop.name === FUNCTION;
};

/**
 *
 * @param {ASTNode} node
 * @param {number} index
 * @returns {string|null}
 */
const getArgumentType = function (node, index) {
    const args = getNodeArguments(node);
    if (args[index]) {
        return args[index].type || null
    }
    return null;
};

/**
 *
 * @param {string} array
 * @param {string} callback
 * @returns {string}
 */
const createNativeArrayMapFunction = function (array, callback) {
    return `${array}.map(${callback})`
};
/**
 *
 * @param {ASTNode} node
 * @param context
 * @returns {function(*): *}
 */
const replacerWithArray = function (node, context) {
    const source = context.getSourceCode();
    const args = getNodeArguments(node).map(node => source.getText(node));
    return (fixer) => fixer.replaceText(node, createNativeArrayMapFunction(args[0], args[1]));
};

/**
 *
 * @param {ASTNode} node
 * @param context
 * @returns {function(*): *}
 */
const witchCheckForArray = function (node, context) {
    const source = context.getSourceCode();
    const args = getNodeArguments(node).map(node => source.getText(node));
    return (fixer) => fixer.replaceText(node, `_.isArray(${args[0]}) ? ${createNativeArrayMapFunction(args[0], args[1])} : ${source.getText()}`);
};
/**
 *
 * @param {ASTNode} node
 * @returns {Array|CallArgument[]}
 */
const getNodeArguments = function (node) {
    if (node.arguments) {
        return node.arguments || []
    }
    return [];
};

const REPLACERS = {
    'ArrayExpression': replacerWithArray,
    'Identifier': witchCheckForArray,
};

/**
 *
 * @param {ASTNode} node
 * @param {Object} context
 *
 * @return Function | null
 */
const getReplacer = function (node, context) {
    if (!isLodashCall(node) || !isMapCall(node) || getNodeArguments(node).length === 0) {
        return null;
    }
    const replacer = REPLACERS[getArgumentType(node, 0)];
    return replacer ? replacer(node, context) : null;
};

module.exports = {getReplacer};
