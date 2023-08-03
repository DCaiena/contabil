fs = require('fs'); // Biblioteca de leitura de arquivos no js
var parser = require('xml2json'); // Biblioteca pra leitura de xml
// const nota = require('./Notas/15230128628545000166550010000002781000501527-nfe.xml')



function verificarCodigo(codigo) { // funcao pra verificar codigo da tabela 
        return (codigo % 100 >= 40 && codigo % 100 <= 60) || (codigo >= 400 && codigo <= 600) && codigo <= 760
}


fs.readFile('./Notas/15230128628545000166550010000002831000501578-nfe.xml', function (err, data) { // leitura de arquivo na pasta Notas
        jsonfile = JSON.parse(parser.toJson(data, { reversible: true })); // converter arquivo xml pra objeto JSON
        const ncm = jsonfile.nfeProc.NFe.infNFe.det.prod.NCM.$t // Recuperando a propriedade NCM dentro do xml convertido
        const vProd = Number(jsonfile.nfeProc.NFe.infNFe.det.prod.vProd.$t)  // Recuperando a propriedade VProduto no XML convertido
        const code = ncm.slice(0, 4) // Cortando o codigo NCM pra pegar os 4 primeiros numeros 
        if (!verificarCodigo(Number(code))) { // Verificando se o codigo tributa ou não
                let valorTributado = vProd + (vProd * 0.17) // 
                console.log(`Valor antigo ${vProd}, Valor tributado ${valorTributado}`, '@@@')
        }

});
