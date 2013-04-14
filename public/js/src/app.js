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
              method: 'get'
            },
            {
              dbname: 'env-right',
              el: '#environment-right',
              method: 'post'
            }
          ])

          this.methods = new PouchVision.Collections.MethodsCollection();
          this.methods.reset(PouchVision.Methods)
        },

        routes: {
          '' : 'index',
          'post' : 'post',
          'get' : 'get'
        },

        index: function() {
          this.dbView = new PouchVision.Views.EnvironmentIndexView({
            collection: this.dbs,
            methods: this.methods
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
          this.methods = options.methods;
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
            methods: this.methods
          });
          this.$el.append(view.render().el);
        }

      })

      PouchVision.Views.EnvironmentShowView = Backbone.View.extend({

        template: JST['environment/show'],

        initialize: function(options) {
          this.methods = options.methods;

          Pouch('idb://' + this.model.dbname, function(err, db) {
            this.db = db;
            this.render();
          }.bind(this))
        },

        events: {
          'change .method' : 'changeMethod'
        },

        changeMethod: function(e) {
          this.model.set('method', $(e.currentTarget).val());
        },

        execute: function(e) {

          var method = this.$el.find('.method').val()
          var args = [JSON.parse(this.$el.find('.args').val())]
          args.push(function(err, response) {
            alert(response)
          })

          this.db[method].apply(this, args)
        },

        addMethod: function() {
          this.methodView = new PouchVision.Views.MethodView(
            {
              model: this.methods.findWhere({
                'name': this.model.get('method')
              }),
              el: this.$el.find('.options')
            }
          );
          this.methodView.render();
        },

        render: function() {
          this.$el.html(this.template({ model: this.model, methods: this.methods.toJSON() }));
          this.addMethod();
          return this;
        }

      })

      PouchVision.Views.MethodView = Backbone.View.extend({
        template: window.JST['method/method'],

        render: function() {
          this.$el.html(this.template(this.model.toJSON()));
        }
      })

      PouchVision.Models.Method = Backbone.Model.extend({});

      PouchVision.Collections.MethodsCollection = Backbone.Collection.extend({
        model: PouchVision.Models.Method
      });

      PouchVision.Models.Environment = Backbone.Model.extend({});

      PouchVision.Collections.EnvironmentsCollection = Backbone.Collection.extend({
        model: PouchVision.Models.Environment
      });

      PouchVision.Methods = [
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
