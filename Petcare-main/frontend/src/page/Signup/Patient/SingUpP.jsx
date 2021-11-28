import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Input, Select, SubmitButton } from 'formik-semantic-ui-react';
import * as Yup from "yup";
import './SignUpP.css'
import { Header, Form as FormS } from "semantic-ui-react";
import { RegisterUser } from '../../../services/auth.service'
import { notifyError, notifySuccess } from "../../../config/toastify.config";
import { useNavigate } from "react-router";
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
    animalBreed: '',
    animalAge: '',
    animalSex: '',
    userType: 'pat'
};
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required").email(),
    password: Yup.string().required("Required").min(6),
    gender: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    streetNo: Yup.string().required("Required"),
    animalBreed: Yup.string().required("Required"),
    animalAge: Yup.number().required("Required").integer().positive("Must be an age").lessThan(125, "You are probably not that old"),
    animalSex: Yup.string().required("Required"),
});


const SingUpP = () => {
    const navigation = useNavigate()
    const [, setCookie] = useCookies([])
    const [animal, setAnimal] = useState('')
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        if (animal.length > 0) {
            values['animal'] = animal
            console.log(values)
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

    const handleChange = (newValue) => {
        if (newValue?.value?.length > 0) {
            setAnimal(newValue.value)
        } else {
            setAnimal('')
        }
    };

    return (
        <div className="form-wrapper">
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={onSubmit}>

                <Form className="form-inside">
                    <Header as="h1" dividing className="headerpet">
                        We need some information to create your account
                    </Header>
                    <FormS.Group grouped  >
                        <Input name="email" placeholder="Email address" errorPrompt />
                        <Input placeholder="password" name="password" type="password" errorPrompt />

                    </FormS.Group>
                    <Header as="h1" dividing className="headerpet">
                        Lets Get Personal
                    </Header>
                    <FormS.Group widths="equal"  >
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
                    <Header as="h1" dividing className="headerpet">
                        About your Pet
                    </Header>
                    <FormS.Group widths="equal">
                        <CreatableSelect
                            className="width-100"
                            isClearable
                            placeholder="Choose the kind of animal you have , or add a new one"
                            onChange={handleChange}
                            options={[{ label: 'Dog', value: 'Dog' }, { label: 'Cat', value: 'Cat' }, { label: 'Bird', value: 'Bird' }, { label: 'Rabbit', value: 'Rabbit' }, { label: 'Snail', value: 'Snail' }]}
                        />
                        <Input name="animalBreed" placeholder="Breed" errorPrompt />
                    </FormS.Group>
                    <FormS.Group widths="equal">
                        <Input placeholder="His age" name="animalAge" errorPrompt type="number" />
                        <Select
                            name="animalSex"
                            options={[
                                { key: "m", text: "Male", value: "male" },
                                { key: "f", text: "Female", value: "female" }
                            ]}
                            placeholder="Your animal's sex" errorPrompt />
                    </FormS.Group>
                    <div style={{ alignSelf: 'end' }}>
                        <SubmitButton color="purple" >
                            Create Account!
                        </SubmitButton>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default SingUpP
