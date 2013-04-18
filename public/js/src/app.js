define([
    'jquery',
    'underscore',
    'd3',
    'pouch',
    'backbone',
    'pouchvision',
    '/js/models/api.js', /* Models/Collections */
    '/js/models/environment.js',
    '/js/models/doc.js',
    '/js/views/apis/api_view.js', /* Views */
    '/js/views/environments/show_view.js',
    '/js/views/environments/index_view.js',
    '/js/views/docs/index_view.js',
    '/js/views/docs/doc_view.js',
    '/js/router.js', /* Router */
    'templates'
    ], function($, _, d3, Pouch, Backbone, PouchVision, templates) {


      PouchVision.Types = {
        JSON: 'json',
        STRING: 'string',
        BOOLEAN: 'boolean'
      }
      PouchVision.Apis = [
        {
          'name' : 'post',
          'parameters' : [
            {
              'name': 'doc',
              'type': PouchVision.Types.JSON,
              'data': []
            },
            {
              'name': 'options',
              'type': PouchVision.Types.JSON,
              'data' : [{
                'name': 'conflicts',
                'type': PouchVision.Types.BOOLEAN,
                'value': null
              }]
            }
          ]
        },
        {
          'name' : 'get',
          'parameters' : [
            {
              'name': 'docid',
              'type': PouchVision.Types.STRING,
              'data': ''
            }]
        }
      ]


      return PouchVision;
  })
