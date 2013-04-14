define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.ApiView = Backbone.View.extend({
    template: window.JST['api/api'],

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
    }
  })

  return PouchVision;
});



