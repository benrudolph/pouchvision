define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.DocView = Backbone.View.extend({

    template: JST['doc/doc'],

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(this.template(this.model));
      return this;
    },

  })

  return PouchVision;
});






