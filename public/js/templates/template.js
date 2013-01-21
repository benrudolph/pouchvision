define(['underscore'], function(_) {
  var templates = {}

  var compiled = {}
  _.each(_.keys(templates), function(key) {
    compiled[key] = _.template(templates[key])
  })

  return compiled
});
