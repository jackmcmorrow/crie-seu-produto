(function() {
  var criarProdutos, fetch, produto;

  fetch = function(arquivo) {
    var listaDeObj;

    listaDeObj = new Array;
    $.getJSON('json/' + arquivo, function(arq) {
      var cdp, tipoAnterior;

      tipoAnterior = new String;
      cdp = 0;
      return $.each(arq, function(k, v) {
        var p;

        if (v.select === tipoAnterior) {
          cdp += 1;
        } else {
          cdp = 0;
        }
        tipoAnterior = v.select;
        p = new produto(parseInt(cdp), v.nome, v.select, v.cores);
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
      this.el = '<option value="' + this.tipo + this.cdp + '">' + this.nome + '</option> ';
      $(this.select).append(this.el);
      $(this.select).on('blur', function() {}, $('#canvas .' + this.tipo + ' img').attr('src', function() {
        var dir;

        return dir = 'img/' + tipo + '/' + cdp + '.png';
      }));
    }

    return produto;

  })();

  criarProdutos = function() {
    var lista;

    lista = fetch('produtos.json');
    console.log(lista);
    return console.log('wateva');
  };

  criarProdutos();

  console.log($('#malha').prop('selectedIndex'));

}).call(this);
