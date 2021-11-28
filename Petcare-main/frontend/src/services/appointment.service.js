// import axios from "axios";
import firebase from "../config/firebase.config";

export const getSpecificVetsByFilter = async (animal, area) => {
    try {
        const vets = await firebase.firestore().collection('vets-details').where("area", "==", area).get()
        const filteredVets = vets.docs.map(doc => {
            const foundVet = doc.data().animalExp.find(x => x.toLowerCase().includes(animal.toLowerCase()))
            if (foundVet) {
                return { id: doc.id, ...doc.data() }
            }
            else {
                return;
            }
        })
        return filteredVets
    } catch (e) {
        return e.message
    }
}
export const getVetsByAnimal = async (animal) => {
    try {
        const vets = await firebase.firestore().collection('vets-details').get()
        const filteredVets = vets.docs.map(doc => {
            const foundVet = doc.data().animalExp.find(x => x.toLowerCase().includes(animal.toLowerCase()))
            if (foundVet) {
                return { id: doc.id, ...doc.data() }
            }
            else {
                return;
            }
        })
        return filteredVets
    } catch (e) {
        return e.message
    }
}
export const createNewAppointment = async (appointment) => {
    try {
        const appointmentRef = await firebase.firestore().collection('appointments').add(appointment)
        return [true, appointmentRef.id]
    } catch (e) {
        return [false, e.message]
    }
}
export const getPatientAppointments = async (patEmail) => {
    const docsData = await firebase.firestore().collection('appointments').where("patientEmail", "==", patEmail).get();
    const appointments = docsData.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    })
    return appointments;
}
export const getVatAppointments = async (vetEmail) => {
    const docsData = await firebase.firestore().collection('appointments').where("vetEmail", "==", vetEmail).get()
    const appointments = docsData.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    })
    return appointments;
}
export const changeAppointmentStatus = async (appointmentId, status) => {
    try {
        await firebase.firestore().collection('appointments').doc(appointmentId).update({ status })
        return [true, "Appointment status changed successfully"]
    } catch (e) {
        return [false, e.message]
    }
}