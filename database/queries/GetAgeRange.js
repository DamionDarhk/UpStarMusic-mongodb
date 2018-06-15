const ArtistClass = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  const minage = ArtistClass
    .find({}) //finding all data inside Artist database
    .sort({age : 1})  //sorting all data based on ascending order of age property
    //.then(artistage => artistage[0])
    /*this will load all output of all records, and then select only 1st records, this isn't good approach as number of records can be in
    large number*/
    .limit(1) //selecting only 1st records without loading all records
    .then(artistage => artistage[0].age);
    /*this will load the records as an array of models, but it will contains only single models as we have limit it to 1 in above LOC
    and will only save age property of an single records*/

  const maxage = ArtistClass
    .find({})
    .sort({age: -1}) //-1 is used for descending order
    .limit(1)
    .then(artistage => artistage[0].age);

  //console.log('Test Output min/max age:', minage, maxage);

  return Promise.all( [minage, maxage] )   //here it will find/execute above's LOC for finding min/max age of artists
    .then((ageoutput) => {
      //console.log('Test Output min/max age return:', ageoutput[0], ageoutput[1]);
      return {min: ageoutput[0], max: ageoutput[1]};
      /*only when code inside promise will executed, then above LOC will return value(min/max age of artists)*/
    });
};
