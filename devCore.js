const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Creating a developer at bluespace

const DevCoreDev = new Schema({
  name: String,
  role: String,
  powerNaps: String,
  isAdmin: false,
});

const Dev = mongoose.model('DevCoreDev', DevCoreDev);

module.exports = { Dev };
// class DevCoreDev {
//   constructor(name, role) {
//     this.name = name;
//     this.role = role;
//   }

//   numberOfPowerNaps = 0;

//   increasePowerNap = function () {
//     return this.numberOfPowerNaps + 1;
//   };
// }

// module.exports = { DevCoreDev };
