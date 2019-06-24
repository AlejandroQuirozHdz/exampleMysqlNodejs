

var person={
		nombre:'',
		edad:0,
		nss:'',
		sexo:'',
		peso:0.0,
		altura:0.0,
		imc:0.0,
		resuldado:0,
	 mayorEdad:false
	
};





exports.getName= function () {
		return person.nombre;
	};

	exports.setName= function (nombre){
		person.nombre=nombre;
	};
	exports.getEdad= function (){
		return person.edad;
	};
	exports.setEdad= function(edad){
		person.edad=edad;
	};
	exports.getNss= function (){
		return person.nss;
	};
	exports.setNss= function (nss){
		person.nss=nss;
	};
	exports.getSexo= function (){
		return person.sexo;
	};
	exports.setSexo= function(sexo){
		if(sexo==="hombre" || sexo==="H" || sexo==="HOMBRE"){
			person.sexo='H';
		}else{
			person.sexo='M';
		}

	};
	exports.getPeso= function (){
		return person.peso;

	};
	exports.setPeso= function (peso){
		person.peso=peso;
	};
	exports.getAltura= function (){
		return person.altura;
	};
	exports.setAltura= function (altura){
		person.altura=altura;
	};
	exports.getImc= function () {
		return person.imc;
	};
	exports.setImc= function (imc){
		person.imc=imc;
	};
	exports.getRespuesta= function () {
		return person.resuldado;
	};
	exports.setRespuesta= function (resuldado) {
		person.resuldado=resuldado;
	};
	exports.getMayorEdad= function () {
		return person.mayorEdad;
	};
	exports.setMayorEdad= function (mayorEdad) {
		person.mayorEdad=mayorEdad;
	};


	exports.getDatos= function () {
	return person;
	};

