import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";


export const AppRouter = () => {

    // const authStatus = 'not-authenticated'; // Authenticated
    // console.log( 'mi variable de entorno:', getEnvVariables().VITE_API_URL);

    const { status, checkAuthToken } = useAuthStore();

    useEffect(()=>{
        checkAuthToken();
    },[])

    if( status === 'checking' ){
        return <h3>Cargando...</h3>
    }

    return (
        <>
            <Routes>
                {
                    status === 'not-authenticated' ?
                    <>
                        <Route path={'/auth/*'} element={ <LoginPage /> } />
                        <Route path={'/*'} element={ <Navigate to={'/auth/login'} /> } />
                    </>
                    :
                    <>
                        <Route path={'/'} element={ <CalendarPage /> } />
                        <Route path={'/*'} element={ <Navigate to={'/'} /> } />
                    </>
                }
                    
            </Routes>

        </>
    )
}