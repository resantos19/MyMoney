// JavaScript Document

  var selecionado = "";

  var tbReceitas = localStorage.getItem("tbReceitas");
	tbReceitas = JSON.parse(tbReceitas); 


$(document).ready(function(){
  
  iniciar();

	$("#btnSalvar").click( function(e){
		
		e.preventDefault();
		
		//Cria um Array com os dados da nova receita e transforma em uma String.
		
		
		var receita = JSON.stringify({ 
			Data : $("#dataReceita").val(), 
			Descricao : $("#nomeReceita").val(), 
			Valor : $("#valorReceita").val() 
			});

		//Verifica se tem campo vazio.
		if( $("#dataReceita").val() !== "" &&  $("#nomeReceita").val() !== "" && $("#valorReceita").val() !== ""){
			
			tbReceitas.push(receita)
			localStorage.setItem('tbReceitas', JSON.stringify(tbReceitas));
			alert("Inserido com Sucesso");
			
			$("#novaReceita").each(function(){
  				this.reset();	
	  		});
	  		
			$("#tabelaReceita tbody").empty();
			mostrarDados();

		}
		else{
			alert("Preencha todos os campos")
			$("#dataReceita").focus();
		}
		
		
		
		
			
	});
	
	$("#btnAtualizar").bind("click", function(e){
	    e.preventDefault();
	    if(selecionado.html() !== "")
	    atualizar(selecionado.html());
	    
	});
	
	$("#btnExcluir").bind("click", function(e){
	    e.preventDefault();
	    if(selecionado.html() !== "")
	    excluir(selecionado.html());
	    
	});
	
	$(document).delegate("tr", "click", function(){
	  
		var par = $(this); //tr
		selecionado = par.children("td:nth-child(1)");
		var tdData = par.children("td:nth-child(2)");
		var tdDescricao = par.children("td:nth-child(3)");
		var tdValor = par.children("td:nth-child(4)");
		
		//excluir(tdId.html());
		$("#btnSalvar").hide();
		$("#btnExcluir").show();
		$("#btnAtualizar").show();
		
		$("#dataReceita").val(tdData.html());
		$("#nomeReceita").val(tdDescricao.html());
		$("#valorReceita").val(tdValor.html());
		
	});
	

	
});



  function iniciar(){
    
    	
    	
      $("#btnExcluir").hide();
    	$("#btnAtualizar").hide();
    	$("#btnSalvar").show();
    	
    	$("#novaReceita").each(function(){
      				this.reset();	
    	});
    
    
    	if(tbReceitas == null) 
    		tbReceitas = [];
    	else{
    			$("#tabelaReceita tbody").empty();
    			mostrarDados();
    	}
    	
    	
  }

	function mostrarDados(){
		var total = 0;
		
		var linha = "";
		for(i = 0; i < tbReceitas.length; i++){
			
			receitaAtual = JSON.parse(tbReceitas[i]);
			linha += "<tr><td>" + i + "</td><td>" + receitaAtual['Data'] + "</td><td>" +
			receitaAtual['Descricao'] + "</td><td>" + receitaAtual['Valor'] + "</td></tr>";
			
			total = parseFloat(receitaAtual['Valor']) + total;
			
			
		}
		$("#tabelaReceita tbody").html(linha);
		$("#valor").html(total);
	}
	
	function excluir(tdId){
		var teste = confirm("Tem certeza que deseja excluir?");
		if(teste){
			tbReceitas.splice(tdId, 1);
			localStorage.setItem('tbReceitas', JSON.stringify(tbReceitas));
			$("#tabelaReceita tbody").empty();
			iniciar();
		}
	}
	
	function atualizar(tdId){
  		var teste = confirm("Tem certeza que deseja Atualizar?");
  		if(teste){
  		  
  		  var receitaNova = JSON.stringify({ 
  		    
      			Data : $("#dataReceita").val(), 
      			Descricao : $("#nomeReceita").val(), 
      			Valor : $("#valorReceita").val() 
      			
  			});
  		  
  			tbReceitas.splice(tdId, 1, receitaNova);
  			localStorage.setItem('tbReceitas', JSON.stringify(tbReceitas));
  			$("#tabelaReceita tbody").empty();
  			iniciar();
  		}
	}
	


