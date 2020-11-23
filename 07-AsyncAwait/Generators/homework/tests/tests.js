'use strict'

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

const fizzBuzzGenerator = require('../homework.js')
const expected = [
  1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13,
  14, 'Fizz Buzz', 16, 17, 'Fizz', 19, 'Buzz', 'Fizz', 22, 23, 'Fizz',
  'Buzz', 26, 'Fizz', 28, 29, 'Fizz Buzz', 31, 32, 'Fizz', 34, 'Buzz',
  'Fizz', 37, 38, 'Fizz', 'Buzz', 41, 'Fizz', 43, 44, 'Fizz Buzz', 46, 47,
  'Fizz', 49, 'Buzz', 'Fizz', 52, 53, 'Fizz', 'Buzz', 56, 'Fizz', 58, 59,
  'Fizz Buzz', 61, 62, 'Fizz', 64, 'Buzz', 'Fizz', 67, 68, 'Fizz', 'Buzz',
  71, 'Fizz', 73, 74, 'Fizz Buzz', 76, 77, 'Fizz', 79, 'Buzz', 'Fizz', 82,
  83, 'Fizz', 'Buzz', 86, 'Fizz', 88, 89, 'Fizz Buzz', 91, 92, 'Fizz', 94,
  'Buzz', 'Fizz', 97, 98, 'Fizz', 'Buzz'
]

describe('Generator Function', () => {
  describe('fizzBuzzGenerator', () => {
    it('The generator is finite if a valid argument is passed in.', () => {
      const fizzBuzz = fizzBuzzGenerator(50)

      for (let i = 0; i < 100; i++) {
        if (i < 50) {
          expect(fizzBuzz.next()).to.deep.equal({
            value: expected[i],
            done: false
          })
        } else {
          expect(fizzBuzz.next()).to.deep.equal({
            value: undefined,
            done: true
          })
        }
      }
    })
  });

  describe('fizzBuzzGenerator', () => {
    it('is an infinite generator if no argument is passed in.', () => {
      const fizzBuzz = fizzBuzzGenerator()

      for (let i = 0; i < 100; i++) {
        expect(fizzBuzz.next()).to.deep.equal({
          value: expected[i],
          done: false
        })
      }
    })
  });
});
