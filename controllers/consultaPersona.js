var mysql      = require('mysql');



function BD() {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'example',
    port: 3306,
  });
  return connection;
}



exports.guardarImprimir = function (req, res) {

var objBD = BD();
  
objBD.connect(function(err) {
  if (err) throw err;
  objBD.query("SELECT * FROM persona", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    return res.status(200).json({
      success: true,
      code:200,
      data: result
      
    });
  });
});
};