// I started writing comments xD
const mongoose = require("mongoose");

if (process.argv.length < 2) {
  console.log(
    "'Please provide the password as an argument: node mongo.js <password>'"
  );
  process.close(1);
}

//password
const password = process.argv[2];

//url
url = `mongodb+srv://sarang:${password}@cluster0.ccmbeig.mongodb.net/?retryWrites=true&w=majority`;

// schema
const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

// model
const Person = new mongoose.model("Person", personSchema);

// mongoose connect
mongoose
  .connect(url)
  .then((res) => {
    console.log("connected");
    // add new person
    if (process.argv.length == 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });
      // person added msg
      console.log(`added ${person.name} number ${person.number} to phonebook.`);
      return person.save();
    } else {
      //display all
      Person.find({}).then((result) => {
        result.map(element => {
            console.log(element)
        });
      });
    }
  })
  .then(() => {
    return mongoose.connection.close();
  })
  // error catch
  .catch((err) => console.log(err));

// return all collection
