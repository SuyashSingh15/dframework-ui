import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const Field = ({ column, field, fieldLabel, formik, otherProps, classes, onChange }) => {
  const [timePeriod, setTimePeriod] = useState("AM");
  const [time, setTime] = useState(null);

  useEffect(() => {
    // console.log(field, formik.values[field])
    if (column?.dependentField?.operator === ">=" && formik.values[column.dependentField.field] !== "" && !formik.values[field]) {
      const dateTime = dayjs(formik.values[column.dependentField.field]).add(5, 'minute');
      if (dateTime.get("hour") > 12) {
        setTimePeriod("PM");
        updateFormikTime(time, "PM");
      } else {
        setTimePeriod("AM");
        updateFormikTime(time, "AM");
      }
    }
    if (formik.values[field]) {
      const dateTime = dayjs(formik.values[field]);
      setTime(dateTime);
      setTimePeriod(dateTime.format("A"));
    }
  }, [formik.values]);

  const handleRadioChange = (event) => {
    setTimePeriod(event.target.value);
    updateFormikTime(time, event.target.value);
  };

  const handleTimeChange = (newTime) => {
    // if (err) {
    //   newTime = dayjs(formik.values[column.dependentField.field]).add(5, 'minute')
    // }
    setTime(newTime);
    updateFormikTime(newTime, timePeriod);
  };
  const updateFormikTime = (timeValue, period) => {
    if (timeValue) {
      let hours = timeValue.hour();
      const minutes = timeValue.minute();
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;

      const dateTime = dayjs().hour(hours).minute(minutes);
      formik.setFieldValue(field, dateTime.toISOString());
    }
  };
  // console.log('plugin', formik.values, formik.errors, formik.touched);
  if (column.modifiedLabel) {
    return (
      <div
        style={{ display: "flex", alignItems: "center", gap: '2.9rem', width: '337px !important' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker style={{ flex: 2 }}
            label={column.label}
            value={time}
            disabled={column.dependentField && formik.values[column.dependentField.field] === ""}
            slotProps={{
              textField: {
                helperText: formik.touched[field] && formik.errors[field],
                error: formik.touched[field] && formik.errors[field],
                variant: "filled",
                placeholder: "hh:mm"
              },
            }}
            // ampm={false}
            closeOnSelect={false}
            minTime={column?.dependentField?.operator === ">=" && formik.values[column.dependentField.field] !== "" ? dayjs(formik.values[column.dependentField.field]).add(5, 'minute') : null}
            onChange={handleTimeChange}
            sx={{
              backgroundColor: "#4F5883 !important",
              "& .MuiOutlinedInput-input": {
                padding: "1.65625rem 0.875rem 0.59375rem 0.875rem !important",
              },
              width: "200px",
            }}
            format="hh:mm"
            views={["hours", "minutes"]}
          />
          <FormControl component="fieldset" style={{ flex: 1 }}>
            <RadioGroup
              value={timePeriod}
              onChange={handleRadioChange}
              style={{
                flexDirection: "row",
                flexWrap: "nowrap",
              }}
            >
              <FormControlLabel
                value="AM"
                control={<Radio checked={timePeriod === "AM"} />}
                label="AM"
              />
              <FormControlLabel
                value="PM"
                control={<Radio checked={timePeriod === "PM"} />}
                label="PM"
              />
            </RadioGroup>
          </FormControl>
        </LocalizationProvider>
      </div>
    );
  } else {
    let inputValue = formik.values[field];
    if (column.isUtc) {
      inputValue = dayjs
        .utc(inputValue)
        .utcOffset(dayjs().utcOffset(), true)
        .format();
    }
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          {...otherProps}
          variant="standard"
          readOnly={column?.readOnly === true}
          key={field}
          fullWidth
          name={field}
          value={inputValue}
          onChange={(value) => {
            if (column.isUtc) {
              value =
                value && value.isValid()
                  ? value.format("YYYY-MM-DDTHH:mm:ss") + ".000Z"
                  : null;
            }
            return formik.setFieldValue(field, value);
          }}
          onBlur={formik.handleBlur}
          helperText={formik.touched[field] && formik.errors[field]}
          renderInput={(params) => {
            const props = { ...params, variant: "standard" };
            return (
              <TextField
                {...props}
                helperText={formik.errors[field]}
                fullWidth
              />
            );
          }}
        />
      </LocalizationProvider>
    );
  }
};

export default Field;
