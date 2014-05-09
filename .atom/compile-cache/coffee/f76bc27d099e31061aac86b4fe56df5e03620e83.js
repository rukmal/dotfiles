(function() {
  var $el, $selection, Convert, _context, _height, _hexes, _width;

  Convert = require('./ColorPicker-convert');

  _hexes = ['FF0000', 'FFFF00', '00FF00', '00FFFF', '0000FF', 'FF00FF', 'FF0000'];

  $el = atom.workspaceView.find('#ColorPicker-hueSelector');

  $selection = atom.workspaceView.find('#ColorPicker-hueSelection');

  _context = $el[0].getContext('2d');

  _width = $el.width();

  _height = $el.height();

  module.exports = {
    $el: $el,
    $selection: $selection,
    width: _width,
    height: _height,
    render: function() {
      var hex, i, _gradient, _i, _len, _step;
      _gradient = _context.createLinearGradient(0, 0, 1, _height);
      _step = 1 / (_hexes.length - 1);
      for (i = _i = 0, _len = _hexes.length; _i < _len; i = ++_i) {
        hex = _hexes[i];
        _gradient.addColorStop(_step * i, hex);
      }
      _context.fillStyle = _gradient;
      return _context.fillRect(0, 0, _width, _height);
    },
    getColorAtPosition: function(positionY) {
      var _data;
      _data = (_context.getImageData(1, positionY - 1, 1, 1)).data;
      return {
        color: '#' + Convert.rgbToHex(_data),
        type: 'hex'
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBR1E7QUFBQSxNQUFBLDJEQUFBOztBQUFBLEVBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSx1QkFBUixDQUFWLENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsQ0FBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQixRQUEvQixFQUF5QyxRQUF6QyxFQUFtRCxRQUFuRCxFQUE2RCxRQUE3RCxDQURULENBQUE7O0FBQUEsRUFHQSxHQUFBLEdBQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFuQixDQUF3QiwwQkFBeEIsQ0FITixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBbkIsQ0FBd0IsMkJBQXhCLENBSmIsQ0FBQTs7QUFBQSxFQUtBLFFBQUEsR0FBVyxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsVUFBUCxDQUFrQixJQUFsQixDQUxYLENBQUE7O0FBQUEsRUFNQSxNQUFBLEdBQVMsR0FBRyxDQUFDLEtBQUosQ0FBQSxDQU5ULENBQUE7O0FBQUEsRUFPQSxPQUFBLEdBQVUsR0FBRyxDQUFDLE1BQUosQ0FBQSxDQVBWLENBQUE7O0FBQUEsRUFZQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsSUFBQSxHQUFBLEVBQUssR0FBTDtBQUFBLElBQ0EsVUFBQSxFQUFZLFVBRFo7QUFBQSxJQUVBLEtBQUEsRUFBTyxNQUZQO0FBQUEsSUFHQSxNQUFBLEVBQVEsT0FIUjtBQUFBLElBTUEsTUFBQSxFQUFRLFNBQUEsR0FBQTtBQUNKLFVBQUEsa0NBQUE7QUFBQSxNQUFBLFNBQUEsR0FBWSxRQUFRLENBQUMsb0JBQVQsQ0FBOEIsQ0FBOUIsRUFBaUMsQ0FBakMsRUFBb0MsQ0FBcEMsRUFBdUMsT0FBdkMsQ0FBWixDQUFBO0FBQUEsTUFDQSxLQUFBLEdBQVEsQ0FBQSxHQUFJLENBQUMsTUFBTSxDQUFDLE1BQVAsR0FBZ0IsQ0FBakIsQ0FEWixDQUFBO0FBR0EsV0FBQSxxREFBQTt3QkFBQTtBQUFBLFFBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBd0IsS0FBQSxHQUFRLENBQWhDLEVBQW9DLEdBQXBDLENBQUEsQ0FBQTtBQUFBLE9BSEE7QUFBQSxNQUlBLFFBQVEsQ0FBQyxTQUFULEdBQXFCLFNBSnJCLENBQUE7YUFLQSxRQUFRLENBQUMsUUFBVCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixNQUF4QixFQUFnQyxPQUFoQyxFQU5JO0lBQUEsQ0FOUjtBQUFBLElBZUEsa0JBQUEsRUFBb0IsU0FBQyxTQUFELEdBQUE7QUFDaEIsVUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsQ0FBQyxRQUFRLENBQUMsWUFBVCxDQUFzQixDQUF0QixFQUEwQixTQUFBLEdBQVksQ0FBdEMsRUFBMEMsQ0FBMUMsRUFBNkMsQ0FBN0MsQ0FBRCxDQUFnRCxDQUFDLElBQXpELENBQUE7QUFFQSxhQUFPO0FBQUEsUUFDSCxLQUFBLEVBQVEsR0FBQSxHQUFNLE9BQU8sQ0FBQyxRQUFSLENBQWlCLEtBQWpCLENBRFg7QUFBQSxRQUVILElBQUEsRUFBTSxLQUZIO09BQVAsQ0FIZ0I7SUFBQSxDQWZwQjtHQWJKLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/rukmal/.atom/packages/color-picker/lib/ColorPicker-hueSelector.coffee