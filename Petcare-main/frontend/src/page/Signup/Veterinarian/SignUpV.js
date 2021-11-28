import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Select, SubmitButton } from 'formik-semantic-ui-react';
import * as Yup from "yup";
import './SignUpV.css'
import { Header, Form as FormS } from "semantic-ui-react";
import { RegisterUser } from '../../../services/auth.service'
import { useNavigate } from "react-router";
import { notifyError, notifySuccess } from "../../../config/toastify.config";
import { useCookies } from "react-cookie";
import CreatableSelect from 'react-select/creatable';
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth.reducer";
const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: '',
    city: '',
    address: '',
    streetNo: '',
    officeStreetNo: '',
    officeAddress: '',
    officeCity: '',
    area: '',
    userType: 'vet'
};
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required").email(),
    password: Yup.string().required("Required").min(6),
    gender: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    streetNo: Yup.number().required("Required").positive("Must be an valid address"),
    officeAddress: Yup.string().required("Required"),
    officeStreetNo: Yup.number().required("Required").integer().positive("Must be an valid address"),
    officeCity: Yup.string().required("Required"),
    area: Yup.string().required("Required"),
});


const SingUpV = () => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const [animalExp, setAnimalExp] = useState('')
    const [, setCookie] = useCookies([])
    const handleChangeOnAnimalExp = (value) => {
        if (value.length > 0) {
            setAnimalExp(value)
        } else {
            setAnimalExp([])
        }
    };
    const onSubmit = async (values) => {
        if (animalExp.length > 0) {
            values['animalExp'] = []
            animalExp.forEach(element => {
                values['animalExp'] = [...values['animalExp'], element.value]
            });
            const [status, message] = await RegisterUser(values);
            if (status) {
                setCookie('user-data', message, { expires: new Date(Date.now() + 12600 * 1000) })
                notifySuccess('User created successfully')
                dispatch(login(message))
                navigation('/')
                return
            } else {
                notifyError(message)
            }
            console.log(message)
        }
        else {
            notifyError('Please select at least one animal')
        }
    }

    return (
        <div className="form-wrapper">
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}>

                <Form className="form-inside">
                    <Header as="h1" dividing>
                        We need some information to create your account
                    </Header>
                    <FormS.Group grouped  >
                        <Input name="email" placeholder="Email address" errorPrompt />
                        <Input placeholder="password" name="password" type="password" errorPrompt />

                    </FormS.Group>
                    <Header as="h1" dividing>
                        Lets Get Personal
                    </Header>
                    <FormS.Group widths="equal" >
                        <Input name="firstName" placeholder="First Name" errorPrompt />
                        <Input placeholder="Last name" name="lastName" errorPrompt />
                        <Select
                            name="gender"
                            options={[
                                { key: "m", text: "Male", value: "male" },
                                { key: "f", text: "Female", value: "female" }
                            ]}
                            placeholder="Gender"
                            errorPrompt />
                    </FormS.Group>

                    <FormS.Group widths="equal">
                        <Input name="city" placeholder="City" errorPrompt />
                        <Input placeholder="Full address" name="address" errorPrompt />
                        <Input placeholder="Street Number" name="streetNo" errorPrompt type="number" />
                    </FormS.Group>
                    <Header as="h1" dividing>
                        Office location
                    </Header>
                    <FormS.Group widths="equal">
                        <Input name="officeCity" placeholder="City" errorPrompt />
                        <Select
                            name="area"
                            options={[
                                { key: "s", text: "Southern Israel", value: "South" },
                                { key: "c", text: "Central Israel", value: "Central" },
                                { key: "n", text: "Northen Israel", value: "North" }
                            ]}
                            placeholder="Genral Area"
                            errorPrompt />
                        <Input placeholder="Full address" name="officeAddress" errorPrompt />
                        <Input placeholder="Street Number" name="officeStreetNo" errorPrompt type="number" />
                    </FormS.Group>
                    <Header as="h1" dividing>
                        Expertise
                    </Header>
                    <FormS.Group inline>
                        <CreatableSelect
                            isMulti
                            className="width-100"
                            onChange={handleChangeOnAnimalExp}
                            placeholder="Select The animals You work with from the list, or create you own if you don't find them"
                            options={[{ label: 'Dog', value: 'Dog' }, { label: 'Cat', value: 'Cat' }, { label: 'Parrot', value: 'Parrot' }, { label: 'Fish', value: 'Fish' }, { label: 'Rabbit', value: 'Rabbit' }, { label: 'Snail', value: 'Snail' }]}
                        />
                    </FormS.Group>
                    <div style={{ alignSelf: 'end' }}>
                        <SubmitButton color="green" >
                            Create Account!
                        </SubmitButton>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default SingUpV
