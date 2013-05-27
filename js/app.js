(function() {
  var produtos;

  produtos = $.getJSON('json/produtos.json', function() {
    return console.log($.parseJSON(produtos.responseText));
  });

}).call(this);
