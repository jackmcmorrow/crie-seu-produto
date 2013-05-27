produtos = $.getJSON('json/produtos.json', -> 
	console.log($.parseJSON(produtos.responseText))
	
	)