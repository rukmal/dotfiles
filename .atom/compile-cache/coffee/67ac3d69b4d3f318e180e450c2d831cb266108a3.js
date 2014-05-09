(function() {
  var $, $$, AutocompleteView, Editor, FuzzyProvider, Perf, Range, SimpleSelectListView, Utils, minimatch, path, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require("atom"), Editor = _ref.Editor, $ = _ref.$, $$ = _ref.$$, Range = _ref.Range;

  _ = require("underscore-plus");

  path = require("path");

  minimatch = require("minimatch");

  SimpleSelectListView = require("./simple-select-list-view");

  FuzzyProvider = require("./fuzzy-provider");

  Perf = require("./perf");

  Utils = require("./utils");

  module.exports = AutocompleteView = (function(_super) {
    __extends(AutocompleteView, _super);

    function AutocompleteView() {
      this.onChanged = __bind(this.onChanged, this);
      this.onSaved = __bind(this.onSaved, this);
      this.cursorMoved = __bind(this.cursorMoved, this);
      this.contentsModified = __bind(this.contentsModified, this);
      this.runAutocompletion = __bind(this.runAutocompletion, this);
      this.cancel = __bind(this.cancel, this);
      return AutocompleteView.__super__.constructor.apply(this, arguments);
    }

    AutocompleteView.prototype.currentBuffer = null;

    AutocompleteView.prototype.debug = false;

    AutocompleteView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      this.editor = this.editorView.editor;
      AutocompleteView.__super__.initialize.apply(this, arguments);
      this.addClass("autocomplete-plus");
      this.providers = [];
      if (this.currentFileBlacklisted()) {
        return;
      }
      this.registerProvider(new FuzzyProvider(this.editorView));
      this.handleEvents();
      this.setCurrentBuffer(this.editor.getBuffer());
      this.subscribeToCommand(this.editorView, "autocomplete-plus:activate", this.runAutocompletion);
      this.on("autocomplete-plus:select-next", (function(_this) {
        return function() {
          return _this.selectNextItemView();
        };
      })(this));
      this.on("autocomplete-plus:select-previous", (function(_this) {
        return function() {
          return _this.selectPreviousItemView();
        };
      })(this));
      return this.on("autocomplete-plus:cancel", (function(_this) {
        return function() {
          return _this.cancel();
        };
      })(this));
    };

    AutocompleteView.prototype.currentFileBlacklisted = function() {
      var blacklist, blacklistGlob, fileName, _i, _len;
      blacklist = (atom.config.get("autocomplete-plus.fileBlacklist") || "").split(",").map(function(s) {
        return s.trim();
      });
      fileName = path.basename(this.editor.getBuffer().getPath());
      for (_i = 0, _len = blacklist.length; _i < _len; _i++) {
        blacklistGlob = blacklist[_i];
        if (minimatch(fileName, blacklistGlob)) {
          return true;
        }
      }
      return false;
    };

    AutocompleteView.prototype.viewForItem = function(_arg) {
      var label, word;
      word = _arg.word, label = _arg.label;
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.span(word, {
              "class": "word"
            });
            if (label != null) {
              return _this.span(label, {
                "class": "label"
              });
            }
          };
        })(this));
      });
    };

    AutocompleteView.prototype.handleEvents = function() {
      this.list.on("mousewheel", function(event) {
        return event.stopPropagation();
      });
      this.editor.on("title-changed-subscription-removed", this.cancel);
      return this.editor.on("cursor-moved", this.cursorMoved);
    };

    AutocompleteView.prototype.registerProvider = function(provider) {
      if (_.findWhere(this.providers, provider) == null) {
        return this.providers.push(provider);
      }
    };

    AutocompleteView.prototype.unregisterProvider = function(provider) {
      return _.remove(this.providers, provider);
    };

    AutocompleteView.prototype.confirmed = function(match) {
      var position, replace;
      replace = match.provider.confirm(match);
      this.editor.getSelection().clear();
      this.cancel();
      if (!match) {
        return;
      }
      if (replace) {
        this.replaceTextWithMatch(match);
        position = this.editor.getCursorBufferPosition();
        return this.editor.setCursorBufferPosition([position.row, position.column]);
      }
    };

    AutocompleteView.prototype.cancel = function() {
      AutocompleteView.__super__.cancel.apply(this, arguments);
      if (!this.editorView.hasFocus()) {
        return this.editorView.focus();
      }
    };

    AutocompleteView.prototype.runAutocompletion = function() {
      var provider, providerSuggestions, suggestions, _i, _len, _ref1;
      suggestions = [];
      _ref1 = this.providers.slice().reverse();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        provider = _ref1[_i];
        providerSuggestions = provider.buildSuggestions();
        if (!(providerSuggestions != null ? providerSuggestions.length : void 0)) {
          continue;
        }
        if (provider.exclusive) {
          suggestions = providerSuggestions;
          break;
        } else {
          suggestions = suggestions.concat(providerSuggestions);
        }
      }
      if (!suggestions.length) {
        return;
      }
      this.setItems(suggestions);
      this.editorView.appendToLinesView(this);
      this.setPosition();
      return this.setActive();
    };

    AutocompleteView.prototype.contentsModified = function() {
      var delay;
      delay = parseInt(atom.config.get("autocomplete-plus.autoActivationDelay"));
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
      return this.delayTimeout = setTimeout(this.runAutocompletion, delay);
    };

    AutocompleteView.prototype.cursorMoved = function(data) {
      if (!data.textChanged) {
        return this.cancel();
      }
    };

    AutocompleteView.prototype.onSaved = function() {
      return this.cancel();
    };

    AutocompleteView.prototype.onChanged = function(e) {
      var typedText;
      typedText = e.newText.trim();
      if (typedText.length === 1 && atom.config.get("autocomplete-plus.enableAutoActivation")) {
        return this.contentsModified();
      } else {
        return this.cancel();
      }
    };

    AutocompleteView.prototype.setPosition = function() {
      var abovePosition, belowLowerPosition, belowPosition, cursorLeft, cursorTop, left, top, _ref1;
      _ref1 = this.editorView.pixelPositionForScreenPosition(this.editor.getCursorScreenPosition()), left = _ref1.left, top = _ref1.top;
      cursorLeft = left;
      cursorTop = top;
      belowPosition = cursorTop + this.editorView.lineHeight;
      belowLowerPosition = belowPosition + this.outerHeight();
      abovePosition = cursorTop;
      if (belowLowerPosition > this.editorView.outerHeight() + this.editorView.scrollTop()) {
        this.css({
          left: cursorLeft,
          top: abovePosition
        });
        return this.css("-webkit-transform", "translateY(-100%)");
      } else {
        this.css({
          left: cursorLeft,
          top: belowPosition
        });
        return this.css("-webkit-transform", "");
      }
    };

    AutocompleteView.prototype.replaceTextWithMatch = function(match) {
      var buffer, cursorPosition, selection, startPosition, suffixLength;
      selection = this.editor.getSelection();
      startPosition = selection.getBufferRange().start;
      buffer = this.editor.getBuffer();
      cursorPosition = this.editor.getCursorBufferPosition();
      buffer["delete"](Range.fromPointWithDelta(cursorPosition, 0, -match.prefix.length));
      this.editor.insertText(match.word);
      suffixLength = match.word.length - match.prefix.length;
      return this.editor.setSelectedBufferRange([startPosition, [startPosition.row, startPosition.column + suffixLength]]);
    };

    AutocompleteView.prototype.afterAttach = function(onDom) {
      var widestCompletion;
      if (!onDom) {
        return;
      }
      widestCompletion = parseInt(this.css("min-width")) || 0;
      this.list.find("li").each(function() {
        var labelWidth, totalWidth, wordWidth;
        wordWidth = $(this).find("span.word").outerWidth();
        labelWidth = $(this).find("span.label").outerWidth();
        totalWidth = wordWidth + labelWidth + 40;
        return widestCompletion = Math.max(widestCompletion, totalWidth);
      });
      this.list.width(widestCompletion);
      return this.width(this.list.outerWidth());
    };

    AutocompleteView.prototype.populateList = function() {
      var p;
      p = new Perf("Populating list", {
        debug: this.debug
      });
      p.start();
      AutocompleteView.__super__.populateList.apply(this, arguments);
      p.stop();
      return this.setPosition();
    };

    AutocompleteView.prototype.setCurrentBuffer = function(currentBuffer) {
      this.currentBuffer = currentBuffer;
      this.currentBuffer.on("saved", this.onSaved);
      return this.currentBuffer.on("changed", this.onChanged);
    };

    AutocompleteView.prototype.getModel = function() {
      return null;
    };

    AutocompleteView.prototype.dispose = function() {
      var provider, _i, _len, _ref1, _ref2, _ref3, _results;
      if ((_ref1 = this.currentBuffer) != null) {
        _ref1.off("changed", this.onChanged);
      }
      if ((_ref2 = this.currentBuffer) != null) {
        _ref2.off("saved", this.onSaved);
      }
      this.editor.off("title-changed-subscription-removed", this.cancel);
      this.editor.off("cursor-moved", this.cursorMoved);
      _ref3 = this.providers;
      _results = [];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        provider = _ref3[_i];
        if (provider.dispose != null) {
          _results.push(provider.dispose());
        }
      }
      return _results;
    };

    return AutocompleteView;

  })(SimpleSelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtIQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBMEIsT0FBQSxDQUFRLE1BQVIsQ0FBMUIsRUFBQyxjQUFBLE1BQUQsRUFBUyxTQUFBLENBQVQsRUFBWSxVQUFBLEVBQVosRUFBZ0IsYUFBQSxLQUFoQixDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQURKLENBQUE7O0FBQUEsRUFFQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FGUCxDQUFBOztBQUFBLEVBR0EsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSLENBSFosQ0FBQTs7QUFBQSxFQUlBLG9CQUFBLEdBQXVCLE9BQUEsQ0FBUSwyQkFBUixDQUp2QixDQUFBOztBQUFBLEVBS0EsYUFBQSxHQUFnQixPQUFBLENBQVEsa0JBQVIsQ0FMaEIsQ0FBQTs7QUFBQSxFQU1BLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQU5QLENBQUE7O0FBQUEsRUFPQSxLQUFBLEdBQVEsT0FBQSxDQUFRLFNBQVIsQ0FQUixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHVDQUFBLENBQUE7Ozs7Ozs7Ozs7S0FBQTs7QUFBQSwrQkFBQSxhQUFBLEdBQWUsSUFBZixDQUFBOztBQUFBLCtCQUNBLEtBQUEsR0FBTyxLQURQLENBQUE7O0FBQUEsK0JBT0EsVUFBQSxHQUFZLFNBQUUsVUFBRixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsYUFBQSxVQUNaLENBQUE7QUFBQSxNQUFDLElBQUMsQ0FBQSxTQUFVLElBQUMsQ0FBQSxXQUFYLE1BQUYsQ0FBQTtBQUFBLE1BRUEsa0RBQUEsU0FBQSxDQUZBLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxRQUFELENBQVUsbUJBQVYsQ0FKQSxDQUFB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
//# sourceURL=/Users/rukmal/.atom/packages/autocomplete-plus/lib/autocomplete-view.coffee