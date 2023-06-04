var express = require('express');
const path = require('path');
var moment = require('moment');
var app = express();
const db = require("./config/mongoose")

const User = require("./models/user")
const Habit = require("./models/habit")
const Status = require("./models/status");

app.use(express.json());
app.use(express.static('assets'));


const defaultUserName = "demo"


// set the views property of app to path using path.join joining root directory to views folder inside root
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', function(req, res) {
    res.send('<a href="/habits">Habits</a>');
})

const checkForUser = async() => {
    try {
        var query = { name: defaultUserName },
            update = { expire: new Date() },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        await User.findOneAndUpdate(query, update, options);
    } catch (e) {
        console.log(e)
    }
}


app.get('/habits', async function(req, res) {
    try {
        await checkForUser();
        let user = await User.findOne({ name: defaultUserName });
        let habits = await Habit.find({ user: user._id, });
        return res.render("habits", { title: "Habits", habits, user });
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
        console.log('error', err);
    }
});


app.get('/status/:habitId', async function(req, res) {
    try {
        let habitId = req.params.habitId;
        const last7days = new Date();
        last7days.setDate(last7days.getDate() - 6);
        let result = await Status.find({ habit: habitId, $and: [{ createdAt: { $lte: new Date() } }, { createdAt: { $gte: last7days } }] });
        let habit = await Habit.findOne({ _id: habitId });

        let status = [];
        for (let i = 6; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i)

            let data = result.find(status => {
                let statusDate = new Date(status.createdAt);
                return statusDate.getDate() === date.getDate()
            })

            if (data) {
                status.push(data)
            } else {
                status.push({ createdAt: date, value: "none", habit: habitId })
            }
        }

        return res.render("status", { title: "Status", status: status, habit, moment });
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
        console.log('error', err);
    }
});

app.post('/save-habit', async function(req, res) {
    try {
        let result = await Habit.create(req.body)
        return res.send(result);
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
});


app.post('/create-status', async function(req, res) {
    try {
        let result = await Status.create(req.body)
        return res.send(result);
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
});

app.put('/update-status', async function(req, res) {
    try {
        let id = req.body._id;
        let status = req.body;
        delete status._id;

        let result = await Status.findOneAndUpdate({ _id: id }, status);
        return res.send(result);
    } catch (err) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    }
});





var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
})