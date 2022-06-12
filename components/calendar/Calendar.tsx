import React, { FC, useState, useEffect } from "react";

import { styled } from "@mui/system";

import { Box, Button } from "@mui/material";

import {
  getYear,
  getMonth,
  getDaysInMonth,
  getDay,
  format,
  getDate,
} from "date-fns";

const Container = styled(Box)(({ theme }) => ({
  width: "100%",

  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
}));

const DayBox = styled(Box)(({ theme }) => ({
  width: "100%",
  aspectRatio: "1/1",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//TODO Refactor all functions
const Calendar: FC = () => {
  const today = new Date();
  const initialYear = getYear(today);
  const initialMonth = getMonth(today);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  function createDaysForCurrentMonth(year: number, month: number) {
    return [...Array(getDaysInMonth(new Date(year, month)))].map(
      (day, index) => {
        return {
          date: format(new Date(year, month, index + 1), "yyyy-MM-dd"),
          dayOfWeek: getDay(new Date(year, month, index + 1)),
          dayOfMonth: index + 1,
          isCurrentMonth: true,
        };
      }
    );
  }

  const daysOfCurrentMonth = createDaysForCurrentMonth(
    selectedYear,
    selectedMonth
  );

  function createDaysForPreviousMonth(year: number, month: number) {
    const firstDayOfTheMonthWeekday =
      getDay(new Date(daysOfCurrentMonth[0].date)) || 7;

    const prevMonthDays = [];

    for (let i = -firstDayOfTheMonthWeekday + 2; i <= 0; i++) {
      const dateInPrevMonth = getDate(new Date(year, month, i));
      prevMonthDays.push({
        date: format(new Date(year, month - 1, dateInPrevMonth), "yyyy-MM-dd"),
        dayOfWeek: getDay(new Date(year, month - 1, dateInPrevMonth)),
        dayOfMonth: dateInPrevMonth,
        isCurrentMonth: false,
      });
    }

    return prevMonthDays;
  }

  const daysOfPrevMonth = createDaysForPreviousMonth(
    selectedYear,
    selectedMonth
  );

  function createDaysForNextMonth(year: number, month: number) {
    const lastDayOfTheMonthWeekday = getDay(
      new Date(daysOfCurrentMonth[daysOfCurrentMonth.length - 1].date)
    );

    const nextMonthDays = [];

    for (let i = 1; i <= 7 - lastDayOfTheMonthWeekday; i++) {
      nextMonthDays.push({
        date: format(new Date(year, month + 1, i), "yyyy-MM-dd"),
        dayOfWeek: getDay(new Date(year, month + 1, i)),
        dayOfMonth: i,
        isCurrentMonth: false,
      });
    }

    return nextMonthDays;
  }

  const daysOfNextMonth = createDaysForNextMonth(selectedYear, selectedMonth);

  const onPrevClick = () => {
    if (selectedMonth === 0) {
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(11);
    } else setSelectedMonth((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (selectedMonth === 11) {
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(0);
    } else setSelectedMonth((prev) => prev + 1);
  };

  const createDaysForCalendarView = () => {
    const combinedDays = [
      ...daysOfPrevMonth,
      ...daysOfCurrentMonth,
      ...daysOfNextMonth,
    ];

    // 7 columns x 6 rows
    if (combinedDays.length < 7 * 6) {
      const lastDayInArray = combinedDays[combinedDays.length - 1].dayOfMonth;

      let nextDate = lastDayInArray + 1;
      for (let i = combinedDays.length; i < 7 * 6; i++) {
        combinedDays.push({
          date: format(
            new Date(selectedYear, selectedMonth + 1, nextDate),
            "yyyy-MM-dd"
          ),
          dayOfWeek: getDay(
            new Date(selectedYear, selectedMonth + 1, nextDate)
          ),
          dayOfMonth: getDate(
            new Date(selectedYear, selectedMonth + 1, nextDate)
          ),
          isCurrentMonth: false,
        });
        nextDate++;
      }
    }

    return combinedDays;
  };
  const daysforCalendarView = createDaysForCalendarView();

  return (
    <>
      <Box display="flex" justifyContent={"space-between"}>
        <Box>{selectedMonth + 1}</Box>
        {" / "}
        <Box>{selectedYear}</Box>
      </Box>
      <Container>
        {WEEKDAYS.map((weekday, index) => {
          return <Box key={weekday}>{weekday}</Box>;
        })}
        {daysforCalendarView.map((day, index) => {
          const columnNumber = day.dayOfWeek === 0 ? 7 : day.dayOfWeek;
          return (
            <DayBox
              key={day.date}
              sx={{
                gridColumn: `${columnNumber} / span 1`,
                color: day.isCurrentMonth ? "default" : "grey.500",
              }}
            >
              {day.dayOfMonth}
            </DayBox>
          );
        })}
      </Container>
      <Box display="flex" justifyContent={"space-between"}>
        <Button onClick={onPrevClick}>Prev</Button>
        <Button onClick={onNextClick}>Next</Button>
      </Box>
    </>
  );
};

export default Calendar;
