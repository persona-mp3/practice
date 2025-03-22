import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getFirestore ,collection, addDoc, getDocs, onSnapshot, query, where, getDoc, doc } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

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

const submitBtn = document.querySelector('.submit-btn')

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

async function getDocuments() {
    try { 
        const response = await getDocs(colRef);

        let data = []

        response.forEach((doc) => {
            const docData = doc.data()
            const id = doc.id

            data.push({...docData, id})
        })

        console.log('all data')
        console.log(data)
    } catch (err) {
        throw err
    }
}


async function listenForUpdates() {
    try { 
        // onSnapshot takes two arguments colRef and a callback fn
        // the callbackFn returns a new snapshot of the collection
        // anytime a change is detected
        let data = []
        const response = await onSnapshot(colRef, (snapshot) => {
            snapshot.forEach((doc) => {
                const docData = doc.data()
                const id = doc.id
    
                data.push({...docData})
            })
    
            console.log('updated data')
            console.log(data)
    
        }) ;
    } catch (err) {
        throw err
    }
}


// await listenForUpdates()

async function saveUserToDB(userObj) {
    try {
        const response = await addDoc(colRef, userObj);

     } catch (err) {
        throw err
    }
    return;
}


// to make direct queries, import the query & where functions
// query takes 2 arugments, the collection reference and where
// where takes 3 arguments, the field/property name, comparison, and target value
async function queryFirestore() {
    const firebaseQuery = query(colRef, where("email", "==", "neffex@youtube.com"))
    console.log('query stats')
    console.log(firebaseQuery)
    // await listenForUpdates()
    // doesnt work

}


async function getSingleDoc(){
    const docRef = await doc (db, "users", "EvqvGwIJZYCtoSsHIwkJ")
    const response = await getDoc(docRef);
    console.log(response.data())
}

await getSingleDoc()

// await queryFirestore()
loginForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    submitBtn.classList.add('disabled-btn')
    const userData = getFormData(loginForm);
    await saveUserToDB(userData)

})

