define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Models.Static = Backbone.Model.extend({});

  PouchVision.Collections.StaticsCollection = Backbone.Collection.extend({
    model: PouchVision.Models.Static
  });
});

