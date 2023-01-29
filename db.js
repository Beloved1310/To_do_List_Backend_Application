const mongoose = require("mongoose");
const MONGODBURI =
  "mongodb+srv://aydemo:aydemo@cluster0.szk1g.mongodb.net/TodoApp";


const connectToMongo = async() => {
  mongoose.set("strictQuery", false);
  const mongooseConnect = await mongoose.connect(MONGODBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  });
  if (mongooseConnect) {
    console.log('Connected to Database');
  } else {
    console.log('Not Connected to Database');
  }
};

module.exports = connectToMongo;

