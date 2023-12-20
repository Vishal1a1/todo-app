import { BrowserRouter, Route, Routes, useNavigate, useParams, Link } from 'react-router-dom'
import './TodoApp.css'
import React, { useState } from "react"
import { retrieveHelloWorldBean, retrieveHelloWorldPathVriable } from './HelloworldApi'

export default function TodoApp(){
    return (
        <div className="TodoApp">
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <LoginComponent /> }/>
                    <Route path='/login' element={ <LoginComponent /> }/>
                    <Route path='/welcome/:username' element={ <WelcomeComponent />}/>
                    <Route path='*' element={ <ErrorComponent />}/>
                    <Route path='/listTodo' element={ <ListTodosComponent/>}/>
                </Routes>
            </BrowserRouter>
           
        </div>
    )
}

function LoginComponent(){

    const [username, setusername] = useState('in28minutes')

    const [password, setPassword] = useState('')

    const [showSuccessMessage, setshowSuccessMessage] = useState(false)

    const [showErrorMessage, setshowErrorMessage] = useState(false)

    const navigate = useNavigate();

    function handleusernameChange(event) {
        // console.log(event.target.value);
        setusername(event.target.value);
    }

    function handlePasswordChange(event) {
        // console.log(event.target.value);
        setPassword(event.target.value);
    }

    function handleSubmit() {
        if (password==='abc123'){
            console.log('success')
            setshowSuccessMessage(true);
            setshowErrorMessage(false);
            navigate(`/welcome/${username}`); //use tilt(`) instead of single or double quotes
        }
        else{
            console.log('error');
            setshowErrorMessage(true);
            setshowSuccessMessage(false);
            navigate('/login');
        }
    }

    // true && Ranga -> Ranga
    // false && Ranga -> false

    // function SuccessMessageComponent(){
    //     if(showSuccessMessage){
    //         return  <div className="successMessage">Authenticated Successfully</div>
    //     }
    //     return null;
    // }

    // function ErrorMessageComponent(){
    //     if(showErrorMessage){
    //         return 
    //     }
    //     return null;
    // }

    return (
        <div className="Login">
            {/* <SuccessMessageComponent />
            <ErrorMessageComponent /> */}
            <h1>Time to Login!</h1>
            {showSuccessMessage && <div className="successMessage">Authenticated Successfully</div>}
            {showErrorMessage && <div className="errorMessage">Authentication Failed,Please check your credentials.</div>}
            <div className="LoginForm">
                <div>
                    <labe>User Name</labe>
                    <input type="text" name="username" value={username}  onChange={handleusernameChange}/>
                </div>
                <div>
                    <labe>Password</labe>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

function WelcomeComponent(){

    const {username} = useParams();

    const [message,setMessage] = useState(null);

    console.log(username)

    function callHelloWolrdApi(){
        console.log("called");
        // retrieveHelloWorldBean()
        retrieveHelloWorldPathVriable(username)
        .then( (response) => successfulResponse(response))
        .catch( (error) => errorResponse(error))
        .finally( () => console.log('cleanup'))
    }

    function successfulResponse(response){
        console.log(response);
        setMessage(response.data.output);
    }

    function errorResponse(error){
        console.log(error);
    }
    
    
        return (
            <div className="WelcomeComponent">
                <h1>Welcome to {username}</h1>
                <div>
                    {/* Your todos. <a href='/listTodo'>Click here to know more</a> */}
                    Your todos. <Link to="/listTodo">Click here to know more</Link>  
                    {/* 'Link' is used in place of 'a' to implement single page development rather full page load */}
                    <div>
                        <button className="btn btn-success m-5" onClick={callHelloWolrdApi}>Click here to call Hello world</button>
                    </div>
                   <div className='text-info'>{message}</div>
                </div>
            </div>
        )

}

function ErrorComponent(){
    return(
        <div className="ErrorComponent">
            <h1>We are working really hard!</h1>
            <div>
                Apologies for the 404.Reach out to our team at ABC-DEF-GHIJ.
            </div>
        </div>
    )
}

function ListTodosComponent(){

    const today = new Date();

    const targetDate = new Date(today.getFullYear()+12, today.getMonth()+5, today.getDay());

    const todos = [ 
                    {id:1, description: 'Learn AWS', done:false, targetDate:targetDate},
                    {id:2, description: 'Learn F.S.A Development', done:false, targetDate:targetDate},
                    {id:3, description: 'Learn DevOps', done:false, targetDate:targetDate},
                    {id:4, description: 'Learn Cloud', done:false, targetDate:targetDate}
    ];

    return(
        <div className="ListTodosComponent">
            <h1>Things You want To Do!</h1>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Description</td>
                            <td>Is done</td>
                            <td>TargetDate</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.id}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toDateString()}</td>
                                    </tr>
                                )
                            )
                        }
                        <tr>
                            <td>{todos.id}</td>
                            <td>{todos.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}