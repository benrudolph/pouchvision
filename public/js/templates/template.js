define(['underscore'], function(_) {
  window.JST = {}

  window.JST['environment/index'] = _.template([
    '<div class="environment" id="environment-left"></div>',
    '<div class="environment" id="environment-right"></div>'
    ].join('')
    );

  window.JST['environment/show'] = _.template([
      '<label>db.</label>',
      '<select class="method">',
        '<% for (var idx in methods) { %>',
          '<option <% if (methods[idx].name === model.method) { %> selected=selected <% } %>><%= methods[idx].name %></option>',
        '<% } %>',
      '</select>',
      '(<div class="options"></div>)',
      '<button class="execute btn">Execute!</button>',
    ].join(''));

  window.JST['method/method'] = _.template([
    '<% for (var idx in options) { %>',
      '<div class="option">',
      '<div class="option-name"><%= options[idx].name %></div>',
      '<div class="option-value></div>',
      '</div>',
    '<% } %>'
    ].join(''));

});
