import userRoutes from "./userRoutes"
import staffRoutes from "./staffRoutes"
import studentRoutes from "./studentRoutes"
import phongRoutes from "./phongRoutes"

const appRoutes = (app) => {
    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/staff', staffRoutes)
    app.use('/api/v1/student', studentRoutes)
    app.use('/api/v1/room', phongRoutes)
}

export default appRoutes