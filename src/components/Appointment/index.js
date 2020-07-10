import React, { Fragment, useEffect } from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import "components/Appointment/styles.scss";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



export default function Appointment(props) {

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    props.bookInterview(props.id, interview);
    transition(SHOW);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => back()}
          onSave={save}
          
        />
      )}
    </article>
  );
}
