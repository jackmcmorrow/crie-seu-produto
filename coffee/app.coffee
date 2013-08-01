fetch = (arquivo) -> 
	listaDeObj = new Array
	$.getJSON('json/'+ arquivo, (arq) ->

		tipoAnterior = new String;
		cdp = 1;
		
		$.each(arq, (k, v) ->
			if v.select is tipoAnterior then cdp += 1 else cdp = 1
			tipoAnterior = v.select

			p = new produto parseInt(cdp), v.nome, v.tipo, v.ref, v.sub			
			listaDeObj.push(p)
		)
	).fail -> console.log 'deu ruim, verifique o JSON'
	
	return listaDeObj


class produto
	constructor : (@cdp, @nome, @tipo, @ref, @sub) ->
		@select = $('#' + @tipo + ' select')
		@oid = @tipo + @cdp 
		@el = '<option value="'+@nome+'" oid="'+@oid+'" data-ref="'+@ref+'" >' + @nome + '</option>'
		$(@select).append(@el)
		

criarProdutos = ->
		lista = fetch 'produtos.json'
		tipos = ['malhas', 'golas', 'punhos'];
		subTipos = ['cor', 'modeloGola', 'modeloPunhos']

		corCdp = 0

		criarSubs = (oid)->
			listaSubs = [];
			subCdp = 0
			
			#deleta options do sub que será modificado e limpa a lista
			for i in lista when i.tipo + i.cdp is oid 
				for sid, o of i.sub
					subNome = o.nome
					subTipo = o.tipo
					subRef = o.ref
					#console.log nome + ' ' +tipo+ ' ' +ref
					$('#'+subTipo+' option').remove()
					$('#'+subTipo+' select').append('<option></option>')
				listaSubs.splice 0, listaSubs.length

			criarSub = (sub)->
				for sid, o of sub
					subNome = o.nome
					subTipo = o.tipo
					subRef = o.ref
					console.log subNome + subTipo + subRef
					c = new produto subCdp += 1, subNome, subTipo, subRef
					listaSubs.push(c)

			#Executa funções
			criarSub i.sub for i in lista when i.tipo + i.cdp is oid
			prepararImagem subTipo for subTipo in subTipos


		prepararImagem = (tipo) ->
			$('#' + tipo + ' select').on('change', ->
				val = $(@).val();
				ref = i.ref for i in lista when i.nome is val
				if tipo isnt 'sub'
					oid = i.oid for i in lista when i.nome is val
					dir = 'img/' +tipo+ '/' +ref+ '/'
					if tipo is 'ribana'
						$('.ribana').show();
						$('.not-ribana').hide();
					else
						$('.ribana').hide();
						$('.not-ribana').show();
				else
					dir += ref+ '.png'
					oid = j.oid for j in listaSubs when j.nome is val




				criarSubs oid if tipo is 'malhas' or 'golas' or 'punhos'

				if tipo is 'cor'
					tipo = 'malha'
					dir += ref + '.png'
				else
					dir += '01.png'
				
				$('#canvas .' + tipo + ' img').attr('src', dir);
				)
		#executa funções
		prepararImagem tipo for tipo in tipos
			


criarProdutos()
