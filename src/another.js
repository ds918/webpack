// ================ file-loader
// import img from '/assets/img/cloud.jpg'
// const pic = new Image(250, 186)
// pic.src = img
// document.querySelector('#app').appendChild(pic)
// ================


// ================ css-loader
import style from '../assets/css/index.css'
console.log(style);
// ================


if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => {
        // document.querySelector('#app').removeChild(pic)
    })
}