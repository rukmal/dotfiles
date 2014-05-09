(function() {
  var _definitions, _regexes;

  _definitions = {};

  _regexes = {
    'variable:sass': '\\$__VARIABLE__\\:[\\s?](.+)[\\;|\\n]',
    'variable:less': '\\@__VARIABLE__\\:[\\s?](.+)[\\;|\\n]'
  };

  module.exports = {
    findDefinition: function(name, type) {
      var _definition, _pointer, _regex, _regexString, _results;
      if (!(_regexString = _regexes[type])) {
        return;
      }
      _regex = RegExp(_regexString.replace('__VARIABLE__', name));
      _results = [];
      if (_definition = _definitions[name]) {
        _pointer = _definition.pointer;
        return (atom.project.bufferForPath(_pointer.filePath)).then((function(_this) {
          return function(buffer) {
            var _text;
            _text = buffer.getTextInRange(_pointer.range);
            _definition.definition = (_text.match(_regex))[1];
            return _definition;
          };
        })(this));
      }
      return atom.project.scan(_regex, void 0, function(result) {
        return _results.push(result);
      }).then((function(_this) {
        return function() {
          var i, pathFragment, result, _bestMatch, _bestMatchHits, _i, _j, _len, _len1, _match, _pathFragments, _targetFragments, _targetPath, _thisMatchHits;
          _targetPath = atom.workspaceView.getActivePaneItem().getPath();
          _targetFragments = _targetPath.split('/');
          _bestMatch = null;
          _bestMatchHits = 0;
          for (_i = 0, _len = _results.length; _i < _len; _i++) {
            result = _results[_i];
            _thisMatchHits = 0;
            _pathFragments = result.filePath.split('/');
            for (i = _j = 0, _len1 = _pathFragments.length; _j < _len1; i = ++_j) {
              pathFragment = _pathFragments[i];
              if (pathFragment === _targetFragments[i]) {
                _thisMatchHits++;
              }
            }
            if (_thisMatchHits > _bestMatchHits) {
              _bestMatch = result;
              _bestMatchHits = _thisMatchHits;
            }
          }
          if (!(_bestMatch && (_match = _bestMatch.matches[0]))) {
            return;
          }
          _definitions[name] = {
            name: name,
            type: type,
            pointer: {
              filePath: _bestMatch.filePath,
              range: _match.range
            }
          };
          return _this.findDefinition(name, type);
        };
      })(this));
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBSVE7QUFBQSxNQUFBLHNCQUFBOztBQUFBLEVBQUEsWUFBQSxHQUFlLEVBQWYsQ0FBQTs7QUFBQSxFQUtBLFFBQUEsR0FBVztBQUFBLElBQ1AsZUFBQSxFQUFpQix1Q0FEVjtBQUFBLElBRVAsZUFBQSxFQUFpQix1Q0FGVjtHQUxYLENBQUE7O0FBQUEsRUFhQSxNQUFNLENBQUMsT0FBUCxHQUlJO0FBQUEsSUFBQSxjQUFBLEVBQWdCLFNBQUMsSUFBRCxFQUFPLElBQVAsR0FBQTtBQUNaLFVBQUEscURBQUE7QUFBQSxNQUFBLElBQUEsQ0FBQSxDQUFjLFlBQUEsR0FBZSxRQUFTLENBQUEsSUFBQSxDQUF4QixDQUFkO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFBQSxNQUNBLE1BQUEsR0FBUyxNQUFBLENBQVEsWUFBWSxDQUFDLE9BQWIsQ0FBcUIsY0FBckIsRUFBcUMsSUFBckMsQ0FBUixDQURULENBQUE7QUFBQSxNQUdBLFFBQUEsR0FBVyxFQUhYLENBQUE7QUFNQSxNQUFBLElBQUcsV0FBQSxHQUFjLFlBQWEsQ0FBQSxJQUFBLENBQTlCO0FBQ0ksUUFBQSxRQUFBLEdBQVcsV0FBVyxDQUFDLE9BQXZCLENBQUE7QUFFQSxlQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFiLENBQTJCLFFBQVEsQ0FBQyxRQUFwQyxDQUFELENBQThDLENBQUMsSUFBL0MsQ0FBb0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLE1BQUQsR0FBQTtBQUN2RCxnQkFBQSxLQUFBO0FBQUEsWUFBQSxLQUFBLEdBQVEsTUFBTSxDQUFDLGNBQVAsQ0FBc0IsUUFBUSxDQUFDLEtBQS9CLENBQVIsQ0FBQTtBQUFBLFlBQ0EsV0FBVyxDQUFDLFVBQVosR0FBeUIsQ0FBQyxLQUFLLENBQUMsS0FBTixDQUFZLE1BQVosQ0FBRCxDQUFxQixDQUFBLENBQUEsQ0FEOUMsQ0FBQTtBQUVBLG1CQUFPLFdBQVAsQ0FIdUQ7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwRCxDQUFQLENBSEo7T0FOQTthQWVBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBYixDQUFrQixNQUFsQixFQUEwQixNQUExQixFQUFxQyxTQUFDLE1BQUQsR0FBQTtlQUNqQyxRQUFRLENBQUMsSUFBVCxDQUFjLE1BQWQsRUFEaUM7TUFBQSxDQUFyQyxDQUVBLENBQUMsSUFGRCxDQUVNLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFHRixjQUFBLCtJQUFBO0FBQUEsVUFBQSxXQUFBLEdBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBbkIsQ0FBQSxDQUFzQyxDQUFDLE9BQXZDLENBQUEsQ0FBZCxDQUFBO0FBQUEsVUFDQSxnQkFBQSxHQUFtQixXQUFXLENBQUMsS0FBWixDQUFrQixHQUFsQixDQURuQixDQUFBO0FBQUEsVUFHQSxVQUFBLEdBQWEsSUFIYixDQUFBO0FBQUEsVUFJQSxjQUFBLEdBQWlCLENBSmpCLENBQUE7QUFNQSxlQUFBLCtDQUFBO2tDQUFBO0FBQ0ksWUFBQSxjQUFBLEdBQWlCLENBQWpCLENBQUE7QUFBQSxZQUNBLGNBQUEsR0FBaUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFoQixDQUFzQixHQUF0QixDQURqQixDQUFBO0FBRUEsaUJBQUEsK0RBQUE7K0NBQUE7a0JBQTRELFlBQUEsS0FBZ0IsZ0JBQWlCLENBQUEsQ0FBQTtBQUE3RixnQkFBQSxjQUFBLEVBQUE7ZUFBQTtBQUFBLGFBRkE7QUFJQSxZQUFBLElBQUcsY0FBQSxHQUFpQixjQUFwQjtBQUNJLGNBQUEsVUFBQSxHQUFhLE1BQWIsQ0FBQTtBQUFBLGNBQ0EsY0FBQSxHQUFpQixjQURqQixDQURKO2FBTEo7QUFBQSxXQU5BO0FBY0EsVUFBQSxJQUFBLENBQUEsQ0FBYyxVQUFBLElBQWUsQ0FBQSxNQUFBLEdBQVMsVUFBVSxDQUFDLE9BQVEsQ0FBQSxDQUFBLENBQTVCLENBQTdCLENBQUE7QUFBQSxrQkFBQSxDQUFBO1dBZEE7QUFBQSxVQWdCQSxZQUFhLENBQUEsSUFBQSxDQUFiLEdBQXFCO0FBQUEsWUFDakIsSUFBQSxFQUFNLElBRFc7QUFBQSxZQUVqQixJQUFBLEVBQU0sSUFGVztBQUFBLFlBSWpCLE9BQUEsRUFDSTtBQUFBLGNBQUEsUUFBQSxFQUFVLFVBQVUsQ0FBQyxRQUFyQjtBQUFBLGNBQ0EsS0FBQSxFQUFPLE1BQU0sQ0FBQyxLQURkO2FBTGE7V0FoQnJCLENBQUE7QUF5QkEsaUJBQU8sS0FBQyxDQUFBLGNBQUQsQ0FBZ0IsSUFBaEIsRUFBc0IsSUFBdEIsQ0FBUCxDQTVCRTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRk4sRUFoQlk7SUFBQSxDQUFoQjtHQWpCSixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/rukmal/.atom/packages/color-picker/lib/variable-inspector.coffee