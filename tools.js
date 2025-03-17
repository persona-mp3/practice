import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()


const globalUser = {}
const userObj = { 
    email: 'Aphex Twin',
    password: 'Aphe Mike'
}

export async function saveUser(userObj){
    if (userObj.email === undefined || userObj.email.trim() === '') {
        console.log('invalid email --> saveUser')
        return ;
    }

    if (userObj.password === undefined || userObj.password === '' || userObj.password.trim() === '') {
        console.log('invalid password')
        return;
    }
    try {
        const password = userObj.password;
        const hashedPass = await bcrypt.hash(password, 13)

        // update userObj with hashedPassword;
        userObj.password = hashedPass;
        globalUser.email = userObj.email;
        globalUser.password = userObj.password
        console.log('user saved successfully')
        return userObj;

     } catch (err) {
        return err
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
        return err
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