// ================ file-loader
// import img from '/assets/img/cloud.jpg'
// const pic = new Image(250, 186)
// pic.src = img
// document.querySelector('#app').appendChild(pic)
// ================


// ================ css-loader
// import 'animate.css/animate.css';
// import 'normalize.css/normalize.css';
import modulecss from '../assets/css/child.module.css'
// import '../assets/css/index.css'
console.log(modulecss)
document.querySelector('#app').className = modulecss.firstParagraph
// ================


if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => {
        // document.querySelector('#app').removeChild(pic)
    })
}