import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Public from './components/Public'
import AuthLayout from './features/auth/AuthLayout'
import Login from './features/auth/Login'
import Register from './features/user/Register'
import PersistLogin from './features/auth/PersistLogin'
import RequiredAuth from './features/auth/RequiredAuth'
import { ROLES } from './config/roles'
import PreFetch from './features/auth/PreFetch'
import DashLayout from './components/DashLayout'
import TodosList from './features/todo/TodosList'
import SingleTodo from './features/todo/SingleTodo'
import NewTodo from './features/todo/NewTodo'
import EditTodo from './features/todo/EditTodo'
import VerifyEmail from './features/user/VerifyEmail'


function App () {

    return (
        <Routes>
            <Route path="/" element={<Layout />}> 
                {/* public route */}
                <Route index element={<Public />} />

                {/* auth route */}
                <Route element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='verify-email' element={<VerifyEmail />}/>
                </Route>

                {/* private route */}
                <Route element={<PersistLogin />}>
                    <Route element={<RequiredAuth allowedRoles={[...Object.values(ROLES)]}/>}>
                        <Route element={<PreFetch/>}>
                            <Route path='user' element={<DashLayout />}>
                                <Route index element={<TodosList />}/>
                                <Route path=':id' element={<SingleTodo />} /> 
                                <Route path=':id/edit' element={<EditTodo />} />
                                
                                <Route path='newtodo' element={<NewTodo />} />

                                {/* admin route */}
                                <Route element={<RequiredAuth allowedRoles={[ROLES.Admin]}/>}>
                                    <Route path='admin'>
                                        
                                    </Route>
                                </Route>
                            </Route>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
