const express = require("express");
const app = express();
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

app.use(express.json());

const dbpath = path.join(__dirname, "covid19India.db");

const getconnectserveranddb = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running");
    });
  } catch (e) {
    console.log(`DB ERROR ${e.message}`);
  }
};
getconnectserveranddb();

const getfinalresult = (each) => {
  return {
    stateId: each.state_id,
    stateName: each.state_name,
    population: each.population,
  };
};

app.get("/states/", async (request, response) => {
  const dataquary1 = `SELECT * FROM state`;
  const result1 = await db.all(dataquary1);
  const resultobject1 = result1.map((each) => {
    return getfinalresult(each);
  });
  response.send(resultobject1);
});

app.get("/states/:stateId/", async (request, response) => {
  const { state1 } = request.params;
  const dataquary2 = `SELECT * FROM state WHERE state_id = ${state1}`;
  const result2 = await db.get(dataquary2);
  const resultobject2 = getfinalresult(result2);
  response.send(resultobject2);
});
