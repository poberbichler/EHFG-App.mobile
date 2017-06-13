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

  global.toolbox.router.get(/.*execute-api.eu-central-1.amazonaws.com\/prod\/.*sessions$/, global.toolbox.cacheFirst, {
    cache: {
      name: "org.ehfg.app.sessions",
      maxAgeSeconds: 60 * 60
    }
  });

  global.toolbox.router.get(/https?:\/\/pbs.twimg.com\/profile_images\/.*(\.jpe?g|png)$/, global.toolbox.cacheFirst, {
    cache: {
      name: "org.ehfg.app.twitter.images"
    }
  });

  global.toolbox.router.default = global.toolbox.networkFirst;
})(self);
