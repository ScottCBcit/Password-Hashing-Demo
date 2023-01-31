
import express from 'express'

import {createUser, getUserWithEmail, updateUserDisplayName, updateUserProfileImage} from './database.js'
import bcrypt from 'bcrypt';

const app = express()
app.use(express.json())


// sign in



// sign up
// const plaintextPassword = req.body.password

// const same = await bcrypt.compare(plaintextPassword, hashedPassword)

app.post("/api/login", async (req, res) => {
  console.log("sign in", req.body)
  
  const email = req.body.email
  const displayName = req.body.displayName
  
  createUser({email: email, password: hashedPassword, displayName: displayName})
  res.send({status: "ok"})
})

app.post("/api/signup", async (req, res) => {
  console.log("sign up", req.body)

  const email = req.body.email;
  const displayName = req.body.displayName;
  const plaintextPassword = req.body.password;

  const userCheck = await getUserWithEmail(email);
  if(userCheck) {
    console.log(`Check User if exists ${userCheck}`)
    return res.status(400).send({status: "error", error: "Email already in use"})
  }
  else{
    const hashedPassword = await bcrypt.hash(plaintextPassword, 10)
    const user = await createUser({email: email, password: hashedPassword, displayName: displayName})
    console.log(`User created ${userCheck}`)
    return res.send({status: "ok"})
  }
})

app.put("/api/users/:id/displayName", (req, res) => {
  console.log("update displayName", req.body)
  res.send({status: "ok"})
})

app.put("/api/users/:id/profileImage", (req, res) => {
  console.log("update profile image", req.body)
  res.send({status: "ok"})
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
    }
)
