const ArtistClass = require('../models/artist');

/**
 * Finds a single artist in the artist collection.
 * @param {object} artistProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Artist that was created
 */
module.exports = (artistProps) => {
  //console.log(artistProps);
  const ArtistSave = new ArtistClass(artistProps);
  //console.log('Test CreateArtist.js: ', ArtistSave);
  return ArtistSave.save();

};
