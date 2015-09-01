import _ from 'lodash';
import Component from '../../src/<%= compName %>';

describe('ES6 component Tests - <%= compName %>', () => {
  let component;

  beforeEach(() => {
    component = _.cloneDeep(Component);
  });

  afterEach(() => {
  });

  it('should have the default greeting property set', () => {
    expect(component.properties.greeting.value).to.equal('Hello!');
  });

  it('should sayHello', () => {
    expect(component.sayHello()).to.equal('<%= compName %> says, Hello World!');
  });

  it('should have a polymer config', () => {
    expect(component.is).to.equal('<%= compName %>');
  });
});
