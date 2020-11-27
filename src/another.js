// ================ file-loader
// import img from '/assets/img/cloud.jpg'
// const pic = new Image(250, 186)
// pic.src = img
// document.querySelector('#app').appendChild(pic)
// ================


// ================ css-loader
import style from '../assets/css/index.css'
// import styles from 'animate.css/animate.css'
// import modulecss from '../assets/css/child.module.css'
console.log(style);
// console.log(style, styles, modulecss);
// ================


if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => {
        // document.querySelector('#app').removeChild(pic)
    })
}