define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Views.EnvironmentIndexView = Backbone.View.extend({
    el: "#pouch-vision",

    template: JST['environment/index'],

    events: {
      'click .static-execute' : 'execute',
      'click .add-pouch' : 'onAddPouch',
      'change .static-api' : 'changeStaticApi'
    },

    initialize: function(options) {
      console.log("starting...")
      this.apis = options.apis;
      this.statics = options.statics;
      this.staticResponse = {};
      this.staticApiViews = {};

      this.addStaticApi();
      this.listenTo(this.model, 'change:staticApi', this.addStaticApi);

      this.pouches = [];

      this.listenTo(this.collection, 'add', this.addOne);

      this.render();
      this.addAll();
    },

    changeStaticApi: function(e) {
      var staticApiName = $(e.currentTarget).val();

      mixpanel.track("StaticAPI Change", {
        'from': this.model.get('staticApi'),
        'to': staticApiName,
      })
      this.model.set('staticApi', staticApiName);
      this.renderStaticApi();

    },

    callback: function(err, response) {
      var that = this.that;
      that.staticResponse = (err || response);
      var elapsedTime = (+(new Date) - this.start);

      mixpanel.track("StaticAPI Call", {
        'response': response,
        'err': err,
        'static_api_name': this.static_api_name,
        'parameters': this.parameters,
        'elapsed_time': elapsedTime
      })

      that.inspector = new InspectorJSON({
          element: that.$el.find('.static-response-content')
      });

      that.$el.find('.static-response .elapsed-time').text('Elapsed Time: ' + (elapsedTime / 1000) + ' seconds');
      that.inspector.view(JSON.stringify(that.staticResponse));
      if (err)
        return;
      that.pouches.forEach(function(pouch) {
        pouch.renderDocs();
      });
    },

    execute: function() {
      var staticName = this.model.get('staticApi');
      var static = this.statics.findWhere({ name: staticName });

      var parsedParameters = PouchVision.util.parseParameters(static.get('parameters'));

      parsedParameters.push(this.callback.bind({
        'that': this,
        'static_api_name': staticName,
        'parameters': parsedParameters,
        'start': +(new Date())
      }));

      if (staticName === 'destroy') {
        var deletedPouch = this.collection.findWhere({ dbname: parsedParameters[0] });
        this.collection.remove(deletedPouch);
        this.pouches = this.pouches.filter(function(pouch) {
          if (pouch.model.get('dbname') === deletedPouch.get('dbname')) {
            pouch.close();
            return false;
          }
          return true;
        });
      }

      Pouch[staticName].apply(this, parsedParameters);
    },

    onAddPouch: function(e) {
      var addPouchPrompt = new PouchVision.Views.ApplicationPromptView({
        callback: function(name, isHttp) {
          if (!name)
            return;
          mixpanel.track("Add Pouch", {
            'db_name': name,
            'is_http': isHttp
          })

          if (isHttp) {
            name = 'http://localhost:2020/pouchvision.iriscouch.com/' + name;
          }

          this.collection.add({
            dbname: name,
            api: 'post',
            isHttp: isHttp,
            response: {}
          });
        }.bind(this)
      });

      $('body').append(addPouchPrompt.el);
    },

    addStaticApi: function() {
      if (this.staticApiViews[this.model.get('staticApi')]) {
        return;
      }

      var staticApiModel = this.statics.findWhere({
        'name': this.model.get('staticApi')
      });

      this.staticApiViews[this.model.get('staticApi')] = new PouchVision.Views.ApiView({
        model: staticApiModel,
      });
    },

    render: function() {
      this.$el.html(this.template({ statics: this.statics.toJSON() }));
      this.renderStaticApi();
      return this;
    },

    renderStaticApi: function() {
      this.$el.find('.static .parameters').html(
          this.staticApiViews[this.model.get('staticApi')].render().el);
      this.staticApiViews[this.model.get('staticApi')].delegateEvents();
    },

    addAll: function() {
      this.collection.forEach(this.addOne, this);
    },

    addOne: function(model) {
      var view = new PouchVision.Views.EnvironmentShowView({
        model: _.extend({}, model),
        apis: _.extend({}, this.apis),
        callback: function() {
          this.$el.find('.pouches').append(view.el)
        }.bind(this)
      });
      this.pouches.push(view);
    }

  })

  return PouchVision;
});




