goog.provide('Parser');

goog.require('Grammer');
goog.require('Iterator');
goog.require('goog.array');

Parser = function(grammer, tokens){
    this.grammer = grammer;
    var iterator = new Iterator(tokens);
    return this.parse(iterator, Grammer.addStatement);
}

Parser.prototype.parse = function(tokens, grammer){
    var children = [];
    var seq = grammer.seq;
    var tree = grammer.tree;
    var or = grammer.or;
    var name = grammer.name;

    if(!seq && !or) return {children: children, result: 'FAILED'}; 

    if(or){
	for(var i=0; i<or.length;i++){
	    if(or[i] != null) {
		var g = or[i];//{seq:or[i], tree:tree};
		children = goog.array.concat(children, this.parse(tokens, g));
		return children;
	    }
	}
    } else {
	while(tokens.hasNext()){
	    for(var i=0; i<seq.length && tokens.hasNext(); i++){

		var element = seq[i];
		if(element instanceof RegExp){
		    var token = tokens.next();
		    if(!element.test(token)) 
			return {children: children, result: 'FAILED'};
		    if(goog.array.contains(tree, i)){
			children.push(token);
		    }
		    
		} else if (typeof(element) === 'object'){ //Non terminal rule
		    
		    var p = this.parse(tokens, element);
		    if(!p.result === 'FAILED'){
			//we need to return the forest
			children.push(p.children);
			return {children: children, result: 'FAILED'};
		    }
		    children = goog.array.concat(children, p);
		    
		} else { //We got a Number or String type terminal rule
		    var token = tokens.next();
		    if(token !== element) 
			return {children: children, result: 'FAILED'}; //We are the wrong grammer

		    if(goog.array.contains(tree, i)){
			children.push(token);
		    }
		}
	    }
	}
    }

    if(name){
	var node = {
	    name: name,
	    children: children
	};
	return node;
    }
    
    return children;
}

/**
 * comments
 */
Parser.prototype.buildTree = function(tree, seq, children, matched_tokens){
    for(var i=0; i<tree.length; i++){
	var ref_index = tree[i];
	//we are only intrested in terminals
	if(typeof(seq[ref_index]) !== 'object')
	    children.push(matched_tokens[ref_index]);
    }
    return children;
};
