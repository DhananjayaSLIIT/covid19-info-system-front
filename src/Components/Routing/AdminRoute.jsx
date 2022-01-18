import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({component:Component, ...rest}) =>{
    return(
        <Route
            {...rest}
            render = {(props)=>
                localStorage.getItem("authToken") && localStorage.getItem("privilege") === "ADMIN" ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}
export default AdminRoute;
