require("dotenv").config();
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://amaan:DB0518@cluster0.owzftwo.mongodb.net/fcc-mongodb-and-mongoose?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const amaanAli = new Person({
    name: "Amaan Ali",
    age: 26,
    favoriteFoods: ["Biryani", "Kababs", "Roasted Chicken", "Sewai"],
  });
  amaanAli.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data);
  });
};

const arrayOfPeople = [
  {
    name: "John Ali",
    age: 26,
    favoriteFoods: ["Biryani", "Kababs", "Roasted Chicken", "Sewai"],
  },
  {
    name: "Ankit Khan",
    age: 24,
    favoriteFoods: ["Egg Roll", "Nuggets", "Corn", "Fruits"],
  },
  {
    name: "Sufiyan Mishra",
    age: 25,
    favoriteFoods: [
      "Soya Chaap",
      "Soya Kababs",
      "Roasted Soya Chaap",
      "Sweet Soya Chaap",
    ],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (err, personFound) {
    if (err) return console.log(err);

    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, personFound) {
    if (err) return console.log(err);

    done(null, personFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.log(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, updatedDoc) => {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({ _id: personId }, (err, removedDoc) => {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, removeResult) => {
    if (err) return console.log(err);
    done(null, removeResult);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(function (err, people) {
      if (err) return console.log(err);
      done(null, people);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
