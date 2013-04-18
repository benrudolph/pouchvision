define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.StaticView = Backbone.View.extend({
    template: JST['static/static'],

    initialize: function() { },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});

