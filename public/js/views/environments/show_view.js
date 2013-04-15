define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.EnvironmentShowView = Backbone.View.extend({

    template: JST['environment/show'],

    initialize: function(options) {
      this.apis = options.apis;

      Pouch('idb://' + this.model.dbname, function(err, db) {
        this.db = db;
        this.render();
      }.bind(this))
    },

    events: {
      'change .api' : 'changeApi',
      'click .execute': 'execute'
    },

    changeApi: function(e) {
      this.model.set('api', $(e.currentTarget).val());
    },

    execute: function() {

      var apiName = this.model.get('api');
      var api = this.apis.findWhere({ name: apiName });

      var parsedParameters = api.get('parameters').map(function(parameter) {
        var parsedParameter;
        if (parameter.type === 'json') {
          parsedParameter = {};
          parameter.data.forEach(function(datum) {
            // TODO: Add type validation
            parsedParameter[datum.name] = datum.value;
          });
        }

        return parsedParameter;

      }).filter(function(parameter) {
        return parameter !== undefined;
      });


      console.log(parsedParameters);
      this.db[apiName].apply(this, parsedParameters)
    },

    addApi: function() {
      this.apiView = new PouchVision.Views.ApiView(
        {
          model: this.apis.findWhere({
            'name': this.model.get('api')
          }),
          el: this.$el.find('.parameters')
        }
      );
      this.apiView.render();
    },

    render: function() {
      this.$el.html(this.template({ model: this.model, apis: this.apis.toJSON() }));
      this.addApi();
      return this;
    }

  })

  return PouchVision;
});
