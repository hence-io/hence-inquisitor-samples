'use strict';
/**
 * @module <%= compName %>
 */
import console from 'consoler';
import Hence from 'hence-component-framework';

/**
 * <%= compClassName %> Component
 * @constructor
 */
let <%= compClassName %> = Hence.Ui({
  is: '<%= compName %>',
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {
    greeting: {
      type: String,
      value: 'Hello!'
    }
  },

  /*********************************************************************************************************************
   * Event Listeners
   ********************************************************************************************************************/

  /**
   * When working with listeners, if their target element doesn’t exist on the DOM you get a very basic nonspecific
   * error 'Uncaught TypeError: Invalid value used as weak map key’!  Make sure to review the listeners you set up
   * against you DOM elements. By default listeners look for IDs on elements so ‘myButton.tap’ will watch click/touches
   * on a #myButton element in the component
   */
  listeners: {
    'spawn.tap': 'eventSpawnTap' // tap on a id="special" element
  },

  /**
   * @param {Event} e The event executing this function
   */
  eventSpawnTap(e) {
    let self = this;

    // Update the property, using self.set to fire any expecting listeners
    self.set('greeting', 'Spawning moar!');

    // Create a new component and attach it to the document
    let el = self.createElement();
    document.body.appendChild(el);

    // Create a new component, automatically appending to a given target
    self.appendElementTo({greeting: '... and moar!'}, document.getElementById('component-previews'));
  },

  /*********************************************************************************************************************
   * Element DOM Hooks
   ********************************************************************************************************************/

  /**
   * This is called after all elements have been configured, but propagates bottom-up. This element's children are
   * ready, but parents are not. This is the point where you should make modifications to the DOM (when  necessary),
   * or kick off any processes the element wants to perform.
   */
  ready() {
    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.
    let self = this;
    let $ = self.$;

    // Access a local DOM element by ID using self.$
    // self.$.greeting.textContent += ", has loaded!";

    // Access a local DOM element by selector using self.$$('')
    // self.$$('#greeting').textContent += ", has loaded!";
  },

  /**
   * `attached` fires once the element and its parents have been inserted  into a document. This is a good place to
   * perform any work related to your element's visual state or active behavior (measuring sizes, beginning animations,
   * loading resources, etc).
   */
  attached() {
    // WARNING, updating DOM elements HERE may override variable revisions in the factoryImpl function if created
    // with the createElement function,leveraging the components defaults instead. If the element is embedded, no issue.
    let self = this;
    let $ = self.$;

    // Access a local DOM element by ID using self.$
    // self.$.greeting.textContent += ", has loaded!";

    // Access a local DOM element by selector using self.$$('')
    // self.$$('#greeting').textContent += ", has loaded!";

    self.async(function() {
      // access sibling or parent elements here
    });
  },

  /**
   * The analog to `attached`, `detached` fires when the element has been removed from a document. Use this to clean
   * up anything you did in `attached`.
   */
  detached() {

  },

  /**
   * @param {String} name The name of the attribute
   * @param {String} type The variable type of the attribute
   */
  attributeChanged(name, type) {
    let self = this;
    let attr = self.getAttribute(name);
    console.log(`${self.localName}#${self.id} attribute ${name} was changed to ${attr} of type ${type}`);
  },

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  /**
   * Does some secret magic!
   * @private
   */
  _doHiddenstuff() {

  },

  /**
   * Sometimes it's just nice to say hi.
   *
   * @param {String} greeting A positive greeting.
   * @return {String} The full greeting.
   */
  sayHello(greeting ='Hello World!') {
    return '<%= compName %> says, ' + greeting;
  },

  behaviors: []
});

export default <%= compClassName %>;
