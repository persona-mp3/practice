import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import mysql from 'mysql2'


import { checkUserQuery, saveUserQuery } from './sqldb.js'

dotenv.config()



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


// this function uses the hash function to hash the users password and  
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





export async function authenticator(userObj) {
    // import db query and user the response
    const userEmail = userObj.email;
    const userPass = userObj.password;

    if (userEmail === undefined || userEmail.trim() === ''|| userPass === undefined || userPass.trim() === '' ) {
        return 'invalid credentials'
    }

    try { 
        const dbResponse = await checkUserQuery(userEmail);

        if (dbResponse === undefined ) {
            console.log('unexpected database error')
            return;
        }

        // dbResponse returns false if user does not exist
        if (!dbResponse) {
    
            return 0;
        }


        console.log('userExists, data below----')
        console.log(dbResponse)
        
        const dbPass = dbResponse.password;
        
        // bcryptcompare takes the plain string and hashedPassword
        const isValid = await bcrypt.compare(userPass, dbPass)

        // bcryptcompare returns true if the two passwords match
        if (!isValid) {
            return false
        }

        return true


    } catch (err) {
        throw err
    }

}