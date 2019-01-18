import a3 from './chunks/a3.js';
// import a4 from './chunks/a4.js';

document.write('moduleB.js');

a3();
// a4();
document.querySelector('button').addEventListener('click', function() {
  getModule().then(a4 => {
    // a4.info()
    console.log(a4.add(2, 3))
  })
}, false);

async function getModule() {
  const module = await import('./chunks/a4.js');
  return await import('./chunks/a4.js');
}