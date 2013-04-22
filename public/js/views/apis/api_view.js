define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision',
  'javascript'
], function($, _, Backbone, PouchVision, CodeMirror){
  PouchVision.Views.ApiView = Backbone.View.extend({
    template: window.JST['api/api'],

    events: {
      'click .parameter-data' : 'onParameterClick',
      'click .code-edit-save' : 'onSave',
      'click .code-edit-cancel' : 'onCancel',
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

    onParameterClick: function(e) {
      var parameter = this.model.get('parameters').filter(function(parameter) {
        return parameter.name === $(e.target).text();
      })[0];

      var $param = this.$el.find('.' + parameter.name);

      if ($param.find('.' + parameter.type).hasClass('gone')) {
        this.showParameterDetails(parameter);
      } else {
        this.hideParameterDetails(parameter, true);
      }
    },

    showParameterDetails: function(parameter) {
      var $param = this.$el.find('.' + parameter.name);
      var parameters;

      // If codemirror is already showing then just return
      $param.find('.' + parameter.type).removeClass('gone');


      if (parameter.type === PouchVision.Types.JSON && !this.cm[parameter.name]) {
        this.cm[parameter.name] = CodeMirror.fromTextArea($param.find("textarea")[0],
            $.extend(this.cmOptions, { mode: 'application/json' }));
      } else if (parameter.type === PouchVision.Types.STRING && !this.cm[parameter.name]) {
        this.cm[parameter.name] = CodeMirror.fromTextArea($param.find("textarea")[0],
            $.extend(this.cmOptions, { mode: 'text/plain' }));
      }
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
          if (!value || value[0] !== '{' ||
            value[value.length-1] !== '}' ||
            (value = PouchVision.util.parseJSON(value)) === false) {
              throw("Not a valid object");
            }
        } catch (err) {
            console.error(err);
        }
      } else if (parameter.type === PouchVision.Types.STRING) {
        try {
          if (!value) throw("Not a valid string");
          if (value[0] === '"' && value[value.length - 1] === '"') {
            value = value.substring(1, value.length - 1);
          }
        } catch(err) {
          console.log(err);
        }
        console.log(value)
      }

      parameter.data = value;

      var parameters = this.model.get('parameters').map(function(p) {
        if (p.name === parameter.name) {
          p = parameter;
        }
        return p;
      })
      this.model.set('parameters', parameters);

    },

    hideParameterDetails: function(parameter, save) {
      var $param = this.$el.find('.' + parameter.name);
      $param.find('.' + parameter.type).addClass('gone');
      if (save)
        this.save(parameter);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this
    }
  })

  return PouchVision;
});



