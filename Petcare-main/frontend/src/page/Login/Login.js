import React from "react";
import "./Login.css";
import loginImg from "../../image/Login.jpeg";
import logo from "../../image/logo.png";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form, Input, SubmitButton, ResetButton } from 'formik-semantic-ui-react';
import { FireStoreLogin } from '../../services/auth.service';
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth.reducer";
import { notifyError } from "../../config/toastify.config";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { Button, Icon } from "semantic-ui-react";

const Login = () => {
  const [, setCookie] = useCookies([]);
  const dispatch = useDispatch();
  const nav = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  };
  const onSubmit = (values) => {
    FireStoreLogin(values.email, values.password).then(res => {
      dispatch(login(res));
      setCookie('user-data', res, { expires: new Date(Date.now() + 12600 * 1000) })
      nav('/')
    }).catch(e => notifyError(e.message));
  }
  const validationSchema = Yup.object({ email: Yup.string().required().email(), password: Yup.string().required().min(5) });
  return (
    <div className="login">

      <img className="login_img" alt="logo imag" src={loginImg} />
      <img className="logo_img" alt="logo image" src={logo} />
      <div className="main_login">
        <div className="header">Sign in to your account</div>
        <div className="creat_new">Or create a new account</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form size="large">
            <Input
              name="email"
              placeholder="Email"
              errorPrompt
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              errorPrompt
            />
            <SubmitButton fluid primary>
              Login
            </SubmitButton>
            {/* <ResetButton fluid secondary>
              Reset
            </ResetButton> */}
            <ResetButton onClick={() => window.location.assign('/')} icon labelPosition='left' style={{ width: '100%' }}>
              <Icon name='home' />
              Back to Home Page
            </ResetButton>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
