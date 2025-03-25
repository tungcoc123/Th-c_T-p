import { Outlet } from "react-router-dom";

import {Header} from "../components/Header";
import { Banner } from "../components/Banner";
import { Footer } from "../components/Footer";
import { useEffect } from "react";
import { useProductCart } from "../hooks/useProductCart";


export  function ClientLayout() {
   
    const { getCartUser } = useProductCart();

    useEffect(() => {
      getCartUser();
    }, []);
    return (
        <>
            <Header />
            <Banner/>
            
            <div className="container">
                <Outlet/>
            </div>
            <Footer/>
        </>

    )
};
export  function ClientShop() {
    const { getCartUser } = useProductCart();

    useEffect(() => {
      getCartUser();
    }, []);
   
    return (
        <>
            <Header />
            
            
          
                <div><Outlet/></div>
           
            <Footer/>
        </>

    )
}
