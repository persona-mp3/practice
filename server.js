// the server file only handles sign up and log in requests
// functionality codes are abstracted from this file and are found in tools.js
// morgan is shows server responses ie status code, request methods, time and more
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'

import { saveUser, authenticateUser } from './tools.js';


dotenv.config()
const app = express()
const PORT = process.env.PORT;
// cors is configured to only allow requested from the vscode live server
app.use(cors({
    origin: `http://127.0.0.1:5500`,
    optionSuccessStatus: 200
}))



// middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.post('/signup', async (req, res) => {
    const userDetails = req.body
    const hashedPass = await saveUser(userDetails)
    if (hashedPass === undefined) {
        res.send({message: 'save was unsuccessfull'});
    }

    console.log(hashedPass)
    res.status(200).send({message: 'fixed?'})
    
})

app.post('/login', async(req, res) => {
    console.log(req.body)
    res.status(200).send({message: 'fixed?'})
})



app.listen(PORT, () => {
    console.log('[server....] is active on port --->', PORT);
    // console.clear() 
})