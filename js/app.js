var corSelecionada,criarProdutos,fetch,malhaSelecionada,produto;fetch=function(o){var e;return e=new Array,$.getJSON("json/"+o,function(o){var n,t;return t=new String,n=1,$.each(o,function(o,a){var r;return a.select===t?n+=1:n=1,t=a.select,r=new produto(parseInt(n),a.nome,a.tipo,a.ref,a.sub),e.push(r)})}).fail(function(){return console.log("deu ruim, verifique o JSON")}),e},malhaSelecionada="",corSelecionada="",produto=function(){function o(o,e,n,t,a){this.cdp=o,this.nome=e,this.tipo=n,this.ref=t,this.sub=a,this.select=$("#"+this.tipo+" select"),this.oid=this.tipo+this.cdp,this.ext=this.ref,this.el='<option value="'+this.nome+'" oid="'+this.oid+'" data-ext="'+this.ext+'" >'+this.nome+"</option>",$(this.select).append(this.el)}return o}(),criarProdutos=function(o){var e,n,t,a,r,i,s,l,c,h,u,f,p;for(t=fetch(o),i=[],a=[],r=[],h=["malhas","golas","punhos"],l=["cor","modeloGola","modeloPunhos","ribana"],e=0,n=function(o){var e,n,c,h,u,f,p,d,m,g,v,S,b,P,w,x,R;for(u=0,g=0,b=t.length;b>g;g++)if(n=t[g],n.tipo+n.cdp===o){p=n.ref,x=n.sub;for(h in x)c=x[h],f=c.nome,m=c.tipo,d=c.ref,$("#"+m+" option").remove(),$("#"+m+" select").append("<option></option>")}for(e=function(o){var e,n;n=[];for(h in o)c=o[h],f=c.nome,m=c.tipo,d=c.ref,e=new produto(u+=1,f,m,d),e.subPaiRef=p,e.ext+=e.subPaiRef,"cor"===m||"ribana"===m?n.push(a.push(e)):"golas"===m?n.push(r.push(e)):n.push(i.push(e));return n},v=0,P=t.length;P>v;v++)n=t[v],n.tipo+n.cdp===o&&e(n.sub);for(R=[],S=0,w=l.length;w>S;S++)m=l[S],R.push(s(m));return R},s=function(o){return $("#"+o+" select").off(),$("#"+o+" select").on("change",function(){var e,r,s,l,c,h,u,f,p,d,m,g,v,S,b,P,w,x,R,G,J,N,O,j,q,y;for(m=$(this).val(),g=0,P=t.length;P>g;g++)c=t[g],c.nome===m&&(f=c.ref);if(l="img/","malhas"===o&&($("#canvas img").attr("src",""),$("#cor option").remove(),malhaSelecionada=f,a.splice(0,a.length)),"malhas"===o||"punhos"===o||"golas"===o){for(v=0,w=t.length;w>v;v++)c=t[v],c.nome===m&&(u=c.oid);l+=o+"/"+f+"/",n(u)}else if("cor"===o){for(console.log(a),S=0,x=a.length;x>S;S++)h=a[S],h.nome===m&&(s=h.ref);for(r=malhaSelecionada,b=0,R=a.length;R>b;b++)h=a[b],h.nome===m&&(e=h.oid)}else{for(O=0,G=i.length;G>O;O++)h=i[O],h.nome===m&&(d=h.ref);for(j=0,J=i.length;J>j;j++)h=i[j],h.nome===m&&(p=h.subPaiRef);for(q=0,N=i.length;N>q;q++)h=i[q],h.nome===m&&(u=h.oid)}return"cor"===o||"ribana"===o?(y="malhas",void 0!==s&&(corSelecionada=s),l+=y+"/"+r+"/"+corSelecionada+".png",$("#canvas ."+y+" img").attr("src",l)):"modeloGola"===o?(y="golas",l+="golas/"+p+"/"+d+".png",$("#canvas ."+y+" img").attr("src",l)):"modeloPunhos"===o?(y="punhos",l+="golas/"+p+"/"+d+".png",$("#canvas ."+y+" img").attr("src",l)):"malhas"===o&&(corSelecionada="01",l+=corSelecionada+".png",$("#canvas ."+o+" img").attr("src",l)),console.log(corSelecionada)})},p=[],u=0,f=h.length;f>u;u++)c=h[u],p.push(s(c));return p};