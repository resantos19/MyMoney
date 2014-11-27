// JavaScript Document
function carregar(){
	
	var tbReceitas = localStorage.getItem("tbReceitas");

	tbReceitas = JSON.parse(tbReceitas); 

	if(tbReceitas == null) 
		tbReceitas = [];
		else{
			$("#tabelaReceita tbody").empty();
			mostrarDados();
		}

	$("#btnSalvar").click(function(e){
		
		e.preventDefault();
		
		var receita = JSON.stringify({ 
			Id : tbReceitas.length, 
			Data : $("#dataReceita").val(), 
			Descricao : $("#nomeReceita").val(), 
			Valor : $("#valorReceita").val() 
			});

		tbReceitas.push(receita)
		
		localStorage.setItem('tbReceitas', JSON.stringify(tbReceitas));
		
		$("#novaReceita").each(function(){
  			this.reset();	
  		});
		
		alert("Inserido com Sucesso");
		
		$("#tabelaReceita tbody").empty();
		mostrarDados();
		
		
		
			
	});
	
	function mostrarDados(){
		var total = 0;
		
		for(i = 0; i < tbReceitas.length; i++){
			
			receitaAtual = JSON.parse(tbReceitas[i]);
			var linha = "<tr><td>" + receitaAtual['Id'] + "</td><td>" + receitaAtual['Data'] + "</td><td>" +
			receitaAtual['Descricao'] + "</td><td>" + receitaAtual['Valor'] + "</td></tr>";
			$("#tabelaReceita tbody").append(linha);
			total = parseFloat(receitaAtual['Valor']) + total;
			
			
		}
		$("#valor").html(total);
	}
	
}

