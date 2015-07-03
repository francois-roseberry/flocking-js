function vector(x, y) {	return {		_x: x,		_y: y,				x: function () { return this._x; },		y: function () { return this._y; },		set_x: function (x) { this._x = x; },		set_y: function (y) { this._y = y; },		magnitude: function () { return Math.sqrt(this._x * this._x + this._y * this._y); },		distance: function (v) {			var dx = Math.abs(this._x - v._x);			var dy = Math.abs(this._y - v._y);			return Math.sqrt(dx*dx + dy*dy);		},		add: function (v) { return vector(this._x + v._x, this._y + v._y); },		subtract: function (v) { return vector(this._x - v._x, this._y - v._y); },		multiply: function (c) { return vector(this._x * c, this._y * c); },		divide: function (c) { return vector(this._x / c, this._y / c); },		normalize: function() {			var m = this.magnitude();			if (m > 0) {				return this.divide(m);			}			return this;		},		clamp: function (max) {			if (this.magnitude() > max) {				return this.normalize().multiply(max);			}					return this;		},		toString: function () {			return 'Vector(x:' + this._x + ',y:' + this._y + ')';		}	};}