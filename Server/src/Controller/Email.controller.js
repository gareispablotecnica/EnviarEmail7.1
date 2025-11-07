const { json } = require('express');
const db = require('../DataBase/db')
const { enviarCorreo } = require('../Utils/Email')


const EnviarunEmail = async (req, res) => {
    // --> Traemos los Parametros desde el Front
    const { Email, Asunto, Cuerpo } = req.body;
    // ---> Imprimimos los Datos 
    console.log(req.body)
    if (!Email || !Asunto || !Cuerpo) {
        console.error('Campos Vacios')
        return res.status(401).json({ Error: 'Debe completar los Datos' })
    }
    // ---> Insertar a la base de datos

    db.run(query, [Email, Asunto, Cuerpo], async (Error) => {
        if (Error) {
            console.error('Error en el servidor o consulta')
            return res.status(500).json({ Error: 'Error Interno, Verificar Servidor' })
        }
        // ---> Enviamos el correo
        const Correo = await enviarCorreo(Email, Asunto, Cuerpo)
        // --> si esta mal indicamos el error  
        if (!Correo.success) {
            return res.status(404).json({ Error: 'Error al Enviar el Email' })
        }
        // --> si esta bien
        return res.status(201).json({ mensaje: 'Email Enviados' })

    })

}
module.exports={EnviarunEmail}