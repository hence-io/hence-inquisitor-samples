var component = document.querySelector('<%= compName %>');

suite('<<%= compName %>>', function () {

  test('says hello', function () {
    assert.equal(component.greeting, 'test greeting');
  });

  test('says hello', function () {
    assert.equal(component.sayHello(), '<%= compName %> says, Hello World!');

    var greetings = component.sayHello('greetings Earthlings');
    assert.equal(greetings, '<%= compName %> says, greetings Earthlings');
  });
});