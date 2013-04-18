define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision',
  'bootstrap'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.DocView = Backbone.View.extend({

    template: JST['doc/doc'],

    tagName: 'div',

    className: 'doc',

    initialize: function(options) {
    },

    render: function() {
      this.$el.html(this.template());

      this.$el.popover({
        title: 'Document',
        content: JSON.stringify(this.model, null, ' '),
        placement: 'top'
      })
      return this;
    },

  })

  return PouchVision;
});






