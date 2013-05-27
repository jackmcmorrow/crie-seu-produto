(function() {
  var produtos;

  produtos = $.getJSON('json/produtos.json', function() {
    var lista;

    lista = $.parseJSON(produtos);
    return console.log(lista);
  });

}).call(this);
