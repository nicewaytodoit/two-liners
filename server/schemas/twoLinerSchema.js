const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyTaskSchema = new Schema(
  {
    author: {
      type: String,
      index: true,
      unique: true,
    }, // ID
    address: String,
    yesterday: String,
    tomorrow: String,
    actionType: ['action','comment','issue'],
    actions: String,
  },  
  { 
    _id: false,
    timestamps: true,
  }
);

const TwoLinerSchema = new Schema(
  {
    date: {
      type: String,
      index: true,
      unique: true,
    },
    messages: [DailyTaskSchema]
  },  
  { 
    timestamps: true,git 
  }
);

TwoLinerSchema.statics.findOneOrCreate = function(condition, callback) {
  const self = this;
  const query = self.findOne(condition, (err, result) => {
      console.log('result is ::', result, condition);
      return result ? callback(err, result) : self.create(condition, (err1, res) => { 
          console.log('result is ::', res);
          return callback(err1, res); 
        });
  })
  return query;
}

module.exports = {
  TwoLiner: mongoose.model("TwoLiner", TwoLinerSchema),
  DailyTask: mongoose.model("DailyTask", DailyTaskSchema),
}

// const a = {
//   _id: "aytre456ye45ygf", 
//   date: "2019-02-03",
//   messages: [
//     {
//       author,
//       address, 
//     }
//   ]
// }

