(function($) {
  $.widget("ui.tape", {
    options: {
      current: -1
    },

    _create: function() {
      var self = this,
        o = self.options,
        el = self.element;

      var len = el.html().length, string = el.html();
      var sym;
      el.addClass("ui-tape");
      el.html("");
      for (var i=0; i < len; i++) {
        sym = $("<span></span>").addClass("ui-symbol");
        if (i === o.current) {
          sym.addClass("ui-current");
        }
        el.append(sym.html(string.charAt(i)));
      }
    },

    current: function( newValue ) {
      if ( newValue === undefined ) {
        return this.options.current;
      }

      this._setOption( "current", newValue );
      return this;
    },

    next: function() {
      this.current(this.options.current + 1);
    },

    previous: function() {
      this.current(this.options.current - 1);
    },

    reset: function() {
      this.current(-1);
    },

    _setOption: function( key, value ) {
      switch ( key ) {
        case "current":
          var children = this.element.children();
          $(children[this.options.current]).removeClass("ui-current");
          $(children[value]).addClass("ui-current");
          this.options.current = value;
          break;
      }

      $.Widget.prototype._setOption.apply( this, arguments );
    }
  });
})(jQuery);