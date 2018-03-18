var treeItNice = require('../index.js');

describe("Tre tests", function() {


    it("Two root elements with lines", function() {
        expect(typeof treeItNice).toEqual("function");

        var result = treeItNice([
            "RootNode",
            "Root node 2"
        ]);

        expect(result).toEqual(`├─ RootNode\n└─ Root node 2\n`);
    });

    it("Two root elements without lines", function() {
        expect(typeof treeItNice).toEqual("function");

        var result = treeItNice([
            "RootNode",
            "Root node 2"
        ], {
            showRootLines : false
        });

        expect(result).toEqual(`RootNode\nRoot node 2\n`);

    });

    it("Two root elements without lines (bool as config)", function() {
        expect(typeof treeItNice).toEqual("function");

        var result = treeItNice([
            "RootNode",
            "Root node 2"
        ], false);

        expect(result).toEqual(`RootNode\nRoot node 2\n`);

    });

    it("The one with a root node and one child (no root lines)", function() {
        expect(typeof treeItNice).toEqual("function");

        var result = treeItNice([
            {
                text : "RootNode",
                children : ["tst"]
            }
        ], false);
        //console.log(result);
        expect(result).toEqual(`RootNode\n└─ tst\n`);

    });

    it("One root with one child", function() {
        expect(typeof treeItNice).toEqual("function");

        var result = treeItNice([
            {
                text : "1. Root",
                children : [
                    "1.1 Child"
                ]
            },
            "Root node 2"
        ]);
        //console.log(result);
        expect(result).toEqual("├─ 1. Root\n│  └─ 1.1 Child\n└─ Root node 2\n"); 
    });

    
    it("The one where format is not a function", function() {
        expect(typeof treeItNice).toEqual("function");
        expect(function() {
            var result = treeItNice([
                "Root node"
            ], {
                format : "test"
            });
        }).toThrow("format must be a function");
    });

    it("One root one child in first root", function() {
        expect(typeof treeItNice).toEqual("function");

        var result = treeItNice([
            {
                text : "1. Root",
                children : [
                    "1.1 Child"
                ]
            }
        ]);
        console.log(result);
        expect(result).toEqual("└─ 1. Root\n   └─ 1.1 Child\n"); 
    });


});