'use strict';
/**
 * @module <%= compName %>
 */
import console from 'consoler';
import Hence from 'hence-component-framework';
import _each from 'lodash/collection/each';

/**
 * <%= compClassName %> Component
 * @constructor
 */
let <%= compClassName %> = Hence.Model({
  is: '<%= compName %>',
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {},

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  /**
   * Manipulate the state loaded in from the schema to be suited for the expecting UI element. Executed by the
   * ```renderState()``` function
   *
   * @private
   */
    _transformState(entry) {
    let result = {};
    // todo: process the entry into a usable result, combining or adjusting raw data into consumable properties for
    // the expectant UI component.
    // result.this = entry.that;
    return result;
  },

  behaviors: []
});

export default <%= compClassName %>;
