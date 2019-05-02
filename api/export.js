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
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    next();
  });

const port = process.env.PORT || 3000;

// Mysql Connection
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "shipskart"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Excel Export

  app.get('/excel', async (req, res, next) => {
    var nodeExcel=require('excel-export');
      var conf={}
      conf.stylesXmlFile = "./styles.xml";
      conf.cols=[{
            caption:'p_name.',
            type:'string',
            width:3
        },
        {
            caption:'c_name',
            type:'string',
            width:50
        },
        {
          caption:'u_name',
          type:'string',
          width:50
        }
        ];
        let ExportQuery ="SELECT p.name as p_name,c.name as c_name,u.name as u_name FROM products p JOIN categories c on c.id = p.category_id join units u on u.id=p.unit_id;";
    try {

        con.query(ExportQuery, function (err, result) {
          if (err) throw err;
         // console.log("Result: " + result);
          arr=[];
          // Build Row
          for(i=0;i<result.length;i++){
              a=[result[i].p_name,result[i].c_name,result[i].u_name];
              arr.push(a);
              }
              // Add row to Excel
              conf.rows=arr;
              var result=nodeExcel.execute(conf);
             // Response Header For Export
              res.setHeader('Content-Type','application/vnd.ms-excel; charset=utf-8');
              res.setHeader("Content-Disposition","attachment;filename="+"todo.xlsx");
              res.end(result,'binary');
        });
      
     // res.send(contact);
    } catch (err) {
      next(err);
    }
  });


 
app.listen(port);
console.log('API is Listing',port);