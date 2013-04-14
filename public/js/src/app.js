define([
    'jquery',
    'underscore',
    'd3',
    'pouch',
    'backbone',
    'templates'
    ], function($, _, d3, Pouch, Backbone, templates) {

      var PouchVision = {
        Models: {},
        Views: {},
        Routers: {},
        Collections: {}
      };

      PouchVision.Routers.MainRouter = Backbone.Router.extend({
        initialize: function() {
          this.dbs = new PouchVision.Collections.EnvironmentsCollection();
          this.dbs.reset([
            {
              dbname: 'env-left',
              el: '#environment-left',
              api: 'get'
            },
            {
              dbname: 'env-right',
              el: '#environment-right',
              api: 'post'
            }
          ])

          this.apis = new PouchVision.Collections.ApisCollection();
          this.apis.reset(PouchVision.Apis)
        },

        routes: {
          '' : 'index',
          'post' : 'post',
          'get' : 'get'
        },

        index: function() {
          this.dbView = new PouchVision.Views.EnvironmentIndexView({
            collection: this.dbs,
            apis: this.apis
          })
        },

        post: function() { },

        get: function() { },
      })

      PouchVision.Views.EnvironmentIndexView = Backbone.View.extend({
        el: "#pouch-vision",

        template: JST['environment/index'],

        initialize: function(options) {
          console.log("starting...")
          this.apis = options.apis;
          this.render();
          this.addAll();
        },

        render: function() {
          this.$el.html(this.template());
          return this;
        },

        addAll: function() {
          this.collection.forEach(this.addOne, this);
        },

        addOne: function(model) {
          var view = new PouchVision.Views.EnvironmentShowView({
            el: model.get('el'),
            model: model,
            apis: this.apis
          });
          this.$el.append(view.render().el);
        }

      })

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
          'change .api' : 'changeApi'
        },

        changeApi: function(e) {
          this.model.set('api', $(e.currentTarget).val());
        },

        execute: function(e) {

          var api = this.$el.find('.api').val()
          var args = [JSON.parse(this.$el.find('.args').val())]
          args.push(function(err, response) {
            alert(response)
          })

          this.db[api].apply(this, args)
        },

        addApi: function() {
          this.apiView = new PouchVision.Views.ApiView(
            {
              model: this.apis.findWhere({
                'name': this.model.get('api')
              }),
              el: this.$el.find('.options')
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

      PouchVision.Views.ApiView = Backbone.View.extend({
        template: window.JST['api/api'],

        render: function() {
          this.$el.html(this.template(this.model.toJSON()));
        }
      })

      PouchVision.Models.Api = Backbone.Model.extend({});

      PouchVision.Collections.ApisCollection = Backbone.Collection.extend({
        model: PouchVision.Models.Api
      });

      PouchVision.Models.Environment = Backbone.Model.extend({});

      PouchVision.Collections.EnvironmentsCollection = Backbone.Collection.extend({
        model: PouchVision.Models.Environment
      });

      PouchVision.Apis = [
        {
          'name' : 'post',
          'options' : [{
            'name': 'conflicts',
            'type': 'boolean'
          }]
        },
        {
          'name' : 'get',
          'options' : []
        }
      ]

      return PouchVision
    })
