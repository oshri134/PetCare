import { Form, Button } from 'semantic-ui-react'
import Navbar from '../../Components/Navbar/Navbar'


import pic from '../../image/service_contact.jpg'

import './Contact.css'

function Contact() {
  return (
    <div >
      <Navbar />

      <div className="form-box">
        <Form className="from-contact">
          <br />
          <br />
          <h1>Contact Us!</h1>
          <p>If you encounter a problem we will be happy to help at any time
            Write the fault here and we promise to answer as soon as possible</p>
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" />
          </Form.Field>
          <Form.Input
            label="Email"
            type="email"
            className="email"
            placeholder="example@gmail.com"
          />
          <Form.TextArea
            label="Comment"
            placeholder="Tell us what happend..."
          />

          <Button active className="button_contact">
            Sumbit
          </Button>
          <br />
          <br />
        </Form>
      </div>
    </div>

  )
}

export default Contact
