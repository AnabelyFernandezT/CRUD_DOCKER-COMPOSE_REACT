const mongoose = require('mongoose');

const URI = 'mongodb://mongo/TBL_USUARIO';

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true

})
.then(db => console.log('Db is connected'))
.catch(err => console.error(err))

module.exports = mongoose;



