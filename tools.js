import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import mysql from 'mysql2'


import { saveUserQuery } from './sqldb.js'

dotenv.config()


const globalUser = {}
const userObj = { 
    email: 'Aphex Twin',
    password: 'Aphe Mike'
}


// this function takes the details sent in by the user and gets the password property
// it is here that it hashes the password and updates the password property in the userObj
// and then returns the userObj with the updatedProperty
export async function hashUser(userObj){
    if (userObj.email === undefined || userObj.email.trim() === '') {
        console.log('hash unsucesssful')
        return ;
    }

    if (userObj.password === undefined || userObj.password === '' || userObj.password.trim() === '') {
        console.log('hash unsucesssful')
        return;
    }
    try {
        const password = userObj.password;
        const hashedPass = await bcrypt.hash(password, 13)

        // update userObj with hashedPassword;
        userObj.password = hashedPass;
        console.log('hash successful')
        return userObj;

     } catch (err) {
        throw err
    }
}


// this function uses the hash function and  
// databaseQuery function that saves the user to the database

export async function executeSaveUser(userObj) {
    try {

        const hashedObj = await hashUser(userObj);

        if (hashedObj === undefined) {
            // user password or email were not found or empty strings
            return 400
        }

        const isUserSaved = await saveUserQuery(hashedObj);

        if (isUserSaved === 400) {
            // the user was not saved to the db becuase empty values were found
            return 400
        }

        // user was saved to database
        return 200



     } catch (err) {
        throw err
    }
}














export async function authenticateUser(userObj, savedObj) {
    if (userObj.email === undefined || userObj.email.trim() === ''  ||  savedObj.email === undefined ||savedObj.email.trim() === '') {
        console.log('invalid email')
        return;
    }

    if (userObj.password === undefined || userObj.password.trim() === ''  ||  savedObj.password === undefined ||savedObj.password.trim() === '') {
        console.log('invalid password')
        return;
    }

    try {
        let loginPass = userObj.password;
        let hashedPass = savedObj.password
        // bcrypt.compare() takes in the plain string and hasehdPass as argumnents and returns a boolean
        const isPassValid = await bcrypt.compare(loginPass, hashedPass)

        if (!isPassValid) {
            console.log('these passwords are not the same', loginPass, hashedPass)
            return;
        }

        console.log('passwords are the same')
     }catch (err) {

        
        throw err
    }
}


const sandbox = {
    email: '',
    password: 'Aphex Mike',
}

const foo = async () => {
    let hashedPass = await saveUser(sandbox);
    if (hashedPass === undefined) {
        return;
    }

    let auth = await authenticateUser(userObj, hashedPass)
}

// await foo()