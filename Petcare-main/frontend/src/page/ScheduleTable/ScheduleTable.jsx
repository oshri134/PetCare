import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { Button, Dimmer, Loader, Popup, Table } from 'semantic-ui-react'
import Alert from '../../Components/Alert/Alert'
import Layout from '../../Components/Layout/Layout'
import { appointmentsStatuses } from '../../config/appointemnts.config'
import { notifyError, notifySuccess } from '../../config/toastify.config'
import { changeAppointmentStatus, getPatientAppointments, getVatAppointments as getVetAppointments } from '../../services/appointment.service'
import DialogModal from './Components/DialogModal'
import './ScheduleTable.css'

const ScheduleTable = () => {
    const [open, setOpen] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const userData = useSelector(state => state.userData)
    const [chosenAppointment, setChosenAppo] = useState()
    const userAppointmentsQuery = useQuery('patientQuery', () => userData.userType === 'vet' ? getVetAppointments(userData.email) : getPatientAppointments(userData.email), {
        onSuccess: (e) => {
            console.log(e)
        },
        staleTime: 0,
    })
    if (userAppointmentsQuery.isLoading) {
        return <div style={{ width: '100%', height: '50vh' }}>
            <Dimmer active>
                <Loader size='massive' >Fetching Your Schedule</Loader>
            </Dimmer>
        </div>
    }
    const cancelAppointment = async () => {
        const [stats, message] = await changeAppointmentStatus(chosenAppointment.id, "4")
        if (stats) {
            notifySuccess(message);
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } else {
            notifyError(message)
        }
        setIsShow(false)
    }
    return (
        <Layout>
            <div className="header_wrapper">
                <header className="header-font">My Appointments</header>
            </div>
            {userData.userType !== 'vet' ? (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Vet Name</Table.HeaderCell>
                            <Table.HeaderCell>Reason</Table.HeaderCell>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {userAppointmentsQuery.isSuccess && userAppointmentsQuery.data.length > 0 && userAppointmentsQuery.data.map(appointment => (
                            <Table.Row key={appointment.id}>
                                <Table.Cell>{appointment.appointmentDetails.vetName}</Table.Cell>
                                <Table.Cell>{appointment.appointmentDetails.reason}</Table.Cell>
                                <Table.Cell>{appointment.appointmentDetails.location}</Table.Cell>
                                {/* <Popup content='Add users to your feed' trigger={ */}
                                <Table.Cell>{appointment.appointmentDetails.date}</Table.Cell>
                                <Table.Cell style={{ backgroundColor: appointmentsStatuses(appointment.status)?.color, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>{appointmentsStatuses(appointment.status)?.message}
                                    {(appointment.status === '1' || appointment.status === '2') && <Button color="red" onClick={() => { setIsShow(true); setChosenAppo(appointment); }}>Cancel</Button>}
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Patient Name</Table.HeaderCell>
                            <Table.HeaderCell>Animal</Table.HeaderCell>
                            <Table.HeaderCell>Reason</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>

                        {userAppointmentsQuery.isSuccess && userAppointmentsQuery.data.length > 0 && userAppointmentsQuery.data.map(appointment => (
                            <Table.Row key={appointment.id}>
                                <Table.Cell>{appointment.userDetails.fullName}</Table.Cell>
                                <Table.Cell>{appointment.userDetails.animal}</Table.Cell>
                                <Table.Cell>{appointment.appointmentDetails.reason}</Table.Cell>
                                <Table.Cell>{appointment.appointmentDetails.date}</Table.Cell>
                                <Popup content='Click To See The Appointment Details and Change it status' trigger={
                                    <Table.Cell selectable style={{ backgroundColor: appointmentsStatuses(appointment.status)?.color, textAlign: 'center' }}>
                                        <a href="#" onClick={() => { setOpen(true); setChosenAppo(appointment) }}>{appointmentsStatuses(appointment.status)?.message}</a>
                                    </Table.Cell>
                                } />
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            )}
            <DialogModal open={open} setOpen={setOpen} appointment={chosenAppointment} />
            <Alert isShow={isShow} setIsShow={setIsShow} onSuccess={cancelAppointment} />
        </Layout>
    )
}

export default ScheduleTable
