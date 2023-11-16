/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-3576cac3'], (function (workbox) { 'use strict';

  importScripts();
  self.skipWaiting();
  workbox.clientsClaim();
  workbox.registerRoute("/", new workbox.NetworkFirst({
    "cacheName": "start-url",
    plugins: [{
      cacheWillUpdate: async ({
        request,
        response,
        event,
        state
      }) => {
        if (response && response.type === 'opaqueredirect') {
          return new Response(response.body, {
            status: 200,
            statusText: 'OK',
            headers: response.headers
          });
        }
        return response;
      }
    }]
  }), 'GET');
  workbox.registerRoute(/.*/i, new workbox.NetworkOnly({
    "cacheName": "dev",
    plugins: []
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
const CACHE_NAME = 'my-app-cache-v2';

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME)
          .then(cache => cache.addAll([
            '/index.html',
            '/styles.css',
            '/script.js',
            // Добавьте другие файлы вашего приложения, которые должны быть закэшированы
          ]))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys()
          .then(cacheNames => {
            return Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
          })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
      caches.match(event.request)
          .then(response => {
            if (response) {
              // Возвращаем закэшированный ресурс
              return response;
            }

            // Клонируем запрос, так как он может быть использован только один раз
            const requestClone = event.request.clone();

            return fetch(requestClone)
                .then(response => {
                  if (!response || response.status !== 200 || response.type !== 'basic') {
                    // Ответ не является успешным, просто его возвращаем
                    return response;
                  }

                  // Клонируем ответ, так как он может быть использован только один раз
                  const responseClone = response.clone();

                  // Открываем кэш и сохраняем в него полученный ресурс
                  caches.open(CACHE_NAME)
                      .then(cache => {
                        cache.put(event.request, responseClone);
                      });

                  return response;
                });
          })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'CHECK_FOR_UPDATES') {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
              return cache.match('/index.html')
                  .then(response => {
                    return fetch('/index.html')
                        .then(newResponse => {
                          if (response.headers.get('last-modified') !== newResponse.headers.get('last-modified')) {
                            // Кэш устарел, обновляем приложение
                            cache.put('/index.html', newResponse.clone());
                            self.clients.matchAll()
                                .then(clients => {
                                  clients.forEach(client => {
                                    client.postMessage({ type: 'UPDATE_AVAILABLE' });
                                  });
                                });
                          }
                        });
                  });
            })
    );
  }
});