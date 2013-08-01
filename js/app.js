var criarProdutos, fetch, produto;

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

produto = (function() {
  function produto(cdp, nome, tipo, ref, sub) {
    this.cdp = cdp;
    this.nome = nome;
    this.tipo = tipo;
    this.ref = ref;
    this.sub = sub;
    this.select = $('#' + this.tipo + ' select');
    this.oid = this.tipo + this.cdp;
    this.el = '<option value="' + this.nome + '" oid="' + this.oid + '" data-ref="' + this.ref + '" >' + this.nome + '</option>';
    $(this.select).append(this.el);
  }

  return produto;

})();

criarProdutos = function() {
  var corCdp, criarSubs, lista, prepararImagem, subTipos, tipo, tipos, _i, _len, _results;
  lista = fetch('produtos.json');
  tipos = ['malhas', 'golas', 'punhos'];
  subTipos = ['cor', 'modeloGola', 'modeloPunhos'];
  corCdp = 0;
  criarSubs = function(oid) {
    var criarSub, i, listaSubs, o, sid, subCdp, subNome, subRef, subTipo, _i, _j, _k, _len, _len1, _len2, _ref, _results;
    listaSubs = [];
    subCdp = 0;
    for (_i = 0, _len = lista.length; _i < _len; _i++) {
      i = lista[_i];
      if (!(i.tipo + i.cdp === oid)) {
        continue;
      }
      _ref = i.sub;
      for (sid in _ref) {
        o = _ref[sid];
        subNome = o.nome;
        subTipo = o.tipo;
        subRef = o.ref;
        $('#' + subTipo + ' option').remove();
        $('#' + subTipo + ' select').append('<option></option>');
      }
      listaSubs.splice(0, listaSubs.length);
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
        _results.push(listaSubs.push(c));
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
    return $('#' + tipo + ' select').on('change', function() {
      var i, j, oid, val, _i, _j, _len, _len1;
      val = $(this).val();
      if (tipo !== 'sub') {
        for (_i = 0, _len = lista.length; _i < _len; _i++) {
          i = lista[_i];
          if (i.nome === val) {
            oid = i.oid;
          }
        }
        if (tipo === 'ribana') {
          $('.ribana').show();
          $('.not-ribana').hide();
        } else {
          $('.ribana').hide();
          $('.not-ribana').show();
        }
      } else {
        console.log(listaSubs);
        for (_j = 0, _len1 = listaSubs.length; _j < _len1; _j++) {
          j = listaSubs[_j];
          if (j.nome === val) {
            oid = j.oid;
          }
        }
      }
      if (tipo === 'malhas' || 'golas' || 'punhos') {
        criarSubs(oid);
      }
      return $('#canvas .' + tipo + ' img').attr('src', function() {
        var dir;
        return dir = 'img/' + tipo + '/' + oid + '.png';
      });
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
