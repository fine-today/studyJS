import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { timeTableState } from "../store/store";
import { v4 as uuidv1 } from "uuid";

const timeOptions = new Array(12)
  .fill(null)
  .map((e, i) => ({ value: i + 9, label: i + 9 }));

const checkOverLap = (A, B) =>
  B.start < A.start ? B.end > A.start : B.start < A.end;

//컴포넌트 시작
function InputModal({
  showModal,
  handleClose,
  dayData = "mon",
  startTimeData = 9,
  endTimeData = 10,
  lectureNameData = "",
  colorData = "#00ff55",
  idNum,
}) {
  const {
    formState: { errors },
    control,
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (showModal) {
      reset({
        lectureName: lectureNameData,
        day: dayData,
        startTime: startTimeData,
        endTime: endTimeData,
        lectureColor: colorData,
      });
    }
  }, [
    showModal,
    dayData,
    startTimeData,
    endTimeData,
    lectureNameData,
    colorData,
    idNum,
  ]);
  const [timeTableData, settimeTableData] = useRecoilState(timeTableState);
  const Submit = useCallback(
    (submitData) => {
      const { lectureName, day, startTime, endTime, lectureColor } = submitData;
      console.log(submitData);
      let valid = true;
      for (let index = 0; index < timeTableData[day]?.length; index++) {
        if (
          checkOverLap(timeTableData[day][index], {
            start: startTime,
            end: endTime,
          })
        ) {
          valid = false;
          break;
        }
      }
      if (!valid) {
        alert("해당 시간에 강의가 이미 존재합니다.");
        return;
      }
      const data = {
        start: startTime,
        end: endTime,
        id: uuidv1(),
        color: lectureColor,
        name: lectureName,
      };

      settimeTableData((oldTimeData) => ({
        ...oldTimeData,
        [day]: [...oldTimeData[day], data],
      }));
      handleClose();
    },
    [timeTableData, settimeTableData, handleClose]
  );

  const Edit = useCallback(
    (lectureName, day, startTime, endTime, lectureColor) => {
      let valid = true;
      console.log(typeof timeTableData[day]);
      for (let index = 0; index < timeTableData[day].length; index++) {
        if (
          checkOverLap(timeTableData[day][index], {
            start: startTime,
            end: endTime,
          }) &&
          timeTableData[day][index]["id"] !== idNum
        ) {
          valid = false;
          break;
        }
      }
      if (!valid) {
        alert("해당 시간에 강의가 이미 존재합니다.");
        return;
      }
      const filteredDayData = [
        ...timeTableData[dayData].filter((data) => data.id !== idNum),
      ];
      const newTimeTableData = {
        ...timeTableData,
        [dayData]: filteredDayData,
      };

      const newDayData = [
        ...newTimeTableData[day],
        {
          start: startTime,
          end: endTime,
          id: idNum,
          name: lectureName,
          color: lectureColor,
        },
      ];
      settimeTableData({
        ...newTimeTableData,
        [day]: newDayData,
      });

      handleClose();
    },
    [dayData, handleClose, idNum, settimeTableData, timeTableData]
  );

  return (
    <Dialog open={showModal} onClose={handleClose}>
      <form onSubmit={handleSubmit(idNum ? Edit : Submit)}>
        <DialogTitle>강의정보 입력</DialogTitle>
        <DialogContent style={{ width: "400px" }}>
          <Controller
            control={control}
            name="lectureName"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.lectureName}
                style={{ maginTop: "30px", width: "350px" }}
                label="강의명"
                autoComplete="off"
              />
            )}
          />
          {errors.lectureName?.type === "required" && (
            <p style={{ color: "#d32f2f" }}>강의명을 입력해주세요</p>
          )}
          <FormControl style={{ marginTop: "30px" }}>
            <FormLabel>요일</FormLabel>
            <Controller
              control={control}
              name="day"
              rules={{ required: true }}
              render={({ field }) => (
                <RadioGroup {...field} style={{ display: "block" }}>
                  <FormControlLabel
                    value="mon"
                    label="mon"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="tue"
                    label="tue"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="wed"
                    label="wed"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="thu"
                    label="thu"
                    control={<Radio />}
                  />
                  <FormControlLabel
                    value="fri"
                    label="fri"
                    control={<Radio />}
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Stack spacing={3} stype={{ marginTop: "30px", width: "350px" }}>
            <Controller
              control={control}
              name="startTime"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  error={
                    !!errors.startTime ||
                    !!(errors.endTime?.type === "validate")
                  }
                  style={{ marginTop: "30px", width: "350px" }}
                  label="시작 시간"
                  placeholder="시작 시간 선택"
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            {errors.startTime?.type === "required" && (
              <p style={{ color: "#d32f2f" }}>강의 시작시간 선택</p>
            )}

            <Controller
              control={control}
              name="endTime"
              rules={{
                required: true,
                validate: (value) => getValues("startTime") < value,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  error={!!errors.endTime}
                  style={{ marginTop: "30px", width: "350px" }}
                  label="종료 시간"
                  placeholder="종료 시간 선택"
                >
                  {timeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {errors.endTime?.type === "required" && (
              <p style={{ color: "#d32f2f" }}>강의 종료시간 선택</p>
            )}
            {errors.endTime?.type === "validate" && (
              <p style={{ color: "#d32f2f" }}>
                시작 시간과 종료 시간을 확인해주세요.
              </p>
            )}
            <div style={{ marginTo: "30px" }}>
              <label htmlFor="lectureColor">시간표 색상 : </label>
              <Controller
                control={control}
                name="lectureColor"
                render={({ field }) => (
                  <input
                    {...field}
                    style={{ marginLeft: "30px" }}
                    id="lectureColor"
                    type="color"
                  />
                )}
              ></Controller>
            </div>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button type="submit">입력</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default InputModal;
