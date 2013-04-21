define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.ApiView = Backbone.View.extend({
    template: window.JST['api/api'],

    events: {
      'click .parameter-data' : 'onParameterClick',
      'keyup .option-input' : 'onInput'
    },

    initialize: function(options) {
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

      this.showParameterDetails(parameter);
    },

    showParameterDetails: function(parameter) {
      var $param = this.$el.find('.' + parameter.name);
      var parameters;

      if  (parameter.type === PouchVision.Types.JSON) {
        parameter.data = new InspectorJSON({
          element: $param,
          contenteditable: true,
        })

        parameters = this.model.get('parameters').map(function(p) {
          if (p.name === parameter.name) {
            return parameter;
          }
          return p;
        });
        this.model.set('parameters', parameters);

        parameter.data.view({ });
      } else {
        $param.html(window.JST['parameter/' + parameter.type](parameter));
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this
    }
  })

  return PouchVision;
});



