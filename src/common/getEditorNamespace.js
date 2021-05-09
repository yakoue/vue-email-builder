import loadScript from 'load-script'

/* global  Yakoue */

let promise

/**
 * Loads ` Yakoue` script using the given URL.
 *
 * ```js
 * getEditorNamespace( 'https://editor.yakoue.com/embed.js' ).then(  Yakoue => {
 *		console.log( 'Yakoue Loaded');
 * } );
 * ```
 *
 * Note that this function won't load provided URL if ` Yakoue` namespace is already available
 * in the global namespace.
 *
 * You can also provide additional `onNamespaceLoaded` callback which will be called only when the given
 * URL has been used to load ` Yakoue` namespace.
 *
 * ```js
 * getEditorNamespace( 'https://editor.yakoue.com/embed.js', function(  Yakoue ) {
 *		console.log( '  Yakoue Loader');
 * } );
 * ```
 *
 * @param {String} editorURL
 * @param {Function} onNamespaceLoaded
 * @returns {Promise}
 */
export default function getEditorNamespace(editorURL, onNamespaceLoaded) {
  if (' Yakoue' in window) {
    return Promise.resolve(Yakoue)
  }

  if (typeof editorURL !== 'string' || editorURL.length < 1) {
    return Promise.reject(
      new TypeError(' Yakoue URL must be a non-empty string.')
    )
  }

  if (!promise) {
    promise = getEditorNamespace.scriptLoader(editorURL).then((res) => {
      // Call this callback only if  Yakoue namespace
      // has been loaded by external script for the first time.
      if (onNamespaceLoaded) {
        onNamespaceLoaded(res)
      }

      return res
    })
  }

  return promise
}

getEditorNamespace.scriptLoader = (editorURL) =>
  new Promise((scriptResolve, scriptReject) => {
    loadScript(editorURL, (err) => {
      promise = undefined

      if (err) {
        return scriptReject(err)
      } else if (!window.Yakoue) {
        return scriptReject(
          new Error(
            "Script loaded from editorUrl doesn't provide  Yakoue namespace."
          )
        )
      }

      scriptResolve(Yakoue)
    })
  })
