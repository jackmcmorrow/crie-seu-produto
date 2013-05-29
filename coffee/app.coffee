fetch = (arquivo) -> 
	listaDeObj = new Array
	$.getJSON 'json/'+ arquivo, (arq) ->

		tipoAnterior = new String;
		cdp = 0;
		
		$.each(arq, (k, v) ->
			if v.select is tipoAnterior then cdp += 1 else cdp = 0
			tipoAnterior = v.select

			p = new produto parseInt(cdp), v.nome, v.select, v.cores			
			listaDeObj.push(p)
		) 
	
	return listaDeObj


class produto
	constructor : (@cdp, @nome, @tipo, @cores) ->
		@select = $('#' + @tipo)
		@el = '<option value="' + @tipo + @cdp + '">' + @nome + '</option> '
		
		$(@select).append(@el)

		$(@select).on('blur', ->
		$('#canvas .' + @tipo + ' img').attr('src', ->
			dir = 'img/' + tipo + '/' + cdp + '.png';)
		)

criarProdutos = ->
		lista = fetch 'produtos.json'
		console.log lista
		console.log 'wateva'


criarProdutos()

console.log $('#malha').prop('selectedIndex');