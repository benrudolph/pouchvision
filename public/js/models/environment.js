define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Models.Environment = Backbone.Model.extend({});

  PouchVision.Collections.EnvironmentsCollection = Backbone.Collection.extend({
    model: PouchVision.Models.Environment
  });
});


