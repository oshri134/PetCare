import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Select, SubmitButton, TextArea } from 'formik-semantic-ui-react';
import * as Yup from "yup";
import { Header, Form as FormS, Icon, Step } from "semantic-ui-react";
import Layout from '../../Components/Layout/Layout'
import './CreateAppointment.css'
import { add } from 'date-fns'
import FirstStep from "./Components/FirstStep";
import SecondStep from "./Components/SecondStep";

const initialValues = {
  title: "",
  description: "",
  reason: '',
  phone: '',
  importance: '',
  streetNo: '',
  officeStreetNo: '',
  officeAddress: '',
  officeCity: '',
};
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required").min(10),
  reason: Yup.string().required("Required"),
  importance: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  area: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
});

const CreateAppointemnt = () => {
  const [step, setStep] = useState(1)
  const [appointmentDetails, setAppointmentDetails] = useState()

  return (
    <Layout>
      <div className="header_wrapper">
        <header className="header-font">Create New Appointment</header>
      </div>
      <div className="header_wrapper" style={{ marginBottom: '1%' }}>
        <Step.Group ordered>
          <Step completed={step > 1 ? true : false}>
            <Step.Content>
              <Step.Title>Personal Details</Step.Title>
              <Step.Description>Fill The Details down bellow</Step.Description>
            </Step.Content>
          </Step>

          <Step completed={step > 2 ? true : false}>
            <Step.Content>
              <Step.Title>Chose Vet</Step.Title>
              <Step.Description>Chose the Vet you want to meet</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
      </div>
      {step === 1 ? (
        <FirstStep setStep={setStep} setAppointmentDetails={setAppointmentDetails} />
      ) :
        (
          <SecondStep setStep={setStep} appointmentDetails={appointmentDetails} />
        )}
    </Layout>
  )
}

export default CreateAppointemnt
