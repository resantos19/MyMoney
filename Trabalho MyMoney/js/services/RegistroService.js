app.factory('RegistroService', function($window){
	var 
		registros = [];
		ns = {};
		total = 0;

	var persistNames = function(tipo) {
		if(tipo == "Receitas")
			$window.localStorage.setItem('receitas', JSON.stringify(registros));
		else if(tipo == "Despesas")
			$window.localStorage.setItem('despesas', JSON.stringify(registros));
	};

	ns.addRegistro = function(name, date, value, tipo) {
		var novo = JSON.stringify({Data: date, Nome: name, Valor: value , Tipo: tipo});
		registros.push(novo);
		persistNames(tipo);
	};

	ns.getNames = function(tipo) {
		
		var retrivedNames = [];
		
		if(tipo == "Receitas"){
			retrivedNames = JSON.parse($window.localStorage.getItem('receitas'));
		}
		else if(tipo == "Despesas"){
			retrivedNames = JSON.parse($window.localStorage.getItem('despesas'));
		}
		else {
			var receitasAux = JSON.parse($window.localStorage.getItem('receitas'));
			var despesasAux = JSON.parse($window.localStorage.getItem('despesas'));
			retrivedNames = receitasAux.concat(despesasAux);
		}

		
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

		var retrivedNames = [];
		if(tipo == "Receitas")
			retrivedNames = JSON.parse($window.localStorage.getItem('receitas'));
		else if(tipo == "Despesas")
			retrivedNames = JSON.parse($window.localStorage.getItem('despesas'));
		else {
			var receitasAux = JSON.parse($window.localStorage.getItem('receitas'));
			var despesasAux = JSON.parse($window.localStorage.getItem('despesas'));
			retrivedNames = receitasAux.concat(despesasAux);
		}
		
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
	
	ns.remove = function(name, tipo) {
		if(name !== -1) {
			registros.splice(name, 1);
			persistNames(tipo);
		}
	};
	
	ns.update = function(index, name, date, value, tipo) {
		
		var novo = JSON.stringify({Data: date, Nome: name, Valor: value, Tipo: tipo });
		
		
		if(index !== -1) {
			registros.splice(index, 1, novo);
			persistNames(tipo);
		}
	};

	ns.buscarRegistro = function(name, tipo) {
		var index = registros[name];
		return JSON.parse(index);
	};
	
	return ns;
});