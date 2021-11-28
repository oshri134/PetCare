import React, { useState } from 'react'
import "./Signup.css"
import dog from "../../image/registration.jpeg"
import logo from "../../image/logo.png"
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import SingUpP from './Patient/SingUpP'
import SingUpV from './Veterinarian/SignUpV';

function Signup() {
    let [currentStep, setCurrentStep] = useState(0);
    let [signupRole, setSignupRole] = useState("");
    const history = useNavigate();


    const currentComponent = () => {
        switch (currentStep) {
            case 1:
                if (signupRole === "user") return <SingUpP />;
                else return <SingUpV />;
            case 2:
                if (signupRole === "user") return <SingUpP />;
                else return <SingUpP />;
            default:
                break;
        }
    }

    return (
        <>
            {currentStep === 0 &&
                <>
                    <img alt="dgo" src={dog} className="registration" />
                    <div className="registrationselection">
                        <img alt="logo" src={logo} />
                        <label>
                            Pet-Care is an innovative pet wellness platform <br/> that connects pet owners to a marketplace of licensed veterinary professionals for video, chat and phone appointments.<br /> For everyone, anytime - day or night.
                        </label>
                        <div className="buttons">
                            <Button onClick={() => { setSignupRole("vet"); setCurrentStep(1) }} className="buttons_click">I'm a Vet</Button>
                            <Button onClick={() => { setSignupRole("user"); setCurrentStep(1) }} className="buttons_click" >
                                I'm a Pet Parent</Button>
                        </div>
                        <div onClick={() => history('/login')} className="signin">
                            Sign in to an existing account
                        </div>
                    </div>
                </>
            }
            <>
                {currentComponent()}
            </>

        </>
    )
}

export default Signup