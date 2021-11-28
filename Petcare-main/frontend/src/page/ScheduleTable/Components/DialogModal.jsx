import React, { useState } from 'react'
import { Accordion, Button, Header, Icon, Modal, Select } from 'semantic-ui-react'
import { notifyError, notifySuccess } from '../../../config/toastify.config'
import { changeAppointmentStatus } from '../../../services/appointment.service'

const DialogModal = (props) => {
    const statusKeys = [
        { key: 'af', value: '2', text: 'Approve' },
        { key: 'ax', value: '3', text: 'Decline' },
        { key: 'al', value: '4', text: 'Cencel' },]
    const [status, setStatus] = useState(props?.appointment?.status)
    const onConfirm = async () => {
        const [stats, message] = await changeAppointmentStatus(props?.appointment?.id, status)
        if (stats) {
            notifySuccess(message);
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {
            notifyError(message)
        }
        props.setOpen(false)
    }
    const panels = [
        {
            key: 'what-is-dog',
            title: 'When ?',
            content: [
                `The client would like to meet you at : ${props?.appointment?.appointmentDetails.date}`, ` For : ${props?.appointment?.appointmentDetails.reason} treatment`
            ].join(' '),
        },
        {
            key: 'kinds-of-dogs',
            title: 'Why ?',
            content: {
                content: (
                    <div>
                        <h2>
                            {`${props?.appointment?.appointmentDetails.title}`}
                        </h2>
                        <p>
                            {props?.appointment?.appointmentDetails.description}
                        </p>
                    </div>
                ),
            },
        },
        {
            key: 'acquire-dog',
            title: 'Client Contanct Details',
            content: {
                content: (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '50vw' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Patient Phone Number :</p>
                            <a href="#">{props?.appointment?.appointmentDetails.phone}</a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Animal :</p>
                            <p>{props?.appointment?.userDetails.animal}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Animal Breed: </p>
                            <p>{props?.appointment?.userDetails.animalBreed}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Animal Gender:</p>
                            <p>{props?.appointment?.userDetails.animalSex}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p>Animal Age:</p>
                            <p>{props?.appointment?.userDetails.animalAge}</p>
                        </div>
                    </div>
                ),
            },
        },
    ]
    return (
        <Modal
            basic
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
            open={props.open}
            centered={false}
            size='large'
        >
            <Header icon>
                <Icon name='eye' />
                Appointment Details
            </Header>
            <Modal.Content>
                <div className="accordion-wrapper">
                    <Accordion className="accordion-style" defaultActiveIndex={0} panels={panels} inverted />
                </div>
                {/* <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                    <p>When </p> <p>{props?.appointment?.appointmentDetails.date}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                    <p>Animal </p> <p>{props?.appointment?.userDetails.animal}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                    <p>Animal </p> <p>{props?.appointment?.userDetails.animal}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                    <p>Animal </p> <p>{props?.appointment?.userDetails.animal}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                    <p>Animal </p> <p>{props?.appointment?.userDetails.animal}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                    <p>Animal </p> <p>{props?.appointment?.userDetails.animal}</p>
                </div>
                */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                    <p>Set Status </p> <Select options={statusKeys} placeholder="choose the status you want" onChange={(e, { value }) => setStatus(value)} />
                </div>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => props.setOpen(false)}>
                    <Icon name='remove' /> Cancel
                </Button>
                <Button color='green' inverted onClick={() => onConfirm()}>
                    <Icon name='checkmark' /> Confirm
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DialogModal

