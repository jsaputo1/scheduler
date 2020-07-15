export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter((stateDay) => stateDay.name === day);
  const appointmentArray = [];
  if (filteredDay && filteredDay.length > 0) {
    for (let appointmentNumber of filteredDay[0].appointments) {
      appointmentArray.push(state.appointments[appointmentNumber]);
    }
    return appointmentArray;
  } else {
    return [];
  }
}

export function getInterviewersByDay(state, day) {
  const filteredDay = state.days.filter((stateDay) => stateDay.name === day);
  const appointmentArray = [];
  if (filteredDay && filteredDay.length > 0) {
    for (let appointmentNumber of filteredDay[0].interviewers) {
      appointmentArray.push(state.interviewers[appointmentNumber]);
    }
    return appointmentArray;
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const id = interview.interviewer;
  const student = interview.student;
  const interviewer = state.interviewers[id];
  return { student, interviewer };
}