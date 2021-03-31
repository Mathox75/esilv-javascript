function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStudent(resolve, reject) {
  const time = randomInteger(1, 2) * 1000;
  console.log("getStudent", time);
  setTimeout(function () {
    resolve([
      { name: "Dupont", cours: [1, 3, 5] },
      { name: "Lea", cours: [2, 4] },
      { name: "Charles", cours: [1] },
    ]);
  }, time);
}

function getCourses(resolve, reject) {
  const time = randomInteger(2, 4) * 1000;
  console.log("getCourses", time);
  setTimeout(function () {
    resolve([
      { id: 1, name: "JS" },
      { id: 2, name: "PHP" },
      { id: 3, name: "C#" },
      { id: 4, name: "F#" },
      { id: 5, name: "CSS" },
    ]);
  }, time);
}

function mapping(resolve, reject) {
  const time = randomInteger(1, 4) * 1000;
  console.log("mapping", time);
  setTimeout(function () {
    Promise.all([new Promise(getStudent), new Promise(getCourses)]).then(
      function (results) {
        const students = results[0];
        const courses = results[1];
        const mappedStudents = students.map(function (student) {
          student.cours = student.cours.map(function (cours) {
            return courses.find(function (course) {
              return course.id === cours;
            });
          });

          return student;
        });
        resolve(mappedStudents);
      }
    );
  }, time);
}

const timer = function (resolve, reject) {
  setTimeout(function () {
    reject();
  }, 5000);
};

Promise.race([new Promise(mapping), new Promise(timer)])
  .then(function (result) {
    console.log("Merge OK");
  })
  .catch(function (reject) {
    console.log("Timeout");
  });
