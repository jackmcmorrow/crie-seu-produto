fetch = (arquivo) -> 
	listaDeObj = new Array
	$.getJSON 'json/'+ arquivo, (arq) ->

		tipoAnterior = new String;
		cdp = 1;
		
		$.each(arq, (k, v) ->
			if v.select is tipoAnterior then cdp += 1 else cdp = 1
			tipoAnterior = v.select

			p = new produto parseInt(cdp), v.nome, v.tipo, v.cores			
			listaDeObj.push(p)
		) 
	
	return listaDeObj


class produto
	constructor : (@cdp, @nome, @tipo, @cores) ->
		@select = $('#' + @tipo)
		@oid = @tipo + @cdp
		@el = '<option value="' + @oid + '" nome="' + @nome + '">' + @nome + '</option>'
		
		$(@select).append(@el)

		

criarProdutos = ->
		lista = fetch 'produtos.json'
		tipos = ['manequim', 'malha', 'cor', 'gola', 'punho'];

		corCdp = 0
		criarCores = (oid)->
			$('#cor option').remove()
			
			criarCor = (cores)->
				c = new produto corCdp += 1, j.cor, 'cor' for j in cores

			criarCor i.cores for i in lista when i.tipo + i.cdp is oid
			listenEvent 'cor'


		listenEvent = (tipo) ->
			$('select#' + tipo).on('change', ->
				oid = $(@).val();
				$('#canvas .' + tipo + ' img').attr('src', -> 
					dir = 'img/' + tipo + '/' + oid + '.png'
				)

				criarCores oid if tipo is 'malha'
			)

		listenEvent tipo for tipo in tipos
			


criarProdutos()

console.log $('#malha').prop('selectedIndex');