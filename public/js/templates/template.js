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
    '<div class="response static-response row"></div>',
    '</div>',
    '<div class="add-pouch-container">',
      '<button class="add-pouch">+Pouch</button>',
    '</div>',
    '<div class="pouches">',
      '<h2>Pouch Instances</h2>',
    '</div>'
    ].join(''));

  window.JST['environment/show'] = _.template([
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
    '<div class="response row"></div>',
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
      '<div class="vision-title"><%= title %></div>',
      '<div class="vision-popup"></div>',
    '</div>'
  ].join(''));

});
