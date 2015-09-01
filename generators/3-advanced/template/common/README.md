# Hence.io Component Framework
## <%= compName %>

>

<%= compDescription %>

## Using this component

Add this component to your polymer project with:

    <link rel="import" href="bower_components/<%= compName %>/<%= compName %>.html" >

# Development

All development takes place leveraging the files in the /src & /test folders.

## Dependencies

Element dependencies are managed via NPM & [Bower](http://bower.io/). You must have bower installed first:

    npm install -g bower

Then, go ahead and conveniently install the element's dependencies:

    npm run install-deps

## Available Gulp Commands

```$ gulp```
Will compile assets, serve your web component with live reload, transpile es6, and lint your js/scss all while watching your src files

```$ gulp build```
Will compile your component for consumption, exporting it to a /dist folder

```$ gulp kss:build```
Will generate your components style guide into the /dist folder

```gulp kss```
Will generate your components style guide and render it for you to review

```$ gulp test```
Will execute the wct test tool to perform selenium tests on your web component

```$ gulp karma```
Will execute es6 unit testing on your web component's script files

```$ gulp karma:watch```
Will execute the karma tests and set a watcher on the component and test script files

### Inspired By
[https://github.com/alexweber/es6-jspm-gulp-boilerplate](https://github.com/alexweber/es6-jspm-gulp-boilerplate)
