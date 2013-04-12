define(['underscore'], function(_) {
  window.JST = {}

  window.JST['environment/index'] = _.template('');

  window.JST['environment/show'] = _.template([
    '<div class="environment">',
      '<label>db.</label>',
      '<select class="method">',
        '<option>[choose a method]</option>',
        '<option>post</option>',
        '<option>get</option>',
      '</select>',
      '<button class="execute">Execute!</button>',
    '</div>'].join(''));


  /*var compiled = {}
  _.each(_.keys(templates), function(key) {
    compiled[key] = _.template(templates[key])
  })

  return compiled*/
});
