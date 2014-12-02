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

	ns.addRegistro = function(name, date, value, tipo) {
		var novo = JSON.stringify({Data: date, Nome: name, Valor: value , Tipo: tipo});
		registros.push(novo);
		persistNames();
	};

	ns.setTipo = function(tipoDeRegistro){
		var tipo = tipoDeRegistro;
	};
	ns.getNames = function(tipo) {
		var retrivedNames = JSON.parse(
			$window.localStorage.getItem('registros')
		);
		
		if(retrivedNames && retrivedNames.length > 0) {
			registros = retrivedNames;
		}

		registrosMatriz = [];
		
		for(i = 0; i < registros.length ; i++){
			
			registro = JSON.parse(registros[i]);
			
			if(tipo != ""){
				if(registro.Tipo == tipo)
					registrosMatriz.push(registro);
			}else{
				registrosMatriz.push(registro);
			}
		}
		
		return registrosMatriz;
	};


	ns.getTotal = function(tipo){
		
		var retrivedNames = JSON.parse(
			$window.localStorage.getItem('registros')
		);
		
		if(retrivedNames && retrivedNames.length > 0) {
			registros = retrivedNames;
		}

		valor = 0;
		
		for(i = 0; i < registros.length ; i++){
			
			registro = JSON.parse(registros[i]);
				
			if(tipo != ""){
				if(registro.Tipo == tipo)
				if(tipo == "Receitas")
					valor += parseInt(registro.Valor);
					else
					valor -= parseInt(registro.Valor);
			}else{
				if(registro.Tipo == "Receitas")
					valor += parseInt(registro.Valor);
					else
					valor -= parseInt(registro.Valor);
			}
			
		}
		return valor;
		
	}
	ns.remove = function(name) {
		if(name !== -1) {
			registros.splice(name, 1);
			persistNames();
		}
	};
	
	ns.update = function(index, name, date, value) {
		
		var novo = JSON.stringify({Data: date, Nome: name, Valor: value });
		
		
		if(index !== -1) {
			registros.splice(index, 1, novo);
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