const mongoose = require('mongoose')


require('dotenv').config();

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const LogInSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
})

const User = connection.model("Collection2", LogInSchema)

module.exports.connection = connection;
module.exports.User = User;