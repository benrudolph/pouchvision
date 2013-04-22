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
      'keyup .option-input' : 'onInput'
    },

    initialize: function(options) {
      this.cm = {};
    },

    onInput: function(e) {
      var $target = $(e.target)
      var $parent = $target.parent();
      var $param = $parent.closest('.parameter');
      var idx = $parent.index();
      var parameters = this.model.get('parameters')

      // Finds matching parameter and adds value to the specified option
      parameters = parameters.map(function(p) {
        if (p.type === PouchVision.Types.JSON) {
          p.data[idx] = p.data[idx] === undefined ? {} : p.data[idx];
          if ($param.hasClass(p.name) && $target.hasClass('option-value')) {
            p.data[idx].value = $target.val();
          } else if ($param.hasClass(p.name) && $target.hasClass('option-name')) {
            p.data[idx].name = $target.val();
          }
        } else if (p.type === PouchVision.Types.STRING) {
          if ($param.hasClass(p.name)) {
            p.data = $target.val();
          }
        }
        return p;
      });

      console.log(parameters)
      this.model.set('parameters', parameters);
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
        this.cm[parameter.name] = CodeMirror.fromTextArea($param.find("textarea")[0], {
            lineNumbers: true,
            tabSize: 4,
            autofocus: true,
            styleActiveLine: true,
            lineWrapping: true,
            mode: "text/json"
        });
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


      var json = this.cm[parameter.name].getValue().trim();
      try {
        if (!json || json[0] !== '{' ||
          json[json.length-1] !== '}' ||
          (json = PouchVision.util.parseJSON(json)) === false) {
            throw("Not a valid object");
          }
      } catch (err) {
          console.error(err);
      }

      parameter.data = json;

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



