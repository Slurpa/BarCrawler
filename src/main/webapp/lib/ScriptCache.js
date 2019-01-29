let counter = 0;
let scriptMap = typeof window !== 'undefined' && window._scriptMap || new Map();
const window = require('./windowOrGlobal');

export const ScriptCache = (function(global) {
    global._scriptMap = global._scriptMap ||scriptMap;
    return function ScriptCache(scripts) {
        const Cache = {};

        Cache._onLoad = function(key) {
            return (cb) => {
                let registered = true;

                function unregister() {
                    registered = false;
                }

                let stored = scriptMap.get(key);

                if (stored) {
                    stored.promise.then(() => {
                        if (registered) {
                            stored.error ? cb(stored.error) : cb(null, stored)
                        }

                        return stored;
                    });
                }
                return unregister;
            }
        }

        Cache._scriptTag = (key, src) => {
            if (!scriptMap.has(key)) {
                //If environment doesnt have access to 'document' just return null
                if (typeof document === 'undefined') {
                    return null;
                }

                let tag = document.createElement('script');
                let promise = new Promise((resolve, reject) => {
                    let resolved = false;
                    let errored = false;
                    let body = document.getElementsByTagName('body')[0];

                    tag.type = 'text/javascript';
                    tag.async = false; //Load tags in order

                    const cbName = `loaderCB${counter++}${Date.now()}`;//callbackName
                    let cb;

                    let handleResult = (state) => {
                        return (event) => {
                            let stored = scriptMap.get(key);
                            if (state === 'loaded') {
                                stored.resolved = true;
                                resolve(src);
                            }
                            else if (state === 'error') {
                                stored.errored = true;
                                reject(event);
                            }
                            stored.loaded = true;

                            cleanup();
                        }
                    }

                    const cleanup = () => {
                        if(global[cbName] && typeof global[cbName] === 'function') {
                            global[cbName] = null;
                            delete global[cbName];
                        }
                    }

                    tag.onload = handleResult('loaded');
                    tag.onerror = handleResult('error');
                    tag.onreadystatechange = () => {
                        handleResult(tag.readyState)
                    }

                    //Pick off callback
                    if(src.match(/callback=CALLBACK_NAME/)) {
                        const regex = /(callback=)[^\&]+/;
                        src = src.replace(regex, `$1${cbName}`);
                        cb = window[cbName] = tag.onload;
                    }
                    else {
                        tag.addEventListener('load', tag.onload);
                    }
                    tag.addEventListener('error', tag.onerror);

                    tag.src = src;
                    body.appendChild(tag);
                    return tag;
                });
                let initialState = {
                    loaded: false,
                    error: false,
                    promise: promise,
                    tag
                }
                scriptMap.set(key, initialState);
            }
            return scriptMap.get(key);
        }

        Object.keys(scripts).forEach(function(key) {
            const script = scripts[key];

            const tag = window._scriptMap.has(key) ? window._scriptMap.get(key).tag : Cache._scriptTag(key, script);

            Cache[key] = {
                tag: tag,
                onLoad: Cache._onLoad(key),
            }
        });

        return Cache;
    }
})(window);

export default ScriptCache;