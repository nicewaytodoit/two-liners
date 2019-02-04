const mongoose = require("mongoose");
const MessageNode = require("./schemas/messageSchema");

const twoLiners = require("./schemas/twoLinerSchema");
const TwoLinerNode = twoLiners.TwoLiner;
const DailyMessageNode = twoLiners.DailyMessage;

const dbRoute = "mongodb://localhost:27017/twoliners";
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("MongoDB connection is ON"));
db.on("error", console.error.bind(console, "MongoDB connection Error:"));


function test() {
    const id = '5c56b5a893de035fd06a7dd9';
    const update = { message: 'I bet it is great' }
    MessageNode.findOneAndUpdate({ _id: id }, update, err => {
        if (err) return JSON.stringify({ success: false, error: err });
        return JSON.stringify({ success: true });
    });
}

const getDate = (str) => str ? str : new Date().toISOString().slice(0, 10);

function findTwo() {
    const date = 
    TwoLinerNode.findOne({ date: date }, (err, twoLiners) => {
        if (err) {
            console.log('Not found');
            return JSON.stringify({ success: false, error: err });
        }

        console.log('Found', twoLiners);
        return JSON.stringify({ success: true, twoLiners });
    });
}

function createTwo() {
    var two = new TwoLinerNode({ date: getDate() });
    two.save(function (err, obj) {
        if (err) {
            console.log(err);
            return JSON.stringify(err);
        };
        // saved!
        console.log('>>', JSON.stringify(obj));
    });
}

function findOrCreateTwo() {
    const query = TwoLinerNode.findOneOrCreate({ date: getDate("2011-01-01") }, (err, obj) => {
        if (err) {
            // console.log(err);
            return JSON.stringify(err);
        };
        // saved!
        return JSON.stringify(obj);
    });
    const promise = query.exec();
    promise.then((text)=> {
        console.log('Y :::', text);
    })
    .then(() => {
        process.exit();
    });
}

function findOrCreate2() {
    TwoLinerNode.findOneOrCreate({ date: getDate("2011-01-01") }, (err, obj) => {
        if (err) {
            console.log(err);
            return JSON.stringify(err);
        };
        // saved!
        return JSON.stringify(obj);
    });
}

function findOne() {
    const query = TwoLinerNode.findOne({ date: getDate() }, (err, obj) => {
        if (err) return JSON.stringify(err);
        return JSON.stringify(obj);
    });
    const promise = query.exec();
    promise.then((text)=> {
        console.log('MY::::', text);
    })
    .then(() => {
        process.exit();
    });
}

// findOrCreateTwo()
findOrCreate2();
// findOne();
