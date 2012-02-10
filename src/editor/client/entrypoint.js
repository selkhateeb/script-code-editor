goog.provide('editor.client.entrypoint');

goog.require('Grammer');
goog.require('Parser');

goog.require('editor.BufferComponent');
/**
 * main entrypoint of the application 
 */
editor.client.entrypoint.onModuleLoad = function(){

    var component = new editor.BufferComponent();
    component.render();
    buffer = component.buffer;
}

var buffer = null;

