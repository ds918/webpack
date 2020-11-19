import _ from 'lodash'
import moment from 'moment'
import echarts from 'echarts'
let res = _.concat({ name: 1 }, { age: 3 })
console.log(res, moment().format('YYYY-MM-DD'),process.env.NODE_ENV);

if (module.hot) {
    module.hot.accept()
}