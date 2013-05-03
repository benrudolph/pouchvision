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
    'jquery-color',
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

      var o = $({});

      $.subscribe = function() {
        o.on.apply(o, arguments);
      };

      $.unsubscribe = function() {
        o.off.apply(o, arguments);
      };

      $.publish = function() {
        o.trigger.apply(o, arguments);
      };


      PouchVision.Types = {
        JSON: 'json',
        STRING: 'string',
        BOOLEAN: 'boolean',
        ARRAY: 'array'
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
              'data': {}
            },
            {
              'name': 'options',
              'type': PouchVision.Types.JSON,
              'data': {},
              'defaults' : {
                'conflicts': false
              },
              'optional': true
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
            'data': {},
            'optional': true

          }
          ]
        },
        {
          'name' : 'bulkDocs',
          'parameters' : [
          {
            'name': 'docs',
            'type': PouchVision.Types.JSON,
            'data': { 'docs': [] },
            'defaults': { 'docs': [] },
          },
          {
            'name': 'options',
            'type': PouchVision.Types.JSON,
            'data': {},
            'defaults': {
              'new_edits': false
            },
            'optional': true
          }
          ]
        },
        {
          'name': 'info',
          'parameters': []
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
            'data': {},
            'optional': true
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
                'attachments': false,
                'startkey': "",
                'endkey': "",
                'keys': []
              },
              'optional': true

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
                'attachments': false,
                'descending': false,

              },
              'optional': true

           }]
        },
        {
          'name': 'putAttachment',
          'parameters': [
          {
            'name': 'id',
            'type': PouchVision.Types.STRING,
            'data': ''
          },
          {
            'name': 'rev',
            'type': PouchVision.Types.STRING,
            'data': ''
          },
          {
            'name': 'doc',
            'type': PouchVision.Types.JSON,
            'data': {}
          },
          {
            'name': 'type',
            'type': PouchVision.Types.STRING,
            'data': ''
          }
            ]
        },
        {
          'name': 'getAttachment',
          'parameters': [
          {
            'name': 'id',
            'type': PouchVision.Types.STRING
          }
            ]
        },
        {
          'name': 'removeAttachment',
          'parameters': [
          {
            'name': 'id',
            'type': PouchVision.Types.STRING,
            'data': ''
          },
          {
            'name': 'rev',
            'type': PouchVision.Types.STRING,
            'data': ''
          }
            ]
        },
        {
          'name': 'compact',
          'parameters': [
          {
            'name': 'options',
            'type': PouchVision.Types.STRING,
            'data': ''
          }
          ]
        }
      ]


      return PouchVision;
  })
