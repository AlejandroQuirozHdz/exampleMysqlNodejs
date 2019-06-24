var mysql      = require('mysql');
var persona =require('../models/persona.js');
var respuesta=require('../constants/respuesta.calcular.imc');
var variables=require('../constants/variables.peso');
var randomstring = require("randomstring");


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



//randomstring.generate({length:8,  charset:'alphanumeric' });
//connection.connect();


exports.calcularIMC = function (req, res, next) {
  var resultado=null;
  console.log("Nombre:"+req.body.nombre);
persona.setName(req.body.nombre);
persona.setEdad(req.body.edad);
persona.setSexo(req.body.sexo);
persona.setPeso(req.body.peso);
persona.setAltura(req.body.altura);
var metro=persona.getAltura()/100;
resultado=(persona.getPeso()/ Math.pow(metro,2));
persona.setImc(resultado.toFixed(2));

switch (persona.getSexo()) {
  case 'H':

if(persona.getImc()<variables.falta_peso_h){
  persona.setRespuesta(respuesta.debajo_peso);
}else if(variables.peso_normal_1_h>persona.getImc() && variables.peso_normal_2_h>persona.getImc()){
  persona.setRespuesta(respuesta.peso_ideal);
}else if(variables.sobre_peso_h>persona.getImc()){
  persona.setRespuesta(respuesta.sobre_peso);
}
  next();
break;

case 'M':
if(persona.getImc()<variables.falta_peso_m){
  persona.setRespuesta(respuesta.debajo_peso);
}else if(variables.peso_normal_1_m>persona.getImc() && variables.peso_normal_2_m>persona.getImc()){
  persona.setRespuesta(respuesta.peso_ideal);
}else if(variables.sobre_peso_m>persona.getImc()){
  persona.setRespuesta(respuesta.sobre_peso);
}
  next();
break;

default:
    console.log('Error de Sexo');
}



};

exports.esMayorDeEdad = function (req, res, next) {
if(persona.getEdad()>=variables.mayor_edad){
persona.setMayorEdad(true);
}
next();
};

exports.generaNSS = function (req, res, next) {
persona.setNss(randomstring.generate({length:8,  charset:'alphanumeric' }));
next();
};

exports.guardarImprimir = function (req, res,next) {
  var objBD = BD();

  console.log("Datos:"+persona.getDatos());
  let query='INSERT INTO persona (nombre,edad,nss,sexo,peso,altura,imc,resultado,mayorEdad) VALUES(?,?,?,?,?,?,?,?,?)';
  let datos=[persona.getName(),persona.getEdad(),persona.getNss(),persona.getSexo(),persona.getPeso()
  ,persona.getAltura(),persona.getImc(),persona.getRespuesta(),persona.getMayorEdad()];
  objBD.query(query, datos, function(error, result) {
   if(error){
     console.log("Error:"+error.message);
    
   }else{

     console.log("resultado:"+result.insertId)
   }
   

   
});

return res.status(200).json({
  success: true,
  code:200,
  data:"Mensaje Exitoso"
  
});
};

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