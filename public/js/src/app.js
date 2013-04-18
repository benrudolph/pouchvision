define([
    'jquery',
    'underscore',
    'd3',
    'pouch',
    'backbone',
    'pouchvision',
    'templates',
    'store',
    '/js/models/api.js', /* Models/Collections */
    '/js/models/environment.js',
    '/js/models/doc.js',
    '/js/models/static.js',
    '/js/views/apis/api_view.js', /* Views */
    '/js/views/environments/show_view.js',
    '/js/views/environments/index_view.js',
    '/js/views/docs/index_view.js',
    '/js/views/docs/doc_view.js',
    '/js/views/statics/static_view.js',
    '/js/router.js' /* Router */
    ], function($, _, d3, Pouch, Backbone, PouchVision, templates, store) {

      window.store = store // Hack to get store in global namespace. Need to fix

      PouchVision.Types = {
        JSON: 'json',
        STRING: 'string',
        BOOLEAN: 'boolean'
      }
      PouchVision.Statics = [
        {
          'name': 'replicate',
          'parameters': [
            {
              'name': 'to',
              'type': PouchVision.Types.STRING,
              'data': ''
            },
            {
              'name': 'from',
              'type': PouchVision.Types.STRING,
              'data': ''
            }
          ]
        }

      ]
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
            },
            {
              'name': 'options',
              'type': PouchVision.Types.JSON,
              'data': [ {
                'name': 'conflicts',
                'type': PouchVision.Types.BOOLEAN,
                'value': null
              }]

            }]
        },
        {
          'name' : 'allDocs',
          'parameters' : [
            {
              'name': 'options',
              'type': PouchVision.Types.JSON,
              'data': [ {
                'name': 'include_docs',
                'type': PouchVision.Types.BOOLEAN,
                'value': null
              },
              {
                'name': 'attachments',
                'type': PouchVision.Types.BOOLEAN,
                'value': null
              }]

           }]
        }
      ]


      return PouchVision;
  })
