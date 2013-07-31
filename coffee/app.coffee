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
		@select = $('#' + @tipo + ' select')
		@oid = @tipo + @cdp
		@el = '<option value="' + @nome + '" oid="' + @oid + '">' + @nome + '</option>'
		
		$(@select).append(@el)

criarProdutos = ->
		lista = fetch 'produtos.json'
<<<<<<< HEAD
		tipos = ['manequim', 'malha', 'cor', 'gola', 'punho'];
		listaCores = []
		
=======
		tipos = ['manequim', 'malha', 'cor', 'gola', 'modeloGola', 'punho'];

		corCdp = 0
>>>>>>> 0dd2e4d2852592deed10bacf0cd1cb0228a41144
		criarCores = (oid)->
			corCdp = 0
			$('#cor option').remove()
			$('#cor select').append('<option></option>')
			listaCores.splice 0, listaCores.length
			
			criarCor = (cores)->
				for j in cores
					c = new produto corCdp += 1, j.cor, 'cor'
					listaCores.push(c)
				

			criarCor i.cores for i in lista when i.tipo + i.cdp is oid
			listenEvent 'cor'


		listenEvent = (tipo) ->
			$('#' + tipo + ' select').on('change', ->
				nome = $(@).val();
				if tipo isnt 'cor'
					oid = i.oid for i in lista when i.nome is nome
				else
					oid = j.oid for j in listaCores when j.nome is nome

				$('#canvas .' + tipo + ' img').attr('src', -> 
					dir = 'img/' + tipo + '/' + oid + '.png'
				)

				criarCores oid if tipo is 'malha'
			)

		listenEvent tipo for tipo in tipos
			


criarProdutos()
