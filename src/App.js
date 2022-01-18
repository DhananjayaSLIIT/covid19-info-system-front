import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/** Protect routes */
import UserRoute from './Components/Routing/UserRoute';
import AdminRoute from "./Components/Routing/AdminRoute";

/** Routes */
import UserLogin from './Components/UserFunction/UserLogin.jsx';
import AdminAddUsers from "./Components/Admin/AdminAddUsers";
import UserHome from "./Components/Home/UserHome";
import GetAllUsers from "./Components/Admin/GetAllUsers";
import AdminUpdateUser from "./Components/Admin/AdminUpdateUser";
import DistrictManagement from "./Components/District/DistrictManagement";
import DivisionManagement from "./Components/Division/DivisionManagement";
import DivisionByDistrictID from "./Components/Division/DivisionByDistrictID";
import InformationByDivision from "./Components/Information/InformationByDivision";
import CenterManagement from "./Components/Center/CenterManagement";
import GetCentersByDivision from "./Components/Center/GetCentersByDivision";
import GetAllPrograms from "./Components/Program/GetAllPrograms";
import ApplicationManagement from "./Components/AddAppliation/ApplicationManagement";
import ChangeState from "./Components/Program/ChangeState";
import ForgetPassEmailType from './Components/UserFunction/ForgotPasswordEmail';
import ResetPassword from "./Components/UserFunction/ResetPassword";

const App = () => {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path="/login" component={UserLogin}/>
                    <UserRoute exact path="/" component={UserHome}/>
                    <Route exact path="/forgot-password" component={ForgetPassEmailType}/>
                    <Route exact path="/reset-password/:id" component={ResetPassword}/>
                    <AdminRoute exact path="/add-user" component={AdminAddUsers}/>
                    <AdminRoute exact path="/get-all-user" component={GetAllUsers}/>
                    <AdminRoute exact path="/update-user/:id" component={AdminUpdateUser}/>
                    <UserRoute exact path="/district" component={DistrictManagement}/>
                    <UserRoute exact path="/division" component={DivisionManagement}/>
                    <UserRoute exact path="/division/:id/:code/:name" component={DivisionByDistrictID}/>
                    <UserRoute exact path="/info/:id/:code/:name" component={InformationByDivision}/>
                    <UserRoute exact path="/center" component={CenterManagement}/>
                    <UserRoute exact path="/center/:id/:code/:name" component={GetCentersByDivision}/>
                    <UserRoute exact path="/program/:id/:code/:address" component={GetAllPrograms}/>
                    <UserRoute exact path="/vaccination-status/:id" component={ChangeState}/>
                    <UserRoute exact path="/application/:id/:maxCount/:prgID" component={ApplicationManagement}/>
                </Switch>
            </div>
        </Router>

    );
}

export default App;
