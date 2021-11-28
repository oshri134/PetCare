import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Select, SubmitButton, TextArea } from 'formik-semantic-ui-react';
import * as Yup from "yup";
import { Header, Form as FormS, Icon } from "semantic-ui-react";
import '../CreateAppointment.css'
import {
    DateTimeInput
} from 'semantic-ui-calendar-react';
import { add } from 'date-fns'
import { notifyError } from "../../../config/toastify.config";

const initialValues = {
    title: "",
    description: "",
    reason: '',
    phone: '',
    importance: '',
    area: '',
};
const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required").min(10),
    reason: Yup.string().required("Required"),
    importance: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    area: Yup.string().required("Required"),
});

const FirstStep = (props) => {
    const [date, setDate] = useState('')

    const onSubmit = async (values) => {
        if (date.length > 0) {
            values['date'] = date;
            props.setAppointmentDetails(values)
            props.setStep(2)
        }
        else {
            notifyError('You must select valid date')
        }
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                <Form className="form-appointment">
                    <Header as="h1" dividing>
                        General Information
                    </Header>
                    <FormS.Group widths="equal" >
                        <Select placeholder="Importance"
                            options={[
                                { key: "q", text: "Urgent", value: "Urgent" },
                                { key: "w", text: "Importent", value: "Importent" },
                                { key: "p", text: "Less Importent", value: "Less Importent" },
                                { key: "u", text: "Genral Issue", value: "Genral Issue" },
                            ]}
                            name="importance" errorPrompt />
                        <Select
                            name="reason"
                            options={[
                                { key: "m", text: "Injury", value: "Injury" },
                                { key: "f", text: "Vaccinations", value: "Vaccinations" },
                                { key: "i", text: "Regular Check", value: "Regular Check" },
                                { key: "g", text: "Inspection", value: "Inspection" },
                                { key: "d", text: "Castration/Sterilization ", value: "Castration/Sterilization " }
                            ]}
                            placeholder="Reason For Meeting"
                            errorPrompt />
                    </FormS.Group>
                    <Header as="h1" dividing>
                        Let's get to the details
                    </Header>
                    <FormS.Group grouped  >
                        <Input name="title" placeholder="Title" errorPrompt />
                        <TextArea placeholder="Description" name="description" errorPrompt />
                    </FormS.Group>
                    <Header as="h1" dividing>
                        Where and When
                    </Header>
                    <FormS.Group widths="equal">
                        <DateTimeInput
                            clearable
                            clearIcon={<Icon name="remove" color="red" />}
                            maxDate={add(new Date(), { days: 30 })}
                            minDate={new Date()}
                            name="date"
                            placeholder="Date Time"
                            value={date}
                            iconPosition="left"
                            onChange={(e, { value }) => setDate(value)}
                        />
                        <Select
                            name="area"
                            options={[
                                { key: "s", text: "Southern Israel", value: "South" },
                                { key: "c", text: "Central Israel", value: "Central" },
                                { key: "n", text: "Northen Israel", value: "North" }
                            ]}
                            placeholder="Genral Area"
                            errorPrompt />
                        <Input placeholder="Phone Number" name="phone" errorPrompt />
                    </FormS.Group>
                    <div style={{ alignSelf: 'start', display: 'flex', justifyContent: 'flex-end' }}>
                        <SubmitButton fluid primary>
                            Lets choose a vet
                        </SubmitButton>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default FirstStep
