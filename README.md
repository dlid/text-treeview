# text-treeview
node.js library to write a tree hierarchy for console output.

[![Build Status](https://travis-ci.org/dlid/text-treeview.svg?branch=master)](https://travis-ci.org/dlid/text-treeview) [![codecov](https://codecov.io/gh/dlid/text-treeview/branch/master/graph/badge.svg)](https://codecov.io/gh/dlid/text-treeview) [![Maintainability](https://api.codeclimate.com/v1/badges/7bb4fc43c7b3b6f0aa5f/maintainability)](https://codeclimate.com/github/dlid/text-treeview/maintainability)

# The why
When writing another library I was working with a deep hierarchy of objects that I had to verify.

I iterated the objects and wrote some metadata using `space` for indenting the lines. But as the hierarchy became more complex it was difficult to follow.

So I wrote a little helper function that could take an array of objects and create a treeview-like experience, making it a lot easer to see the actual structure.

![treeview](https://assets.dlid.se/7747c114/img/text-treeview.png)

Then I decided it was an excellent little function to share with everyone.

# Installation

```
npm install text-treeview
```

# Basic usage

```
var tree = require('text-treeview');

console.log(tree([
    {
        text : "Girls",
        children : [
            "Anna",
            "Lisa",
            "Bea"
        ]
    },
    {
        text : "Boys",
        children : [
            "Kalle",
            "Åre",
            "Asgar"
        ]
    }
]));

```
Will give you the result:
```
├─ Girls
│  ├─ Anna
│  ├─ Lisa
│  └─ Bea
└─ Boys
   ├─ Kalle
   ├─ Åre
   └─ Asgar
```

## Tree array

Each item in the array must be either a string, or an object with a `text` property. You can also use the optional `children` property for an object to add child nodes to the item.

The following snippets will yield identical results:

```
console.log(tree([
    "Hello",
    "Hej",
    "Hohejoj"
]));

console.log(tree([
    { text : "Hello" },
    { text : "Hej" },
    { text : "Hohejoj" }
]));
```

## Children

Each child item follow the same pattern. A string or the object described above.

```
console.log(tree([
    {
     text : "Some items",
     children : [
      "Item 1", 
      "Item 2",
      { 
       text : "Item 3",
       children : [ "Item 3.1", "Item 3.2"]
      }
     ]
    }
]));
```
will give the result
```
└─ Some items
   ├─ Item 1
   ├─ Item 2
   └─ Item 3
      ├─ Item 3.1
      └─ Item 3.2
```

## Options

You pass the options object as the second parameter. These are only a few options and these are the the default ones.
```
{
 showRootLines : true,
 format : (indents, treeNode, node) => {
    return `${indents.join('')}${treeNode}${node.text}\n`;
 }
}
```
- Set `showRootLines` to false to remove the lines on the root level
- Use `format` to customize each node. See details below.

### format function
`format (indents, treeNode, node, parentNode)`
The format function will create each node and will take four parameters

- `indents` is an array of each treeview "indent" that will build the treeview.
   - This array contains all the node indicators further up the tree that other levels and nodes in the tree has created.
   - These are either a NODE `│  ` or EMPTY SPACE `   `. These should be joined toghether and put in front of the string.
- `treeNode` is the actual node indicator for the current node (this is are either a LEAF_NODE (`├─ `) or  END NODE (`└─  `).
- `node` is the node object
- `parentNode` is the parent node of the current node

The default function simply looks exactly like this:

```
function format(indents, treeNode, node) {
    return `${indents.join('')}${treeNode}${node.text}\n`;
}
```


