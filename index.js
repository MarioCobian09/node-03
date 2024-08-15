import express from "express"
import bodyParser from "body-parser"
import admin from "firebase-admin"
import estudianteRoutes from "./routes/estudiantes.js"
import ServiceAccount from "./config/firebaseServiceAccount.json" with { type: 'json' }