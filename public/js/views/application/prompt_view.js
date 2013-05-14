define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.ApplicationPromptView = Backbone.View.extend({

    className: 'addpouch-prompt',

    template: JST['application/prompt'],

    events: {
      'click .cancel' : 'onCancel',
      'click .ok' : 'onOk'
    },

    initialize: function(options) {
      this.callback = options.callback;
      this.render();
    },

    onOk: function(e) {
      var name = this.$el.find('.addpouch-form .addpouch-name').val();
      var isHttp = this.$el.find('.addpouch-form .addpouch-ishttp')[0].checked;

      this.callback(name, isHttp);
      this.close();
    },

    onCancel: function(e) {
      this.close();
    },

    close: function() {
      this.unbind();
      this.$el.remove();
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.css('left', ($(document).width() / 2) - (this.$el.width() / 2));
      return this;
    }
  })

  return PouchVision;
});

