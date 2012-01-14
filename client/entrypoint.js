goog.provide('editor.client.entrypoint');

goog.require('editor.BufferComponent');
/**
 * main entrypoint of the application 
 */
editor.client.entrypoint.onModuleLoad = function(){

    var component = new editor.BufferComponent();
    component.render();
}
