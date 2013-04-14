define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.EnvironmentIndexView = Backbone.View.extend({
    el: "#pouch-vision",

    template: JST['environment/index'],

    initialize: function(options) {
      console.log("starting...")
      this.apis = options.apis;
      this.render();
      this.addAll();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    addAll: function() {
      this.collection.forEach(this.addOne, this);
    },

    addOne: function(model) {
      var view = new PouchVision.Views.EnvironmentShowView({
        el: model.get('el'),
        model: model,
        apis: this.apis
      });
      this.$el.append(view.render().el);
    }

  })

  return PouchVision;
});




