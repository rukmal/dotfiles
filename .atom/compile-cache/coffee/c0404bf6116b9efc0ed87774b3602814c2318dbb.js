(function() {
  var exec, path;

  exec = require('child_process').exec;

  path = require('path');

  module.exports = {
    configDefaults: {
      app: 'Terminal.app',
      args: ''
    },
    activate: function() {
      return atom.workspaceView.command("atom-terminal:open", (function(_this) {
        return function() {
          return _this.open();
        };
      })(this));
    },
    open: function() {
      var app, args, dirpath, filepath, _ref, _ref1;
      filepath = (_ref = atom.workspaceView.find('.tree-view .selected')) != null ? (_ref1 = _ref.view()) != null ? typeof _ref1.getPath === "function" ? _ref1.getPath() : void 0 : void 0 : void 0;
      if (filepath) {
        dirpath = path.dirname(filepath);
        app = atom.config.get('atom-terminal.app');
        args = atom.config.get('atom-terminal.args');
        if (dirpath != null) {
          return exec("open -a " + app + " " + args + " " + dirpath);
        }
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFVBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLGVBQVIsQ0FBd0IsQ0FBQyxJQUFoQyxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxJQUFBLGNBQUEsRUFBZ0I7QUFBQSxNQUNaLEdBQUEsRUFBSyxjQURPO0FBQUEsTUFFWixJQUFBLEVBQU0sRUFGTTtLQUFoQjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNOLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsb0JBQTNCLEVBQWlELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLElBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakQsRUFETTtJQUFBLENBSlY7QUFBQSxJQU9BLElBQUEsRUFBTSxTQUFBLEdBQUE7QUFDRixVQUFBLHlDQUFBO0FBQUEsTUFBQSxRQUFBLGlKQUFrRSxDQUFFLG9DQUFwRSxDQUFBO0FBQ0EsTUFBQSxJQUFHLFFBQUg7QUFDSSxRQUFBLE9BQUEsR0FBVSxJQUFJLENBQUMsT0FBTCxDQUFhLFFBQWIsQ0FBVixDQUFBO0FBQUEsUUFDQSxHQUFBLEdBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG1CQUFoQixDQUROLENBQUE7QUFBQSxRQUVBLElBQUEsR0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0JBQWhCLENBRlAsQ0FBQTtBQUdBLFFBQUEsSUFBNEMsZUFBNUM7aUJBQUEsSUFBQSxDQUFNLFVBQUEsR0FBUyxHQUFULEdBQWMsR0FBZCxHQUFnQixJQUFoQixHQUFzQixHQUF0QixHQUF3QixPQUE5QixFQUFBO1NBSko7T0FGRTtJQUFBLENBUE47R0FKSixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/rukmal/.atom/packages/atom-terminal/lib/atom-terminal.coffee