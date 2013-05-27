produtos = $.getJSON('json/produtos.json', -> 
	lista = $.parseJSON(produtos) 
	console.log lista)