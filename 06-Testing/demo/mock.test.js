const { usingCallback, cacheFunction } = require('./mock');

xdescribe('Mock Functions', () => {

  describe('usingCallback', () => {

    let array;
    beforeEach(() => {
      array = [
        {name: 'Franco', age: 27},
        {name: 'Juan', age: 13},
        {name: 'Maria', age: 17},
        {name: 'Toni', age: 30}
      ]
    });
  
    it('callback should be executed 4 times (one for each element in array)', () => {
      const mockFunction = jest.fn(person => person.age > 18);
      usingCallback(array, mockFunction);
      // console.log(mockFunction.mock.calls[0][0]);
      // console.log(mockFunction.mock.results[0].value);
      // console.log(mockFunction.mock.calls[1][0]);
      // console.log(mockFunction.mock.results[1].value);
      expect(mockFunction.mock.calls.length).toBe(4);
    });

  });

  describe('cacheFunction', () => {

    it('callback should not be executed again if already called with that arg', () => {
      const mockFunction = jest.fn(x => x + 10);
      const cacheSum10 = cacheFunction(mockFunction);
      cacheSum10(1);
      cacheSum10(13);
      cacheSum10(1);
      cacheSum10(1);
      cacheSum10(7);
      expect(mockFunction.mock.calls.length).toBe(3);
    });

  });

})