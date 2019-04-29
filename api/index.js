var express = require('express'); 
var Promise = require('Promise'); 
var sqlite = require('sqlite'); 
var bodyParser  =  require("body-parser");

 
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Allow Cross origin
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const port = process.env.PORT || 3000;
const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./database.sqlite', { Promise }))
  .then(db => db.migrate({ force: 'last' }));


  // List Contact
app.get('/contact', async (req, res, next) => {
  try {
    const db = await dbPromise;
    const [contact] = await Promise.all([
      db.all('SELECT * FROM contact Order by id desc')
    ]);
    res.send(contact);
  } catch (err) {
    next(err);
  }
});

// Add Contact 
// Prams  name varchar(50)
// Prams  phone varchar(50)

app.post('/contact', async (req, res, next) => {
    var name = req.body.name; 
    var phone = req.body.phone; 

    try {
      const db = await dbPromise;
      const [contact] = await Promise.all([
        db.run(`INSERT INTO contact(name,phone) VALUES('${name}','${phone}')`, function(err) {
            if (err) {
              return console.log(err.error);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
          }),

      ]);
      res.send(req.body);
    } catch (err) {
      next(err);
    }
  });

 
app.listen(port);
console.log('API is Listing',port);