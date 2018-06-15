const ArtistClass = require('../models/artist');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  //same code logic as in GetAgeRange.js
  const minactive = ArtistClass
    .find({})
    .sort({yearsActive: 1})
    .limit(1)
    .then((artistactive) => artistactive[0].yearsActive);

  const maxactive = ArtistClass
    .find({})
    .sort({yearsActive: -1})
    .limit(1)
    .then((artistactive) => artistactive[0].yearsActive);
  //console.log('Test Output min/max active:', minactive, maxactive);

  return Promise.all([minactive, maxactive])
    .then((activeoutput) => {
      return {min: activeoutput[0], max: activeoutput[1]};
    });

};
