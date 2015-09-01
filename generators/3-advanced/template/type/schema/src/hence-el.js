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
let <%= compClassName %> = Hence.Schema({
  is: '<%= compName %>',
  /********************************************************************************************************************
   * Initialization
   ********************************************************************************************************************/
  properties: {},

  /*********************************************************************************************************************
   * Element Behaviour
   ********************************************************************************************************************/

  /**
   * Determine the action and query passed in to handle the request and provide whatever state data is required along.
   * Executed by the ```render()``` function
   *
   * @private
   */
  _executeQuery(done) {
    let self = this;
    let {action,query} = self;
    let results = [];
    let err;

    switch (action) {
      case 'someAction':
        // do some api/ajax requests with the query requested

        // send back the final results to allow the consuming component to leverage it
        return done(err, results);
      default:
        return done(err, results);
    }
  },

  behaviors: []
});

export default <%= compClassName %>;
