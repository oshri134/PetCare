// import axios from "axios";
import firebase from "../config/firebase.config";

export const FireStoreLogin = async (email, password) => {
    try {
        const userDocRef = firebase.firestore().collection('users')
        const res = await firebase.auth().signInWithEmailAndPassword(email.toLowerCase(), password.toString())
        let userData;
        if (res) {
            const querySnapshot = await userDocRef.where("email", "==", email.toLowerCase()).get()
            querySnapshot.forEach(doc => {
                const tempUserData = doc.data();
                userData = tempUserData
            });
            return userData;
        } else {
            throw new Error('User is not registered');  //
        }
    } catch (err) {
        throw err;
    }
}
export const ResetPassword = async (email) => {
    try {
        const res = await firebase.auth().sendPasswordResetEmail(email.toLowerCase())
        return [true, res]
    } catch (e) {
        return [false, e.message]
    }
}
export const GetAllUsers = async () => {
    try {
        const users = await firebase.firestore().collection('users').get()
        const usersData = users.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        return usersData
    } catch (e) {
        return e.message
    }
}
export const GetUserByEmail = async (email) => {
    try {
        const users = await firebase.firestore().collection('users').where("email", "==", email.toLowerCase()).get();
        const usersData = users.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
        })
        return usersData
    } catch (e) {
        return e.message
    }
}
export const UpdateUser = async (userData, changes) => {
    try {
        const userDocRef = firebase.firestore().collection('users')
        const user = await userDocRef.where("email", "==", userData.email.toLowerCase()).get();
        const userId = user.docs.map(doc => {
            return { id: doc.id }
        })
        console.log(userId[0].id)
        Object.keys(changes).forEach(async (key) => {
            if (changes[key].length === 0) {
                return;
            }
            userDocRef.doc(userId[0].id).update({ [key]: changes[key] }).then((res) => console.log(res)).catch((err) => console.log(err))
        })
        return [true, "res"]
    } catch (e) {
        return [false, e.message]
    }
}
export const RegisterUser = async (userData) => {
    try {
        const userDocRef = firebase.firestore().collection('users')
        const res = await firebase.auth().createUserWithEmailAndPassword(userData.email.toLowerCase(), userData.password)
        if (res) {
            delete userData["password"]
            await userDocRef.add({ ...userData, email: userData.email.toLowerCase() })
            if (userData.userType === "vet") {
                const vetDocRef = firebase.firestore().collection('vets-details')
                await vetDocRef.add({
                    vetId: userData.email.toLowerCase(),
                    area: userData.area,
                    animalExp: userData.animalExp,
                    fullOfficeAddress: userData.officeCity + ", " + userData.officeAddress + " " + userData.officeStreetNo,
                    fullName: userData.firstName + " " + userData.lastName,
                })
            }
            return [true, userData]
        } else {
            return [false, 'User is not registered']
        }
    } catch (e) {
        return [false, e.message]
    }
}

