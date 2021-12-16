---
title: Advanced Promises
permalink: "/AdvancedPromises/"
feedbackID: 04-AdvancePromises
eleventyNavigation:
  key: Advanced Promises
  order: 4
---

![HenryLogo](https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp)

<table class="hide" width="100%" style='table-layout:fixed;'>
  <tr>
	  <td>
	  	<a href="https://airtable.com/shrBpWkYV4K12PPNZ?prefill_clase=04-AdvancePromises">
			<img src="https://static.thenounproject.com/png/204643-200.png" width="100"/>
			<br>
			Hacé click acá para dejar tu feedback sobre esta clase.
	  	</a>
	  </td>
              <td>
      <a href="https://quiz.soyhenry.com/evaluation/new/60a51b0256b4056ff032d5e1">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/HSQuiz.svg/768px-HSQuiz.svg.png" width="100" height="100"/>
        <br>
        Hacé click acá completar el quiz teórico de esta lecture.
      </a>
   </td>
  </tr>
</table>

# Advanced Promises

Las promesas pueden ser algo complejas, sobre todo cuando queremos hacer _chaining_ de promesas. Veamos los siguientes casos y qué sucede en cada uno de ellos:

```javascript
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);

doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);

doSomething().then(doSomethingElse())
  .then(finalHandler);

doSomething().then(doSomethingElse)
  .then(finalHandler);
```

## Caso I

Código:

```js
doSomething().then(function () {
  return doSomethingElse();
}).then(finalHandler);
```

Solución:

```js
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|

```

## Caso II

Código:

```js
doSomething().then(function () {
  doSomethingElse();
}).then(finalHandler);
```

Solución:

```js
doSomething
|-----------------|
                  doSomethingElse(undefined)
                  |------------------|
                  finalHandler(undefined)
                  |------------------|

```

## Caso III

Código:

```js
doSomething().then(doSomethingElse())
  .then(finalHandler);
```

Solución:

```js
doSomething
|-----------------|
doSomethingElse(undefined)
|---------------------------------|
                  finalHandler(resultOfDoSomething)
                  |------------------|
```

## Caso IV

Código:

```javascript
doSomething().then(doSomethingElse)
  .then(finalHandler);
```

Solución:

```javascript
doSomething
|-----------------|
                  doSomethingElse(resultOfDoSomething)
                  |------------------|
                                     finalHandler(resultOfDoSomethingElse)
                                     |------------------|
```

Material Recomendado:

- [We have a problem with promises](https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

## Homework

Completa la tarea descrita en el archivo [README](https://github.com/soyHenry/FT-M3/tree/master/04-AdvancePromises/homework/)
