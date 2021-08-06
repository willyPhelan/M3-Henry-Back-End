xdescribe('Tests that will pass', () => {
  it('should pass if exact match', () => {
    const number = 3;
    const string = 'Franco';
    expect(number).toBe(3);
    expect(string).toBe('Franco');
  });
  it('should pass if recursively match (object)', () => {
    const obj = {name: 'Franco', age: 27};
    expect(obj).toEqual({name: 'Franco', age: 27});
  });
  
  it('should pass if recursively match (array)', () => {
    const array = [1,2,3,4,5];
    expect(array).toEqual([1,2,3,4,5]);
  });
})

xdescribe('Tests that will not pass', () => {
  it('should fail if not exact match (object)', () => {
    const obj = {name: 'Franco', age: 27};
    expect(obj).toBe({name: 'Franco', age: 27});
  });
  
  it('should fail if not exact match (array)', () => {
    const array = [1,2,3,4,5];
    expect(array).toBe([1,2,3,4,5]);
  });
})





