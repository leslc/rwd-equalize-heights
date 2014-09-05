/*  
	BORROWING "_throttle" FUNCTION FROM underscore.js (we're using an older version that doesn't depend on "_.date")
	Only include if you aren't including underscore.js 
*/

if (typeof(_) === 'undefined') {
	var _ = {
	  throttle : function (func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    options || (options = {});
	    var later = function() {
	      previous = options.leading === false ? 0 : new Date();
	      timeout = null;
	      result = func.apply(context, args);
	    };
	    return function() {
	      var now = new Date();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0) {
	        clearTimeout(timeout);
	        timeout = null;
	        previous = now;
	        result = func.apply(context, args);
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  }
	}
}
