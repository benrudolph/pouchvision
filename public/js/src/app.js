define([
    'jquery',
    'underscore',
    'd3',
    'pouch',
    'backbone',
    'pouchvision',
    'templates',
    'store',
    'javascript',
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
    '/js/router.js', /* Router */
    '/js/src/util.js'
    ], function($, _, d3, Pouch, Backbone, PouchVision, templates, store, CodeMirror) {

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
              'name': 'from',
              'type': PouchVision.Types.STRING,
              'data': ''
            },
            {
              'name': 'to',
              'type': PouchVision.Types.STRING,
              'data': ''
            }
          ]
        },
        {
          'name': 'allDbs',
          'parameters': []
        },
        {
          'name': 'destroy',
          'parameters': [
          {
            'name': 'name',
            'type': PouchVision.Types.JSON,
            'data': {}
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
              'data': {}
            },
            {
              'name': 'options',
              'type': PouchVision.Types.JSON,
              'data': {},
              'defaults' : {
                'conflicts': false
              }
            }
          ]
        },
        {
          'name' : 'put',
          'parameters' : [
          {
            'name': 'doc',
            'type': PouchVision.Types.JSON,
            'data': {}
          },
          {
            'name': 'options',
            'type': PouchVision.Types.JSON,
            'data': {}

          }
          ]
        },
        {
          'name' : 'bulkDocs',
          'parameters' : [
          {
            'name': 'docs',
            'type': PouchVision.Types.JSON,
            'data': {}
          },
          {
            'name': 'options',
            'type': PouchVision.Types.JSON,
            'data': {}

          }
          ]
        },
        {
          'name': 'info',
          'parameters': []
        },
        {
          'name': 'changes',
          'parameters': [
          {
            'name': 'options',
            'type': PouchVision.Types.JSON,
            'data': {}
          }
          ]
        },
        {
          'name': 'remove',
          'parameters': [
          {
            'name': 'doc',
            'type': PouchVision.Types.JSON,
            'data': {}
          },
          {
            'name': 'options',
            'type': PouchVision.Types.JSON,
            'data': {}
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
              'data': {},
              'defaults': {
                'revs': false,
                'revs_info': false,
                'open_revs': false,
                'conflicts': false,
                'attachments': false
              }

            }]
        },
        {
          'name' : 'allDocs',
          'parameters' : [
            {
              'name': 'options',
              'type': PouchVision.Types.JSON,
              'data': {},
              'defaults': {
                'include_docs': false,
                'conflicts': false,
                'attachments': false
              }

           }]
        }
      ]


      return PouchVision;
  })
