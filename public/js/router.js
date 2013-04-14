define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Routers.MainRouter = Backbone.Router.extend({
    initialize: function() {
      this.dbs = new PouchVision.Collections.EnvironmentsCollection();
      this.dbs.reset([
        {
          dbname: 'env-left',
          el: '#environment-left',
          api: 'get'
        },
        {
          dbname: 'env-right',
          el: '#environment-right',
          api: 'post'
        }
      ])

      this.apis = new PouchVision.Collections.ApisCollection();
      this.apis.reset(PouchVision.Apis)
    },

    routes: {
      '' : 'index',
      'post' : 'post',
      'get' : 'get'
    },

    index: function() {
      this.dbView = new PouchVision.Views.EnvironmentIndexView({
        collection: this.dbs,
        apis: this.apis
      })
    },

    post: function() { },

    get: function() { },
  })

});

