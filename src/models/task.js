const mongose = require('mongoose');
const {Schema} = mongose;

const UserSchema = new Schema(
    {
       // id_usuario: String,
        nombre_usuario: { type: String, required: true},
        cedula_usuario: { type: String,required: true },
        telefono_usuario: { type: String, required: true },
        mail_usuario: { type: String, required: true },
   
    });

module.exports = mongose.model('Task', UserSchema);