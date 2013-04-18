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
      'click .add-new-field' : 'onAddNewField',
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
        if ($param.hasClass(p.name) && $target.hasClass('option-value')) {
          p.data[idx] = p.data[idx] === undefined ? {} : p.data[idx];
          p.data[idx].value = $target.val();
        } else if ($param.hasClass(p.name) && $target.hasClass('option-name')) {
          p.data[idx] = p.data[idx] === undefined ? {} : p.data[idx];
          p.data[idx].name = $target.val();
        }
        return p;
      });

      console.log(parameters)
      this.model.set('parameters', parameters);
    },

    onAddNewField: function(e) {
      $(e.target).closest('.json').find('.json-data').append(window.JST['parameter/json-new-field']());
    },

    onParameterClick: function(e) {
      var parameter = this.model.get('parameters').filter(function(parameter) {
        return parameter.name === $(e.target).text();
      })[0];

      this.showParameterDetails(parameter);
    },

    showParameterDetails: function(parameter) {
      var $param = this.$el.find('.' + parameter.name);

      $param.html(window.JST['parameter/' + parameter.type](parameter));
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this
    }
  })

  return PouchVision;
});



