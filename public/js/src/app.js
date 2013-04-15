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

      PouchVision.Apis = [
        {
          'name' : 'post',
          'parameters' : [
            {
              'name': 'doc',
              'type': 'json',
              'data': []
            },
            {
              'name': 'options',
              'type': 'json',
              'data' : [{
                'name': 'conflicts',
                'type': 'boolean',
                'value': null
              }]
            }
          ]
        },
        {
          'name' : 'get',
          'parameters' : []
        }
      ]

      return PouchVision;
  })
