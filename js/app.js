(function() {
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
        p = new produto(parseInt(cdp), v.nome, v.tipo, v.cores);
        return listaDeObj.push(p);
      });
    });
    return listaDeObj;
  };

  produto = (function() {
    function produto(cdp, nome, tipo, cores) {
      this.cdp = cdp;
      this.nome = nome;
      this.tipo = tipo;
      this.cores = cores;
      this.select = $('#' + this.tipo);
      this.oid = this.tipo + this.cdp;
      this.el = '<option value="' + this.oid + '" nome="' + this.nome + '">' + this.nome + '</option>';
      $(this.select).append(this.el);
    }

    return produto;

  })();

  criarProdutos = function() {
    var corCdp, criarCores, lista, listenEvent, tipo, tipos, _i, _len, _results;

    lista = fetch('produtos.json');
    tipos = ['manequim', 'malha', 'cor', 'gola', 'punho'];
    corCdp = 0;
    criarCores = function(oid) {
      var criarCor, i, _i, _len;

      $('#cor option').remove();
      criarCor = function(cores) {
        var c, j, _i, _len, _results;

        _results = [];
        for (_i = 0, _len = cores.length; _i < _len; _i++) {
          j = cores[_i];
          _results.push(c = new produto(corCdp += 1, j.cor, 'cor'));
        }
        return _results;
      };
      for (_i = 0, _len = lista.length; _i < _len; _i++) {
        i = lista[_i];
        if (i.tipo + i.cdp === oid) {
          criarCor(i.cores);
        }
      }
      return listenEvent('cor');
    };
    listenEvent = function(tipo) {
      return $('select#' + tipo).on('change', function() {
        var oid;

        oid = $(this).val();
        $('#canvas .' + tipo + ' img').attr('src', function() {
          var dir;

          return dir = 'img/' + tipo + '/' + oid + '.png';
        });
        if (tipo === 'malha') {
          return criarCores(oid);
        }
      });
    };
    _results = [];
    for (_i = 0, _len = tipos.length; _i < _len; _i++) {
      tipo = tipos[_i];
      _results.push(listenEvent(tipo));
    }
    return _results;
  };

  criarProdutos();

  console.log($('#malha').prop('selectedIndex'));

}).call(this);
