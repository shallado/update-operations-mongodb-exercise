// mongoimport original.json -d test-db -c users --jsonArray --drop
// import data

// ------------  Decrementing Values ----------
// update Manuel and decrease age by 1
db.users.updateOne({
  name: 'Manuel'
}, {
  $inc: {
    age: -1
  }
});

// update Manuel and update isSporty field to false
db.users.updateOne({
  name: 'Manuel'
}, {
  $set: {
    isSporty: false
  }
});

// ------------ Using $min, $max, $mul ----------
// user chris
// update but only change the age value if its greater than the given value of 35
db.users.updateOne({ 
  name: 'Chris', 
}, {
  $max: {
    age: 35
  }
});

// user chris
// update but only change the age value if its less than the given value of 35
db.users.updateOne({
  name: 'Chris'
}, {
  $min: {
    age: 35
  }
});

// user chris
// update and multiply the age value with the given value
db.users.updateOne({
  name: 'Chris'
}, {
  $mul: {
    age: 2
  }
});

// ------------ Getting Rid of Fields ----------
// update all users with a field of isSporty set to true and remove the phone field
db.users.updateMany({ 
  isSporty: false 
}, { 
  $set: {
    isSporty: true
  },
  $unset: {
    phone: ''
  }
});

// ------------ Renaming Fields ----------
// rename all user age field to totalAge
db.users.updateMany({}, {
  $rename: {
    age: 'totalAge'
  }
});

// ------------ Understanding upsert() ----------
// update some document but not sure whether it exists or not but if it doesn't exist still insert that document with the given data object
// update Maria with this given data
// {
//   age: 29,
//   hobbies: [{
//     title: "Eating Good Food",
//     frequency: 3
//   }],
//   isSporty: true
// }
db.users.updateOne({ 
  name: 'Maria' 
}, {
  $set: {
    age: 29,
    hobbies: [{
      title: 'Eating Good food',
      frequency: 3
    }],
    isSporty: true
  }
}, {
  upsert: true
});

// assignment
// 1) Create a new collection ("sports") and upsert two new documents into it (with these fields: "title", "requiresTeam");
db.sports.updateOne({}, {
  $set: {
    title: 'baseball',
    requiresTeam: true
  }
}, {
  upsert: true
});

db.sports.updateOne({
  title: 'tennis'
}, {
  $set: {
    requiresTeam: false
  }
}, {
  upsert: true
});

// 2) Update all documents which do require a team by adding a new field with the minimum amount of players to 11
db.sports.updateMany({
  requiresTeam: true
}, {
  $set: {
    minAmount: 11
  }
});

// 3) Update all documents that required team by increasing the number of required players by 10
db.sports.updateMany({
  requiresTeam: true
}, {
  $inc: {
    minAmount: 10
  }
});


// ------------ Updating Matched Array Elements ----------
// .$ first match
// .$[] match all elements

// find users with hobbies array contains title of 'Sports' and frequency greater than or equal 3
db.users.find({ 
  hobbies: {
    $elemMatch: {
      title: 'Sports',
      frequency: {
          $gte: 3
      }
    }
  } 
});

// the first match in hobbies update the document to have a field named highFrequency with value set to true
db.users.updateMany({
  hobbies: {
    $elemMatch: {
      title: 'Sports',
      frequency: {
        $gte: 3
      }
    }
  }
}, {
  $set: {
    'hobbies.$.highFrequency': true
  }
});

// ------------ Updating All Array Elements ---------- //
// update hobbies array that contains a document with frequency value that is greater than 2 
// update it with adding/updating field goodFrequency = true
db.users.updateMany({
  'hobbies.frequency': {
    $gt: 2
  }
}, {
  $set: {
    'hobbies.$[].goodFrequency': true
  }
});

// ------------ Finding & Updating Specific Fields ----------
// update hobbies with a frequency greater than 2
// update field goodFrequency set to true
// but only update the docs inside the array that have a frequency field value greater than 2
db.users.updateMany({
  'hobbies.frequency': {
    $gt: 2
  }
}, {
  $set: {
    'hobbies.$[el].goodFrequency': true
  }
}, {
  arrayFilters: [{
    'el.frequency': {
      $gt: 2
    }
  }]
});

// ------------ Adding Elements to Arrays ----------
// update user Maria and add this value
// update Maria hobbies field and add these hobbies
// sort by descending order based off of frequency
// {
//   title: 'Good Wine',
//   frequency: 1
// }
// {
//   title: 'Hiking',
//   frequency: 1
// }

db.users.updateOne({
  name: 'Maria'
}, {
  $push: {
    hobbies: {
      $each: [{
        title: 'Good Wine',
        frequency: 1
      }, {
        title: 'Hiking',
        frequency: 1
      }],
      $sort: { frequency: -1 }
    }
  }
});

// ------------ Removing Elements From Array ----------
// remove hobby from maria with title hiking
// remove a hobby from chris that is the last one in his hobbies array
db.users.updateOne({
  name: 'Maria'
}, {
  $pull: {
    hobbies: {
      title: 'Hiking'
    }
  }
});

db.users.updateOne({
  name: 'Chris'
}, {
  $pop: {
    hobbies: -1
  }
});

// ------------ Understanding $addToSet ----------
// add value below to Maria hobbies but don't use push operator
db.users.updateOne({
  name: "Maria"
}, {
  $addToSet: {
    hobbies: {
      title: "Hiking",
      frequency: 2
    }
  }
});