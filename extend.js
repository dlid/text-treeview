
 function isSimpleType(obj) {
    return (obj === null ||
        typeof obj === "string" 
        || typeof obj === "number"
        || typeof obj === "boolean"
        || typeof obj === "function"
        || (obj.constructor && obj.constructor.prototype == Array.prototype));
}

function mergeObjects(rootObject, nextObject) {

    if (typeof rootObject === "undefined" || rootObject === null) {
        return rootObject;
    }

    if (typeof nextObject == "undefined") {
        return rootObject;
    }

    if (isSimpleType(rootObject) || isSimpleType(nextObject)) {
        rootObject = nextObject;
    } else {
        mergeObjectProperties(rootObject, nextObject);
    }

    return rootObject;
}


function mergeObjectProperties(rootObject, nextObject) {
    var propertyNames = Object.keys(rootObject);

    Object.keys(rootObject).forEach(propertyName => {
        if (typeof nextObject[propertyName] !== "undefined") {
            rootObject[propertyName] = extend(rootObject[propertyName], nextObject[propertyName]);
        }
    })


    Object.keys(nextObject).forEach(propertyName => {
        if (!rootObject[propertyName]) {
            rootObject[propertyName] = nextObject[propertyName];
        }
    });
}

function extend() {

    if (arguments.length == 0) {
        return {};
    } else if (arguments.length == 1) {
        return arguments[0];
    }

    var parameters = Array.prototype.slice.call(arguments),
        rootObject = parameters.shift(),
        nextObject = parameters.shift();

    rootObject = mergeObjects(rootObject, nextObject);

    if (parameters.length > 0) {
        parameters.unshift(rootObject);
        return extend.apply(this, Array.prototype.slice.call(parameters));
    }

    return rootObject;
}

module.exports = extend;