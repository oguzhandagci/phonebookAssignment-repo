const { response } = require("express");
const express = require("express");
const moment = require("moment");
const app = express();

app.use(express.json());

let myData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(myData);
});

app.get("/api/info", (req, res) => {
  let lengthOfTheArray = myData.length;
  let currentTime = moment();
  res.send(
    `Phonebook has info for ${lengthOfTheArray} people. </br> ${currentTime}`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = myData.find((person) => person.id === id);
  res.json(person);
});

app.listen(3001, () => {
  console.log(3001);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  myData = myData.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const body = req.body
    const maxId = myData.length > 0 ? Math.max(...myData.map((n) => n.id)) : 0;

    if (!body.name) {
        return res.status(400).json({ 
          error: 'Name is Missing.' 
        })
      }else if(!body.number){
        return res.status(400).json({ 
            error: 'Number is Missing.' 
          })
      }

  const newPerson = {
    id: maxId + 1,
    name: body.name,
    number: body.number
  };

  myData = myData.concat(newPerson);
  res.json(newPerson);

});
