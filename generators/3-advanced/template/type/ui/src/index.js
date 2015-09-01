'use strict';

import <%= compClassName %> from './<%= compName %>';
import docReady from 'doc-ready';

// Ensure we're waiting for the document to actually be loaded before interacting with it.
docReady(()=> {
  // Location to bind preview components too. Use this to ensure the style guide will display these too.
  let componentPreviewBox = document.getElementById('component-previews');

  // Spawn various states of the component to preview them side by side
  <%= compClassName %>.appendElementTo({}, componentPreviewBox);
});
