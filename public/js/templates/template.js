define(['underscore'], function(_) {
  window.JST = {}

  window.JST['static/static'] = _.template([
    '<label class="pull-left">Pouch.<%= name %></label>',
    '<span class="paren pull-left">(</span>',
    '<% for (var idx in parameters) { %>',
      '<div class="parameter pull-left <%= parameters[idx].name %>">',
        '<div class="parameter-data pull-left"><%= parameters[idx].name %></div>',
      '</div>',
      '<span class="pull-left">,&nbsp;</span>',
    '<% } %>',
    '<span class="paren pull-left">)</span>',
    '<button class="execute btn pull-right">Execute!</button>',
    ].join(''));

  window.JST['environment/index'] = _.template([
    '<div class="static-container row">',
    '<span class="pull-left">Pouch.replicate</span>',
    '<div class="static"></div>',
    '<div class="static-response row"></div>',
    '<button class="static-execute btn pull-right">Execute!</button>',
    '</div>',
    '<div class="add-pouch-container">',
      '<button class="add-pouch">+Pouch</button>',
    '</div>',
    '<div class="pouches"></div>'
    ].join(''));

  window.JST['environment/show'] = _.template([
    '<div class="row name">Name: <%= model.dbname %></div>',
    '<div class="db row">',
    '<label class=" pull-left">db.</label>',
    '<select class="api pull-left">',
      '<% for (var idx in apis) { %>',
      '<% console.log(apis[idx].name + "|" + model.api) %>',
        '<option <% if (apis[idx].name === model.api) { %> selected=selected <% } %>><%= apis[idx].name %></option>',
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
        '<div class="parameter-data pull-left"><%= parameters[idx].name %></div>',
        '<%= window.JST["parameter/" + parameters[idx].type](parameters[idx]) %>',
      '</div>',
      '<% if (+idx !== parameters.length - 1) { %>',
      '<span class="pull-left">,&nbsp;</span>',
      '<% } %>',
    '<% } %>',
    '<span class="paren pull-left">)</span>'
    ].join(''));

  window.JST['doc/index'] = _.template('');

  window.JST['doc/doc'] = _.template([
  ].join(''));

});
