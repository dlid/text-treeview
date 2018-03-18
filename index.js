var extend = require('./extend.js');
var colors = require('chalk');

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
        result += createNode(node, ix, config, nodes.length, indicatorsEnabled);
    })

    return result;
}

function createNode(node, ix, config, count, indicatorsEnabled) {
    
    var treeIndicator = "",
        isLast = ix == count -1,
        result = "";

    if (typeof node === "string") {
        node = {text : node};
    }

    if (indicatorsEnabled) {
        treeIndicator = isLast ? CONST_END_NODE : CONST_LEAF_NODE;
    }

    result += config.format(config.$indents, treeIndicator, node, config.$parent);
    result += createChildNodes(node, config, indicatorsEnabled, isLast);
    
    return result;
}

function createChildNodes(node, config, indicatorsEnabled, isLast) {
    var result = "";
    if (node.children) {
        var c = config.$indents.concat( indicatorsEnabled ? ( isLast ? CONST_EMPTY_SPACE : CONST_NODE ) : []);
        var nc =  extend({},config, {
            showRootLines : config.showRootLines,
            $indents : c,
            $root : false,
            $parent : node
        });
        result += treeItNice(node.children, nc);
    }
    return result;
}

//console.log(colors.yellow("╭─ ") + "All Supers" +colors.yellow("──────────────··"));

// process.stdout.write(treeItNice([
//     {
//         text : "Heroes",
//         children : [
//             {
//                 text: "Superman",
//                 hero : true,
//                 children : [
//                     "A.k.a. Clark Kent",
//                     "A.k.a. Man of Steel"
//                 ]
//             },
//             {text : "Spiderman", hero : true}
//         ]
//     }
// ], {
//     showRootLines : false
//     // ,format : function(indent, treeNode, node, parent) {
//     //     return colors.yellow("│  ") + indent.join('') + treeNode + (node.hero ? colors.yellow('✪ ') + colors.green(node.text) : colors.cyan(node.text)) + (parent ? parent.text : "") + "\n" ;
//     // }
// }));
// //process.stdout.write(colors.yellow("╰───────────────────────────────────────────────────────··"));

module.exports = treeItNice;