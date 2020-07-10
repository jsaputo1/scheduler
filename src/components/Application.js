import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
const { getAppointmentsForDay, getInterviewersByDay, getInterview } = require("../helpers/selectors");

export default function Application(props) {

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`api/appointments/${id}`, appointments[id])
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  }

  function destroyInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`api/appointments/${id}`, appointments[id])
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([Promise.resolve(axios.get("/api/days")),
    Promise.resolve(axios.get("/api/appointments")),
    Promise.resolve(axios.get("/api/interviewers"))
    ])
      .then(
        (all) => {
          setState((prev) => ({
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }));
        }
      );
  }, []);

  const appointments = getAppointmentsForDay(state, state.day);

  const appointmentList = appointments.map((appointment) => {
    const interviewers = getInterviewersByDay(state, state.day);
    const interview = getInterview(state, appointment.interview);
    return <Appointment
      key={appointment.id}
      {...appointment}
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
      destroyInterview={destroyInterview}
    />
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );

}
