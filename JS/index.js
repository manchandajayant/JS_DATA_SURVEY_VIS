const data = require("../state_of_js_2016_2020.json");

let obj = {};
let arrOfToolData = [];
var listOfKeys;
var arrOfAllData = [];
function count(d) {
  for (let i = 0; i < d.length; i++) {
    // console.log(Object.keys(d[i].tools))
    if (d[i].tools != undefined || d[i].tools != null) {
      let b = Object.keys(d[i].tools);
      for (let k = 0; k < b.length; k++) {
        arrOfToolData.push(d[i].tools);
      }
      listOfKeys = b;
    } else {
      return;
    }
  }
}

count(data);

// console.log(arrOfToolData);

function sortData(d) {
  for (let a = 0; a < listOfKeys.length; a++) {
    for (let j = 0; j < d.length; j++) {
      const filtered = Object.keys(d[j])
        .filter((k) => listOfKeys[a] === k)
        .reduce((obj, key) => {
          obj[key] = d[j][key];
          return obj;
        }, {});
        if(filtered[listOfKeys[a]] != undefined){
          arrOfAllData.push({
            [listOfKeys[a]]: filtered[listOfKeys[a]].experience,
          });
        }

    }
  }
}

sortData(arrOfToolData);

console.log(arrOfAllData)
/**
 * {
  would_use: 468698,
  not_interested: 379554,
  interested: 405673,
  would_not_use: 148293,
  never_heard: 437637
}
 */
