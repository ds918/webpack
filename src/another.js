// import '../assets/img/30422.jpg'
import '../assets/css/index.css'
import '../assets/css/add.css'
import img from '../assets/img/cloud.jpg'

const pic = new Image(250, 186)
pic.src = img
document.querySelector('#app').appendChild(pic)

export function calc(a, b) {
    return a + b
}

if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => {
        document.querySelector('#app').removeChild(pic)
    })
}