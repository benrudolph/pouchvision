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
          api: 'post',
          response: {}
        },
        {
          dbname: 'env-right',
          api: 'post',
          response: {}
        }
      ])

      this.apis = new PouchVision.Collections.ApisCollection();
      this.apis.reset(PouchVision.Apis)

      this.statics = new PouchVision.Collections.StaticsCollection();
      this.statics.reset(PouchVision.Statics)
    },

    routes: {
      '' : 'index',
      '*default' : 'index'

    },

    index: function() {
      this.dbView = new PouchVision.Views.EnvironmentIndexView({
        collection: this.dbs,
        apis: this.apis,
        statics: this.statics
      })
    },
  })

});

