import express from "express"
import bcrypt from "bcryptjs"
import admin from "firebase-admin"
import ServiceAccount from "../config/firebase/firebaseServiceAccount.json" with { type: 'json' }

const router = express.Router()
const db = admin.firestore()
const estudiantesCollection = db.collection('estudiantes')

router.post('/create', async (req, res) => {
    const { nombre, apPaterno, apMaterno, direccion, telefono, correo, usuario, password } = req.body

    //Validar correo y usuario
    const findUsuario = await estudiantesCollection.where('usuario', '==', usuario).get()
    const findCorreo = await estudiantesCollection.where('correo', '==', correo).get()

    if(!findUsuario.empty) {
        return res.status(400).json({
            error: 'El usuario ya existe'
        })
    }

    if(!findCorreo.empty) {
        return res.status(400).json({
            error: 'El correo ya existe'
        })
    }

    const passHashed = await bcrypt.hash(password, 10)

    const newUser = {
        nombre,
        apPaterno,
        apMaterno,
        direccion,
        telefono,
        correo,
        usuario,
        password: passHashed
    }

    await estudiantesCollection.add(newUser)

    res.status(200).json({
        'message': 'Usuario registrado correctamente'
    })
})

module.export = router