goog.provide('editor.Cursor');

goog.require('goog.events.Event');

/**
 * @constructor
 */
editor.Cursor = function(buffer){
    /**
     * @type {editor.Buffer}
     */
    this.buffer = buffer;

    /**
     * @type {String}
     */
    this.var_name = 'cursor';

    /**
     * @type {Number}
     */
    this.line = 0;

    /**
     * @type {Number}
     */
    this.column = 0;
};

/**
 * Events fired by the buffer
 */
editor.Cursor.EventType = {
    /** Dispatched before the point positon changes */
    BEFORE_CURSOR_CHANGE : "beforecursorchange",
    /** Dispatched after the point positon changes */
    AFTER_CURSOR_CHANGE : "aftercuesorchange"
};

/**
 * Moves the point one character forward
 */
editor.Cursor.prototype.forwardChar = function(){
    var beforeEvent = new goog.events.Event(editor.Cursor.EventType.BEFORE_CURSOR_CHANGE);
    beforeEvent.cursor = this;
    this.buffer.dispatchEvent(beforeEvent);

    this.column += 1;
    var line = this.buffer.getLine(this.line);
    if(this.column > line.length){
	
	//Make sure we are not at end of file
	if(this.buffer.getLines().length < this.line){
       	    //Move to next line
	    this.line += 1;
	    this.column = 0;
	}
	else {
	     this.column -= 1;
	}
    }

    var afterEvent = new goog.events.Event(editor.Cursor.EventType.AFTER_CURSOR_CHANGE);
    afterEvent.cursor = this;
    this.buffer.dispatchEvent(afterEvent);

};

/**
 * Moves the point one character backward
 */
editor.Cursor.prototype.backwardChar = function(){
    var beforeEvent = new goog.events.Event(editor.Cursor.EventType.BEFORE_CURSOR_CHANGE);
    beforeEvent.cursor = this;
    this.buffer.dispatchEvent(beforeEvent);

    this.column-= 1;
    if(this.column < 0){
	//Move to previous line
	if(this.line > 0){
	    this.line-= 1;
	    this.column = this.buffer.getLine(this.line).length - 1;
	} else {
	    this.column = 0;
	}
    }
    var afterEvent = new goog.events.Event(editor.Cursor.EventType.AFTER_CURSOR_CHANGE);
    afterEvent.cursor = this;
    this.buffer.dispatchEvent(afterEvent);
};

/**
 * Moves the cursor to the beginning of current line
 */
editor.Cursor.prototype.beginningOfLine = function(){
    this.fireBeforeCursorChangeEvent_();
    this.column = 0;
    this.fireAfterCursorChangeEvent_();
};

/**
 * Moves the cursor to the end of current line
 */
editor.Cursor.prototype.endOfLine = function(){
    this.fireBeforeCursorChangeEvent_();
    var line = this.buffer.getLine(this.line);
    this.column = line.length > 0? (line.length) : 0;
    this.fireAfterCursorChangeEvent_();
};

/**
 * Fires the editor.Cursor.EventType.BEFORE_CURSOR_CHANGE event
 */
editor.Cursor.prototype.fireBeforeCursorChangeEvent_ = function(){
    var beforeEvent = new goog.events.Event(editor.Cursor.EventType.BEFORE_CURSOR_CHANGE);
    beforeEvent.cursor = this;
    this.buffer.dispatchEvent(beforeEvent);
};

/**
 * Fires the editor.Cursor.EventType.AFTER_CURSOR_CHANGE event
 */
editor.Cursor.prototype.fireAfterCursorChangeEvent_ = function(){
    var afterEvent = new goog.events.Event(editor.Cursor.EventType.AFTER_CURSOR_CHANGE);
    afterEvent.cursor = this;
    this.buffer.dispatchEvent(afterEvent);
};
