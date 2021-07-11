const { doesNotReject } = require("assert");
const { count } = require("console");
var http = require("http");

  /*El problema general que tiene el bucle for para este ejercicio es que al usar el setTimeout dentro de este bucle,
  no generamos ningún contexto, por lo que el bucle se ejecuta antes que los setTimeout y cuando imprime los valores,
  se imprime el último valor del index y todos practicamente al mismo instante */

 /*CON VAR 
 Con la autoinvocación y pasando el index por parámetro nos aseguramos que en cada iteración, la función genera un scope
 con el valor actual del index en esa iteración y las modificaciones internas de las variables no afectarán a las externas*/
/*function f1 (req, res, bool, iterations) {  

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    for (var index = 1; index <= iterations; index++) {
        var count = 0;
        (function (i) {
            setTimeout(function () { 
                res.write(bool ? '.' : count.toString());
                count++;
                if (i == iterations) {
                    res.end()
                }
            }, 1000*i);
        })(index);
    }
}*/

//CON LET
/*Con Let nos podemos evitar utilizar la función auto invocada ya que let funciona de tal manera que solo existirá 
en el scope actual, en este caso en una iteración determina en un scope único 
*/

function f1 (req, res, bool, iterations) {  

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    for (let index = 1; index <= iterations; index++) {
        var count = 0;
        setTimeout(function () { 
            res.write(bool ? '.' : count.toString());
            count++;
            if (index == iterations) {
                res.end()
            }
        }, 1000*index);
    }
      
}

var GeneradorBarresDeProgres = function(bool){
    this.novaBarra = Iteration => {
        return (req, res) =>{ 
           f1(req, res, bool, Iteration);
        }
    }
}

gbp = new GeneradorBarresDeProgres(false)
f = gbp.novaBarra(10)

http.createServer(f).listen(8081);
console.log("Server is listening");