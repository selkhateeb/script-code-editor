goog.provide('editor.BufferComponent');

goog.require('goog.events.KeyCodes');
goog.require('editor.Buffer');
goog.require('tic');
goog.require('goog.ui.Component');
goog.require('goog.editor.Field');

/*
 * demonstrates how this components uses a css which will be included
 * automatically in the produced html
 */
tic.requireCss('editor.style');

/**
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
editor.BufferComponent = function(opt_domHelper){
//    goog.ui.Component.call(this, opt_domHelper);
    goog.base(this, opt_domHelper);
    this.buffer = new editor.Buffer();
};
goog.inherits(editor.BufferComponent, goog.ui.Component);

/**
 * Fragments
 */
editor.BufferComponent.prototype.Fragment = {
    point: 'p',
    frame: 'f'
};

/**
 * Overrides the base.createDom method
 */
editor.BufferComponent.prototype.createDom = function(){
//    var div = this.getDomHelper().createElement('div');
//    div.setAttribute('class', 'red');
    var div = this.getDomHelper().createDom('div', {
	'id': this.makeId(this.Fragment.frame),
	'class': 'red'
    });

    //Demonstrate how to use the template
//    div.innerHTML = examples.client.template.helloWorld();
    
    this.element_ = div;
//    this.isUserLoggedIn()
};


/**
 * @inheritedDocs
 */
editor.BufferComponent.prototype.enterDocument = function(){
    goog.base(this, 'enterDocument');
    this.buffer.insert('this is awsome');
    this.buffer.pointPosition = new editor.Buffer.Point(0, 3);
    this.renderBuffer();
    var timer = new goog.Timer(450);
    timer.dispatchTick = goog.bind(this.blinkPoint_, this);
    timer.start();
    goog.events.listen(this.buffer, editor.Buffer.EventType.AFTER_POINT_CHANGE, this.bufferChange_, false, this);

    goog.events.listen(this.getDomHelper().getDocument().body, goog.events.EventType.KEYDOWN, this.handleKeyDown_, false, this);
    goog.events.listen(this.getDomHelper().getDocument().body, goog.events.EventType.KEYPRESS, this.handleKeyPress_, false, this);
    goog.events.listen(this.getDomHelper().getDocument().body, goog.events.EventType.KEYUP, this.handleKeyUp_, false, this);
};

/**
 * comments
 */
editor.BufferComponent.prototype.blinkPoint_ = function(){
    var el = this.getElementByFragment(this.Fragment.point);
    goog.dom.classes.toggle(el, 'border');
};


/**
 * comments
 */
editor.BufferComponent.prototype.bufferChange_ = function(e){
    this.renderBuffer();
};

/**
 * comments
 */
editor.BufferComponent.prototype.renderBuffer = function(){
    var frame = this.getElementByFragment(this.Fragment.frame);
    this.getDomHelper().removeChildren(frame);

    for(var i=0; i<this.buffer.getLines().length; i++){
	var line = this.buffer.getLines()[i];
	if(i == this.buffer.pointPosition.line){
	    var cursor = this.buffer.pointPosition.column;
	    var part1 =  this.getDomHelper().createDom('span', null, line.substring(0, cursor));
	    var part2 =  this.getDomHelper().createDom('span', null, line.substring(cursor));
	    var point =  this.getDomHelper().createDom('span', {
		'id': this.makeId(this.Fragment.point),
		'class': 'point'});
	    var div = this.getDomHelper().createDom('div', 'line', part1, point, part2);
	} else {
	    var div = this.getDomHelper().createDom('div', 'line', line);
	}
	frame.appendChild(div);
    }

};

/**
 * comments
 */
editor.BufferComponent.prototype.handleKeyDown_ = function(e){
    if(e.keyCode == goog.events.KeyCodes.RIGHT) this.buffer.forwardChar();
    if(e.keyCode == goog.events.KeyCodes.LEFT) this.buffer.backwardChar();

};

/**
 * comments
 */
editor.BufferComponent.prototype.handleKeyPress_ = function(e){
    if(goog.events.KeyCodes.isTextModifyingKeyEvent(e)){
	this.buffer.insert(String.fromCharCode(e.charCode));
    }

};

/**
 * comments
 */
editor.BufferComponent.prototype.handleKeyUp_ = function(e){
};
