// import { store } from "../../app/store";
//import { userApiSlice } from "../user/userApiSlice";
// import { todoApiSlice } from "../todo/todoApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router";
import { wsService } from '../../app/services/wsService'

const PreFetch = () => {

    useEffect(() => {
        wsService.connect();
        
        
        //store.dispatch(userApiSlice.util.prefetch('getUser', 'user'));
        // store.dispatch(todoApiSlice.util.prefetch('getTodos', 'todosList', { force: true}));
        
    }, []) // this should be removed because its unnecessary
    
    return <Outlet />
}

export default PreFetch
