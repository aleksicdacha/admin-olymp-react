import {Route, Routes} from "react-router-dom";
import DashboardComponent from "../../../components/Dashboard/Dashboard";
import EstatesComponent from "../../../components/Estates/Estates";
import * as React from "react";

const RoutesComponent = () => {
    return (
        <Routes>
            <Route path="/" element={ <DashboardComponent />} />
            <Route path="/dashboard" element={ <DashboardComponent />} />
            <Route path="/estates" element={ <EstatesComponent />} />
        </Routes>
    );

};

export default RoutesComponent;