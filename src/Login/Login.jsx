//Firebase 
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../config/firebase";

//React 
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

//Slice
import { SignInDetails } from "../Slice/userSlice";

//CSS
import "./Login.css"

//Module
import ForgotPassword from "../ForgotPassword/ForgotPassword";

//Antd-Framework
import { ConfigProvider,notification } from 'antd'

const Login=()=>
{
    const [formdata,Setformdata]=useState({email:'',password:''})
    const [Ack,SetAck]=useState(false)
    const [Errmsg,SetErr]=useState({email:'',password:''})
    const [PasswordReset,SetPasswordReset]=useState(false)
    const user=useSelector((state)=>state.user)
    const [api, contextHolder] = notification.useNotification();

    const dispatch=useDispatch();
    const Navigate=useNavigate()

    const openNotification = (message) => {
        api.warning(
            {
                message:message,
                placement:"topRight",
                duration:2,
                style: {
                    background:"#EED202	",
                }
            }
        )
    };
    
    const ValidateForm=()=>
    {
        if(formdata.email.trim()==="" || formdata.email===null)
        {
            SetErr((prev)=>{return({...prev,email:'Enter your email'})})
            SetAck(true)
        }
        else if(!formdata.email.includes("@gmail.com"))
        {
            SetErr((prev)=>{return({...prev,email:'Enter a valid email'})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,email:''})})
            SetAck(false)
        } 

        if(formdata.password.trim()==="" || formdata.password===null)
        {
            SetErr((prev)=>{return({...prev,password:'Enter your password'})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,password:''})})
            SetAck(false)
        }

        if(formdata.email!=="" && formdata.email!=null && formdata.email.includes("@gmail.com")  && formdata.password!=="" && formdata.password!==null)
        {
            LoginInDetails()
        }
    }

    const FetchUserDetails=async(sid)=>
    {
        const {data} = await axios.post("https://drive-easy-host-server.vercel.app/findUser",{sid});
        dispatch(SignInDetails(data))
        Navigate("/Dashboard")
    }

    const LoginInDetails=async()=>
    {
        try
        {
            const result=await signInWithEmailAndPassword(auth,formdata.email,formdata.password);
            FetchUserDetails(result.user.uid)
        }catch(error)
        {
            openNotification('Invalid Details')
        }
    }

    const LoginChange=(e)=>
    {
        const {name,value}=e.target;
        Setformdata({...formdata,[name]:value.trim()})
    }

    useEffect(()=>{
        if(user.isAuth)
        {
            Navigate('/Dashboard')
        }
    },[])

    return(<>
       {PasswordReset?(<>
            <ForgotPassword SetPasswordReset={SetPasswordReset}/>
            </>):(
                <>
                <div className="LogIn-Page">
                    <div className="LogIn-Form">
                        <h1 className="LogIn-title">Login Page</h1>
                        <label htmlFor="Login-Email" className="Login-Email-label">Email Address:</label>
                        <input type="email" name='email' onChange={LoginChange} className="Login-Email" placeholder="Email Address" autoComplete="off" required/>
                        {Ack?(<span className="Login-Err">{Errmsg.email}</span>):(<span className="Login-Err">{Errmsg.email}</span>)}
                
                        <label htmlFor="Login-Password" className="Login-Password-label" >Password:</label>
                        <input type="password" name='password' onChange={LoginChange} className="Login-Password" placeholder="Password" autoComplete="off"  aria-required/>
                        {Ack?(<span className="Login-Err">{Errmsg.password}</span>):(<>{Errmsg.password}</>)}
                
                        <div className="Login-Form-Forgot">
                             <p className="Login-Form-ForgotPassword"   onClick={()=>{SetPasswordReset(true)}}>Forgot Password?</p>
                         </div>
    
                        <div className="Login-btns">
                            <button className="Login-Submitbtn" onClick={ValidateForm}>Login</button>
                        </div>
                
                        <div className="Login-Form-SignUp-div">
                            <p className="Login-Form-info">Doesn't have an account yet?<Link className="Login-Form-SignUp" to="/SignUp">SignUp</Link></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    <ConfigProvider 
      theme={{
          token: {
            colorText:"white",
            colorSuccess:"white",
            colorError:"white"
          },
          components: {Notification: {zIndexPopup:99999	  },}
        }}>
        {contextHolder}
    </ConfigProvider>
</>
)
}

export default Login;