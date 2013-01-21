require.config({
  paths: {
    'jquery': 'libs/jquery',
    'underscore': 'libs/underscore',
    'd3': 'libs/d3.v3',
    'app': 'src/app',
    'templates': 'templates/template',
    'pouch': 'libs/pouch'
  },
  shim: {
    'underscore': {
      deps: [],
      exports: '_'
    },
    'pouch': {
      deps: [],
      exports: 'Pouch'
    },
    'd3': {
      deps: [],
      exports: 'd3'
    }
  }
});

require(['app'], function(PouchVision) {
  PouchVision.start()
});
