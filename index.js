import express from "express"
import bodyParser from "body-parser"
import admin from "firebase-admin"
import estudianteRoutes from "./routes/estudiantes.js"
import ServiceAccount from "./config/firebaseServiceAccount.json" with { type: 'json' }

admin.initializeApp({
    credential: ServiceAccount
})

const app = express()
app.use(bodyParser.json())

app.use('/api/estudiantes', estudianteRoutes)

const PORT = process.env.PORT || 3010

app.listen(PORT, () => {
    console.log(`SERVIDOR CORRIENDO EN ${PORT}`);
})