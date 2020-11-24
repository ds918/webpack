import '../assets/index.html'
import styles from '../assets/css/child.css'


import(
    /* webpackPreload: true */
    // /* webpackChunkName: "my-chunk-name" */
    './test')
import(
    // /* webpackChunkName: "my-chunk-name" */
    /* webpackPrefetch: true */
    /* webpackExports: ["name","action"] */
    `./add.js`)

if (module.hot) {
    module.hot.accept()
}














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