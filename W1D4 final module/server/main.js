  import express from "express"
import endpoints from "express-list-endpoints"
import mongoose from "mongoose"
import { authorRoute } from "./services/authors/index.js"
import { blogRoute } from "./services/blogs/index.js"
import {
  badRequestHandler,
  genericErrorHandler,
  notfoundHandler,
  unauthorizedHandler,
} from "./errorHandlers.js"
import { loginRoute } from "./services/login/index.js"
/* import passport from "passport"
import googleStrategy from "./lib/oauth/index.js" */  
/* const express = require ( 'express' ); */
const app = express();
const dbName= "testDb";



const PORT = process.env.PORT || 3002;

app.use(express.json())
/* passport.use("google", googleStrategy) */
app.use("/authors", authorRoute)
app.use("/blogs", blogRoute)
app.use("/login", loginRoute)

app.use(badRequestHandler) // 400
app.use(unauthorizedHandler) // 401
app.use(notfoundHandler) // 404
app.use(genericErrorHandler) // 500

const initServer = async () => {
  try {
    await mongoose.connect('mongodb+srv://dariofranco506:Dellinger23.@cluster0.vvmnlfz.mongodb.net/'+dbName)             /* (process.env.MONGO_URL) */
    console.log("The server has successfully connected to mongodb.")
    app.listen(PORT, () => {
      console.log(
        " Server has started on port " +
          PORT +
          "!" +
          " \n The server has these endpoints: \n"
      )
      console.table(endpoints(app))
    })
  } catch (error) {
    console.log("❌ CONNECTION FAILED! Error: ", error)
  }
}

initServer()
