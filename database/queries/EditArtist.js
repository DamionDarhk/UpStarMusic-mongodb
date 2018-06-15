const ArtistClass = require('../models/artist');

/**
 * Edits a single artist in the Artists collection
 * @param {string} _id - The ID of the artist to edit.
 * @param {object} artistProps - An object with a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves when the record is edited
 */
module.exports = (_id, artistProps) => {
  //console.log(_id,artistProps);
  //const ArtistEdit = new ArtistClass(artistProps);
  return ArtistClass.update({ _id }, artistProps);
  /* we are using sybtax as update({a},b), in order to return a as an object, if not a will return plain text */
};
