function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*********************
 * Ancienne écriture *
 *********************/
function getStudent() {
  const time = randomInteger(1, 2) * 1000;
  console.log("getStudent", time);
  for (let i = 0; i < 9999999995; i++);
  return [
    { name: "Dupont", cours: [1, 3, 5] },
    { name: "Lea", cours: [2, 4] },
    { name: "Charles", cours: [1] },
  ];
}

function temp() {
  return new Promise(function (resolve, reject) {
    try {
      resolve(getStudent());
    } catch (e) {
      reject(e);
    }
  });
}

//temp().then(function (result) {
//  console.log("sync", result);
//});

/*********************
 * Nouvelle écriture *
 *********************/
async function getStudentAsync() {
  const time = randomInteger(1, 2) * 1000;
  console.log("getStudent", time);
  for (let i = 0; i < 9999999995; i++);
  return [
    { name: "Dupont", cours: [1, 3, 5] },
    { name: "Lea", cours: [2, 4] },
    { name: "Charles", cours: [1] },
  ];
}

//getStudentAsync().then(function (result) {
//  console.log("async", result);
//});

async function map() {
  console.log("Start map");
  const result = await getStudentAsync();
  console.log(result);
  console.log("End map");
}

async function map2() {
  console.log("Start map");
  getStudentAsync()
    .then(function (result) {
      console.log(result);
    })
    .then(function () {
      console.log("End map");
    });
}

map();
map2();

//---------------sync
//    |----------map
//        |------getStudentAsync;
//
//-------------------- sync;
//   \---------------- map;
//      \------/       getStudentAsync;
