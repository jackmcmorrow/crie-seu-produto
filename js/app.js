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
      this.select = $('#' + this.tipo + ' select');
      this.oid = this.tipo + this.cdp;
      this.el = '<option value="' + this.nome + '" oid="' + this.oid + '">' + this.nome + '</option>';
      $(this.select).append(this.el);
    }

    return produto;

  })();

  criarProdutos = function() {
    var criarCores, lista, listaCores, listenEvent, tipo, tipos, _i, _len, _results;

    lista = fetch('produtos.json');
    tipos = ['manequim', 'malha', 'cor', 'gola', 'punho'];
    listaCores = [];
    criarCores = function(oid) {
      var corCdp, criarCor, i, _i, _len;

      corCdp = 0;
      $('#cor option').remove();
      $('#cor select').append('<option></option>');
      listaCores.splice(0, listaCores.length);
      criarCor = function(cores) {
        var c, j, _i, _len, _results;

        _results = [];
        for (_i = 0, _len = cores.length; _i < _len; _i++) {
          j = cores[_i];
          c = new produto(corCdp += 1, j.cor, 'cor');
          _results.push(listaCores.push(c));
        }
        return _results;
      };
      for (_i = 0, _len = lista.length; _i < _len; _i++) {
        i = lista[_i];
        if (i.tipo + i.cdp === oid) {
          criarCor(i.cores);
        }
      }
      listenEvent('cor');
      return console.log(listaCores);
    };
    listenEvent = function(tipo) {
      return $('#' + tipo + ' select').on('change', function() {
        var i, j, nome, oid, _i, _j, _len, _len1;

        nome = $(this).val();
        if (tipo !== cor) {
          for (_i = 0, _len = lista.length; _i < _len; _i++) {
            i = lista[_i];
            if (i.nome === nome) {
              oid = i.oid;
            }
          }
        } else {
          for (_j = 0, _len1 = listaCores.length; _j < _len1; _j++) {
            j = listaCores[_j];
            if (j.nome === nome) {
              oid = j.oid;
            }
          }
        }
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

}).call(this);
