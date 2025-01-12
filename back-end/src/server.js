/* eslint-disable no-console */
import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cookieParser from 'cookie-parser'

const START_SERVER = () => {
    const app = express()

    // Fix Cache from disk của ExpressJS
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    })

    app.use(cookieParser()) // Cấu hình Cookie Parser

    app.use(cors(corsOptions)) // Enable All CORS Requests

    app.use(express.json()) // Enable req.body json data

    app.use('/v1', APIs_V1) //use APIs V1

    app.use(errorHandlingMiddleware)

    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello ${env.AUTHOR}, Back-end Server is running successfully at Host: ${ env.APP_HOST } and Port: ${ env.APP_PORT }/`)
    })

    exitHook(() => {
        console.log('4. Server is shutting down...')
        CLOSE_DB() // Chờ cho đến khi quá trình ngắt kết nối hoàn tất
        console.log('5. Disconnected from MongoDB Cloud Atlas')
    })
}

// Chỉ khi kết nối tới Database thành công thì mới Start Server Back-end lên.
// Immediately-invoked / Anonymus Async Function (IIFE)
(async() => {
    try {
        console.log('1. Connecting to MongoDB Cloud Atlas...')
        await CONNECT_DB()
        console.log('2. Connected to MongoDB Cloud Atlas!')

        //Khởi động server back-end sau khi connect database thành công
        START_SERVER()
    } catch (error) {
        console.log(error)
        process.exit(0)
    }
})()

