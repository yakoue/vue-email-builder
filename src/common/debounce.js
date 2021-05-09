/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * Debounces the given function execution based on the given delay in ms.
 *
 * ```js
 * const greeting = debounce( function( msg ) {
 *		console.log( msg );
 * }, 100 );
 *
 * greeting( 'foo' );
 * greeting( 'bar' );
 * greeting( 'baz' );
 *
 * // Logs only `baz` after 100 ms.
 * ```
 * @param {Function} fn
 * @param {Number} delay Delay in milliseconds.
 * @param {Object} [context] Context object used as `this` for the given function.
 */
function debounce(fn, delay, context = {}) {
  let cancel

  return function (...args) {
    clearTimeout(cancel)
    cancel = setTimeout(fn.bind(context, ...args), delay)
  }
}

export default debounce
