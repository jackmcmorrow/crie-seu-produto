var corSelecionada, criarProdutos, fetch, malhaSelecionada, produto;

fetch = function(arquivo) {
  var listaDeObj;
  listaDeObj = new Array;
  $.getJSON('json/' + arquivo, function(arq) {
    var cdp, tipoAnterior;
    tipoAnterior = new String;
    cdp = 1;
    return $.each(arq, function(k, v) {
      var p;
      if (v.select === tipoAnterior) {
        cdp += 1;
      } else {
        cdp = 1;
      }
      tipoAnterior = v.select;
      p = new produto(parseInt(cdp), v.nome, v.tipo, v.ref, v.sub);
      return listaDeObj.push(p);
    });
  }).fail(function() {
    return console.log('deu ruim, verifique o JSON');
  });
  return listaDeObj;
};

malhaSelecionada = '';

corSelecionada = '';

produto = (function() {
  function produto(cdp, nome, tipo, ref, sub) {
    this.cdp = cdp;
    this.nome = nome;
    this.tipo = tipo;
    this.ref = ref;
    this.sub = sub;
    this.select = $('#' + this.tipo + ' select');
    this.oid = this.tipo + this.cdp;
    this.ext = this.ref;
    this.el = '<option value="' + this.nome + '" oid="' + this.oid + '" data-ext="' + this.ext + '" >' + this.nome + '</option>';
    $(this.select).append(this.el);
  }

  return produto;

})();

criarProdutos = function() {
  var corCdp, criarSubs, lista, listaCores, listaSubs, prepararImagem, subTipos, tipo, tipos, _i, _len, _results;
  lista = fetch('produtos.json');
  listaSubs = [];
  listaCores = [];
  tipos = ['malhas', 'golas', 'punhos'];
  subTipos = ['cor', 'modeloGola', 'modeloPunhos', 'ribana'];
  corCdp = 0;
  criarSubs = function(oid) {
    var criarSub, i, o, sid, subCdp, subNome, subPaiRef, subRef, subTipo, _i, _j, _k, _len, _len1, _len2, _ref, _results;
    subCdp = 0;
    for (_i = 0, _len = lista.length; _i < _len; _i++) {
      i = lista[_i];
      if (!(i.tipo + i.cdp === oid)) {
        continue;
      }
      subPaiRef = i.ref;
      _ref = i.sub;
      for (sid in _ref) {
        o = _ref[sid];
        subNome = o.nome;
        subTipo = o.tipo;
        subRef = o.ref;
        $('#' + subTipo + ' option').remove();
        $('#' + subTipo + ' select').append('<option></option>');
      }
    }
    criarSub = function(sub) {
      var c, _results;
      _results = [];
      for (sid in sub) {
        o = sub[sid];
        subNome = o.nome;
        subTipo = o.tipo;
        subRef = o.ref;
        c = new produto(subCdp += 1, subNome, subTipo, subRef);
        c.subPaiRef = subPaiRef;
        c.ext += c.subPaiRef;
        if (subTipo === 'cor') {
          _results.push(listaCores.push(c));
        } else {
          _results.push(listaSubs.push(c));
        }
      }
      return _results;
    };
    for (_j = 0, _len1 = lista.length; _j < _len1; _j++) {
      i = lista[_j];
      if (i.tipo + i.cdp === oid) {
        criarSub(i.sub);
      }
    }
    _results = [];
    for (_k = 0, _len2 = subTipos.length; _k < _len2; _k++) {
      subTipo = subTipos[_k];
      _results.push(prepararImagem(subTipo));
    }
    return _results;
  };
  prepararImagem = function(tipo) {
    $('#' + tipo + ' select').off();
    return $('#' + tipo + ' select').on('change', function() {
      var coid, corPaiRef, corRef, dir, i, j, oid, ref, subPaiRef, subRef, val, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _len5, _len6, _m, _n, _o, _tipo;
      val = $(this).val();
      for (_i = 0, _len = lista.length; _i < _len; _i++) {
        i = lista[_i];
        if (i.nome === val) {
          ref = i.ref;
        }
      }
      dir = 'img/';
      if (tipo === 'malhas') {
        $('#canvas img').attr('src', '');
        $('#cor option').remove();
        malhaSelecionada = ref;
        listaSubs.splice(0, listaSubs.length);
        listaCores.splice(0, listaCores.length);
      }
      if (tipo === 'malhas' || tipo === 'punhos' || tipo === 'golas') {
        for (_j = 0, _len1 = lista.length; _j < _len1; _j++) {
          i = lista[_j];
          if (i.nome === val) {
            oid = i.oid;
          }
        }
        dir += tipo + '/' + ref + '/';
        criarSubs(oid);
        if (ref === 'meia_malha/ribana') {
          $('.ribana').show();
          $('.not-ribana').hide();
        } else {
          $('.ribana').hide();
          $('.not-ribana').show();
        }
      } else if (tipo === 'cor' || tipo === 'ribana') {
        console.log(listaCores);
        for (_k = 0, _len2 = listaCores.length; _k < _len2; _k++) {
          j = listaCores[_k];
          if (j.nome === val) {
            corRef = j.ref;
          }
        }
        corPaiRef = malhaSelecionada;
        for (_l = 0, _len3 = listaCores.length; _l < _len3; _l++) {
          j = listaCores[_l];
          if (j.nome === val) {
            coid = j.oid;
          }
        }
      } else {
        for (_m = 0, _len4 = listaSubs.length; _m < _len4; _m++) {
          j = listaSubs[_m];
          if (j.nome === val) {
            subRef = j.ref;
          }
        }
        for (_n = 0, _len5 = listaSubs.length; _n < _len5; _n++) {
          j = listaSubs[_n];
          if (j.nome === val) {
            subPaiRef = j.subPaiRef;
          }
        }
        for (_o = 0, _len6 = listaSubs.length; _o < _len6; _o++) {
          j = listaSubs[_o];
          if (j.nome === val) {
            oid = j.oid;
          }
        }
      }
      if (tipo === 'cor' || tipo === 'ribana') {
        _tipo = 'malhas';
        if (corRef !== void 0) {
          corSelecionada = corRef;
        }
        dir += _tipo + '/' + corPaiRef + '/' + corSelecionada + '.png';
        $('#canvas .' + _tipo + ' img').attr('src', dir);
      } else if (tipo === 'modeloGola') {
        _tipo = 'golas';
        dir += _tipo + '/' + subPaiRef + '/' + subRef + '.png';
        $('#canvas .' + _tipo + ' img').attr('src', dir);
      } else if (tipo === 'modeloPunhos') {
        _tipo = 'punhos';
        dir += 'golas/' + subPaiRef + '/' + subRef + '.png';
        $('#canvas .' + _tipo + ' img').attr('src', dir);
      } else if (tipo === 'ribana') {
        _tipo = 'malhas';
        dir += _tipo + '/' + ref + '/' + corSelecionada + '.png';
      } else if (tipo === 'malhas') {
        corSelecionada = '01';
        dir += corSelecionada + '.png';
        $('#canvas .' + tipo + ' img').attr('src', dir);
      }
      return console.log(corSelecionada);
    });
  };
  _results = [];
  for (_i = 0, _len = tipos.length; _i < _len; _i++) {
    tipo = tipos[_i];
    _results.push(prepararImagem(tipo));
  }
  return _results;
};

criarProdutos();
