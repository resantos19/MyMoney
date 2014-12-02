app.controller('RegistroController', function($scope, $window, RegistroService){
	
	iniciar();
	

	function iniciar(){

	    var rc = $window.location.href;
	    
	    if(rc.indexOf("receitas") > -1){
	    	$scope.tipo = "Receitas";
	    	$scope.formulario = true;
	    }else if(rc.indexOf("despesas") > -1){
	    	$scope.tipo = "Despesas";
	    	$scope.formulario = true;
	    }else{
	    	$scope.tipo = "";
	    	$scope.formulario = false;
	    }

		//$('#btnAtualizar').hide();
		$scope.btnAtualizar = false;
		$scope.btnExcluir = false;
		$scope.btnSalvar = true;
		
		$scope.registros = RegistroService.getNames($scope.tipo);		
		$scope.total = RegistroService.getTotal($scope.tipo);
		
		$scope.name = "";
		$scope.date = "";
		$scope.value = "";

		var indexClicado = -1;

	}
	

	$scope.addRegistro = function(e) {
		
		var teste2 = e;
		if($scope.name.length > 2 && $scope.date.length > 0 && $scope.value > 0) {
			RegistroService.addRegistro($scope.name, $scope.date, $scope.value, $scope.tipo, $scope.tipo);
			iniciar();			
		}
	};

	$scope.remove = function() {
		if($window.confirm('Remover o registro selecionado?')) {
			RegistroService.remove(indexClicado);
			iniciar();
		}
	}
	
	$scope.update = function() {
		if($window.confirm('Atualizar o registro selecionado?')) {
			RegistroService.update(indexClicado, $scope.name, $scope.date, $scope.value);
			iniciar();
			
		}
	}
	
	
	$scope.selectRegistro = function(index){
		
		$scope.btnAtualizar = true;
		$scope.btnExcluir = true;
		$scope.btnSalvar = false;

		
		var linha = RegistroService.buscarRegistro(index);
		
		$scope.name = linha.Nome;
		$scope.date = linha.Data;
		$scope.value = linha.Valor;
		
		indexClicado = index;
		
	}
});