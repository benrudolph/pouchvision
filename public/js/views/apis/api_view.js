define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision',
  'javascript',
], function($, _, Backbone, PouchVision, CodeMirror){
  PouchVision.Views.ApiView = Backbone.View.extend({
    template: window.JST['api/api'],

    events: {
      'click .parameter-data' : 'onParameterClick',
      'click .code-edit-save' : 'onSave',
      'click .code-edit-cancel' : 'onCancel',
      'dragenter .parameter.doc, .parameter.docid, .parameter.rev' : 'onDragenter',
      'dragover .parameter.doc, .parameter.docid, .parameter.rev' : 'onDragover',
      'dragleave .parameter.doc, .parameter.docid, .parameter.rev' : 'onDragleave',
      'drop .parameter.doc, .parameter.docid, .parameter.rev' : 'onDrop'
    },

    initialize: function(options) {
      this.cm = {};
      this.cmOptions = {
        lineNumbers: true,
        tabSize: 2,
        autofocus: true,
        styleActiveLine: true,
        lineWrapping: true,
      }
    },

    onDrop: function(e) {
      console.log('dropped');
      e.preventDefault(); // Necessary. Allows us to drop.

      $target = $(e.target);
      $target.removeClass('over');

      var value;
      var parameter = this.model.get('parameters').filter(function(parameter) {
        return parameter.name === $target.text();
      })[0];

      if ($target.find('.' + parameter.type).hasClass('gone')) {
        console.log('hmm...')
      } else {
        value = JSON.parse(e.originalEvent.dataTransfer.getData('text/plain'));
        if ($(e.currentTarget).hasClass('docid')) {
          value = value._id;
        } else if ($(e.currentTarget).hasClass('rev')) {
          value = value._rev;
        }
        this.showParameterDetails(parameter, JSON.stringify(value, null, ' '));
      }


    },

    onDragenter: function(e) {
      console.log('entering');
      $(e.target).addClass('over');

    },

    onDragleave: function(e) {
      console.log('leaving');
      $(e.target).removeClass('over');
    },

    onDragover: function(e) {
      console.log('over')
      if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
      }

      return false;
    },

    onParameterClick: function(e) {
      var parameter = this.model.get('parameters').filter(function(parameter) {
        return parameter.name === $(e.target).text();
      })[0];

      var $param = this.$el.find('.' + parameter.name);

      if ($param.find('.' + parameter.type).hasClass('gone')) {
        this.showParameterDetails(parameter,
            JSON.stringify(parameter.defaults, null, ' '));
      } else {
        this.hideParameterDetails(parameter, true);
      }
    },

    showParameterDetails: function(parameter, value) {
      var $param = this.$el.find('.' + parameter.name);
      var parameters;
      var mode;
      var pos;

      // If codemirror is already showing then just return
      $param.find('.' + parameter.type).removeClass('gone');

      if ((parameter.type === PouchVision.Types.JSON ||
            parameter.type === PouchVision.Types.ARRAY)) {
        mode = 'application/json';
        pos = { line: 1, ch: 1 };
      } else if (parameter.type === PouchVision.Types.STRING) {
        mode = 'text/plain';
        pos = { line: 0, ch: 1 };
      } else if (parameter.type === PouchVision.Types.ATTACHMENT) {
        mode = 'text/javascript';
        pos = { line: 0, ch: 10 };
      }

      if (this.$el.find('.parameter.' + parameter.name + ' .CodeMirror').length === 0) {
        this.cm[parameter.name] = CodeMirror.fromTextArea($param.find("textarea")[0],
            $.extend(this.cmOptions, {
              mode: mode,
            }));
      }
      this.cm[parameter.name].setCursor(pos);
      if (value)
        this.cm[parameter.name].setValue(value);

    },

    onSave: function(e) {
      var parameter = this.model.get('parameters').filter(function(parameter) {
        return parameter.name === $(e.target).parent().data('name');
      })[0];

      this.hideParameterDetails(parameter, true);
    },

    onCancel: function(e) {
      var parameter = this.model.get('parameters').filter(function(parameter) {
        return parameter.name === $(e.target).parent().data('name');
      })[0];
      this.hideParameterDetails(parameter, false);
    },

    save: function(parameter) {
      console.log('save');
      console.log(this.cm[parameter.name].getValue());


      var value = this.cm[parameter.name].getValue().trim();
      if (parameter.type === PouchVision.Types.JSON) {
        try {
          if (!value || value[0] !== '{' || value[value.length-1] !== '}' ||
            (value = PouchVision.util.parseJSON(value)) === false) {
              throw("Not a valid object");
              return false;
            }
        } catch (err) {
            console.error(err);
              return false;
        }
      } else if (parameter.type === PouchVision.Types.ARRAY) {
        try {
          if (!value || value[0] !== '[' || value[value.length-1] !== ']' ||
            (value = PouchVision.util.parseJSON(value)) === false) {
              throw("Not a valid array");
              return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }

      } else if (parameter.type === PouchVision.Types.STRING) {
        try {
          if (!value) throw("Not a valid string");
          if (value[0] === '"' && value[value.length - 1] === '"') {
            value = value.substring(1, value.length - 1);
          }
        } catch(err) {
          console.log(err);
          return false;
        }
        console.log(value)
      } else if (parameter.type === PouchVision.Types.ATTACHMENT) {
        try {
          if (!value) throw("Not a valid attachment");
          value = eval(value);
          if (value.toString() !== '[object Blob]') throw("Not a valid attachment");
        } catch(err) {
          console.log(err);
          return false;
        }
        console.log(value);
      }

      parameter.data = value;

      var parameters = this.model.get('parameters').map(function(p) {
        if (p.name === parameter.name) {
          p = parameter;
        }
        return p;
      })
      this.model.set('parameters', parameters);

      return true;

    },

    hideParameterDetails: function(parameter, save) {
      var $param = this.$el.find('.' + parameter.name);
      $param.find('.' + parameter.type).addClass('gone');
      var success;

      if (save) {
        success = this.save(parameter);
        this.flashParam($param, success);
      }
    },

    flashParam: function($param, success) {
      var color = success ? '#43ce43' : '#d01129';
      var speed = 100;
      $param.animate({
        'background-color': color
      }, speed, function() {
        $param.animate({
          'background-color': 'white'
        }, speed)
      });

    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this
    }
  })

  return PouchVision;
});



