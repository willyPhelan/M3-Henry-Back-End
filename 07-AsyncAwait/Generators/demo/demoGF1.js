function* generatorShowInstructors() {
  console.log("Iniciando generator function");
  yield "Franco";
  yield "Toni"
  console.log("Generator function terminada");
}

var generatorObject = generatorShowInstructors();

console.log(generatorObject.next());
console.log(generatorObject.next());
console.log(generatorObject.next());

function* generatorShowInstructorsWithParameter() {
  console.log("Iniciando generator function with parameter");
  console.log(1, yield);
  console.log(2, yield);
}

var generatorObjectParameter = generatorShowInstructorsWithParameter();

generatorObjectParameter.next();
generatorObjectParameter.next('Franco');
generatorObjectParameter.next('Toni');
