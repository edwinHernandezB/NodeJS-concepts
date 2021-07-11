const { doesNotReject } = require("assert");
const { count } = require("console");
var http = require("http");

function f1 (req, res, bool, iterations) {  
    
    var count = 0; //Private
    var isDotTrue = bool; //Private
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var dot = () => {
        res.write(isDotTrue ? '.' : count.toString())
        count++;
        return count < iterations ?  setTimeout(dot, 1000) : res.end()
    }
    dot();
}


var GeneradorBarresDeProgres = function(bool){
    this.novaBarra = Iteration => {
        return (req, res) =>{ 
           f1(req, res, bool, Iteration);
        }
    }
}

gbp = new GeneradorBarresDeProgres(true)
f = gbp.novaBarra(10)

http.createServer(f).listen(8081);
console.log("Server is listening");