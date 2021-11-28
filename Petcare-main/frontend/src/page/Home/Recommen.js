import React, { useState } from 'react';
import "./Recommen.css"

import { Slide } from 'react-slideshow-image';

import 'react-slideshow-image/dist/styles.css'


function Recommen(props) {

    const people = [
        {
            name: "Nathan D.",
            recommen: "I was quite excited when the online appointment was made. It is a practical daily help. I have not had a decrease in the number of calls but CaptainVet is a service that complements well with my current schedule."
        },
        {
            name: "Melodi M.",
            recommen: "The site is easy to use and great. I am very glad I signed up and got to know the current vet who is helping me with everything I need."
        },
        {
            name: "Daivd D.",
            recommen: "After a long time without a stable vet, I found thanks to you the perfect vet for me. Thank you very much PetCare."
        },
        {
            name: "Mark M.",
            recommen: "When I first registered for the site I entered incorrect data and when I contacted the service they kindly and quickly helped me Thanks PetCare."
        },

    ]

    const [autoplay, setAutoplay] = useState(true);

    let pepoleCard = people.map(person => {

        return (

            <div className="Card">

                <p>{JSON.stringify(person.recommen).replace(/"/g, '')}</p>
                <p>{JSON.stringify(person.name).replace(/"/g, '')}</p>

            </div >


        )
    })

    return (

        <div >
            <Slide autoplay={autoplay} slidesToShow={3}>
                {pepoleCard.map(x => (x))}
            </Slide>

        </div >
    )
}
export default Recommen
