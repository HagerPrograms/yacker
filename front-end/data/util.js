const fs = require('fs');

const abbreviation = require('./stateabbr.json');
const longname = require('./states.json');

const combined = [];

for(let i = 0; i < abbreviation.length; i++){
 combined.push(
    {
        abbr: abbreviation[i].abbr,
        name: longname[i].name
    })
}

const result = JSON.stringify(combined, null, 4)

fs.writeFile("./states-data.json", result, {flag: 'w+'}, (err) => {
    if(err){
        console.error(err);
    }
    //success
})