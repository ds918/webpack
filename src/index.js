import '../index.html'
import style from './index.css'
import styles from './child.css'

setTimeout(() => {
    import(
        /* webpackPreload: true */
        /* webpackChunkName: "my-chunk-name" */
        './test')
    import(
        /* webpackChunkName: "my-chunk-name" */
        /* webpackPrefetch: true */
        /* webpackExports: ["name","action"] */
        `./add.js`).then((resizeBy) => {
            console.log(resizeBy.name());
        })
}, 3000);
require('./add?a')
console.log(import.meta.webpack);
setTimeout(() => {
    console.log(window.namer);
}, 4000);
















if (module.hot) {
    // module.hot.accept('./test', () => {
    // })
    module.hot.addStatusHandler(status => {
        // console.log(status);
    })

    module.hot.accept('./test', () => {
        // console.log('end');
    })
    // module.hot.accept('./child', () => {
    //     console.log(777);
    // })

}