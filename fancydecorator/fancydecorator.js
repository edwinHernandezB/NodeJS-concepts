
const http = require('http')

// TODO: implement function debugDecorator here

let debugDecorator = function (f) {
	let count = 0;
	return (value) =>{
		count++;
		console.log('function f called ' + count + ' times (p = ' + value + ')');
		return f(value);
	}
}

// TODO: implement class RandomDelayDecorator here

let RandomDelayDecorator = function() {
	let milliseconds = 0;
	
	this.setMaxDelay = function(delay){
		milliseconds = delay;
	}
	this.decorate = function(f){
		let m = (0.5 + 0.5 * Math.random()) * milliseconds
		return p => {setTimeout(f, m, p); }
	}
}

// TODO: implement server function
function serverFunction(request, response) {
	//Sending HTTP Response headers
	response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	response.write('Loading')
	
	
    let d = function(count){
		response.write('.')
		count < 10 ? recursiveDot(count+1):response.end(' done!')
	}
	var rdd = new RandomDelayDecorator()
	rdd.setMaxDelay(500);
  	let recursiveDot = rdd.decorate(d);
	recursiveDot(0);


}

http.createServer(serverFunction).listen(8081);

console.log('Server running at http://localhost:8081/');

// Tests:

/*
console.log("--------------------------------------------------")
console.log("Tests for debugDecorator")
console.log("--------------------------------------------------")

var test1 = debugDecorator(function f1(x) { console.log("  f1 function called with x = " + x); return -2 * x })

console.log("  Is return value -6? " + (test1(3) === -6) + "\n")
console.log("  Is return value -8? " + (test1(4) === -8) + "\n")
console.log("  Is return value NaN? " + (isNaN(test1())) + "\n")

var test2 = debugDecorator(function f2(x) { console.log("  f2 function called with x = " + x); })

console.log("  Is return value undefined? " + (test2(1) === undefined) + "\n")
console.log("  Is return value undefined? " + (test2() === undefined) + "\n")

console.log("--------------------------------------------------")
console.log("Tests for RandomDelayDecorator")
console.log("--------------------------------------------------")

var rdd1 = new RandomDelayDecorator()
var rdd2 = new RandomDelayDecorator()

var f3 = function f3(x) { console.log("  f3 function called with " + x); return "f3: " + x };
var f4 = function f4(x) { console.log("  f4 function called with " + x); return "f4: " + x };

rdd1.setMaxDelay(200)

var test4 = rdd1.decorate(f3)
var test5 = rdd2.decorate(f3)
var test6 = debugDecorator(rdd2.decorate(debugDecorator(f4)))

console.log("launching test4 ok? " + (test4("at [100, 200)") === undefined))
console.log("launching test4 ok? " + (test4("at [100, 200)") === undefined))
console.log("launching test5 ok? " + (test5("at [0, 0]") === undefined))
console.log("launching test6 ok? " + (test6("at [0, 0]") === undefined))

rdd1.setMaxDelay(0)
rdd2.setMaxDelay(500)

console.log("launching test4 ok? " + (test4("at [0, 0)") === undefined))
console.log("launching test6 ok? " + (test6("at [250, 500]") === undefined))

console.log("waiting...\n")
*/

