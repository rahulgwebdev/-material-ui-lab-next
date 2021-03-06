"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPickerMount = createPickerMount;
exports.createPickerRender = createPickerRender;
exports.getAllByMuiTest = getAllByMuiTest;
exports.getByMuiTest = getByMuiTest;
exports.openMobilePicker = openMobilePicker;
exports.queryAllByMuiTest = exports.queryByMuiTest = exports.FakeTransitionComponent = exports.adapterToUse = exports.AdapterClassToUse = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _dateFns = require("date-fns");

var _utils = require("test/utils");

var _pure = require("@testing-library/react/pure");

var _AdapterDateFns = _interopRequireDefault(require("@material-ui/lab/AdapterDateFns"));

var _LocalizationProvider = _interopRequireDefault(require("@material-ui/lab/LocalizationProvider"));

// TODO make possible to pass here any utils using cli

/**
 * Wrapper around `@date-io/date-fns` that resolves https://github.com/dmtrKovalenko/date-io/issues/479.
 * We're not using `adapter.date` in the implementation which means the implementation is safe.
 * But we do use it in tests where usage of ISO dates without timezone is problematic
 */
class AdapterClassToUse extends _AdapterDateFns.default {
  date(value) {
    if (typeof value === 'string') {
      return (0, _dateFns.parseISO)(value);
    }

    return super.date(value);
  }

}

exports.AdapterClassToUse = AdapterClassToUse;
const adapterToUse = new AdapterClassToUse();
exports.adapterToUse = adapterToUse;
const FakeTransitionComponent = /*#__PURE__*/React.forwardRef(function FakeTransitionComponent({
  children
}, ref) {
  // set tabIndex in case it is used as a child of <TrapFocus />
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    tabIndex: -1
  }, children);
});
exports.FakeTransitionComponent = FakeTransitionComponent;

function createPickerMount(options = {}) {
  const mount = (0, _utils.createMount)(options);
  return node => mount( /*#__PURE__*/React.createElement(_LocalizationProvider.default, {
    dateAdapter: AdapterClassToUse
  }, node));
}

function createPickerRender(_ref = {}) {
  let {
    locale
  } = _ref,
      renderOptions = (0, _objectWithoutPropertiesLoose2.default)(_ref, ["locale"]);
  const clientRender = (0, _utils.createClientRender)(renderOptions);
  return node => clientRender( /*#__PURE__*/React.createElement(_LocalizationProvider.default, {
    locale: locale,
    dateAdapter: AdapterClassToUse
  }, node));
}

const queryByMuiTest = _pure.queryHelpers.queryByAttribute.bind(null, 'data-mui-test');

exports.queryByMuiTest = queryByMuiTest;

const queryAllByMuiTest = _pure.queryHelpers.queryAllByAttribute.bind(null, 'data-mui-test');

exports.queryAllByMuiTest = queryAllByMuiTest;

function getAllByMuiTest(id, container = document.body, options) {
  const els = queryAllByMuiTest(container, id, options);

  if (!els.length) {
    throw _pure.queryHelpers.getElementError(`Unable to find an element by: [data-mui-test="${id}"]`, container);
  }

  return els;
}

function getByMuiTest(...args) {
  const result = getAllByMuiTest(...args);

  if (result.length > 0) {
    return result[0];
  }

  throw _pure.queryHelpers.getElementError(`Unable to find an element by: [data-mui-test="${args[0]}"]`, document.body);
}

function openMobilePicker() {
  _utils.fireEvent.click(_utils.screen.getByRole('textbox'));
}