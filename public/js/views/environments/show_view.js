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
      this.apiViews = {};
      this.addApi();
      this.listenTo(this.model, 'change:api', this.addApi);

      Pouch(this.model.get('dbname'), function(err, db) {
        this.db = db;
        this.db.allDocs({ include_docs: true }, function(err, response) {
          this.docView = new PouchVision.Views.DocIndexView({ collection: response.rows });
          this.render();
        }.bind(this));
      }.bind(this))
    },

    events: {
      'change .api' : 'changeApi',
      'click .execute': 'execute'
    },

    changeApi: function(e) {
      var apiName = $(e.currentTarget).val()
      this.model.set('api', apiName);

      this.render();

    },

    callback: function(err, response) {
      this.model.set('response', JSON.stringify(response, null, ' '));
    },

    execute: function() {

      var apiName = this.model.get('api');
      var api = this.apis.findWhere({ name: apiName });

      var parsedParameters = api.get('parameters').map(function(parameter) {
        var parsedParameter;
        if (parameter.type === PouchVision.Types.JSON) {
          parsedParameter = {};
          parameter.data.forEach(function(datum) {
            // TODO: Add type validation
            parsedParameter[datum.name] = datum.value;
          });
        } else if (parameter.type === PouchVision.Types.STRING) {
          parsedParameter = parameter.data;
        }

        return parsedParameter;

      }).filter(function(parameter) {
        return parameter !== undefined;
      });


      console.log(parsedParameters);
      parsedParameters.push(this.callback.bind(this))

      this.db[apiName].apply(this, parsedParameters);
      window.router.navigate('/#', { trigger: true });
    },

    addApi: function() {
      if (this.apiViews[this.model.get('api')]) {
        return;
      }

      var apiModel = this.apis.findWhere({
        'name': this.model.get('api')
      });

      this.apiViews[this.model.get('api')] = new PouchVision.Views.ApiView(
        {
          model: apiModel,
        }
      );
    },

    render: function() {
      console.log(this.apis.toJSON());
      this.$el.html(this.template({ model: this.model.toJSON(), apis: this.apis.toJSON() }));

      this.$el.find('.parameters').html(this.apiViews[this.model.get('api')].render().el);

      // Rebind events for existing view that is shown again
      this.apiViews[this.model.get('api')].delegateEvents();
      this.$el.find('.docs').html(this.docView.render().el);

      return this;
    }

  })

  return PouchVision;
});
