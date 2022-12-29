// const mongoose  = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/test', {
//     serverSelectionTimeoutMS: 1000
// }).then(()=>{
//     console.log('database connection established');
//     createUser({name: 'test', email: 'test@example.com'})
//     createUser({name: 'test2', email: 'test2@example.com'})
// }).catch((e)=>{
//     console.log(e)
// }

// )
// const Schema = new mongoose.Schema({
//     name: String,
//     email: String,

// })

const User = new mongoose.model('User', Schema)

async function createUser(data){
    const user = new User({...data})
    await user.save()
    return user
}