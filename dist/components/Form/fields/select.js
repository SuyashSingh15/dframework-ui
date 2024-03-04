"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.parse-int.js");
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _KeyboardArrowDown = _interopRequireDefault(require("@mui/icons-material/KeyboardArrowDown"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const Field = _ref => {
  let {
    column,
    field,
    fieldLabel,
    formik,
    activeRecord,
    otherProps,
    classes,
    onChange,
    lookups
  } = _ref;
  const initialOptions = lookups ? lookups[column === null || column === void 0 ? void 0 : column.lookup] : [];
  const [value, setValue] = _react.default.useState(formik.values[field]);
  const [options, setOptions] = _react.default.useState(initialOptions);
  _react.default.useEffect(() => {
    var _column$dependentFiel;
    let inputValue = formik.values[field],
      newOptions = options;
    if (((_column$dependentFiel = column.dependentField) === null || _column$dependentFiel === void 0 ? void 0 : _column$dependentFiel.operator) === "equals" && formik.values[column.dependentField.field] !== "") {
      const selectedHospitalId = formik.values[column.dependentField.field];
      newOptions = initialOptions.filter(option => option[column.dependentField.lookupFieldToBeComparedWith] === selectedHospitalId);
      console.log(initialOptions, column.dependentField, formik.values, newOptions);
      setOptions(newOptions);
    }
    if (formik.values[field]) {
      const val = formik.values[field];
      if (!newOptions.includes(val)) {
        setValue(null);
        return;
      }
      if (column.valueParserForForm) {
        inputValue = column.valueParserForForm(val);
      } else {
        inputValue = String(val);
      }
      if (column.multiSelect) {
        if (!inputValue || inputValue.length === 0) {
          inputValue = [];
        } else if (!Array.isArray(inputValue)) {
          inputValue = inputValue.split(",").map(e => parseInt(e));
        }
      }
    }
  }, [formik.values]);
  return /*#__PURE__*/_react.default.createElement(_material.FormControl, {
    fullWidth: true,
    key: field,
    variant: "standard"
  }, /*#__PURE__*/_react.default.createElement(_material.InputLabel, {
    error: formik.touched[field] && formik.errors[field]
  }, fieldLabel || column.label), /*#__PURE__*/_react.default.createElement(_material.Select, _extends({
    IconComponent: _KeyboardArrowDown.default
  }, otherProps, {
    error: formik.touched[field] && formik.errors[field],
    name: field,
    disabled: !(options !== null && options !== void 0 && options.length),
    multiple: column.multiSelect === true,
    readOnly: column.readOnly === true,
    value: value,
    renderValue: selected => {
      if (Array.isArray(selected)) {
        return selected.map(value => {
          const option = options.find(option => option.value === value);
          return option ? option.label : "Select";
        }).join(", ");
      } else {
        const selectedOption = options.find(option => option.value === parseInt(selected));
        return selectedOption ? selectedOption.label : "Select";
      }
    },
    onChange: formik.handleChange,
    onBlur: formik.handleBlur
  }), Array.isArray(options) && options.map(option => /*#__PURE__*/_react.default.createElement(_material.MenuItem, {
    key: option.value,
    value: option.value
  }, option.label))), formik.touched[field] && formik.errors[field] && /*#__PURE__*/_react.default.createElement(_material.FormHelperText, {
    error: true
  }, formik.errors[field]));
};
var _default = exports.default = Field;