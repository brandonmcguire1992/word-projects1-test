const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

let db;
const request = indexedDB.open("wordProject", 1);

request.onupgradeneeded = ({ target }) => {
  let db = target.result;
  db.createObjectStore("user", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
  db = target.result;

  // check if app is online before reading from db
  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log("Woops! " + event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(["user"], "readwrite");
  const store = transaction.objectStore("user");

  store.add(record);
}

function checkDatabase() {
  const transaction = db.transaction(["user"], "readwrite");
  const store = transaction.objectStore("user");
  const getAll = store.getAll();

  getAll.onsuccess = function () {
    if (getAll.result.length > 0) {
      // const authorId = "some_uid";
      const query = `mutation addProject($project:projectInput){
        addProject(project:$project){
          _id   
           firstName
           lastName    
            projects {
              title
              ideasText
              date
            }
         }
      }`;

      fetch("/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            _id,
            authorId,
          },
        }),
      })
        .then((r) => r.json())
        // .then((data) => console.log(data));
        // fetch("/api/transaction/bulk", {
        //   method: "POST",
        //   body: JSON.stringify(getAll.result),
        //   headers: {
        //     Accept: "application/json, text/plain, */*",
        //     "Content-Type": "application/json"
        //   }
        // })
        // .then(response => {
        //   return response.json();
        // })
        .then(() => {
          // delete records if successful
          const transaction = db.transaction(["user"], "readwrite");
          const store = transaction.objectStore("user");
          store.clear();
        });
    }
  };
}

// listen for app coming back online
window.addEventListener("online", checkDatabase);
