function* naturalXNumbersG(x) {
    let number = 1;
    while(number < x) {
        yield number;
        number = number + 1;
    }
}

function generatorExec(){
    console.log('Generator functions: ');

    let before = process.memoryUsage().heapUsed;
    console.log(`Before: ${before} KB`);

    let generatorFunction = naturalXNumbersG(1000000);
    // console.log(generatorFunction.next());
    // console.log(generatorFunction.next());
    // console.log(generatorFunction.next());
    // console.log(generatorFunction.next());
    let after = process.memoryUsage().heapUsed;
    console.log(`After: ${after} KB`);
    console.log(`Difference: ${after-before} KB`);
    console.log('------------------------------');
}

function naturalXNumbers(x){
    let array = [];
    let y = 0;
    while(y < x){
        array.push(y++);
    }
    return array;
}

function normalExec(){
    console.log('Normal functions: ');

    let before = process.memoryUsage().heapUsed;
    console.log(`Before: ${before} KB`);

    let numbers = naturalXNumbers(1000000);

    let after = process.memoryUsage().heapUsed;
    console.log(`After: ${after} KB`);

    console.log(`Difference: ${after-before} KB`);
    console.log('------------------------------');
}

generatorExec();
normalExec();
