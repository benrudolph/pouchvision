define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.DocIndexView = Backbone.View.extend({

    template: JST['doc/index'],

    initialize: function(options) {
      console.log("initing docs...")
      this.collection.comparator = function(doc) {
        return doc.get("id");
      };
    },

    render: function() {
      this.$el.html(this.template());
      this.addAll();
      return this;
    },

    addAll: function() {
      this.collection.forEach(this.addOne, this);
    },

    addOne: function(model) {
      var view = new PouchVision.Views.DocView({
        model: model,
        collection: this.collection
      });
      this.$el.append(view.render().el);
    }

  })

  return PouchVision;
});





