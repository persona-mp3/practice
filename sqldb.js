import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

// the sql config object contains the credentails that the MySQL database authenticates to allow connections
const sqlConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
}


const pool = mysql.createPool(sqlConfig).promise()

export async function saveUserQuery(userObj) { 
    const userEmail = userObj.email;
    // the password returned must be hashed
    const userPassword = userObj.password

    if (userEmail === undefined || userEmail.trim() === '' ) {
        return 400
    }

    if (userPassword === undefined || userPassword.trim() === '') {
        return 400
    }

    try { 
        let query = `
                    insert into users (email, password)
                    values (?, ?)
                     `
        const response = await pool.query(query, [userEmail, userPassword]);

        return 201

    } catch (err) {
        throw err.errno
        
    }
    
}


// returns the users information from the database if found
// returns undefined for unexpected errors
// returns false if user was not found
// authentication is handled in tools.js as authenticator(userObj)
export async function checkUserQuery(userEmail) {
    let query = `select email, password from users where email = (?)`
    try { 
        const [response] = await pool.query(query, [userEmail]);

        if (!Array.isArray(response)) {
            console.log('unexpected error -->', response)
            return 
        }


        if (response.length === 0 || response[0] === undefined ) {
            return false
        }

        const dbResponse = response[0]

        return dbResponse

    } catch (err) {
        throw err
    }
}
