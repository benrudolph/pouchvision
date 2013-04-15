define(['underscore'], function(_) {
  window.JST = {}

  window.JST['environment/index'] = _.template([
    '<div class="environment row" id="environment-left"></div>',
    '<div class="environment row" id="environment-right"></div>'
    ].join('')
    );

  window.JST['environment/show'] = _.template([
      '<label class=" pull-left">db.</label>',
      '<select class="api pull-left">',
        '<% for (var idx in apis) { %>',
          '<option <% if (apis[idx].name === model.api) { %> selected=selected <% } %>><%= apis[idx].name %></option>',
        '<% } %>',
      '</select>',
      '<div class="parameters pull-left"></div>',
      '<button class="execute btn pull-right">Execute!</button>',
    ].join(''));

  window.JST['api/api'] = _.template([
    '<span class="paren pull-left">(</span>',
    '<% for (var idx in parameters) { %>',
      '<div class="parameter pull-left <%= parameters[idx].name %>">',
        '<div class="parameter-data pull-left"><%= parameters[idx].name %></div>',
      '</div>',
      '<span class="pull-left">,&nbsp;</span>',
    '<% } %>',
    '<span class="paren pull-left">)</span>'
    ].join(''));

  window.JST['parameter/json-new-field'] = _.template([
    '<div class="option new">',
      '<input class="option-name-input option-input" type="text" />:',
      '<input class="option-value-input option-input" type="text" />',
    '</div>',
  ].join(''));

  window.JST['parameter/json'] = _.template([
    '<div class="json">',
    '<div class="json-data">',
    '<% if (metadata) { %>',
      '<% for (var idx in metadata) { %>',
        '<div class="option">',
        '<span class="option-name"><%= metadata[idx].name %></span>:',
        '<input class="option-value-input option-input" type="text" />',
        '</div>',
      '<% } %>',
    '<% } %>',
    window.JST['parameter/json-new-field'](),
    '</div>',
    '<i class="add-new-field icon-plus-sign"></i>',
    '</div>'
  ].join(''));


});
