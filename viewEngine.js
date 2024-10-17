import path from 'path'

const viewEngine = (app) => {
    app.set('view engine', 'ejs')
    app.set("views",path.join('./src', 'views'))
}
export default viewEngine