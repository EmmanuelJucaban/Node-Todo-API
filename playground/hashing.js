const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

// takes the object and secret as 2nd params
// this returns a token
 //  this is the value we return back to the user when they signup or login
// this is also the value we store inside the tokens array in the user model
var token = jwt.sign(data, 'secret');

console.log(token);


// verifies that the token we sent is unmodified
// we pass the token we want to verify and then the secret
//  returns the decoded result
var decoded = jwt.verify(token, 'secret');

console.log("Decoded ***", decoded);




// var message = "I am user number 1";
// // the SHA256 function returns an object
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
//
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   // this will be the hash value of the data
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// // this is an attempt of a user trying to delete all the properties of person id 5
// token.data.id = 5;
// // If they try to rehash and update token.hash to a new value, it wont match the hash we create later on
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// // Since we added salt to the hash, it is not the same hash
// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log(`Data was not changed`);
// } else {
//   console.log("Data was changed. Don't trust! ");
// }
