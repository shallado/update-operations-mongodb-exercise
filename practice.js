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

// user chris
// update but only change the age value if its less than the given value of 35

// user chris
// update and multiply the age value with the given value

// ------------ Getting Rid of Fields ----------
// update all users with a field of isSporty set to true and remove the phone field

// ------------ Renaming Fields ----------
// rename all user age field to totalAge

// ------------ Understanding upsert() ----------
// update some document but not sure whether it exists or not but if it doesn't exist still insert that document with the given data object
// update Maria with this given data
// {
//   age: 29,
//   hobbies: [{
//     title: "Good fodo",
//     frequency: 3
//   }],
//   isSporty: true
// }

// assignment
// 1) Create a new collection ("sports") and upsert two new documents into it (with these fields: "title", "requiresTeam");

// 2) Update all documents which do require a team by adding a new field with the minimum amount of players to 11

// 3) Update all documents that required team by increasing the number of required players by 10


// ------------ Updating Matched Array Elements ----------
// .$ first match
// .$[] match all elements

// find users with hobbies array contains title of 'Sports' and frequency greater than or equal 3

// update document with hobbies array that contains a document with title of 'Sports' and frequency that is greater than or equal to 3
// the first match in hobbies update the document to have a field named highFrequency with value set to true

// ------------ Updating All Array Elements ---------- // this is where I left off
// update hobbies array that contains a document with frequency value that is greater than 2 
// update it with adding/updating field goodFrequency = true

// find all persons with an age older than 30 and add new field to all documents in my hobbies array
// update documents with a totalAge that is greater than 30 
// increment the fri
db.users.updateMany({
  totalAge: {
    $gt: 30
  }
}, {
  $inc: {
    "hobbies.$[].frequency": -1
  }
});

// ------------ Finding & Updating Specific Fields ----------
db.users.updateMany({
  "hobbies.frequency": {
    $gt: 2
  }
}, {
  $set: {
    "hobbies.$[el].goodFrequency": true
  }
}, {
  arrayFilters: [{
    "el.frequency": {
      $gt: 2
    }
  }]
});

// ------------ Adding Elements to Arrays ----------
// update user Maria and add this value
// hobbies: {
//   title: 'Sports',
//   frequency: 2
// };

db.users.updateOne({
  name: "Maria"
}, {
  $push: {
    hobbies: {
      $each: [{
        title: "Good Wine",
        frequency: 1
      }, {
        title: "Hiking",
        frequency: 2
      }],
      $sort: {
        frequency: -1
      }
    }
});

// ------------ Removing Elements From Array ----------
db.users.updateOne({
  name: "Maria"
}, {
  $pull: {
    hobbies: {
      title: "Hiking"
    }
  }
});

db.users.updateOne({
  name: "Chris"
}, {
  $pop: {
    hobbies: 1
  }
});

// ------------ Understanding $addToSet ----------
// adds values that are not inside the array yet so only adds unique values
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