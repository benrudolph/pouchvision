define(['underscore'], function(_) {
  window.JST = {}

  window.JST['environment/index'] = _.template([
    '<h2>Static Pouch</h2>',
    '<div class="static-container row">',
    '<label class="pull-left">Pouch.</label>',
    '<select class="static-api pull-left">',
      '<% for (var idx in statics) { %>',
        '<option <% if (statics[idx].name === "replicate") { %> selected=selected <% } %>><%= statics[idx].name %></option>',
      '<% } %>',
    '</select>',
    '<div class="static row">',
      '<div class="parameters"></div>',
      '<button class="static-execute btn pull-right">Execute!</button>',
    '</div>',
    '<div class="response static-response row">',
      '<div class="elapsed-time"></div>',
      '<div class="static-response-content"></div>',
    '</div>',
    '</div>',
    '<div class="pouch-header">',
      '<h2>Pouch Instances</h2>',
      '<div class="add-pouch-container">',
        '<button class="add-pouch btn">+Pouch</button>',
      '</div>',
    '</div>',
    '<div class="pouches">',
    '</div>'
    ].join(''));

  window.JST['environment/show'] = _.template([
    '<% if (model.isHttp) { %><div class="is-http">remote</div><% } %>',
    '<div class="row name">Name: <%= model.dbname %></div>',
    '<div class="db row">',
    '<label class=" pull-left">db.</label>',
    '<select class="api pull-left">',
      '<% for (var idx in apis) { %>',
        '<option <% if (apis[idx].name === model.api) { %> selected=selected <% } %>>',
        '<%= apis[idx].name %>',
        '</option>',
      '<% } %>',
    '</select>',
    '<div class="parameters pull-left"></div>',
    '<button class="execute btn pull-right">Execute!</button>',
    '</div>',
    '<div class="response row">',
      '<div class="elapsed-time"></div>',
      '<div class="response-content"></div>',
    '</div>',
    '<div class="vision-docs row"></div>'
  ].join(''));

  window.JST['parameter/json'] = _.template([
    '<div class="json gone" data-name="<%= name %>">',
      '<textarea class="code-editor">{',
        '\n',
        '\n',
        '\n',
      '}</textarea>',
      '<button class="code-edit-save">Save</button>',
      '<button class="code-edit-cancel">Cancel</button>',
    '</div>'
  ].join(''));

  window.JST['parameter/attachment'] = _.template([
    '<div class="attachment gone" data-name="<%= name %>">',
      '<textarea class="code-editor">new Blob([])</textarea>',
      '<button class="code-edit-save">Save</button>',
      '<button class="code-edit-cancel">Cancel</button>',
    '</div>'
  ].join(''));

  window.JST['parameter/array'] = _.template([
    '<div class="array gone" data-name="<%= name %>">',
      '<textarea class="code-editor">[{',
        '\n',
        '\n',
        '\n',
      '}]</textarea>',
      '<button class="code-edit-save">Save</button>',
      '<button class="code-edit-cancel">Cancel</button>',
    '</div>'
  ].join(''));

  window.JST['parameter/string'] = _.template([
    '<div class="string gone" data-name="<%= name %>">',
      '<textarea class="code-editor">""</textarea>',
      '<button class="code-edit-save">Save</button>',
      '<button class="code-edit-cancel">Cancel</button>',
    '</div>',
    '</div>'
  ].join(''));

  window.JST['api/api'] = _.template([
    '<span class="paren pull-left">(</span>',
    '<% for (var idx in parameters) { %>',
      '<div class="parameter pull-left <%= parameters[idx].name %>">',
        '<% if (parameters[idx].optional) { %><span class="pull-left"><%= "[" %></span><% } %>',
        '<div class="parameter-data pull-left"><%= parameters[idx].name %></div>',
        '<%= window.JST["parameter/" + parameters[idx].type](parameters[idx]) %>',
        '<% if (parameters[idx].optional) { %><span class="pull-left"><%= "]" %></span><% } %>',
      '</div>',
      '<% if (+idx !== parameters.length - 1) { %>',
      '<span class="pull-left">,&nbsp;</span>',
      '<% } %>',
    '<% } %>',
    '<span class="paren pull-left">)</span>'
    ].join(''));

  window.JST['doc/index'] = _.template('');

  window.JST['doc/doc'] = _.template([
    '<div class="vision-doc">',
      '<div class="vision-doc-color"></div>',
    '</div>',
    '<div class="vision-popup-container gone">',
      '<div class="arrow-up"></div>',
      '<div class="vision-title"><%= title %></div>',
      '<div class="vision-popup"></div>',
    '</div>'
  ].join(''));

  window.JST['application/prompt'] = _.template([
    '<div class="addpouch-form">',
      '<div class="addpouch-name-container">',
        '<label for="addpouch-name">DB Name:&nbsp;</label>',
        '<input type="text" name="addpouch-name" class="addpouch-name" />',
      '</div>',
      '<div class="addpouch-ishttp-container">',
        '<label for="addpouch-name">Make it remote?</label>',
        '<input type="checkbox" name="addpouch-ishttp" class="addpouch-ishttp" />',
      '</div>',
      '<div class="addpouch-buttons">',
        '<button class="ok">Ok</button>',
        '<button class="cancel">Cancel</button>',
      '</div>',
    '</div>',
  ].join(''));

});
