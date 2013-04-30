define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Routers.MainRouter = Backbone.Router.extend({
    initialize: function() {
      this.dbs = new PouchVision.Collections.EnvironmentsCollection();

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
      Pouch.allDbs(function(err, response) {
        if (err) {
          console.err(err);
        }

        var dbs = [];
        var defaultDbs = [ 'jamesdean', 'einstein' ];

        response = _.union(response, defaultDbs);

        response.forEach(function(dbname) {
          dbs.push({
            dbname: dbname,
            api: 'post',
            response: {}
          })
        });

        this.dbs.reset(dbs)
        this.dbView = new PouchVision.Views.EnvironmentIndexView({
          collection: this.dbs,
          apis: this.apis,
          statics: this.statics,
          model: new PouchVision.Models.Environment({
            staticApi: 'replicate'
          })
        })

      }.bind(this))

    },
  })

});

