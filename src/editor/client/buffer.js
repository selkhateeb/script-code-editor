goog.provide('editor.Buffer');

goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget} 
 */
editor.Buffer = function(){
    goog.base(this);
    
};
goog.inherits(editor.Buffer, goog.events.EventTarget);

/**
 * Holds the lines of text
 * @type {Array}
 */
editor.Buffer.prototype.lines_ = [];

/**
 * comments
 */
editor.Buffer.prototype.getLines = function(){
    return this.lines_;
};

/**
 * comments
 */
editor.Buffer.prototype.getLine = function(index){
    return this.lines_[index];
};


/**
 * Insert text into buffer
 */
editor.Buffer.prototype.insert = function(text){
    //TODO: handle '\n'
    this.lines_.push(text);
};

/**
 * Registers a plugin
 */
editor.Buffer.prototype.registerPlugin = function(plugin){
    var p = new plugin(this);
    this[p.var_name] = p;
};