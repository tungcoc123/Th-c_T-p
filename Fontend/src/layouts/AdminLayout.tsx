import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <div className="d-flex">
            
           
            
            <div className="container py-3">
                <Outlet />
            </div>
        </div>
    );
}
