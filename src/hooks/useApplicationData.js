import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  const spotsRemaining = (id, increaseBy) => {
    for (let day of state.days)
      if (day.appointments.includes(id)) {
        day.spots += increaseBy;
      }
  };

  const bookInterview = (id, interview) => {
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
        spotsRemaining(id, -1);
        setState({
          ...state,
          appointments
        });
      });
  };

  const cancelInterview = (id) => {
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
        spotsRemaining(id, +1);
        setState({
          ...state,
          appointments
        });
      });
  };

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

  return { state, setDay, bookInterview, cancelInterview };
}







