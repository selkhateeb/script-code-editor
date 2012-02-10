goog.provide('Iterator');

/**
 * @constructor
 * @param {Array} array
 */
Iterator = function(array){
    /**
     * @type {Array}
     */
    this.array = array;

    /**
     * @type {Number}
     */
    this.length = array.length;

    /**
     * @type {Number}
     */
    this.index = 0;
};

/**
 * @returns the next element
 */
Iterator.prototype.next = function(){
    return this.array[this.index++];
};

/**
 * @returns true if it has next element
 */
Iterator.prototype.hasNext = function(){
    return this.index < this.length;
};
