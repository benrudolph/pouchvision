// Get the type of something as a string
_.mixin({
  type: function( item ){
    if( _.isElement( item ) )     return 'element';
    else if( _.isFunction( item ) )   return 'function';
    else if( _.isArray( item ) )    return 'array';
    else if( _.isArguments( item ) )  return 'arguments';
    else if( _.isString( item ) )   return 'string';
    else if( _.isNumber( item ) )   return 'number';
    else if( _.isBoolean( item ) )    return 'boolean';
    else if( _.isDate( item ) )     return 'date';
    else if( _.isRegExp( item ) )   return 'regexp';
    else if( _.isNull( item ) )     return 'null';
    else if( _.isUndefined( item ) )  return 'undefined';
    else if( _.isObject( item ) )   return 'object';
    else                return 'unknown';
  }
});

var InspectorJSON = function( params ){

  'use strict';

  params = params || {};
  var defaults = {
    element: 'body',
    debug: false,
    collapsed: true,
    url: location.pathname,
    contenteditable: false,
    modifyable: false
  };

  var json;

  _( params ).defaults( defaults );

  var collapse_states = store.get( params.url +':inspectorJSON/collapse_states' ) || {};
  this.$el = $( params.element );
  this.$el.addClass('inspector-json viewer');

  // Delegate the click event for collapse/uncollapse of JSON levels
  this.$el.on( 'click.json', 'li.object > a, li.array > a', function( e ){

    e.preventDefault();

    var $this = $(this);
    var $parent = $this.parent();
    var path = $parent.data('path');

    $parent.toggleClass('collapsed');

    var expanded = !$parent.is('.collapsed');

    if( expanded )
      collapse_states[path] = expanded;
    else
      delete collapse_states[path];

    store.set( params.url +':inspectorJSON/collapse_states', collapse_states );

  });

  this.$el.on( 'keypress [contenteditable="true"]', function( e ){
    var $target;

    if (e.keyCode === 13) {
      $target = $( e.target );
      $target.trigger('blur');
      e.preventDefault();

    }
  })


  // Create the JSON Viewer on the specified element
  this.view = function( _json ){

    json = _json;

    if( params.debug ){
      var start = new Date().getTime();
    }

    var processString = function( string ){

      return unescape( string ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' );

    };

    // Create markup from a value
    var processItem = function( item, parent, key, path ){

      var type = _.type( item );
      var parent_type = _.type( parent );
      var markup = '';

      // Create a string representation of the JSON path to this value
      path = path
        ? ( parent_type === 'array' )
          ? path +'['+ key +']'
          : path +'.'+ key
        : key;

      // Start the <li>
      if( parent ){
        markup += ( collapse_states[path] || !params.collapsed || ( type !== 'object' && type !== 'array' ) )
          ? '<li class="'+ type +'" data-path="'+ path +'">'
          : '<li class="'+ type +' collapsed" data-path="'+ path +'">';
      }

      // Generate markup by value type. Recursion for arrays and objects.
      if( type === 'object' ){
        if( key )
          markup += '<a href="#toggle"><strong>'+ key + '</strong></a>';
        markup += '<ul>';
        for( key in item )
          markup += processItem( item[key], item, key, path );
        markup += '<li class="plus" data-path="'+ (path || '') +'">+</li>';
        markup += '</ul>';
      }
      else if( type === 'array' ){
        if( key )
          markup += '<a href="#toggle"><strong>'+ key +'</strong></a>Array('+ item.length +')';
        markup += '<ol>';
        for( var i in item )
          markup += processItem( item[i], item, i, path );
        markup += '</ol>';
      }
      else if( type === 'string' ) {
        markup += '<strong>'+ key + '</strong>';
        markup += params.contenteditable ? '<span contenteditable="true">"'+ processString( item ) +'"</span>'
            : '<span>"'+ processString( item ) +'"</span>';
          ;
      }
      else if( type === 'number' ) {
        markup += '<strong>'+ key + '</strong>';
        markup += params.contenteditable ? '<var contenteditable="true">'+ item.toString() +'</var>'
            : '<var>' + item.toString() + '</var>';
      }
      else if( type === 'boolean' ) {
        markup += '<strong>'+ key + '</strong>';
        markup += params.contenteditable ? '<em contenteditable="true">' + item.toString() + '</em>'
        : '<em>'+ item.toString() + '</em>';
      }
      else if( type === 'null' )
        markup += '<strong>'+ key + '</strong><i>null</i>';

      // End the </li>
      if( parent )
        markup += '</li>';

      return markup;

    };

    if( _( json ).isString() )
      json = JSON.parse( json );

    var root = processItem( json );
    var $root = $( root );

    this.$el.html( $root );

    this.$el.on('focus', '[contenteditable="true"]', function( e ) {
      $( e.target ).select();
    });

    this.$el.on('blur', 'span[contenteditable="true"]', function( e ){
      var $target = $( e.target );
      var $parent = $target.parent();
      var path = $parent.data('path');

      try {
        eval('json.' + path + ' = ' + $target.text() + ';');
      } catch (e) {
        throw new Error("Invalid data: " + path + '|' + $target.text());
      }

      console.log(json);
    });

    // Editting keys
    this.$el.on('blur', 'strong[contenteditable="true"]', function( e ){
      var $target = $( e.target );
      var $parent = $target.parent();
      var $value = $target.next();
      var path = $parent.data('path');
      var idx;

      /* It's a new field so we need to add it to the path */
      if ($parent.hasClass('new')) {
          path += path ? '.' + $target.text() : $target.text();
          $parent.removeClass('new');
      } else {
        // We're changing a regular key
        idx = path.lastIndexOf('.');
        path = idx === -1 ? $target.text() : path.substring(0, idx) + '.' + $target.text();
      }
      $parent.data('path', path);

      try {
        eval('json.' + path + ' = "' + $value.text() + '";');
      } catch (e) {
        throw new Error("Invalid data");
      }
    })

    this.$el.find('.plus').click(function( e ){
      var $target = $( e.target );
      var path = $target.data('path');
      var markup = '<li class="string new" data-path="'+ path +'">';
      markup += '<strong contenteditable="true">[key]</strong>';
      markup += '<span contenteditable="true">[value]</span>';
      markup += '</li>';
      $target.before(markup);
    });

    if( params.debug ){
      var end = new Date().getTime();
      console.log('Rendered in '+ ( end - start ) +'ms');
    }

  };

  // LEAVE NO EVIDENCE!!!
  this.destroy = function(){

    this.$el
      .off('.json')
      .empty();

  };

  this.getJSON = function() {
    return json;
  };

};
