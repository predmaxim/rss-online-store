import Navigo from 'navigo';
console.log('Import Routing');

// interface Navigo {
//   on(path: string, f: Function, hooks?: RouteHooks): Navigo;
//   on(f: Function, hooks?: RouteHooks): Navigo;
//   on(map: Object, hooks?: RouteHooks): Navigo;
// }

const router = new Navigo('/');

router.on({
  '/': () => {
    console.log('Route to index - home');
    router.navigate('/home');
    // router.updatePageLinks();
  },
  '/home': ({ hashString }: { [key: string]: string | number }): void => {
    console.log('Route to home');
    console.log(hashString);
    // router.navigate('/home');
  },
  '/shop': ({ data, queryString }: { [key: string]: string | number }): void => {
    console.log(data);
    console.log(queryString);
    console.log('Route to shop');
    router.navigate('/shop');
  },
  '/cart.html': () => {
    console.log('Route to cart');
  },
  '/product.html': ({ data, queryString }: { [key: string]: string | number }): void => {
    console.log(data);
    console.log(queryString);
  },
  '/404': () => {
    console.log('Route to 404');
  },
});

router.notFound(() => {
  console.log('Route to 404');
  // router.navigate('/404');
});
router.resolve();
router.navigate('shop');
