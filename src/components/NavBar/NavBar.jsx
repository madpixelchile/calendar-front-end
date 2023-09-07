import { useAuthStore } from "../../hooks"

export const NavBar = () => {

    const { startLogout } = useAuthStore();

    return (
        <>
            <nav className="navbar navbar-dark bg-dark mb-4 px-4">
                <span style={{color: 'white'}}>
                    <i className="fas fa-calendar-alt" ></i>
                    &nbsp;
                    Juan
                </span>
                <button 
                    className="btn btn-outline-danger"
                    onClick={()=> startLogout()}
                >
                    <i className="fas fa-sign-out-alt" ></i>
                    <span>Salir</span>
                </button>
            </nav>
        </>
    )
}