(function() {	"use strict";		exports.empty = function () {		return new Vector(0, 0);	};		exports.newVector = function(x, y) {		return new Vector(x, y);	};		function Vector(x, y) {		this._x = x;		this._y = y;	}	Vector.prototype.x = function () {		return this._x;	};	Vector.prototype.y = function () {		return this._y;	};	Vector.prototype.set_x = function (x) {		this._x = x;	};	Vector.prototype.set_y = function (y) {		this._y = y;	};	Vector.prototype.magnitude = function () {		return Math.sqrt(this._x * this._x + this._y * this._y);	};	Vector.prototype.distance = function (v) {		var dx = Math.abs(this._x - v._x);		var dy = Math.abs(this._y - v._y);		return Math.sqrt(dx*dx + dy*dy);	};	Vector.prototype.add = function (v) {		return new Vector(this._x + v._x, this._y + v._y);	};	Vector.prototype.subtract = function (v) {		return new Vector(this._x - v._x, this._y - v._y);	};	Vector.prototype.multiply = function (c) {		return new Vector(this._x * c, this._y * c);	};	Vector.prototype.divide = function (c) {		return new Vector(this._x / c, this._y / c);	};	Vector.prototype.normalize = function() {		var m = this.magnitude();		if (m > 0) {			return this.divide(m);		}		return this;	};	Vector.prototype.clamp = function (max) {		if (this.magnitude() > max) {			return this.normalize().multiply(max);		}				return this;	};	Vector.prototype.toString = function () {		return 'Vector(x:' + this._x + ',y:' + this._y + ')';	};}());