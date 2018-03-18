var extend = require('../extend.js');

describe("Extend tests", function() {


    it("hh", function() {
        extend()
        extend(null, null)

        var x = extend({a : 3})
        expect(x).toEqual({a : 3});

        var x = extend({a : 3}, {a : 5})
        expect(x).toEqual({a : 5});

var f = function() {}

        var x = extend({a : 3}, {a : f})
        expect(x).toEqual({a : f});

    })


});