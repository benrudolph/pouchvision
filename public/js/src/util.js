define([
  // These are path alias that we configured in our bootstrap
  'jquery',     // lib/jquery/jquery
  'underscore', // lib/underscore/underscore
  'backbone',    // lib/backbone/backbone
  'pouchvision',
], function($, _, Backbone, PouchVision){

  PouchVision.util = {};

  PouchVision.util.parseParameters = function(parameters) {
    var parsedParameters;
    parsedParameters = parameters.map(function(parameter) {
        var parsedParameter;
        if (parameter.type === PouchVision.Types.JSON) {
          parsedParameter = parameter.data ? parameter.data.getJSON() : {};
        } else if (parameter.type === PouchVision.Types.STRING) {
          parsedParameter = parameter.data;
        }

        return parsedParameter;

      }).filter(function(parameter) {
        return parameter !== undefined;
      });

    return parsedParameters

  }
});

