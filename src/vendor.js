import('!!../my-loader/src/index!css-loader!./index.css').then(res => {
    console.log(res.default[0][1]);
})