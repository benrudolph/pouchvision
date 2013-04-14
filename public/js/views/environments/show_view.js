define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.EnvironmentShowView = Backbone.View.extend({

    template: JST['environment/show'],

    initialize: function(options) {
      this.apis = options.apis;

      Pouch('idb://' + this.model.dbname, function(err, db) {
        this.db = db;
        this.render();
      }.bind(this))
    },

    events: {
      'change .api' : 'changeApi'
    },

    changeApi: function(e) {
      this.model.set('api', $(e.currentTarget).val());
    },

    execute: function(e) {

      var api = this.$el.find('.api').val()
      var args = [JSON.parse(this.$el.find('.args').val())]
      args.push(function(err, response) {
        alert(response)
      })

      this.db[api].apply(this, args)
    },

    addApi: function() {
      this.apiView = new PouchVision.Views.ApiView(
        {
          model: this.apis.findWhere({
            'name': this.model.get('api')
          }),
          el: this.$el.find('.options')
        }
      );
      this.apiView.render();
    },

    render: function() {
      this.$el.html(this.template({ model: this.model, apis: this.apis.toJSON() }));
      this.addApi();
      return this;
    }

  })

  return PouchVision;
});
