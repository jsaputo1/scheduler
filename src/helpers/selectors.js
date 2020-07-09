export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((stateDay) => stateDay.name === day);
  const appointmentArray = [];
  if (filteredDay && filteredDay.length > 0) {
    for (let appointment in state.appointments) {
      if (filteredDay[0].appointments.includes(Number(appointment))) {
        appointmentArray.push(state.appointments[appointment]);
      }
    }
    return appointmentArray;
  } else {
    return [];
  }
}
