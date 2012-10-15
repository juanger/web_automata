(function($) {
  $.widget("ui.stack", {
    options: {
      current: -1
    },

    _create: function() {
      var self = this,
        o = self.options,
        el = self.element;

      var string = el.html();
      var len = string.length;
      var sym;
      el.addClass("ui-stack");
      el.html("");
      for (var i = len-1; i >= 0; --i) {
        sym = $("<span></span>").addClass("ui-symbol");
        if (i === o.current) {
          sym.addClass("ui-current");
        }
        el.append(sym.html(string.charAt(i)));
      }
    },

    push: function( newValue ) {
      this.element.prepend("<span class='ui-symbol'>" + newValue + "</span>");
    },

    pop: function() {
        var top = this.element.children().first();
        top.remove();
        return top.html();
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