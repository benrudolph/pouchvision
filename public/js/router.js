define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision',
  'intro'
], function($, _, Backbone, PouchVision, introJs){
  PouchVision.Routers.MainRouter = Backbone.Router.extend({
    initialize: function() {
      this.dbs = new PouchVision.Collections.EnvironmentsCollection();

      this.apis = new PouchVision.Collections.ApisCollection();
      this.apis.reset(PouchVision.Apis)

      this.statics = new PouchVision.Collections.StaticsCollection();
      this.statics.reset(PouchVision.Statics);

      mixpanel.track_links('#intro_link', 'Intro Link');
      mixpanel.track_links('#pouchvision_link', 'PouchVision Link');
      mixpanel.track_links('#pouchdb_link', 'PouchDB Link');

    },

    routes: {
      '' : 'index',
      'intro': 'intro',
      '*default' : 'index'

    },

    intro: function() {

      $.subscribe('ready', function () {

        var $header = $('.header').first()
        var $staticPouch = $('.static-container').first();
        var $addPouch = $('.add-pouch').first();
        var $pouch = $('.pouch').first();
        var $param = $pouch.find('.parameter').first();
        var $api = $pouch.find('.api').first();
        var $execute = $pouch.find('.execute').first();
        var $response = $pouch.find('.response').first();
        var $name = $pouch.find('.name').first();
        var $docs = $pouch.find('.vision-docs').first();

        $header.attr('data-intro', 'Pouchvision lets you see and interact with PouchDB. PouchDB is a javascript database that lets you replicate to CouchDB or PouchDB instances');
        $header.attr('data-step', '1');

        $staticPouch.attr('data-intro', 'This is where you can make static Pouch calls.');
        $staticPouch.attr('data-step', '2');

        $addPouch.attr('data-intro', 'You can add new Pouch instances with this button');
        $addPouch.attr('data-step', '3');

        $pouch.attr('data-intro', 'This is a Pouch instance. You can do cool things with it.');
        $pouch.attr('data-step', '4');

        $name.attr('data-intro', 'This is the name of your Pouch instance. Use this name in static Pouch calls.');
        $name.attr('data-step', '5');

        $api.attr('data-intro', 'You can choose which api call you want to do here');
        $api.attr('data-step', '6');

        $param.attr('data-intro', 'You can click a parameter to customize the input. Also feel free to drag and drop documents on to parameters named \'doc\', \'docid\', and \'rev\' (gets most recent rev)');
        $param.attr('data-step', '7');


        $execute.attr('data-intro', 'Click this to execute your API call');
        $execute.attr('data-step', '8');

        $response.attr('data-intro', 'This is where the output of your api call with be shown');
        $response.attr('data-step', '9');

        $docs.attr('data-intro', 'This is where your documents will show up. Each document\'s id is hashed to a color so you can easily tell which documents are the same. You can also click the document to get more information about it');
        $docs.attr('data-step', '10');

        introJs().start()
      });
      this.index();
    },

    index: function() {
      Pouch.allDbs(function(err, response) {
        if (err) {
          console.err(err);
        }

        var dbs = [];
        var defaultDbs = [
          'jamesdean',
          'einstein',
        ];

        response = _.union(response, defaultDbs);

        response.forEach(function(dbname, i) {
          var db = {
            dbname: dbname,
            api: 'post',
            response: {}
          }
          if (i === 0) {
            db.intro = true;
          }
          dbs.push(db)
        });

        this.dbs.reset(dbs)
        this.dbView = new PouchVision.Views.EnvironmentIndexView({
          collection: this.dbs,
          apis: this.apis,
          statics: this.statics,
          model: new PouchVision.Models.Environment({
            staticApi: 'replicate'
          })
        })

      }.bind(this))

    },
  })

});

