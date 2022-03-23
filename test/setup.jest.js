// Because I wanted to take advantage of Nuxt's auto import of components
// we have to register all components before running tests to ensure
// that components can import each other without causing errors with missing
// component registration. The bones of the method that I used comes from here:
// https://github.com/nuxt/components/issues/58#issuecomment-1040693942

const path = require('path');
const glob = require('glob');
const Vue = require('vue');

const transformCompNames = (str) => {
  return str
    .split('/')
    .reduce((t, p) => t + p.charAt(0).toUpperCase() + p.slice(1));
};

glob.sync(path.join(__dirname, '../components/**/*.vue')).forEach((file) => {
  const name = transformCompNames(
    file.match(/components\/((?:.(?!components))+)\.vue$/)[1]
  );
  Vue.component(name, require(file).default);
});

global.Vue = Vue;
