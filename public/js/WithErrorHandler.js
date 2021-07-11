"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FallbackView = exports.ErrorBoundary = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Fallback = require("./Fallback");

var _Fallback2 = _interopRequireDefault(_Fallback);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ErrorBoundary = function (_React$PureComponent) {
  _inherits(ErrorBoundary, _React$PureComponent);

  function ErrorBoundary() {
    _classCallCheck(this, ErrorBoundary);

    var _this = _possibleConstructorReturn(this, (ErrorBoundary.__proto__ || Object.getPrototypeOf(ErrorBoundary)).call(this));

    _this.closeErrorModal = _this.closeErrorModal.bind(_this);
    _this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
    return _this;
  }

  _createClass(ErrorBoundary, [{
    key: "closeErrorModal",
    value: function closeErrorModal() {
      this.setState({ hasError: false });
    }
  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      // Update state if error happens
      this.setState({ hasError: true, error: error, errorInfo: info });

      // Report errors here

      var _props2 = this.props,
          onError = _props2.onError,
          FallbackComponent = _props2.FallbackComponent,
          _props = _objectWithoutProperties(_props2, ["onError", "FallbackComponent"]);

      if (typeof onError === "function") {
        try {
          onError.call(this, error, info, _props);
        } catch (e) {}
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          onError = _props3.onError,
          FallbackComponent = _props3.FallbackComponent,
          children = _props3.children,
          _props = _objectWithoutProperties(_props3, ["onError", "FallbackComponent", "children"]);
      // if state contains error and in development environment we render fallback component


      if (this.state.hasError) {
        var _state = this.state,
            error = _state.error,
            errorInfo = _state.errorInfo;

        return _react2.default.createElement(FallbackComponent, _extends({}, _props, {
          closeErrorModal: this.closeErrorModal,
          error: error,
          errorInfo: errorInfo
        }));
      }
      return children;
    }
  }]);

  return ErrorBoundary;
}(_react2.default.PureComponent);

ErrorBoundary.defaultProps = {
  FallbackComponent: _Fallback2.default
};

exports.ErrorBoundary = ErrorBoundary;
exports.FallbackView = _Fallback2.default;
exports.default = ErrorBoundary;