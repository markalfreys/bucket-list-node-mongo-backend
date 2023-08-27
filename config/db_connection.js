const mongoose = require('mongoose')


const username = encodeURIComponent(process.env.DBUSER);
const password = encodeURIComponent(process.env.DBPASS);

const CONNECTION_URL = `mongodb+srv://${username}:${password}@cluster0.x79yjir.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const mongoDB = mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => console.log('DB Connected'))
                .catch((error) => console.log('DB Not Connected', error.message))


module.exports = mongoDB