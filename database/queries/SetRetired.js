const ArtistClass = require('../models/artist');

/**
 * Sets a group of Artists as retired
 * @param {array} _ids - An array of the _id's of of artists to update
 * @return {promise} A promise that resolves after the update
 */
module.exports = (_ids) => {
  //console.log('Set Retired Artists test', _ids);
  //return ArtistClass.find({_id: _ids}).update({$set: {retired: true}});
  /*above LOC uses bulk.find.update() method in mongodb operation*/

  return ArtistClass.update(
    {_id: {$in: _ids}},
    {retired: true},
    {multi: true}
  );  //this LOC uses ES6 code

};
