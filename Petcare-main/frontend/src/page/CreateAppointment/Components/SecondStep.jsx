import React from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button, Dimmer, Header, Icon, List, Loader, Modal, Segment } from 'semantic-ui-react'
import { notifyError, notifySuccess } from '../../../config/toastify.config'
import { createNewAppointment, getSpecificVetsByFilter } from '../../../services/appointment.service'

const SecondStep = (props) => {
    const [open, setOpen] = React.useState(false)
    const [selectedVet, setSelectedVet] = React.useState(null)
    const userData = useSelector(state => state.userData)
    const navigation = useNavigate()
    console.log(props.appointmentDetails.area)
    console.log(userData.animal)
    const queryVets = useQuery('vets-details', () => getSpecificVetsByFilter(userData.animal, props.appointmentDetails.area), {
        onSuccess: (data) => {
            console.log(data)
        },
        refetchOnWindowFocus: false,
    })
    if (queryVets.isLoading) {
        return (
            <div style={{ width: '100%', height: '50vh' }}>
                <Segment style={{ width: '100%', height: '100%' }}>
                    <Dimmer active>
                        <Loader size='massive' >Looking For Vets Around You..</Loader>
                    </Dimmer>
                </Segment>
            </div>
        )
    }
    const onConfirm = async () => {
        const appointment = {
            vetEmail: selectedVet.vetId,
            patientEmail: userData.email,
            status: "1",
            appointmentDetails: { ...props.appointmentDetails, vetName: selectedVet.fullName, location: selectedVet.fullOfficeAddress },
            userDetails: {
                fullName: userData.firstName + ' ' + userData.lastName,
                animalBreed: userData.animalBreed,
                animalAge: userData.animalAge,
                animalSex: userData.animalSex,
                animal: userData.animal,
            }
        }
        const status = await createNewAppointment(appointment)
        setOpen(false)
        if (status) {
            notifySuccess('Appointment Created Successfully')
            navigation('/')

        } else {
            notifyError('Something Went Wrong And We Couldnt Set Up The Meeting :(')
        }
    }
    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <div className="header-row">
                <Button content='Back' icon='left arrow' labelPosition='left' style={{ alignSelf: 'start', justifySelf: 'end' }} onClick={() => props.setStep(1)} />
                <h1 className="center-text">Choose the vet you want to help you</h1>
            </div>
            <List divided relaxed size="massive">
                {queryVets.isSuccess && queryVets.data.length > 0 && queryVets?.data?.map((vet) => {
                    return (
                        <List.Item>
                            <List.Icon name='user doctor' size='big' verticalAlign='middle' />
                            <List.Content onClick={() => { setOpen(true); setSelectedVet(vet); }}>
                                <List.Header as='a' >{vet.fullOfficeAddress}</List.Header>
                                <List.Description as='a' >{vet.fullName}</List.Description>
                            </List.Content>
                        </List.Item>
                    )
                })}
                {queryVets.data.length === 0 && <h1>No Vets Found</h1>}
            </List>
            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                size='small'
            >
                <Header icon>
                    <Icon name='eye' />
                    Appointment Details
                </Header>
                <Modal.Content>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                        <p>When </p> <p>{props.appointmentDetails.date}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                        <p>Where </p> <p>{selectedVet?.fullOfficeAddress}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                        <p>With </p> <p>{selectedVet?.fullName}</p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '2rem' }}>
                        <p>For </p> <p>{props.appointmentDetails.reason}</p>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpen(false)}>
                        <Icon name='remove' /> Cancel
                    </Button>
                    <Button color='green' inverted onClick={() => onConfirm()}>
                        <Icon name='checkmark' /> Confirm
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default SecondStep
