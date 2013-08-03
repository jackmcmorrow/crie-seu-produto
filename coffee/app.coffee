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
malhaSelecionada = ''
corSelecionada = ''
class produto
	constructor : (@cdp, @nome, @tipo, @ref, @sub) ->
		@select = $('#' + @tipo + ' select')
		@oid = @tipo + @cdp
		@ext = @ref
		@el = '<option value="'+@nome+'" oid="'+@oid+'" data-ext="'+@ext+'" >' + @nome + '</option>'
		$(@select).append(@el)
		

criarProdutos = ->
		lista = fetch 'produtos.json'
		listaSubs = [];
		listaCores = [];
		tipos = ['malhas', 'golas', 'punhos'];
		subTipos = ['cor', 'modeloGola', 'modeloPunhos', 'ribana']

		corCdp = 0

		criarSubs = (oid)->
			subCdp = 0
			
			#deleta options do sub que será modificado e limpa a lista
			for i in lista when i.tipo + i.cdp is oid 
				subPaiRef = i.ref
				for sid, o of i.sub
					subNome = o.nome
					subTipo = o.tipo
					subRef = o.ref
					#console.log nome + ' ' +tipo+ ' ' +ref
					$('#'+subTipo+' option').remove()
					$('#'+subTipo+' select').append('<option></option>')
				

			criarSub = (sub)->
				for sid, o of sub
					subNome = o.nome
					subTipo = o.tipo
					subRef = o.ref
					#console.log subNome + subTipo + subRef
					c = new produto subCdp += 1, subNome, subTipo, subRef
					c.subPaiRef = subPaiRef
					c.ext += c.subPaiRef
					if subTipo is 'cor'
						listaCores.push(c)
					else
						listaSubs.push(c)

			#Executa funções
			criarSub i.sub for i in lista when i.tipo + i.cdp is oid

			prepararImagem subTipo for subTipo in subTipos


		prepararImagem = (tipo) ->
			$('#' +tipo+ ' select').off();
			$('#' + tipo + ' select').on('change', ->
				val = $(@).val();
				ref = i.ref for i in lista when i.nome is val
				dir = 'img/'


				if tipo is 'malhas'
					$('#canvas img').attr('src', '')
					$('#cor option').remove()
					malhaSelecionada = ref
					listaSubs.splice 0, listaSubs.length
					listaCores.splice 0, listaCores.length
				
				if tipo is 'malhas' or tipo is 'punhos' or tipo is 'golas'
					oid = i.oid for i in lista when i.nome is val
					dir += tipo+ '/' +ref+ '/'
					criarSubs oid
					
					if ref is 'meia_malha/ribana'
						$('.ribana').show();
						$('.not-ribana').hide();
					else
						$('.ribana').hide();
						$('.not-ribana').show();

				else if tipo is 'cor' or tipo is 'ribana'
					console.log listaCores
					corRef = j.ref for j in listaCores when j.nome is val;
					#console.log subRef
					#corPaiRef = j.subPaiRef for j in listaSubs when j.nome is val
					corPaiRef = malhaSelecionada
					coid = j.oid for j in listaCores when j.nome is val
				else
					subRef = j.ref for j in listaSubs when j.nome is val
					#console.log subRef
					subPaiRef = j.subPaiRef for j in listaSubs when j.nome is val
					oid = j.oid for j in listaSubs when j.nome is val

				

				#console.log tipo
				if tipo is 'cor' or tipo is 'ribana'
					_tipo = 'malhas'
					if corRef isnt undefined
						corSelecionada = corRef
					dir += _tipo+ '/' +corPaiRef+ '/' +corSelecionada+ '.png'
					console.log(dir)
					
					$('#canvas .' + _tipo + ' img').attr('src', dir);
				else if tipo is 'modeloGola'
					_tipo = 'golas'
					dir += _tipo+ '/' +subPaiRef+ '/' +subRef+ '.png'
					console.log(dir)
					$('#canvas .' + _tipo + ' img').attr('src', dir);
				else if tipo is 'modeloPunhos'
					_tipo = 'punhos'
					dir += _tipo+ '/' +subPaiRef+ '/' +subRef+ '.png'
					console.log(dir)
					$('#canvas .' + _tipo + ' img').attr('src', dir);
				else if tipo is 'ribana'
					_tipo = 'malhas'
					dir += _tipo+ '/' +ref+ '/' +corSelecionada+ '.png'
				else if tipo is 'malhas'
					corSelecionada = '01'
					dir += corSelecionada + '.png';
					$('#canvas .' + tipo + ' img').attr('src', dir);
				#else if tipo is 'golas' or tipo is 'punhos'
				console.log(corSelecionada)
			)
		#executa funções
		prepararImagem tipo for tipo in tipos
			


criarProdutos()
