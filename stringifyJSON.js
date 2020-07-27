// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var objKeyValArr = [];
  var valArr = [];
  var objKeys = [];
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
    return '' + obj;
  } else if (typeof obj === 'string') {
    return '"' + obj + '"';
  } else if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '[]';
    } else {
      obj.forEach(function(element) {
        valArr.push (stringifyJSON(element));
      });
      return '[' + valArr + ']';
    }
  } else if ( obj instanceof Object) {
    objKeys = Object.keys(obj);
    objKeys.forEach(function(key) {
      var outputKey = '"' + key + '":';
      var outputVal = obj[key];
      if (typeof outputVal === undefined || outputVal instanceof Function) {
        objKeyValArr.push('');
      } else if (typeof outputVal === 'string') {
        objKeyValArr.push (outputKey + '"' + outputVal + '"');
      } else if (typeof outputVal === 'number' || typeof outputVal === 'boolean' || outputVal === null) {
        objKeyValArr.push (outputKey + outputVal);
      } else if (outputVal instanceof Object) {
        objKeyValArr.push (outputKey + stringifyJSON(outputVal));
      }
    });
    return '{' + objKeyValArr.toString() + '}';
  }
};