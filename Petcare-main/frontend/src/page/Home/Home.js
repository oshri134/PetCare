import React from 'react'
import Recommen from "../Home/Recommen.js"
import "./Home.css"
import about_image_one from "../../image/Home1.jpeg"
import about_image_two from "../../image/Home2.jpeg"
import Navbar from '../../Components/Navbar/Navbar.js'
import Footer from '../../Components/Footer/Footer'


function Home() {
    return (
        <div className="home_wrapper">
            <Navbar />
            <div>

                <div className="cover">
                    <div className="box">
                        <header>WE CARE FOR YOUR PET</header>
                        <p>Be prepared for any health concerns that may arise with your spet by creating a free Pet-Care account. <br />
                            <br></br>   It's one less thing you will have to worry about we're here for them, day and night.</p>
                    </div>
                </div>


                <div className="about">
                    <div className="about_contact" >
                        <img src={about_image_one} alt="logo2" className="about_image_one" />
                        <header>Contact a veterinarian <br></br>easily and quickly</header>
                        <p>

                            If you are unable or if visiting your local clinic
                            is challenging, we will take care of the pet and
                            you in the most convenient way we have

                            some options with it in a video call,
                            quote available 24/7 with our best veterinarians



                        </p>
                    </div>
                    <div className="about_contact" >
                        <img src={about_image_two} alt="logo" className="about_image_two" />
                        <header>Simple, easy-to-use care solution <br></br>from  the comfort of your
                            home</header>

                        <p>
                            Using PetCare will save you <br />
                            time and money while helping to keep your pets
                            <br /> more comfortable at home.
                        </p>
                    </div>

                </div>
                <div className="vet">
                    <div className="header_vet">Are you a veterinarian? <br /> </div>
                    <div className="veterinarian">


                        <p >

                            PetCare offers veterinary professionals the opportunity to practice veterinary telemedicine.<br /><br />
                            Our user friendly platform schedules your time, takes payment,
                            provides appointment notifications and directly deposits your earnings.<br /> <br /> A complete solution - all in one place.<br></br>
                            It’s that simple. <br /><br />You only pay a small platform usage fee per appointment.
                        </p>


                    </div>
                </div>
                <div className="recommen">
                    <header>Our customers love us</header>
                    <Recommen />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Home
