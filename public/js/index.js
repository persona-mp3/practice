import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
// import { firebaseConfig } from './booking.js';
import { getFirestore ,collection, addDoc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""

}


const app = initializeApp(firebaseConfig)
const db = getFirestore()
const colRef = collection(db, 'users')

const loginForm = document.querySelector('.login-form')

 function getFormData(form) {
    const formData = new FormData(form);
    const scheduleDetails = {}

    for (let [name, value] of formData.entries()) {
        if (value.trim() === '' || value === undefined) {
            console.log('somethings wrong')
            return;
        }  
        scheduleDetails[name] = value
    }

    console.log(scheduleDetails)
    return scheduleDetails
}


async function saveUserToDB(userObj) {
    try {
        const response = await addDoc(colRef, userObj);

        console.log(response.status)
        console.log(response.data)
     } catch (err) {
        throw err
    }
    return;
}

loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const userData = getFormData(loginForm);
    await saveUserToDB(userData)

})

