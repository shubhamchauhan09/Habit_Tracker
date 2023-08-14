// require mongoose library
const mongoose = require('mongoose');

// mongoose connected to database
// mongoose.connect('mongodb://127.0.0.1:27017/habit-tacker');

async function main() {
    // await mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_database');
    await mongoose.connect('mongodb+srv://shubhamchauhan9:Y14cynvCeMD4dWz0@cluster0.exxmt4y.mongodb.net/');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().catch(console.error);

// connection gives access to the database we earlier connected to the variable db , we acquire the connection
const db = mongoose.connection;

// if error then prints error
db.on('error', console.error.bind(console, 'error Connecting to db'));

// if up and running then prints the msg
db.once('open', function() {
    console.log('successfully Connected to database')
});
