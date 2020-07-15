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

  function spotsRemaining(day, days, appointments) {
    let bookedSpots = 0;
    let totalSpots = 0;
    days.forEach(i => {
      totalSpots++;
      if (i.name === day) {
        i.appointments.forEach(j => {
          if (appointments[j].interview !== null) {
            bookedSpots++;
          }
        });
      }
    });
    return totalSpots - bookedSpots;
  }

  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (state.day === day.name) {
        day.spots = spotsRemaining(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });
    return axios.put(`api/appointments/${id}`, appointment)
      .then(() => {
        spotsRemaining(state.day, days, appointments);
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
    const days = state.days.map(day => {
      if (state.day === day.name) {
        day.spots = spotsRemaining(state.day, state.days, appointments);
        return day;
      } else {
        return day;
      }
    });
    return axios.delete(`api/appointments/${id}`, appointments[id])
      .then(
        () => {
          spotsRemaining(state.days, days, appointments);
          setState({
            ...state,
            appointments
          });
        });
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(
        (all) => {
          setState((prev) => ({
            ...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }));
        }
      );
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};





