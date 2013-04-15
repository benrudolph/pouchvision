define([
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision'
], function($, _, Backbone, PouchVision){
  PouchVision.Models.Doc = Backbone.Model.extend({});

  PouchVision.Collections.DocsCollection = Backbone.Collection.extend({
    model: PouchVision.Models.Doc
  });
});


