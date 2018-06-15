const ArtistClass = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 * like this: { all: [artists], count: count, offset: offset, limit: limit }
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 10) => {

  //console.log('Criteria Info', criteria)
  //console.log('Criteria Info Age', criteria.age)
  //console.log('Criteria Info Active', criteria.yearsActive)
  //console.log('Criteria Info Name', criteria.name)

  const SearchOutput = ArtistClass
    .find(generateQuery(criteria))
    //.find({$text : {$search: criteria.name}})
    .sort({[sortProperty]: 1}) //this is ES6 interpolated setting
    .skip(offset)
    .limit(limit) ;

console.log('Search Output Test', SearchOutput)

  return Promise.all([SearchOutput, ArtistClass.find(generateQuery(criteria)).count()])
    .then((soutput) => {
      return {
        all: soutput[0],
        count: soutput[1],
        offset: offset,
        limit: limit
      };
    });
};

const generateQuery = (criteria) => {
  const query = {}

  if(criteria.age) {
    query.age = {
      $gte: criteria.age.min,
      $lte: criteria.age.max
    };
  }

  if(criteria.yearsActive) {
    query.yearsActive = {
      $gte: criteria.yearsActive.min,
      $lte: criteria.yearsActive.max
    };
  }

  if(criteria.name) {
    //db.mmusic.createIndex({ "$**": "text"})
    /*this LOC to be executed in mongo shell only then index can be created either for all/particular table within database
     db.<collection name>.createIndex({name: "text"})*/

    //query.name = { $text: {$search: criteria.name}}

    query.$text = {$search: criteria.name};

  }

  return query;
}
