import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/header";
import Foot from "./Components/footer";
export default function Layout(){
    return(
       <>
         <Header/>
         <Outlet/>
         <Foot/>
       </>
    )
}