(function() {
  var AlphaSelector, ColorPicker, ColorPickerView, Convert, HueSelector, SaturationSelector, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  Convert = require('./ColorPicker-convert');

  ColorPicker = void 0;

  SaturationSelector = void 0;

  HueSelector = void 0;

  AlphaSelector = void 0;

  module.exports = ColorPickerView = (function(_super) {
    __extends(ColorPickerView, _super);

    function ColorPickerView() {
      return ColorPickerView.__super__.constructor.apply(this, arguments);
    }

    ColorPickerView.content = function() {
      var c;
      c = 'ColorPicker-';
      return this.div({
        id: 'ColorPicker',
        "class": 'ColorPicker'
      }, (function(_this) {
        return function() {
          _this.div({
            id: c + 'loader',
            "class": c + 'loader'
          }, function() {
            _this.div({
              "class": c + 'loaderDot'
            });
            _this.div({
              "class": c + 'loaderDot'
            });
            return _this.div({
              "class": c + 'loaderDot'
            });
          });
          _this.div({
            id: c + 'color',
            "class": c + 'color'
          }, function() {
            return _this.div({
              id: c + 'value',
              "class": c + 'value'
            });
          });
          _this.div({
            id: c + 'initialWrapper',
            "class": c + 'initialWrapper'
          }, function() {
            return _this.div({
              id: c + 'initial',
              "class": c + 'initial'
            });
          });
          return _this.div({
            id: c + 'picker',
            "class": c + 'picker'
          }, function() {
            _this.div({
              id: c + 'saturationSelectorWrapper',
              "class": c + 'saturationSelectorWrapper'
            }, function() {
              _this.div({
                id: c + 'saturationSelection',
                "class": c + 'saturationSelection'
              });
              return _this.canvas({
                id: c + 'saturationSelector',
                "class": c + 'saturationSelector',
                width: '180px',
                height: '180px'
              });
            });
            _this.div({
              id: c + 'alphaSelectorWrapper',
              "class": c + 'alphaSelectorWrapper'
            }, function() {
              _this.div({
                id: c + 'alphaSelection',
                "class": c + 'alphaSelection'
              });
              return _this.canvas({
                id: c + 'alphaSelector',
                "class": c + 'alphaSelector',
                width: '20px',
                height: '180px'
              });
            });
            return _this.div({
              id: c + 'hueSelectorWrapper',
              "class": c + 'hueSelectorWrapper'
            }, function() {
              _this.div({
                id: c + 'hueSelection',
                "class": c + 'hueSelection'
              });
              return _this.canvas({
                id: c + 'hueSelector',
                "class": c + 'hueSelector',
                width: '20px',
                height: '180px'
              });
            });
          });
        };
      })(this));
    };

    ColorPickerView.prototype.initialize = function() {
      (atom.workspaceView.find('.vertical')).append(this);
      ColorPicker = require('./ColorPicker');
      SaturationSelector = require('./ColorPicker-saturationSelector');
      AlphaSelector = require('./ColorPicker-alphaSelector');
      HueSelector = require('./ColorPicker-hueSelector');
      HueSelector.render();
      return this.bind();
    };

    ColorPickerView.prototype.destroy = function() {
      this.close();
      this.remove();
      return this.detach();
    };

    ColorPickerView.prototype.storage = {
      activeView: null,
      selectedColor: null,
      pickedColor: null,
      saturation: {
        x: 0,
        y: 0
      },
      hue: 0,
      alpha: 0
    };

    ColorPickerView.prototype.isOpen = false;

    ColorPickerView.prototype.reset = function() {
      this.addClass('is--visible is--initial');
      this.removeClass('no--arrow is--pointer is--searching');
      (this.find('#ColorPicker-value')).html('');
      (this.find('#ColorPicker-color')).css('background-color', '').css('border-bottom-color', '');
      return (this.find('#ColorPicker-value')).attr('data-variable', '');
    };

    ColorPickerView.prototype.open = function() {
      var _colorPickerHeight, _colorPickerWidth, _gutterWidth, _halfColorPickerWidth, _left, _pane, _paneOffset, _position, _scroll, _selectedColor, _tabBarHeight, _top, _view, _viewHeight, _viewWidth;
      this.isOpen = true;
      _selectedColor = this.storage.selectedColor;
      if (!_selectedColor) {
        this.addClass('is--searching');
      }
      if (!_selectedColor || _selectedColor.hasOwnProperty('pointer')) {
        this.addClass('is--pointer');
      }
      _colorPickerWidth = this.width();
      _colorPickerHeight = this.height();
      _halfColorPickerWidth = _colorPickerWidth / 2;
      _pane = atom.workspaceView.getActivePaneView();
      _paneOffset = {
        top: _pane[0].offsetTop,
        left: _pane[0].offsetLeft
      };
      _tabBarHeight = (_pane.find('.tab-bar')).height();
      this.storage.activeView = _view = _pane.activeView;
      _position = _view.pixelPositionForScreenPosition(_view.getEditor().getCursorScreenPosition());
      _gutterWidth = (_view.find('.gutter')).width();
      _scroll = {
        top: _view.scrollTop(),
        left: _view.scrollLeft()
      };
      _view.verticalScrollbar.on('scroll.color-picker', (function(_this) {
        return function() {
          return _this.scroll();
        };
      })(this));
      _top = 15 + _position.top - _scroll.top + _view.lineHeight + _tabBarHeight;
      _left = _position.left - _scroll.left + _gutterWidth;
      _viewWidth = _view.width();
      _viewHeight = _view.height();
      if (_top + _colorPickerHeight - 15 > _viewHeight) {
        _top = _viewHeight + _tabBarHeight - _colorPickerHeight - 20;
        this.addClass('no--arrow');
      }
      _top += _paneOffset.top;
      if (_left + _halfColorPickerWidth > _viewWidth) {
        _left = _viewWidth - _halfColorPickerWidth - 20;
        this.addClass('no--arrow');
      }
      _left += _paneOffset.left - _halfColorPickerWidth;
      return this.css('top', Math.max(20, _top)).css('left', Math.max(20, _left));
    };

    ColorPickerView.prototype.close = function() {
      this.isOpen = false;
      this.removeClass('is--visible is--initial is--searching is--error');
      if (!this.storage.activeView) {
        return;
      }
      return this.storage.activeView.verticalScrollbar.off('scroll.color-picker');
    };

    ColorPickerView.prototype.error = function() {
      this.storage.selectedColor = null;
      return this.removeClass('is--searching').addClass('is--error');
    };

    ColorPickerView.prototype.scroll = function() {
      if (this.isOpen) {
        return this.close();
      }
    };

    ColorPickerView.prototype.bind = function() {
      var $body;
      window.onresize = (function(_this) {
        return function() {
          if (_this.isOpen) {
            return _this.close();
          }
        };
      })(this);
      atom.workspaceView.on('pane:active-item-changed', (function(_this) {
        return function() {
          return _this.close();
        };
      })(this));
      $body = this.parents('body');
      (function(_this) {
        return (function() {
          return $body.on('mousedown', function(e) {
            var _className, _color, _pointer, _target;
            _target = e.target;
            _className = _target.className;
            if (!/ColorPicker/.test(_className)) {
              return _this.close();
            }
            _color = _this.storage.selectedColor;
            switch (_className) {
              case 'ColorPicker-color':
                if ((_color != null ? _color.hasOwnProperty('pointer') : void 0) && (_pointer = _color.pointer)) {
                  (atom.workspace.open(_pointer.filePath))["finally"](function() {
                    var _editor;
                    _editor = atom.workspace.activePaneItem;
                    _editor.clearSelections();
                    return _editor.setSelectedBufferRange(_pointer.range);
                  });
                } else {
                  _this.replaceColor();
                }
                return _this.close();
              case 'ColorPicker-initialWrapper':
                _this.inputColor(_color);
                return _this.addClass('is--initial');
            }
          }).on('keydown', function(e) {
            if (!_this.isOpen) {
              return;
            }
            if (e.which !== 13) {
              return _this.close();
            }
            e.preventDefault();
            e.stopPropagation();
            _this.replaceColor();
            return _this.close();
          });
        });
      })(this)();
      (function(_this) {
        return (function() {
          var _isGrabbingSaturationSelection;
          _isGrabbingSaturationSelection = false;
          return $body.on('mousedown mousemove mouseup', function(e) {
            var _offset, _offsetX, _offsetY;
            _offset = SaturationSelector.$el.offset();
            _offsetY = Math.max(1, Math.min(SaturationSelector.height, e.pageY - _offset.top));
            _offsetX = Math.max(1, Math.min(SaturationSelector.width, e.pageX - _offset.left));
            switch (e.type) {
              case 'mousedown':
                if (e.target.className !== 'ColorPicker-saturationSelector') {
                  return;
                }
                e.preventDefault();
                _isGrabbingSaturationSelection = true;
                break;
              case 'mousemove':
                if (!_isGrabbingSaturationSelection) {
                  return;
                }
                e.preventDefault();
                break;
              case 'mouseup':
                _isGrabbingSaturationSelection = false;
            }
            if (!_isGrabbingSaturationSelection) {
              return;
            }
            _this.setSaturation(_offsetX, _offsetY);
            return _this.refreshColor('saturation');
          });
        });
      })(this)();
      (function(_this) {
        return (function() {
          var _isGrabbingAlphaSelection;
          _isGrabbingAlphaSelection = false;
          return $body.on('mousedown mousemove mouseup', function(e) {
            var _offsetTop, _offsetY;
            _offsetTop = AlphaSelector.$el.offset().top;
            _offsetY = Math.max(1, Math.min(AlphaSelector.height, e.pageY - _offsetTop));
            switch (e.type) {
              case 'mousedown':
                if (e.target.className !== 'ColorPicker-alphaSelector') {
                  return;
                }
                e.preventDefault();
                _isGrabbingAlphaSelection = true;
                break;
              case 'mousemove':
                if (!_isGrabbingAlphaSelection) {
                  return;
                }
                e.preventDefault();
                break;
              case 'mouseup':
                _isGrabbingAlphaSelection = false;
            }
            if (!_isGrabbingAlphaSelection) {
              return;
            }
            _this.setAlpha(_offsetY);
            return _this.refreshColor('alpha');
          });
        });
      })(this)();
      return (function(_this) {
        return function() {
          var _isGrabbingHueSelection;
          _isGrabbingHueSelection = false;
          return $body.on('mousedown mousemove mouseup', function(e) {
            var _offsetTop, _offsetY;
            _offsetTop = HueSelector.$el.offset().top;
            _offsetY = Math.max(1, Math.min(HueSelector.height, e.pageY - _offsetTop));
            switch (e.type) {
              case 'mousedown':
                if (e.target.className !== 'ColorPicker-hueSelector') {
                  return;
                }
                e.preventDefault();
                _isGrabbingHueSelection = true;
                break;
              case 'mousemove':
                if (!_isGrabbingHueSelection) {
                  return;
                }
                e.preventDefault();
                break;
              case 'mouseup':
                _isGrabbingHueSelection = false;
            }
            if (!_isGrabbingHueSelection) {
              return;
            }
            _this.setHue(_offsetY);
            return _this.refreshColor('hue');
          });
        };
      })(this)();
    };

    ColorPickerView.prototype.setSaturation = function(positionX, positionY) {
      var _percentageLeft, _percentageTop;
      this.storage.saturation.x = positionX;
      this.storage.saturation.y = positionY;
      _percentageTop = (positionY / SaturationSelector.height) * 100;
      _percentageLeft = (positionX / SaturationSelector.width) * 100;
      return SaturationSelector.$selection.css('top', _percentageTop + '%').css('left', _percentageLeft + '%');
    };

    ColorPickerView.prototype.refreshSaturationCanvas = function() {
      var _color;
      _color = HueSelector.getColorAtPosition(this.storage.hue);
      return SaturationSelector.render(_color.color);
    };

    ColorPickerView.prototype.setAlpha = function(positionY) {
      this.storage.alpha = positionY;
      return AlphaSelector.$selection.css('top', (positionY / AlphaSelector.height) * 100 + '%');
    };

    ColorPickerView.prototype.refreshAlphaCanvas = function() {
      var _color, _saturation;
      _saturation = this.storage.saturation;
      _color = SaturationSelector.getColorAtPosition(_saturation.x, _saturation.y);
      return AlphaSelector.render(Convert.hexToRgb(_color.color));
    };

    ColorPickerView.prototype.setHue = function(positionY) {
      this.storage.hue = positionY;
      return HueSelector.$selection.css('top', (positionY / HueSelector.height) * 100 + '%');
    };

    ColorPickerView.prototype.setColor = function(color) {
      var _alphaValue, _color, _rgb, _saturation, _setInitialColor;
      if (!color) {
        this.removeClass('is--initial');
      } else {
        _setInitialColor = true;
      }
      _saturation = this.storage.saturation;
      if (color == null) {
        color = SaturationSelector.getColorAtPosition(_saturation.x, _saturation.y);
      }
      _color = color.color;
      _alphaValue = 100 - (((this.storage.alpha / AlphaSelector.height) * 100) << 0);
      if (_alphaValue !== 100) {
        _rgb = (function() {
          switch (color.type) {
            case 'hex':
              return Convert.hexToRgb(color.color);
            case 'rgb':
              return color.color;
          }
        })();
        if (_rgb) {
          _color = "rgba(" + (_rgb.join(', ')) + ", " + (_alphaValue / 100) + ")";
        }
      }
      this.storage.pickedColor = _color;
      (this.find('#ColorPicker-value')).html(_color);
      (this.find('#ColorPicker-color')).css('background-color', _color).css('border-bottom-color', _color);
      if (_setInitialColor) {
        (this.find('#ColorPicker-initial')).css('background-color', _color).html(_color);
      }
      if (color.hasOwnProperty('pointer')) {
        return this.removeClass('is--searching').find('#ColorPicker-value').attr('data-variable', color.match);
      }
    };

    ColorPickerView.prototype.refreshColor = function(trigger) {
      if (trigger === 'hue') {
        this.refreshSaturationCanvas();
      }
      if (trigger === 'hue' || trigger === 'saturation') {
        this.refreshAlphaCanvas();
      }
      return this.setColor();
    };

    ColorPickerView.prototype.inputColor = function(color) {
      var _alpha, _color, _hex, _hsv, _saturationX, _saturationY;
      _color = color.color;
      if (color.type === 'hexa') {
        _hex = (_color.match(/rgba\((\#.+),/))[1];
        color.type = 'rgba';
        _color = color.color = _color.replace(_hex, (Convert.hexToRgb(_hex)).join(', '));
      }
      _hsv = (function() {
        switch (color.type) {
          case 'rgba':
            return Convert.rgbToHsv(_color);
          case 'rgb':
            return Convert.rgbToHsv(_color);
          case 'hex':
            return Convert.rgbToHsv(Convert.hexToRgb(_color));
        }
      })();
      if (!_hsv) {
        return;
      }
      this.setHue((HueSelector.height / 360) * _hsv[0]);
      _saturationX = Math.max(1, SaturationSelector.width * _hsv[1]);
      _saturationY = Math.max(1, SaturationSelector.height * (1 - _hsv[2]));
      this.setSaturation(_saturationX, _saturationY);
      this.refreshSaturationCanvas();
      if (color.type === 'rgba') {
        _alpha = parseFloat((_color.match(/rgba\((.+),(.+),(.+),(.+)\)/))[4]);
        if (_alpha !== 1) {
          this.setAlpha(AlphaSelector.height * (1 - _alpha));
        }
      }
      if (!_alpha) {
        this.setAlpha(0);
      }
      this.refreshAlphaCanvas();
      return this.setColor(color);
    };

    ColorPickerView.prototype.selectColor = function() {
      var _color, _editor;
      _color = this.storage.selectedColor;
      _editor = atom.workspace.getActiveEditor();
      _editor.clearSelections();
      return _editor.addSelectionForBufferRange({
        start: {
          column: _color.index,
          row: _color.row
        },
        end: {
          column: _color.end,
          row: _color.row
        }
      });
    };

    ColorPickerView.prototype.replaceColor = function() {
      var _color, _editor, _newColor;
      _color = this.storage.selectedColor;
      _newColor = this.storage.pickedColor;
      _editor = atom.workspace.getActiveEditor();
      this.selectColor();
      _editor.replaceSelectedText(null, (function(_this) {
        return function() {
          return _newColor;
        };
      })(this));
      _editor.clearSelections();
      return _editor.addSelectionForBufferRange({
        start: {
          column: _color.index,
          row: _color.row
        },
        end: {
          column: _color.index + _newColor.length,
          row: _color.row
        }
      });
    };

    return ColorPickerView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBR0k7QUFBQSxNQUFBLDJGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSx1QkFBUixDQURWLENBQUE7O0FBQUEsRUFHQSxXQUFBLEdBQWMsTUFIZCxDQUFBOztBQUFBLEVBSUEsa0JBQUEsR0FBcUIsTUFKckIsQ0FBQTs7QUFBQSxFQUtBLFdBQUEsR0FBYyxNQUxkLENBQUE7O0FBQUEsRUFNQSxhQUFBLEdBQWdCLE1BTmhCLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUF1QjtBQUNuQixzQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxlQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTtBQUNOLFVBQUEsQ0FBQTtBQUFBLE1BQUEsQ0FBQSxHQUFJLGNBQUosQ0FBQTthQUVBLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLEVBQUEsRUFBSSxhQUFKO0FBQUEsUUFBbUIsT0FBQSxFQUFPLGFBQTFCO09BQUwsRUFBOEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUMxQyxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLEVBQUEsRUFBSSxDQUFBLEdBQUksUUFBUjtBQUFBLFlBQWtCLE9BQUEsRUFBTyxDQUFBLEdBQUksUUFBN0I7V0FBTCxFQUE0QyxTQUFBLEdBQUE7QUFDeEMsWUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sQ0FBQSxHQUFJLFdBQVg7YUFBTCxDQUFBLENBQUE7QUFBQSxZQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxDQUFBLEdBQUksV0FBWDth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
//# sourceURL=/Users/rukmal/.atom/packages/color-picker/lib/ColorPicker-view.coffee