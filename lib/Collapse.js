'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collapse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Collapse = exports.Collapse = function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, (Collapse.__proto__ || Object.getPrototypeOf(Collapse)).call(this, props));

    _this.timeout = undefined;
    _this.container = undefined;
    _this.content = undefined;

    _this.onResize = function () {
      global.clearTimeout(_this.timeout);

      if (!_this.container || !_this.content) {
        return;
      }

      var _this$props = _this.props,
          isOpened = _this$props.isOpened,
          onRestCheckInterval = _this$props.onRestCheckInterval;
      var containerHeight = _this.container.clientHeight;
      var contentHeight = _this.content.clientHeight;


      var isFullyOpened = isOpened && contentHeight === containerHeight;
      var isFullyClosed = !isOpened && containerHeight === 0;

      if (isFullyOpened || isFullyClosed) {
        _this.onRest({
          isFullyOpened: isFullyOpened, isFullyClosed: isFullyClosed, isOpened: isOpened, containerHeight: containerHeight, contentHeight: contentHeight
        });
      } else {
        _this.onWork({
          isFullyOpened: isFullyOpened, isFullyClosed: isFullyClosed, isOpened: isOpened, containerHeight: containerHeight, contentHeight: contentHeight
        });
        _this.timeout = setTimeout(function () {
          return _this.onResize();
        }, onRestCheckInterval);
      }
    };

    _this.onRest = function (_ref) {
      var isFullyOpened = _ref.isFullyOpened,
          isFullyClosed = _ref.isFullyClosed,
          isOpened = _ref.isOpened,
          containerHeight = _ref.containerHeight,
          contentHeight = _ref.contentHeight;

      if (!_this.container || !_this.content) {
        return;
      }

      var hasOpened = isOpened && _this.container.style.height === contentHeight + 'px';
      var hasClosed = !isOpened && _this.container.style.height === '0px';

      if (hasOpened || hasClosed) {
        _this.container.style.overflow = isOpened ? 'initial' : 'hidden';
        _this.container.style.height = isOpened ? 'auto' : '0px';

        var onRest = _this.props.onRest;

        if (onRest) {
          onRest({
            isFullyOpened: isFullyOpened, isFullyClosed: isFullyClosed, isOpened: isOpened, containerHeight: containerHeight, contentHeight: contentHeight
          });
        }
      }
    };

    _this.onWork = function (_ref2) {
      var isFullyOpened = _ref2.isFullyOpened,
          isFullyClosed = _ref2.isFullyClosed,
          isOpened = _ref2.isOpened,
          containerHeight = _ref2.containerHeight,
          contentHeight = _ref2.contentHeight;

      if (!_this.container || !_this.content) {
        return;
      }

      var isOpenining = isOpened && _this.container.style.height === contentHeight + 'px';
      var isClosing = !isOpened && _this.container.style.height === '0px';

      if (isOpenining || isClosing) {
        // No need to do any work
        return;
      }

      _this.container.style.overflow = 'hidden';
      _this.container.style.height = isOpened ? contentHeight + 'px' : '0px';

      var onWork = _this.props.onWork;

      if (onWork) {
        onWork({
          isFullyOpened: isFullyOpened, isFullyClosed: isFullyClosed, isOpened: isOpened, containerHeight: containerHeight, contentHeight: contentHeight
        });
      }
    };

    if (props.initialStyle) {
      _this.initialStyle = props.initialStyle;
    } else {
      _this.initialStyle = props.isOpened ? { height: 'auto', overflow: 'initial' } : { height: '0px', overflow: 'hidden' };
    }
    return _this;
  }

  _createClass(Collapse, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onResize();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          theme = _props.theme,
          isOpened = _props.isOpened,
          children = _props.children;


      return children !== nextProps.children || isOpened !== nextProps.isOpened || Object.keys(theme).some(function (c) {
        return theme[c] !== nextProps.theme[c];
      });
    }
  }, {
    key: 'getSnapshotBeforeUpdate',
    value: function getSnapshotBeforeUpdate() {
      if (!this.container || !this.content) {
        return null;
      }
      if (this.container.style.height === 'auto') {
        var contentHeight = this.content.clientHeight;

        this.container.style.height = contentHeight + 'px';
      }
      return null;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      global.clearTimeout(this.timeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          theme = _props2.theme,
          children = _props2.children;

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(container) {
            return Object.assign(_this2, { container: container });
          },
          className: theme.collapse,
          style: this.initialStyle },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(content) {
              return Object.assign(_this2, { content: content });
            },
            className: theme.content },
          children
        )
      );
    }
  }]);

  return Collapse;
}(_react2.default.Component);

Collapse.defaultProps = {
  theme: {
    collapse: 'ReactCollapse--collapse',
    content: 'ReactCollapse--content'
  },
  initialStyle: undefined,
  onRest: undefined,
  onWork: undefined,
  onRestCheckInterval: 50
};