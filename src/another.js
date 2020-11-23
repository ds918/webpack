import vue from 'vue'
export function calc(a, b) {
    return a + b
}

if (module.hot) {
    module.hot.accept()
}