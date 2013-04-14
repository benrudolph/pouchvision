require.config({
  paths: {
    'jquery': 'libs/jquery',
    'backbone': 'libs/backbone',
    'underscore': 'libs/underscore',
    'd3': 'libs/d3.v3',
    'app': 'src/app',
    'templates': 'templates/template',
    'pouch': 'libs/pouch',
    'boostrap': 'libs/bootstrap',
    'pouchvision': 'src/pouchvision'
  },
  shim: {
    'underscore': {
      deps: [],
      exports: '_'
    },
    'pouchvision': {
      deps: [],
      exports: 'PouchVision'
    },
    'pouch': {
      deps: [],
      exports: 'Pouch'
    },
    'd3': {
      deps: [],
      exports: 'd3'
    },
    'bootstrap': {
      deps: ['jquery'],
      exports: 'bootstrap'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require(['app'], function(PouchVision) {
  window.router = new PouchVision.Routers.MainRouter();
  Backbone.history.start();
});
