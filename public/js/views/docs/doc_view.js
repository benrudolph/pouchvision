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

    className: 'vision-doc',

    initialize: function(options) {
    },

    events: {
      'dragstart': 'onDragStart'
    },

    onDragStart: function(e) {
      console.log('Document dragging started');
      e.originalEvent.dataTransfer.effectAllowed = 'move';
      e.originalEvent.dataTransfer.setData('text/plain',
          JSON.stringify(this.model.get('doc'), null, ' '));
    },

    render: function() {

      var color = (Math.abs(this.model.get('id').hashCode() % 0xFFFFFF)).toString(16);

      while (color.length < 6) { color += '0' }

      this.model.set('color', color);
      this.$el.html(this.template());
      this.$el.attr('draggable', true);
      this.$el.css('background-color', '#' + this.model.get('color'));


      this.$el.popover({
        title: 'Document',
        content: JSON.stringify(this.model, null, ' '),
        placement: 'top'
      })
      return this;
    },

  })

  String.prototype.hashCode = function(){
      var hash = 0;
      if (this.length == 0) return hash;
      for (i = 0; i < this.length; i++) {
          char = this.charCodeAt(i);
          hash = ((hash<<5)-hash)+char;
          hash = hash & hash; // Convert to 32bit integer
      }
      return hash;
  }


  return PouchVision;
});






