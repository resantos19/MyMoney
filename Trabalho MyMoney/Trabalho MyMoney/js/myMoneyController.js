app.controller('myMoneyController', function($scope, $window, NameService){
	
	$scope.names = NameService.getNames();
	
	$scope.addName = function() {
		if($scope.name.length > 2) {
			NameService.addName($scope.name);
			$scope.name = "";
		}
	};

	$scope.whoWillPay = function() {
		var name = NameService.whoWillPay();
		$window.alert(name);
	};

	$scope.remove = function(name) {
		if($window.confirm('Remove ' + name + ' from list?')) {
			NameService.remove(name);
		}
	}
});