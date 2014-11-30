app.controller('RegistroController', function($scope, $window, RegistroService){
	
	$('#btnAtualizar').hide();
	$('#btnExcluir').hide();
	
	$scope.registros = RegistroService.getNames();		
	$scope.total = RegistroService.getTotal();
	
	var indexClicado = -1;

	$scope.addRegistro = function() {
		if($scope.name.length > 2 && $scope.date.length > 0 && $scope.value > 0) {
			RegistroService.addRegistro($scope.name, $scope.date, $scope.value);
			$scope.registros = RegistroService.getNames();		
			$scope.total = RegistroService.getTotal();		

			$scope.name = "";
			$scope.date = "";
			$scope.value = "";
			
		}
	};

	$scope.remove = function() {
		if($window.confirm('Remover o registro selecionado?')) {
			RegistroService.remove(indexClicado);
			$scope.total = RegistroService.getTotal();	
			$scope.registros = RegistroService.getNames();		
		}
	}
	
	$scope.selectRegistro = function(index){
		$('#btnSalvar').hide();
		$('#btnAtualizar').show();
		$('#btnExcluir').show();
		
		var linha = RegistroService.buscarRegistro(index);
		
		$scope.name = linha.Nome;
		$scope.date = linha.Data;
		$scope.value = linha.Valor;
		
		indexClicado = index;
		
	}
});