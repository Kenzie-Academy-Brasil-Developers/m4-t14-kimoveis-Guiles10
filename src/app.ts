import 'express-async-errors'
import express, { Application } from 'express'
import { HandleErrors } from './errors'
import { userRoutes } from './routes/user.route'
import { loginRoutes } from './routes/login.route'
import { categoriesRoutes } from './routes/categories.route'
import { realEstateRoutes } from './routes/realEstate.route'
import { scheduleRoutes } from './routes/schedule.route'


const app: Application = express()
app.use(express.json())

app.use('/users', userRoutes)

app.use('/login', loginRoutes)

app.use('/categories', categoriesRoutes)

app.use('/realEstate', realEstateRoutes)

app.use('/schedules', scheduleRoutes)


app.use(HandleErrors)

export default app