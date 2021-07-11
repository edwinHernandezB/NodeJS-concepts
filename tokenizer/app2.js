function Tokenizer(){
    this.dictionary = {};
    this.defaultFunct = undefined;
    this.run = function(llistaC) {
      var that = this;
      llistaC.forEach(function(element) {
        if (that.dictionary[element] != null) {
          that.dictionary[element]();
        }
        else{
          if(typeof(that.defaultFunct) != 'undefined'){
            /*No tiene parámetros la función ya que en este caso conocemos
            las funciones que se registran y no utilizan parámetros*/
            that.defaultFunct();
          } 
        }
      });
    }
    this.on = function(c, f){
      this.dictionary[c] = f;
    }
    this.onDefault = function(f){
      this.defaultFunct = f;
    };

}

function testTokenizer(){
  
  var t = new Tokenizer();
  var countA = 0;
  var testString = ['H','o','l','a',' ','c','o','m',' ','a','n','e','u','?'];
  var countC = 0;
  var others = 0;


  /*El tokenizer queda ligado al contexto del
  testTokenizer, por eso al incrementar los contadores, se 
  sabe que hacen referencia a las variables declaradas en
  el testTokenizer
  */
  t.on('a', function(){ 
    countA++;
  });

  t.on('c', function(){
    countC++;
  });
  
  t.onDefault(function(){
    others++;
  });

  //here goes the code to run the test over testString
  t.run(testString);
  
  console.log("numero de a's: " + countA);
  console.log("numero de c's: " + countC);
  console.log("numero d'altres caracters: " + others);
}

testTokenizer();


