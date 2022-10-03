require('dotenv').config();
let mongoose = require('mongoose');

// connect to mongodb database
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

//create schema for person model
let personSchema = new mongoose.Schema({
  name: {
    type:String, 
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

//create Person model from schema
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  // create new document from person model
  let oferanmi = new Person;
  oferanmi.name = 'Oferanmi Vic';
  oferanmi.age = 33;
  oferanmi.favoriteFoods = ['Jollof Rice', 'beans', 'Fish', 'Eggs'];
  
  oferanmi.save((err, data) => {
    if(err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
