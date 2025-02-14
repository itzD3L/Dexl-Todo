import { store } from "../../app/store";
//import { userApiSlice } from "../user/userApiSlice";
import { todoApiSlice } from "../todo/todoApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router";


const PreFetch = () => {
    useEffect(() => {
        //store.dispatch(userApiSlice.util.prefetch('getUser', 'user'));
        store.dispatch(todoApiSlice.util.prefetch('getTodos', 'todosList', { force: true}));
        
    }, [])
    return <Outlet />
}

export default PreFetch
