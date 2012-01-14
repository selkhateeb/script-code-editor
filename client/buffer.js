goog.provide('editor.Buffer');
goog.provide('editor.Buffer.Point');

goog.require('goog.events.EventTarget');

/**
 * @constructor
 * @extends {goog.events.EventTarget} 
 */
editor.Buffer = function(){
    goog.base(this);
    
    /**
     * @type {editor.buffer.Point}
     */
    this.pointPosition = new editor.Buffer.Point(0,0);
};
goog.inherits(editor.Buffer, goog.events.EventTarget);

/**
 * Holds the lines of text
 * @type {Array}
 */
editor.Buffer.prototype.lines_ = [];

/**
 * the current point location
 * @type {editor.buffer.Point}
 */
editor.Buffer.prototype.pointPosition = null;

/**
 * Events fired by the buffer
 */
editor.Buffer.EventType = {
    /** Dispatched before the point positon changes */
    BEFORE_POINT_CHANGE : "beforepointchange",
    /** Dispatched after the point positon changes */
    AFTER_POINT_CHANGE : "afterpointchange"
};

/**
 * comments
 */
editor.Buffer.prototype.getLines = function(){
    return this.lines_;
};

/**
 * Insert text into buffer
 */
editor.Buffer.prototype.insert = function(text){
    //TODO: handle '\n'
    this.lines_.push(text);
};

/**
 * Moves the point one character forward
 */
editor.Buffer.prototype.forwardChar = function(){
    var beforeEvent = new goog.events.Event(editor.Buffer.EventType.BEFORE_POINT_CHANGE);
    beforeEvent.point = this.pointPosition;
    this.dispatchEvent(beforeEvent);

    this.pointPosition.column += 1;
    var line = this.lines_[this.pointPosition.line];
    if(this.pointPosition.column > line.length){
	
	//Make sure we are not at end of file
	if(this.lines_.length < this.pointPosition.line){
       	    //Move to next line
	    this.pointPosition.line += 1;
	    this.pointPosition.column = 0;
	}
	else {
	     this.pointPosition.column -= 1;
	}
    }

    var afterEvent = new goog.events.Event(editor.Buffer.EventType.AFTER_POINT_CHANGE);
    afterEvent.point = this.pointPosition;
    this.dispatchEvent(afterEvent);

};

/**
 * Moves the point one character backward
 */
editor.Buffer.prototype.backwardChar = function(){
    var beforeEvent = new goog.events.Event(editor.Buffer.EventType.BEFORE_POINT_CHANGE);
    beforeEvent.point = this.pointPosition;
    this.dispatchEvent(beforeEvent);

    this.pointPosition.column-= 1;
    if(this.pointPosition.column < 0){
	//Move to previous line
	if(this.pointPosition.line > 0){
	    this.pointPosition.line-= 1;
	    this.pointPosition.column = this.lines_[this.pointPosition.line].length - 1;
	} else {
	    this.pointPosition.column = 0;
	}
    }
    var afterEvent = new goog.events.Event(editor.Buffer.EventType.AFTER_POINT_CHANGE);
    afterEvent.point = this.pointPosition;
    this.dispatchEvent(afterEvent);

};

/**
 * @constructor
 * @param {Number} line
 * @param {Number} column
 */
editor.Buffer.Point = function(line, column){
    /**
     * @type {Number}
     */
    this.line = line;
    /**
     * @type {Number}
     */
    this.column = column;
};
