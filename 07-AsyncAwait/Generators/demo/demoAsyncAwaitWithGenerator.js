const fs = require('fs');

function promisifiedReadFile(filename, num) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filename, 'utf8', function (err, data) {
			if (err) reject(err);
			else resolve(num + ") " + data);
		});
	});
};


async function asyncFunction() {

  const firstResult = await promisifiedReadFile('archivo.txt', "1");
  console.log("First result async: ", firstResult);

  const secondResult = await promisifiedReadFile('archivo.txt', "2");
  console.log("Second result async: ", secondResult);

  const thirdResult = await promisifiedReadFile('archivo.txt', "3");
  console.log("Third result async: ", thirdResult);

  return "Finished asyncFunction";
}

function* generatorFunction() {

  const firstResult = yield promisifiedReadFile('archivo.txt', "1");
  console.log("First result generator: ", firstResult);

  const secondResult = yield promisifiedReadFile('archivo.txt', "2");
  console.log("Second result generator: ", secondResult);

  const thirdResult = yield promisifiedReadFile('archivo.txt', "3");
  console.log("Third result generator: ", thirdResult);

  return "Finished asyncFunction";

}

asyncFunction();

//generatorFunction();

// No se ejecuta --> asyncFunction !== generatorFunction :(

function generatorRunner(generatorFunction) {
  const generatorObject = generatorFunction();

  function run(arg) {
    const result = generatorObject.next(arg);

    if(result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(run);
    }
  }

  return run();
}

generatorRunner(generatorFunction);
