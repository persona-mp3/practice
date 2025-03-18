// the server file only handles sign up and log in requests
// functionality codes are abstracted from this file and are found in tools.js
// morgan is shows server responses ie status code, request methods, time and more
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'

import { executeSaveUser, authenticator } from './tools.js';


dotenv.config()
const app = express()
const PORT = process.env.PORT;
// cors is configured to only allow request from the vscode live server
// you can update yours accordingly or remove it
app.use(cors({
    origin: `http://127.0.0.1:5500`,
    optionSuccessStatus: 200
}))

 

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))


// routes

app.post('/signup', async (req, res) => {
    const userDetails = req.body
    try { 
        const response = await executeSaveUser(userDetails)
        if (response === 400) {
            console.log('email or password is invalid -->', response)
            return;
        }

        console.log('user was saved to db -->', response)
        res.status(200).send({message: 'Registration was successful'})

    } catch (err) {

        if (err === 1062) {
            console.log('duplicate error-->', err)
            res.status(406).send({message: err})
        } else {
            console.log('unexpected err -->', err)
        }

    }


    
})

app.post('/login', async(req, res) => {
    const userObj = req.body;
    try { 

        const isCredValid = await authenticator(userObj)

        if (isCredValid === undefined) {
            console.log(500);
            return
        }

        if (isCredValid === 0 ) {
            console.log('userExists -->', false)
            console.log('granted -->', false)
            res.status(404).send({msg: 'Email not found'})
            return;
        }

        if (!isCredValid) {
            // expect to be false
            console.log('passwordMatch -->' ,isCredValid)
            console.log('granted -->', isCredValid)
            res.status(401).send({msg: 'Invalid Credentials'})
            return;
        }

        

        
        console.log('granted -->',isCredValid);
        
        res.status(200).send({msg: 'Access Granted'})



    } catch (err) {
        console.log(err)
    }

})



app.listen(PORT, () => {
    console.log('[server....] is active on port --->', PORT);
})