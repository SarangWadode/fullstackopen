const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

url = process.env.MONGODB_URI;

console.log("connection to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function(v) {
        return (/\d{2,3}-\d+/gm).test(v);
      },
      message: props => `${props.value} is not valid phone number. Please enter a valid number eg: 09-1234556
      or 040-22334455!`
    },
  },
});

personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
