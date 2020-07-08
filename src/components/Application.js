import React, {useState} from "react";

import "components/Application.scss";

import DayList from "components/DayList";

import Appointment from "components/Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
    },
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "John Saputo",
      interviewer: {
        id: 2,
        name: "Tori Malcom",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
    },
  },
  {
    id: "last",
    time: "5pm",
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const appointmentList = appointments.map((appointment) => <Appointment key={appointment.id} {...appointment} />);
  console.log(appointmentList);

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={days} day={day} setDay={setDay} />
        </nav>
        <img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}

// const parsedCities = cities.map(city => <h3 onClick={() => setCurrentCity(city)}>{city ? city : "Reset"}</h3>)

// <section className="schedule">{appointments.map((appointment) => appointment.id)}</section>
