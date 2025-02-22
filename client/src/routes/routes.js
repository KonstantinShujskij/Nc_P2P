import notAuthRoutes from './notAuth.routes'
import authRoutes from './auth.routes'


export const useRoutes = (isAuth) => {
    if(!isAuth) { return notAuthRoutes }

    return authRoutes
}