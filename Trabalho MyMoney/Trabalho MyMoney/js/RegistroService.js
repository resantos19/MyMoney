app.factory('RegistroService', function($window){
	var 
		registros = [];
		ns = {};
		total = 0;

	var choseSomebody = function() {
		return $window.parseInt(Math.random() * names.length);
	};

	var persistNames = function() {
		$window.localStorage.setItem('registros', JSON.stringify(registros));
	};

	ns.addRegistro = function(name, date, value) {
		var novo = JSON.stringify({Data: date, Nome: name, Valor: value , Classe: '.linhaReceita'});
		registros.push(novo);
		persistNames();
	};

	ns.getNames = function() {
		var retrivedNames = JSON.parse(
			$window.localStorage.getItem('registros')
		);
		
		if(retrivedNames && retrivedNames.length > 0) {
			registros = retrivedNames;
		}

		registrosMatriz = [];
		
		for(i = 0; i < registros.length ; i++){
			
			registrosMatriz.push(JSON.parse(registros[i]));
			
		}
		return registrosMatriz;
	};


	ns.getTotal = function(){
		
		var retrivedNames = JSON.parse(
			$window.localStorage.getItem('registros')
		);
		
		if(retrivedNames && retrivedNames.length > 0) {
			registros = retrivedNames;
		}

		valor = 0;
		for(i = 0; i < registros.length ; i++){
			
			valor += parseInt(JSON.parse(registros[i]).Valor);
			
		}
		return valor;
		
	}
	ns.remove = function(name) {
		if(name !== -1) {
			registros.splice(name, 1);
			persistNames();
		}
	};
	
	ns.atualiar = function(index, name, date, value) {
		
		var novo = JSON.stringify({Data: date, Nome: name, Valor: value , Classe: '.linhaReceita'});
		
		var index = registros[name];
		
		if(index !== -1) {
			registros.splice(index, 1, JSON.stringify(index));
			persistNames();
		}
	};

	ns.buscarRegistro = function(name) {
		var index = registros[name];
		return JSON.parse(index);
	};
	
	ns.whoWillPay = function() {
		if(names.length > 0) {
			return names[choseSomebody()];
		}
		return "You will pay!";
	};

	return ns;
});