
(function($){

  'use strict';

  $.fn.equalizeChildren = function(args){

    var args = args || {}
      ,defaultRwd = args.defaultRwd
      ,screenMap = args.screenMap ||
                  [ {name: 'scr4', minWidth: 990}
                    ,{name: 'scr3', minWidth: 768}
                    ,{name: 'scr2', minWidth: 480}
                    ,{name: 'scr1', minWidth: 0}
                  ]
      ,parentNodes = this
      ,equalizeParentNodes = [];

      /*  Break up parent nodes, find child nodes and group child nodes by tag name.
          RWD behavior specified by class "equalize-children-rwd-{screen}-{screen}".
          Tag groups are specified by class "equalize-group-{tag}".

          Example data structure:
            [
              {
                rwdBehavior: 'scr3-scr4'
                ,childrenByTag: {'tag1': <jQuery-node-list>, 'tag2': <jQuery-node-list>, ... }
              }
              ...
            ]
      */

    parentNodes.each(function() {

      var $parentNode = $(this)     // a parent node
        ,prefix = _getSuffixOfClass($parentNode.attr('class'), 'equalize-children-groupprefix-') || "";

      if (prefix.length !== 0) {
        prefix += '-';
      }
      // Find all child nodes that have the class "equalize-group-{tagName}", e.g. "equalize-group-title"
      var $children = $parentNode.find("[class^='equalize-group-" + prefix + "'],[class*=' equalize-group-" + prefix + "']");

      // Group children nodes by tag name, e.g. "equalize-group-title" ==> tag "title"
      var childrenByTag = {};
      $children.each(function() {
        var tag = _getSuffixOfClass($(this).attr('class'), 'equalize-group-');
        if (childrenByTag[tag] == null) {
          childrenByTag[tag] = $();   // empty jQuery object
        }
        childrenByTag[tag] = childrenByTag[tag].add($(this));   // jQuery "add()" does not modify the original jQuery object
      });

      // add to array of parent nodes to equalize
      equalizeParentNodes.push({
                        rwdBehavior: (_getSuffixOfClass($parentNode.attr('class'), 'equalize-children-rwd-') || defaultRwd)
                        ,childrenByTag: childrenByTag
                      });
    });

    // helper to find CSS class suffix based on CSS class prefix, e.g "... equalize-group-title ..." ==> "title"
    function _getSuffixOfClass(className, prefix) {
      var regEx = new RegExp(prefix + '([^\\s]*)')
        ,match = regEx.exec(className);
      return (match && match.length > 0 ? match[1] : null);
    }

    // Does the actual equalization.  Called initially and upon resize.
    // Iterate over "equalizeParentNodes", check RWD behavior (if specified), and equalize children nodes by tag
    function _equalizeChildrenNodes() {

      var windowWidth = $(window).width();

      $.each(equalizeParentNodes, function(i, parentGroup) {

        var rwdBehavior = parentGroup.rwdBehavior
          ,childrenByTag = parentGroup.childrenByTag
          ,equalizeForScreen = !rwdBehavior;    // if no RWD behavior specified then equalize for all screen sizes

        // check RWD behavior and if equalization is needed for this screen
        if (rwdBehavior) {

          // find current screen size and see if "rwdBehavior" contains that string
          for (var i=0; i<screenMap.length; i++) {
            var screen = screenMap[i];

            if (windowWidth >= screen.minWidth) {
              if (rwdBehavior.indexOf(screen.name) != -1) {
                  equalizeForScreen = true;
              }
              break;  // break after finding correct screen size, whether there was a match on RWD behavior or not
            }
          }
        }

        // equalize children with the same tagname
        for (var tag in childrenByTag) {
          var $tagNodes = childrenByTag[tag];

          // auto height nodes, if there was some hardcoded height, or that screen doesn't require equalizing
          $tagNodes.css('height', '');

          if (equalizeForScreen) {
            // find max height and set all children to that height
            $tagNodes.height(Math.max.apply( null, $tagNodes.map(function(i, e){ return $(e).height() }).toArray() ));   // IE8 needs toArray() to make true array, not "array-like"
          }
        }
      });
    }

    // initial call to equalize children nodes
    _equalizeChildrenNodes();

		// if _.throttle defined, equalize children nodes on window resize, throttled by 1sec
    if (_ && _.throttle) {
  		var throttledEqualizeOnResize = _.throttle(_equalizeChildrenNodes, 1000);
  		$(window).resize(throttledEqualizeOnResize);
    }

    return this;  // for chaining

  }

})(jQuery);


// INITIALIZATION CALL FOR EQUALIZING CHILDREN

/* STANDARD INITIALIZATION */

$(document).ready(function() {
  $('div.equalize-children').equalizeChildren();
});

/* INITIALIZATION - TEST TWO CALLS TO DIFFERENT NODE SETS */
/*
$(document).ready(function() {
  $('div.equalize-children').eq(0).equalizeChildren();
  $('div.equalize-children').eq(1).equalizeChildren();
});
*/

/* INITIALIZATION - DEFAULT RWD SCREENS 3 & 4 */
/*
$(document).ready(function() {
  $('div.equalize-children').equalizeChildren({'defaultRwd': 'scr3-scr4'});
});
*/
