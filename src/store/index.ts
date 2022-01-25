import { createStore, createLogger } from "vuex";
import Presistent from "./plugins/persistent";
const debug = process.env.NODE_ENV !== 'production'

const files = import.meta.globEager('./modules/*.ts')

// 遍历文件
let modules = {}

Object.keys(files).forEach((item) => {
    const module = files[item].default
    const moduleName = item.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2')
    modules[moduleName] = module
})

const presistent = Presistent({
    key: 'vuex', modules, modulesKeys: {
        local: Object.keys(modules),
        session: []
    }
})


export default createStore({
    modules: {
        ...modules
    },
    strict: debug,
    plugins: debug ? [createLogger(), presistent] : [presistent]
})

