const userRouter = require('../Router/user')
const {notFound, errHandle} = require('../middlewares/errHandle')
const initRouter = (app) => {
    app.use('/api/user', userRouter)

    app.use(notFound)
    app.use(errHandle)
}


module.exports = initRouter