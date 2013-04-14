define(['underscore'], function(_) {
  window.JST = {}

  window.JST['environment/index'] = _.template([
    '<div class="environment row" id="environment-left"></div>',
    '<div class="environment row" id="environment-right"></div>'
    ].join('')
    );

  window.JST['environment/show'] = _.template([
      '<label class="pull-left">db.</label>',
      '<select class="api">',
        '<% for (var idx in apis) { %>',
          '<option <% if (apis[idx].name === model.api) { %> selected=selected <% } %>><%= apis[idx].name %></option>',
        '<% } %>',
      '</select>',
      '(<div class="options"></div>)',
      '<button class="execute btn">Execute!</button>',
    ].join(''));

  window.JST['api/api'] = _.template([
    '<% for (var idx in options) { %>',
      '<div class="option">',
      '<div class="option-name"><%= options[idx].name %></div>',
      '<div class="option-value></div>',
      '</div>',
    '<% } %>'
    ].join(''));

});
