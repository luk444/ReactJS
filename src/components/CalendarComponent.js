import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ onSelectDay, selectedDay }) => {
  const handleGoToPreviousDay = () => {
    const previousDay = new Date(selectedDay);
    previousDay.setDate(selectedDay.getDate() - 1);
    onSelectDay(previousDay);
  };

  const handleGoToNextDay = () => {
    const nextDay = new Date(selectedDay);
    nextDay.setDate(selectedDay.getDate() + 1);
    onSelectDay(nextDay);
  };

  return (
    <div className='calendar-container'>
      <Calendar onChange={onSelectDay} value={selectedDay} />
    </div>
  );
};

export default CalendarComponent;
