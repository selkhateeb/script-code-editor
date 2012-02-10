goog.provide('Grammer');

/**
 * @constructor
 * @param {type} arg
 */
Grammer = function(args){
    
};


Grammer.optionalAddition = {
    'seq': ['+', /\d/],
    'tree': [1]
};

Grammer.optionalAdditions = {
    'or': [null, Grammer.optionalAddition]
};

Grammer.addStatement = {
    'name': 'addStatement',
    'seq': [ /\d/, '+', /\d/, Grammer.optionalAdditions],
    'tree': [0, 2, 3] //leafs
};

