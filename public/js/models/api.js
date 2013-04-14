define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Models.Api = Backbone.Model.extend({});

  PouchVision.Collections.ApisCollection = Backbone.Collection.extend({
    model: PouchVision.Models.Api
  });
});

