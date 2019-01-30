'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnmountClosed = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Collapse = require('./Collapse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnmountClosed = exports.UnmountClosed = function (_React$PureComponent) {
  _inherits(UnmountClosed, _React$PureComponent);

  _createClass(UnmountClosed, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps) {
      return {
        isResting: false,
        isOpened: nextProps.isOpened
      };
    }
  }]);

  function UnmountClosed(props) {
    _classCallCheck(this, UnmountClosed);

    var _this = _possibleConstructorReturn(this, (UnmountClosed.__proto__ || Object.getPrototypeOf(UnmountClosed)).call(this, props));

    _this.onWork = function (_ref) {
      var isOpened = _ref.isOpened,
          rest = _objectWithoutProperties(_ref, ['isOpened']);

      _this.setState({ isResting: false, isOpened: isOpened });

      var onWork = _this.props.onWork;

      if (onWork) {
        onWork(_extends({ isOpened: isOpened }, rest));
      }
    };

    _this.onRest = function (_ref2) {
      var isOpened = _ref2.isOpened,
          rest = _objectWithoutProperties(_ref2, ['isOpened']);

      _this.setState({ isResting: true, isOpened: isOpened, isInitialRender: false });

      var onRest = _this.props.onRest;

      if (onRest) {
        onRest(_extends({ isOpened: isOpened }, rest));
      }
    };

    _this.getInitialStyle = function () {
      var _this$state = _this.state,
          isOpened = _this$state.isOpened,
          isInitialRender = _this$state.isInitialRender;

      if (isInitialRender) {
        return isOpened ? { height: 'auto', overflow: 'initial' } : { height: '0px', overflow: 'hidden' };
      }

      return { height: '0px', overflow: 'hidden' };
    };

    _this.state = { isResting: true, isOpened: props.isOpened, isInitialRender: true };
    return _this;
  }

  _createClass(UnmountClosed, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          isResting = _state.isResting,
          isOpened = _state.isOpened;


      return isResting && !isOpened ? null : _react2.default.createElement(_Collapse.Collapse, _extends({}, this.props, {
        initialStyle: this.getInitialStyle(),
        onWork: this.onWork,
        onRest: this.onRest }));
    }
  }]);

  return UnmountClosed;
}(_react2.default.PureComponent);

UnmountClosed.defaultProps = {
  onWork: undefined,
  onRest: undefined
};