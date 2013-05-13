define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'inspector_json',
  'pouchvision',
], function($, _, Backbone, InspectorJSON, PouchVision){
  PouchVision.Views.DocView = Backbone.View.extend({

    template: JST['doc/doc'],

    tagName: 'div',

    className: 'vision-doc-container',

    initialize: function(options) {
      this.dragImg = document.createElement("img");
      this.dragImg.src = '/img/doc.png';
    },

    events: {
      'dragstart .vision-doc': 'onDragStart',
      'click .vision-doc' : 'onClick'
    },

    onDragStart: function(e) {
      console.log('Document dragging started');
      e.originalEvent.dataTransfer.effectAllowed = 'move';
      e.originalEvent.dataTransfer.setData('text/plain',
          JSON.stringify(this.model.get('doc'), null, ' '));
      e.originalEvent.dataTransfer.setDragImage(this.dragImg, 0, 0);
    },

    onClick: function(e) {
      var $popup = this.$el.find('.vision-popup-container');
      var $doc = this.$el.find('.vision-doc');
      $popup.toggleClass('gone');
      var position = $doc.position();
      position.top += $doc.height();
      $popup.css(position);
      $doc.toggleClass('selected');
    },

    render: function() {

      var color = (Math.abs(this.model.get('id').hashCode() % 0xFFFFFF)).toString(16);

      while (color.length < 6) { color += '0' }

      this.$el.html(this.template({ title: 'Document' }));

      var visionDoc = this.$el.find('.vision-doc');
      visionDoc.attr('draggable', true);
      visionDoc.find('.vision-doc-color').css('background-color', '#' + color);

      if (this.inspector)
        this.inspector.destroy();
      this.inspector = new InspectorJSON({
        element: this.$el.find('.vision-popup')
      })
      this.inspector.view(JSON.stringify(this.model.toJSON(), null, ' '));

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






