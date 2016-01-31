'use strict'


var Class = function (o) {

	if (arguments.length === 0) {
		return function () {}
	}
	
	return createClass(o)

}

Class.extend = function (Parent) {
	
	return function (o) {
		
		if (Parent) {
			switch (typeof Parent) {
				case 'function': 
					return createClass(o, Parent)
					break

				case 'object':
					// TODO: inherit from object
					throw new TypeError('Parent should be a Class')
					break
					
				default:
					throw new TypeError('Parent should be a Class or an object')
			}
		}
			
	}
	
}

function createClass (o, Parent) {
	
	Parent = Parent || Object
	
	var _class = function () {

		// build constructor		
		var _constructor
		
		if (this instanceof _class) {
			_constructor = this
		} else {
			_constructor = new _class()
		}
		
		if(Parent) {
			Parent.prototype.constructor.apply(_constructor, arguments)
		}

		if(o && o.hasOwnProperty("constructor")) {
			o.constructor.apply(_constructor, arguments)
		}
		
		// add implementation methods
		for (var i in o) {
			_class.prototype[i] = o[i]
		} 

		return _constructor
		
	}
	
	// inherit
	var F = function () {}
	F.prototype = Parent.prototype
	_class.prototype = new F()
	_class.uber = Parent.prototype
	
	
	// TODO: call super?
	
	
	return _class  
}
