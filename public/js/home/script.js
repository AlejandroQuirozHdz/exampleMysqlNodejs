var app = angular.module("app", ['ngPagination','ngRoute','ngMaterial', 'ui.bootstrap', 'ngResource']);


app.config(['$routeProvider',function($routeProvider) {
  

  $routeProvider.when('/pagina1', {
    templateUrl: "./pagina1.html",
    controller: "Pagina1Controller"
  });
  
  $routeProvider.when('/pagina2', {
    templateUrl: "./pagina2.html",
    controller: "Pagina2Controller"
  });
  
  $routeProvider.when('/pagina3', {
    templateUrl: "./pagina3.html",
    controller: "Pagina3Controller"
  });  
  $routeProvider.when('/pagina4', {
    templateUrl: "./pagina4.html",
    controller: "Pagina4Controller"
  });  
  $routeProvider.when('/pagina5/:id', {
    templateUrl: "./pagina5.html",
    controller: "Pagina5Controller"
  });  
  $routeProvider.otherwise({
        redirectTo: 'pagina1'
  });   

}]);


app.controller("Pagina1Controller", ['$scope','$http','$location',function($scope,$http,$location) {
  $scope.usuario={};
  $scope.usuario.sexo="H";
  $scope.error=false;
  $scope.getAbsolutePath = function() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
} 
$scope.nameMethod = ['create/person'];
	
	var create = $scope.getAbsolutePath() + $scope.nameMethod[0];

  $scope.guardar = function() {
    
    
    var objUser = JSON.stringify($scope.usuario);
    
    console.log("Datos:"+objUser);
		var config = {headers : {'Content-Type': 'application/json'}}
		
		$http.post(create, objUser,config)
	    .then(function(response) {
	    	console.log("DATA: " + response);
			console.log("SUCCESS create");
      window.location.href = $scope.getAbsolutePath()+"#/pagina2" ;
	    }, 
	    function(response) {
	    	console.log("DATA: " + response.data);
			console.log("ERROR crear");
			$scope.error=true;
	    });
	}

}]);

app.controller("Pagina2Controller", ['$scope','$http','$location',function($scope,$http,$location) {
   $scope.listUsuarios=[];
   $scope.getAbsolutePath = function() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
} 
$scope.nameMethod = ['search/persons'];
	
	var consulta = $scope.getAbsolutePath() + $scope.nameMethod[0];
  $scope.buscar = function() {
   $http.get(consulta).then(function(response) {
    $scope.listUsuarios = response.data;
    console.log("DATA: " + JSON.stringify($scope.listUsuarios));
  }, function(response) {
    onsole.log("DATA: " + response.statusText);
  });
}

$scope.buscar();
}]);


app.controller("Pagina3Controller", ["$scope",function($scope) {
  $scope.usuario={};
  $scope.getAbsolutePath = function() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
} 
$scope.nameMethod = ['/NutriNET/Cliente/'];
	
	var create = "http://187.188.122.85:8091" + $scope.nameMethod[0];

  $scope.guardar = function() {
    
    
    var objUser = JSON.stringify($scope.usuario);
    
    console.log("Datos:"+objUser);
		var config = {headers : {'Content-Type': 'application/json'}}
		
		$http.post(create, objUser,config)
	    .then(function(response) {
	    	console.log("DATA: " + response);
			console.log("SUCCESS create");
      window.location.href = $scope.getAbsolutePath()+"#/pagina4" ;
	    }, 
	    function(response) {
	    	console.log("DATA: " + response.data);
			console.log("ERROR crear");
			$scope.error=true;
	    });
	}
}]);

app.controller("Pagina4Controller", ['$scope','$http','$location','$filter',function($scope,$http,$location,$filter) {
  $scope.error=false;
  $scope.listUsuarios=[];
  $scope.getAbsolutePath = function() {
   var loc = window.location;
   var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
   return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
} 
$scope.nameMethod = ['/NutriNET/Cliente/'];
	
	var consulta = "http://187.188.122.85:8091" + $scope.nameMethod[0];

 $scope.buscar = function() {
  $http.get(consulta).then(function(response) {
   $scope.listUsuarios = response.data;
   console.log("DATA: " + JSON.stringify($scope.listUsuarios));
 }, function(response) {
   onsole.log("DATA: " + response.statusText);
   $scope.error=true;
 });
}

$scope.buscar();
}]);

app.controller("Pagina5Controller", ['$scope','$http','$location','$filter','$routeParams',function($scope,$http,$location,$filter,$routeParams) {
  $scope.error=false;
  $scope.usuario=[];
  $scope.getAbsolutePath = function() {
   var loc = window.location;
   var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
   return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
} 
$scope.nameMethod = ['/NutriNET/Cliente/'];
	
	var consulta = "http://187.188.122.85:8091" + $scope.nameMethod[0]+$routeParams.id;

 $scope.buscar = function() {
  $http.get(consulta).then(function(response) {
   $scope.usuario = response.data[0];
   console.log("DATA: " + JSON.stringify($scope.usuario));
 }, function(response) {
   onsole.log("DATA: " + response.statusText);
 });
}

$scope.guardar = function() {
    
    
  var objUser = JSON.stringify($scope.usuario);
  
  console.log("Datos:"+objUser);
  var config = {headers : {'Content-Type': 'application/json'}}
  
  $http.put(consulta, objUser,config)
    .then(function(response) {
      console.log("DATA: " + response);
    console.log("SUCCESS create");
    window.location.href = $scope.getAbsolutePath()+"#/pagina4" ;
    }, 
    function(response) {
      console.log("DATA: " + response.data[0]);
    console.log("ERROR actualizar");
    $scope.error=true;
    });
}
$scope.buscar();
}]);