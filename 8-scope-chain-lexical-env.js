//* IMPORTANT interview topic

function a() {
  var b = 10;
  c();
  function c() {
    console.log(b);
  }
}

a();

//* Lexical environment for a EC
//~ Local variable environment + Ref To Lexical env of parent EC (lexical parent -> where that func is defined)

//? Eg - Lexical of c -> Local of c + Lexical of a
//? Eg - Lexical of a -> Local of a + Lexical of global
//? Eg - Lexical of global -> Local of global + null

//* Chain of Lexical Environments, from inner to outer => SCOPE CHAIN

//? Eg - Scope Chain for  c

//  1. Local
//      ->this
//  2. Closure ( a )
//      ->b : 10
//  3. Global
//      ->{....}

/*
Any time you hear lexical, think definition.
So, the lexical scope of a car, variable, phone, function, 
or swimsuit refers to its definition region.
*/
