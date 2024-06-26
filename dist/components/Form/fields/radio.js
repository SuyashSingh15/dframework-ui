"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
const _excluded = ["field", "formik", "orientation", "label", "lookups", "fieldConfigs", "mode", "column"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], t.indexOf(o) >= 0 || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
const Field = _ref => {
  let {
      field,
      formik,
      orientation = "row",
      label,
      lookups,
      fieldConfigs,
      mode,
      column
    } = _ref,
    otherProps = _objectWithoutProperties(_ref, _excluded);
  const handleChange = event => {
    formik.setFieldValue(field, event.target.value);
  };
  const options = lookups ? lookups[column.lookup] : [];
  let inputValue = String(formik.values[field]) || Number(formik.values[field]);
  const theme = (0, _material.useTheme)();
  const isError = formik.touched[field] && Boolean(formik.errors[field]);
  let isDisabled;
  if (mode !== 'copy') {
    isDisabled = fieldConfigs === null || fieldConfigs === void 0 ? void 0 : fieldConfigs.disabled;
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    component: "fieldset",
    error: isError
  }, /*#__PURE__*/_react.default.createElement(_material.FormLabel, {
    component: "legend"
  }, label), /*#__PURE__*/_react.default.createElement(_material.RadioGroup, {
    row: orientation === "row",
    "aria-label": label,
    name: field,
    value: inputValue,
    onChange: handleChange
  }, options === null || options === void 0 ? void 0 : options.map((option, index) => /*#__PURE__*/_react.default.createElement(_material.FormControlLabel, {
    key: index,
    value: option.value,
    control: /*#__PURE__*/_react.default.createElement(_material.Radio, null),
    label: option.label,
    disabled: isDisabled
  })))), isError && /*#__PURE__*/_react.default.createElement(_material.FormHelperText, {
    style: {
      color: theme.palette.error.main
    }
  }, formik.errors[field]));
};
var _default = exports.default = Field;