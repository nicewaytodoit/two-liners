const mongoose = require("mongoose");
const chalk = require('chalk');
const MessageNode = require("./schemas/messageSchema");

const twoLiners = require("./schemas/twoLinerSchema");
// const twoLiners = {};
const TwoLinerNode = twoLiners.TwoLiner;
const DailyTaskNode = twoLiners.DailyTask;

// console.log('@@@@', JSON.stringify(Schema));

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

// https://stackoverflow.com/questions/15921700/mongoose-unique-values-in-nested-array-of-objects

// var groupSchema = Schema({
//     name : { type : String },
//     org : { type : Schema.Types.ObjectId, ref : 'Organization' },
//     ...
//     users : [{
//       uid : { type : Schema.Types.ObjectId, ref : 'User' },
//       ...
//     }]
//   });

//   Use the $addToSet operator to add a value to an array only if the value is not already present.

//   Group.update({name: 'admin'}, {$addToSet: {users: userOid}}, ...
  
//   However, if the users array contains objects with multiple properties and you want to ensure uniqueness over just one of them (uid in this case), then you need to take another approach:
  
//   var user = { uid: userOid, ... };
//   Group.update(
//       {name: 'admin', 'users.uid': {$ne: user.uid}}, 
//       {$push: {users: user}},
//       function(err, numAffected) { ... });


function findOrCreateMe() {
    return new Promise((resolve, reject) => {
        DailyTaskNode.create({ 
            author: 'Foo5',
            date: '2011-01-10',
            address: '121.12.122.11',
            yesterday: 'Whatever 1',
            tomorrow: 'Whatever 1',
            // actionType: 'test', // should fail because of this
            actionType: null, // should fail because of this
            actions: 'Don\'t take any actions',
        } , (err, obj) => {
            if (err) {
                reject(JSON.stringify(err));
            };
            // saved!
            resolve(JSON.stringify(obj, null, 2));
        })
    });
}

// findOrCreateTwo()
// findOrCreate2();
// findOne();

// actionType does not work 
// * how to limit values in mongoose schema 

findOrCreateMe().then((res) => {
    console.log('----------');
    console.log('Data:', res);
})
.catch(err => {
    console.log('----------');
    console.log('Error', chalk.red(err));
})
.finally(() => {
    console.log( ' ----------- Exit ------------ ' );
    process.exit();
});