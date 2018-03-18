
var Extends = (function(){
    var self = this;

    self.keys = function(o) {
        return Object.keys(o);
    }

    self.isSimpleType = function(obj) {

        return (obj === null ||
            typeof obj === "string" 
            || typeof obj === "number"
            || typeof obj === "boolean"
            || typeof obj === "function"
            || (obj.constructor && obj.constructor.prototype == Array.prototype));
    }

    self.extend = function() {

        if (arguments.length == 0) {
            return {};
        } else if (arguments.length == 1) {
            return arguments[0];
        }

        var parameters = Array.prototype.slice.call(arguments),
            rootObject = parameters.shift(),
            nextObject = parameters.shift() ,
            i,
            propertyNames,
            propertyName;


        if (typeof rootObject !== "undefined" && rootObject != null) {
            if (typeof nextObject !== "undefined") {
                if (self.isSimpleType(rootObject) || self.isSimpleType(nextObject)) {
                    rootObject = nextObject;
                } else {
                    propertyNames = self.keys(rootObject);
                    for(i=0; i < propertyNames.length; i++) {
                        propertyName = propertyNames[i];
                        if (typeof nextObject[propertyName] !== "undefined") {
                            rootObject[propertyName] = self.extend(rootObject[propertyName], nextObject[propertyName]);
                        }
                    }

                    propertyNames = self.keys(nextObject);
                    for(i=0; i < propertyNames.length; i++) {
                        propertyName = propertyNames[i];
                        if (!rootObject[propertyName]) {
                            rootObject[propertyName] = nextObject[propertyName];
                        }
                    }
                }
            }
        }

        if (parameters.length > 0) {
            parameters.unshift(rootObject);
            return self.extend.apply(self, Array.prototype.slice.call(parameters));
        }

        return rootObject;
    }

    return {
        extend : extend
    }

}());

module.exports = Extends.extend;