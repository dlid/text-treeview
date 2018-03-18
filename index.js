var extend = require('./extend.js');
//var colors = require('chalk');

const CONST_NODE = "│  ";
const CONST_END_NODE = "└─ ";
const CONST_LEAF_NODE = "├─ ";
const CONST_EMPTY_SPACE = "   ";

function parseConfig(config) {
    var newConfig = {
            $indents : [],
            $root : true,
            showRootLines : true,
            format : format
        };
   
    if (typeof config === "boolean") {
        config = {showRootLines : config};
    }
    newConfig = extend(newConfig, config);
    if (newConfig.format !== null && typeof newConfig.format !== "function") {
        throw "format must be a function"
    }
    return newConfig;
}


function format(indents, treeNode, node) {
    return `${indents.join('')}${treeNode}${node.text}\n`;
}

function treeItNice(nodes, config) {
    var indicatorsEnabled = true,
        result = "";

    config = parseConfig(config);

    if (config.$root === true && config.showRootLines === false) {
        indicatorsEnabled = false;
    }

    nodes.forEach((node, ix) => {
        result += createNode(node, config, ix == nodes.length -1, indicatorsEnabled);
    });

    return result;
}


/**
 * Create the string for a single node
 * @param {object} node The node - an object with a text + child property or a string
 * @param {object} config The generated configuration object for the node
 * @param {boolean} isLast If this is the last node of its parent
 * @param {boolean} indicatorsEnabled If the node indicators are enabled for this node
 */
function createNode(node, config, isLast, indicatorsEnabled) {
    var treeIndicator = "",
        result = "";

    if (typeof node === "string") {
        node = {text : node};
    }

    if (indicatorsEnabled) {
        treeIndicator = isLast ? CONST_END_NODE : CONST_LEAF_NODE;
    }

    result += config.format(config.$indents, treeIndicator, node, config.$parent);
    if (node.children) {
        result += createChildNodes(node, config, indicatorsEnabled, isLast);
    }
    
    return result;
}

function createChildNodes(node, config, indicatorsEnabled, isLast) {
    var childConfig =  extend({},config, {
        showRootLines : config.showRootLines,
        $indents : config.$indents.concat( indicatorsEnabled ? ( isLast ? CONST_EMPTY_SPACE : CONST_NODE ) : []),
        $root : false,
        $parent : node
    });
    return treeItNice(node.children, childConfig);
}


module.exports = treeItNice;