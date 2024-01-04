"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.error.cause.js");
require("core-js/modules/es.array.push.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireDefault(require("react"));
var _DatePicker = require("@mui/x-date-pickers/DatePicker");
var _AdapterDayjs = require("@mui/x-date-pickers/AdapterDayjs");
var _material = require("@mui/material");
var _LocalizationProvider = require("@mui/x-date-pickers/LocalizationProvider");
var _TextField = _interopRequireDefault(require("@mui/material/TextField"));
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); } // import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    otherProps,
    classes,
    fieldConfigs
  } = _ref;
  const isDisabled = (fieldConfigs === null || fieldConfigs === void 0 ? void 0 : fieldConfigs.disabled) || column.dependentField && formik.values[column.dependentField.field] === "";
  if (column.modifiedLabel) {
    var _column$dependentFiel;
    console.log(formik.touched[field], formik.errors[field], formik.touched[field] && Boolean(formik.errors[field]));
    const dateValue = formik.values[field] ? (0, _dayjs.default)(formik.values[field]) : null;
    return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
      dateAdapter: _AdapterDayjs.AdapterDayjs
    }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
      sx: {
        margin: '0.9rem 2rem 2.5rem 0rem',
        position: 'absolute',
        zIndex: '1',
        transform: 'translate(14px, -9px) scale(0.75)',
        color: formik.touched[field] && formik.errors[field] ? "#f44336" : "inherit"
      }
    }, column.label), /*#__PURE__*/_react.default.createElement(_DatePicker.DatePicker, _extends({}, otherProps, {
      variant: "standard",
      minDate: (column === null || column === void 0 || (_column$dependentFiel = column.dependentField) === null || _column$dependentFiel === void 0 ? void 0 : _column$dependentFiel.operator) === ">=" && formik.values[column.dependentField.field] !== "" ? (0, _dayjs.default)(formik.values[column.dependentField.field]) : null,
      readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
      key: field,
      fullWidth: true,
      sx: {
        width: '380px',
        backgroundColor: "#4F5883 !important",
        '& .MuiOutlinedInput-input': {
          padding: '1.65625rem 0.875rem 0.59375rem 0.875rem !important'
        }
      },
      disableFuture: column.disableFuture,
      name: field,
      value: dateValue,
      onChange: value => formik.setFieldValue(field, value),
      onBlur: formik.handleBlur,
      helperText: formik.touched[field] && formik.errors[field],
      disablePast: column === null || column === void 0 ? void 0 : column.disablePast,
      disabled: isDisabled,
      slotProps: {
        textField: {
          helperText: formik.touched[field] && formik.errors[field],
          error: formik.touched[field] && formik.errors[field]
        }
      }
      // renderInput={(params) => {
      //     let helperText;
      //     if (isDisabled && column.showErrorText) {
      //         helperText = `Survey already started`;
      //     } else if (formik.touched[field] && formik.errors[field]) {
      //         helperText = formik.errors[field];
      //     }
      //     const showError = !!helperText;
      //     const props = { ...params, variant: "standard", error: true };
      //     return <TextField
      //         {...props}
      //         label={column.label}
      //         placeholder="MM/DD/YYYY"
      //         helperText={helperText}
      //         error={true}
      //         fullWidth
      //         sx={{
      //             width: '337px',
      //             backgroundColor: "#4F5883 !important",
      //             color: '#FFFFFF',
      //             padding: '1.65625rem 0.875rem 0.59375rem 0.875rem',
      //             '& .MuiInputLabel-root': {
      //                 color: '#FFFFFF',
      //                 fontWeight: 'bold',
      //             },
      //             '& .MuiOutlinedInput-input': {
      //                 padding: '1.65625rem 0.875rem 0.59375rem 0.875rem',
      //             },
      //             // border: 'none',
      //             // outline: 'none',
      //         }}
      //     />
      // }}
    })));
  } else {
    return /*#__PURE__*/_react.default.createElement(_LocalizationProvider.LocalizationProvider, {
      dateAdapter: _AdapterDayjs.AdapterDayjs
    }, /*#__PURE__*/_react.default.createElement(_DatePicker.DatePicker, _extends({}, otherProps, {
      variant: "standard",
      readOnly: (column === null || column === void 0 ? void 0 : column.readOnly) === true,
      key: field,
      fullWidth: true,
      name: field,
      value: formik.values[field],
      onChange: value => formik.setFieldValue(field, value),
      onBlur: formik.handleBlur,
      helperText: formik.touched[field] && formik.errors[field],
      disablePast: column === null || column === void 0 ? void 0 : column.disablePast,
      disabled: isDisabled,
      renderInput: params => {
        let helperText;
        if (isDisabled && column.showErrorText) {
          helperText = "Survey already started";
        } else if (formik.touched[field] && formik.errors[field]) {
          helperText = formik.errors[field];
        }
        const showError = !!helperText;
        const props = _objectSpread(_objectSpread({}, params), {}, {
          variant: "standard",
          error: showError
        });
        return /*#__PURE__*/_react.default.createElement(_TextField.default, _extends({}, props, {
          helperText: helperText,
          fullWidth: true
        }));
      }
    })));
  }
};
var _default = exports.default = Field;