define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.EnvironmentIndexView = Backbone.View.extend({
    el: "#pouch-vision",

    template: JST['environment/index'],

    events: {
      'click .static-execute' : 'execute'
    },

    initialize: function(options) {
      console.log("starting...")
      this.apis = options.apis;
      this.statics = options.statics;
      this.staticResponse = {}

      this.staticView = new PouchVision.Views.ApiView({
        model: _.extend({}, this.statics.at(0))
      });

      this.render();
      this.addAll();
    },

    callback: function(err, response) {
      this.staticResponse = response;
      this.inspector = new InspectorJSON({
          element: this.$el.find('.static-response')
      });
      this.inspector.view(JSON.stringify(this.staticResponse));
    },

    execute: function() {
      var staticName = this.staticView.model.get('name');
      var static = this.statics.findWhere({ name: staticName });

      var parsedParameters = PouchVision.util.parseParameters(static.get('parameters'));

      parsedParameters.push(this.callback.bind(this));
      Pouch[staticName].apply(this, parsedParameters);
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.find('.static').html(this.staticView.render().el);
      return this;
    },

    addAll: function() {
      this.collection.forEach(this.addOne, this);
    },

    addOne: function(model) {
      var view = new PouchVision.Views.EnvironmentShowView({
        el: model.get('el'),
        model: _.extend({}, model),
        apis: _.extend({}, this.apis)
      });
    }

  })

  return PouchVision;
});




