define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'inspector_json',
  'pouchvision',
], function($, _, Backbone, InspectorJSON, PouchVision) {
  PouchVision.Views.EnvironmentShowView = Backbone.View.extend({

    tagName: 'div',

    className: 'pouch',

    template: JST['environment/show'],

    initialize: function(options) {
      this.apis = options.apis;
      this.apiViews = {};
      this.addApi();
      this.listenTo(this.model, 'change:api', this.addApi);

      Pouch(this.model.get('dbname'), function(err, db) {
        if (err) {
          console.error(err);
          return;
        }
        this.db = db;
        this.db.allDocs({ include_docs: true }, function(err, response) {
          this.docCollection = new PouchVision.Collections.DocsCollection();
          this.docCollection.reset(response.rows);

          this.docView = new PouchVision.Views.DocIndexView({ collection: this.docCollection });
          this.render();
          if (this.options.callback) {
            this.options.callback();
          }
          if (this.model.get('intro')) {
            console.log('publishing..')
            $.publish('ready');
          }

        }.bind(this));
      }.bind(this))
    },

    events: {
      'change .api' : 'changeApi',
      'click .execute': 'execute'
    },

    changeApi: function(e) {
      var apiName = $(e.currentTarget).val()

      mixpanel.track("API Change", {
        'db_name': this.model.get('dbname'),
        'from': this.model.get('api'),
        'to': apiName,
      })
      this.model.set('api', apiName);

      this.render();

    },

    callback: function(err, response) {
      var that = this.that;
      var apiName = this.apiName;
      var parameters = this.parsedParamters;

      that.model.set('response', (response || err));

      mixpanel.track("API Call", {
        'db_name': that.model.get('dbname'),
        'response': response,
        'err': err,
        'api_name': apiName,
        'parameters': parameters
      })

      that.renderResponse();
      that.renderDocs();

    },

    execute: function() {

      var apiName = this.model.get('api');
      var api = this.apis.findWhere({ name: apiName });

      var parsedParameters = PouchVision.util.parseParameters(api.get('parameters'));

      var that = this;

      // Bind callback with info for tracking
      parsedParameters.push(this.callback.bind({
        'that': this,
        'apiName': apiName,
        'parsedParameters': parsedParameters
      }));

      this.db[apiName].apply(this, parsedParameters);
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

    renderDocs: function() {
       this.db.allDocs({ include_docs: true }, function(err, response) {
         if (err) {
           console.error(err);
           return;
         }
         this.docCollection.reset(response.rows);
         this.docView.render();
       }.bind(this))
    },

    renderResponse: function() {
      if (this.inspector)
        this.inspector.destroy();
      this.inspector = new InspectorJSON({
          element: this.$el.find('.response')
      });
      this.inspector.view(JSON.stringify(this.model.get('response')));
    },

    render: function() {
      var $param;
      this.$el.html(this.template({
        model: this.model.toJSON(),
        apis: this.apis.toJSON(),
      }));


      this.$el.find('.parameters').html(this.apiViews[this.model.get('api')].render().el);

      // Rebind events for existing view that is shown again
      this.apiViews[this.model.get('api')].delegateEvents();
      this.$el.find('.vision-docs').html(this.docView.render().el);

      this.renderResponse();

      return this;
    },

    close: function() {
      this.unbind();
      this.remove();
    }

  })

  return PouchVision;
});
