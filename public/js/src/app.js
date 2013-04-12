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
              method: 'post'
            },
            {
              dbname: 'env-right',
              el: '#environment-right',
              method: 'post'
            }
          ])
        },

        routes: {
          '' : 'index',
          'post' : 'post',
          'get' : 'get'
        },

        index: function() {
          this.dbView = new PouchVision.Views.EnvironmentIndexView({ collection: this.dbs })
        },

        post: function() { },

        get: function() { },
      })

      PouchVision.Views.EnvironmentIndexView = Backbone.View.extend({
        el: "#pouch-vision",

        template: JST['environment/index'],

        initialize: function(options) {
          console.log("starting...")
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
          var view = new PouchVision.Views.EnvironmentShowView({ model: model });
          this.$el.append(view.render().el);
        }

      })

      PouchVision.Views.EnvironmentShowView = Backbone.View.extend({

        template: JST['environment/show'],

        initialize: function(opts) {

          Pouch('idb://' + this.model.dbname, function(err, db) {
            this.db = db
            this.render()
          }.bind(this))
        },

        execute: function(e) {

          var method = this.$el.find('.method').val()
          var args = [JSON.parse(this.$el.find('.args').val())]
          args.push(function(err, response) {
            alert(response)
          })

          this.db[method].apply(this, args)
        },

        render: function() {
          this.$el.html(this.template(this));
          return this;
        }

      })

      PouchVision.Models.Environment = Backbone.Model.extend({});

      PouchVision.Collections.EnvironmentsCollection = Backbone.Collection.extend({
        model: PouchVision.Models.Environment
      });

      return PouchVision
    })
