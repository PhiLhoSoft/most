/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @module */

var Stream = require('../Stream');
var identity = require('../base').identity;

var Yield = Stream.Yield;

/**
 * Build a stream by unfolding steps from a seed value
 * @param {function(x:*):Step} f
 * @param {*} x seed value
 * @returns {Stream} stream containing all items
 */
exports.unfold = function(f, x) {
	return new Stream(f, x);
};

/**
 * Build a stream by iteratively calling f
 * @param {function(x:*):*} f
 * @param {*} x initial value
 * @returns {Stream}
 */
exports.iterate = iterate;

function iterate(f, x) {
	var scheduler = Stream.getDefaultScheduler();
	return new Stream(function(x) {
		return new Yield(scheduler.now(), x, f(x));
	}, x);
}

/**
 * Create an infinite stream of xs
 * @param {*} x
 * @returns {Stream} infinite stream where all items are x
 */
exports.repeat = function(x) {
	return iterate(identity, x);
};