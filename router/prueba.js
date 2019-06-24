const express = require('express');
const router = express.Router();
const proceso=require('../controllers/persona.js');
const consulta=require('../controllers/consultaPersona.js');
router.post('/create/person', (req,res,next) => {
    proceso.calcularIMC(req,res,next);
    proceso.esMayorDeEdad(req,res,next);
    proceso.generaNSS(req,res,next);
    proceso.guardarImprimir(req,res,next);

  
});

router.get('/search/persons', (req,res) => {
    consulta.guardarImprimir(req,res);
});

module.exports = router;