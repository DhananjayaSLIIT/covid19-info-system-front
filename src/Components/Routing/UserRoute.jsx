import { Redirect, Route } from 'react-router-dom';

const UserRoute = ({component:Component, ...rest}) =>{
    const privilege = localStorage.getItem("privilege");
    return(
        <Route
            {...rest}
            render = {(props)=>
                localStorage.getItem("authToken") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
}
export default UserRoute;
