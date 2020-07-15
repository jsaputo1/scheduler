# Interview Scheduler

The Interview Scheduler is a single page web app built with React that allows users to book, edit and cancel interviews. 

## Main view

<p align="center">
  <img src="https://github.com/jsaputo1/scheduler/blob/master/public/screenshots/index.png" alt="screenshot of main schedule page">
  <p>

This is a screenshot of the page that opens when the app is launched. By default it shows the appointments for Monday. Users can select the day on the left, under each day the appointments remaining for the day are indicated.

## Creating an appointment

<p align="center">

  <img src="https://github.com/jsaputo1/scheduler/blob/master/public/screenshots/Appointment.png" alt="screenshot of create appointment">
  </p>

Users can create appointments by clicking the + button. They must enter their names and select an interviewer by clicking on their image.

## Editing or Deleting an appointment

<p align="center">

  <img src="https://github.com/jsaputo1/scheduler/blob/master/public/screenshots/Edit.png" alt="screenshot of edit/delete">
</p>

Hovering over the appointment will make an edit and delete logo appear on the bottom right.

## Delete confirmation

<p align="center">

  <img src="https://raw.githubusercontent.com/jsaputo1/scheduler/master/public/screenshots/Delete.png" alt="screenshot of delete confirmation">
</p>

The user must confirm if they want to delete the appointment 

## Technologies Used

React, Sass, PostgreSQL, Node, Storybook, Jest, Cypress

## Installation Instructions

## Setup

Install dependencies with `npm install`. Start the webpack server with "npm start".

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
