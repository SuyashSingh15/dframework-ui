import React from "react";
import {
    FormHelperText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Field = ({
    column,
    field,
    fieldLabel,
    formik,
    activeRecord,
    otherProps,
    classes,
    onChange,
    lookups,
}) => {
    const initialOptions = lookups ? lookups[column?.lookup] : []

    const [value, setValue] = React.useState(formik.values[field]);
    const [options, setOptions] = React.useState(initialOptions)
    React.useEffect(() => {
        let inputValue = formik.values[field], newOptions = options;
        if (column.dependentField?.operator === "equals" && formik.values[column.dependentField.field] !== "") {
            const selectedHospitalId = formik.values[column.dependentField.field];
            newOptions = initialOptions.filter(
                (option) => option[column.dependentField.lookupFieldToBeComparedWith] === selectedHospitalId
            );
            console.log(initialOptions, column.dependentField, formik.values, newOptions)
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
                    inputValue = inputValue.split(",").map((e) => parseInt(e));
                }
            }
        }
    }, [formik.values]);

    return (
        <FormControl fullWidth key={field} variant="standard">
            <InputLabel error={formik.touched[field] && formik.errors[field]}>{fieldLabel || column.label}</InputLabel>
            <Select
                IconComponent={KeyboardArrowDownIcon}
                {...otherProps}
                error={formik.touched[field] && formik.errors[field]}
                name={field}
                disabled={!options?.length}
                multiple={column.multiSelect === true}
                readOnly={column.readOnly === true}
                value={value}
                renderValue={(selected) => {
                    if (Array.isArray(selected)) {
                        return selected
                            .map((value) => {
                                const option = options.find(
                                    (option) => option.value === value
                                );
                                return option ? option.label : "Select";
                            })
                            .join(", ");
                    } else {
                        const selectedOption = options.find(
                            (option) => option.value === parseInt(selected)
                        );
                        return selectedOption ? selectedOption.label : "Select";
                    }
                }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                {Array.isArray(options) &&
                    options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
            </Select>
            {formik.touched[field] && formik.errors[field] &&
                (<FormHelperText error={true}>
                    {formik.errors[field]}
                </FormHelperText>)
            }
        </FormControl>
    );
};

export default Field;
