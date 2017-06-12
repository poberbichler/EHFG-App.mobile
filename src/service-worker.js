(global => {
  importScripts("./build/sw-toolbox.js");

  global.toolbox.options.debug = true;
  global.toolbox.options.cache.name = "org.ehfg.app";

  global.toolbox.router.get(/.*execute-api.eu-central-1.amazonaws.com\/prod\/.*speakers$/, global.toolbox.cacheFirst, {
    cache: {
      name: "org.ehfg.app.speakers",
      maxAgeSeconds: 60 * 60
    }
  });

  global.toolbox.router.any(/.*execute-api.eu-central-1.amazonaws.com\/prod\/.*sessions$/, global.toolbox.cacheFirst, {
    cache: {
      name: "org.ehfg.app.sessions",
      maxAgeSeconds: 60 * 60
    }
  });

  global.toolbox.router.default = global.toolbox.networkFirst;
})(self);
