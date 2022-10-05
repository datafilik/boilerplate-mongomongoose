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

//create Person () model from schema
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
  // create multiple documents from preson model
  Person.create(arrayOfPeople, (err, data) =>{
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  // query collection(database) to find a documents(records) that has a specific search key (personName in this case)
  Person.find({name: personName}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  // query collection  to find a single document that match a search key (food in this case)
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  // find document in collection using  unique ID(_id) as search key
  Person.findById({_id: personId}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // find document
  Person.findById({_id: personId}, (err, data) => {
    if (err) {
      return done(err)
    }else{
      // edit document
      data.favoriteFoods.push(foodToAdd);
      // save edited document
      data.save((err, data) => {
        if (err) return done(err);
        done(null, data)
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  /* finds document from collection using name as search key, then updates the age value of the document, then returns the new update document setting option value of new to true*/
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  // Delete one document (record) that has a specified search key value (id in this case).
  Person.findOneAndRemove({_id: personId}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  // Delete many documents that have specified search key value (name in this case).
  //IMPORTANT: model.remove() is deprecated. deleteOne, deleteMany and bulkWrite can be used instead.
  Person.remove({name: nameToRemove}, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// Chaining  search query helpers to narrow search results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  // find people who like the food specified by the variable named foodToSearch. Sort them by name, limit the results to two documents, and hide their age.
  Person.find({favoriteFoods: foodToSearch}).sort({name: 'asc'}).limit(2).select('-age').exec((err, data) => {
    if (err) return done(err);
    done(null, data);
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
