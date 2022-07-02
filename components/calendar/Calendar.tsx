import React, { FC, useState, useMemo } from "react";

import { styled } from "@mui/system";

import { Card, Box, IconButton, Typography, ButtonBase } from "@mui/material";

import {
  ArrowBackIosNewRounded as PrevIcon,
  ArrowForwardIosRounded as NextIcon,
} from "@mui/icons-material";

import { createDaysForCalendarView } from "../../utilities/calendar/dateHelpers";

import { getYear, getMonth, format } from "date-fns";

const CalendarHeader = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(2),
}));

const CalendarNav = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const DaysContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: 8,
}));

const WeekdayBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: 24,

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: 24,

  backgroundColor: theme.palette.divider,
}));

const DayBox = styled(IconButton)(({ theme }) => ({
  width: "100%",
  aspectRatio: "1/1",
}));

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const Calendar: FC = () => {
  const today = new Date();
  const initialYear = getYear(today);
  const initialMonth = getMonth(today);
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);

  const daysForCalendarView = useMemo(
    () => createDaysForCalendarView(selectedYear, selectedMonth),
    [selectedYear, selectedMonth]
  );

  // Months and day of the week numbers start from 0 on javascript Date
  // months 0 to 11
  // days of the week 0 to 6
  const goToPrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedYear((prev) => prev - 1);
      setSelectedMonth(11);
    } else setSelectedMonth((prev) => prev - 1);
  };

  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedYear((prev) => prev + 1);
      setSelectedMonth(0);
    } else setSelectedMonth((prev) => prev + 1);
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Typography
          component="span"
          variant="overline"
          noWrap
          sx={{
            width: "100%",
            opacity: 0.7,
            ml: 1,
          }}
        >
          History
        </Typography>
      </Box>
      <Card elevation={0} sx={{ p: 2, width: "100%" }}>
        <CalendarHeader>
          <Box display="flex">
            <Typography component="span" variant="h5" fontWeight={500}>
              {format(new Date(selectedYear, selectedMonth), "MMMM yyyy")}
            </Typography>
          </Box>
          <CalendarNav>
            <IconButton onClick={goToPrevMonth} sx={{ mr: 1 }}>
              <PrevIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={goToNextMonth}>
              <NextIcon fontSize="small" />
            </IconButton>
          </CalendarNav>
        </CalendarHeader>

        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ width: "100%", flexDirection: { xs: "column", sm: "row" } }}
        >
          <Box sx={{ mb: 3, mr: 2, minWidth: 230 }}>
            <Typography component="span" variant="body1" display="block">
              Last workout: Push Day, 12.06.2022.
            </Typography>
            <Typography component="span" variant="body1" display="block">
              Trained 7 times this month.
            </Typography>
          </Box>
          <DaysContainer>
            {WEEKDAYS.map((weekday, index) => {
              return (
                <WeekdayBox key={weekday}>
                  <Typography component="span" variant="body2" fontWeight={500}>
                    {weekday}
                  </Typography>
                </WeekdayBox>
              );
            })}
            {daysForCalendarView.map((day, index) => {
              return (
                <DayBox
                  key={day.date}
                  sx={{
                    color: day.isCurrentMonth ? "default" : "grey.500",
                    backgroundColor: day.isToday ? "divider" : "transparent",
                  }}
                >
                  <Typography component="span" variant="body2">
                    {day.dayOfMonth}
                  </Typography>
                </DayBox>
              );
            })}
          </DaysContainer>
        </Box>
      </Card>
    </>
  );
};

export default Calendar;
