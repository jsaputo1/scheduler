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
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  // useEffect(() => {
  //   if (props.interview && mode == EMPTY) {
  //     transition(SHOW)
  //   }

  // }, [props.interview]);

  return (
    <article className="appointment">
      <header>{props.time}</header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={[]}
          onCancel={() => back()}
          onSave={() => back()}
        />
      )}
    </article>
  );
}
