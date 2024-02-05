import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

//CSS 
import "./SignUp.css"

//Antd-Framework
import { ConfigProvider,notification } from 'antd'

const SignUp=()=>
{
    const [formdata,Setformdata]=useState({sid:'',name:'',email:'',password:'',confirmpassword:'',phone:'',location:''})
    const [Ack,SetAck]=useState(false)
    const [Errmsg,SetErr]=useState({email:'',password:'',confirmpassword:'',name:'',phone:'',location:''})
    const [api, contextHolder] = notification.useNotification();

    const navigate=useNavigate();

    const openNotification = (message) => {
        {
          message.includes("registered")
            ? api.warning({
                message: message,
                placement: "topRight",
                duration: 2,
                style: {
                  background: "#EED202	",
                },
              })
            : api.success({
                message: message,
                placement: "topRight",
                duration: 2,
                style: {
                  background: "#5cb85c	",
                },
              });
        }
      };
      
    const ValidateForm=()=>
    {
        if(formdata.email==="" || formdata.email===null)
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

        if(formdata.password==="" || formdata.password===null)
        {
            SetErr((prev)=>{return({...prev,password:'Enter your password'})})
            SetAck(true)
        }
        else if(formdata.password.length<6)
        {
            SetErr((prev)=>{return({...prev,password:'Password must contain minimum of 6 length'})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,password:''})})
            SetAck(false)
        }

        if(formdata.confirmpassword==='' || formdata.confirmpassword===null)
        {
            SetErr((prev)=>{return({...prev,confirmpassword:'Enter your password'})})
            SetAck(true)
        }
        else if(formdata.confirmpassword!==formdata.password)
        {
            SetErr((prev)=>{return({...prev,confirmpassword:'Password doesnt match'})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,confirmpassword:''})})
            SetAck(false)
        }

        if(formdata.name==="" || formdata.name==null)
        {
            SetErr((prev)=>{return({...prev,name:"Enter your name"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,name:''})})
            SetAck(false)
        }

        if(formdata.phone==="" || formdata.phone==null)
        {
            SetErr((prev)=>{return({...prev,phone:"Enter your phone number"})})
            SetAck(true)
        }
        else if(formdata.phone.length!=10)
        {
            SetErr((prev)=>{return({...prev,phone:"Enter a valid phone number"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,phone:""})})
            SetAck(false)
        }

        if(formdata.location==='' || formdata.location===null)
        {
            SetErr((prev)=>{return({...prev,location:"Enter your location"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,location:""})})
            SetAck(false)
        }
        if(formdata.email!=="" && formdata.email!=null && formdata.password.length>=6 && formdata.confirmpassword!=='' && formdata.password===formdata.confirmpassword && formdata.password!=="" && formdata.password!==null && formdata.name!="" && formdata.name!=null && formdata.phone!="" && formdata.phone!=null && formdata.phone.length===10 && formdata.location!="" && formdata.location!=null)
        {
            CreateUser();
        }
    }

    const CreateUser=async()=>
    {
       try
       {
            if(formdata.email!='' && formdata.password!='' && formdata.name!='' && formdata.phone!='' && formdata.location!='')
            {
               const {data}=await axios.post("https://drive-easy-host-server.vercel.app/CreateUser",formdata);
               if(data.action)
               {
                   navigate("/")
               }
               else
               {
                    openNotification(data.status)
               }
            }

        }catch(error)
        {
            alert(error);
        }
    }

    const SignUpChange=(e)=>
    {
        const {name,value}=e.target;
        Setformdata({...formdata,[name]:value.trim()})
    }

    return(
        <div className="SignUp-Page">
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
            <div className='SignUp-Form'>
                <h1 className='SignUp-title'>Register</h1>
                <div className="SignUp-Form-div-1">
                    <div className="SignUp-Name-div">
                        <label className='SignUp-Name-label'  htmlFor="SignUp-Name">Name:</label>
                        <input type='text' name="name" onChange={SignUpChange} className='SignUp-Name' placeholder="Name" autoComplete='off' required/>
                        {Ack?(<span className='SignUp-Err'>{Errmsg.name}</span>):(<>{Errmsg.name}</>)}
                    </div>
                    <div className="SignUp-Email-div">
                        <label className='SignUp-Email-label' htmlFor="SignUp-Email">Email Address:</label>
                        <input type="email" name='email' onChange={SignUpChange} className='SignUp-Email' placeholder='Email Address' required autoComplete='off'/>
                        {Ack?(<span className='SignUp-Err'>{Errmsg.email}</span>):(<span className='SignUp-Err'>{Errmsg.email}</span>)}
                    </div>
                </div>   

                <div className="SignUp-Form-div-2">
                    <div className="SignUp-Password-div">
                        <label className='SignUp-Password-label' htmlFor="SignUp-Password">Password:</label>
                        <input type="password" name='password' onChange={SignUpChange} className='SignUp-Password'  placeholder='Password' autoComplete='off' required/>
                        {Ack?(<span className='SignUp-Err'>{Errmsg.password}</span>):(<span className='SignUp-Err'>{Errmsg.password}</span>)}
                    </div>

                    <div className="SignUp-ConfirmPassword-div">
                          <label className='SignUp-Password-label' htmlFor="SignUp-ConfirmPassword">Confirm Password:</label>
                          <input type="password" name='confirmpassword' onChange={SignUpChange} className='SignUp-ConfirmPassword'  placeholder='Confirm Password' autoComplete='off' required/>
                          {Ack?(<span className='SignUp-Err'>{Errmsg.confirmpassword}</span>):(<span className='SignUp-Err'>{Errmsg.confirmpassword}</span>)}
                    </div>

                </div>

                <div className="SignUp-Form-div-3">
                <div className="SignUp-Phone-div">
                    <label className='SignUp-Phone-label' htmlFor="SignUp-Phone">Contact No:</label>
                    <input type='number' name="phone" onChange={SignUpChange}  minLength={10}  maxLength={10} className='SignUp-Phone' placeholder='Phone Number' autoComplete='off' required/>
                    {Ack?(<span className='SignUp-Err'>{Errmsg.phone}</span>):(<span className='SignUp-Err'>{Errmsg.phone}</span>)}
                </div>
                
                <div className="SignUp-Location-div">
                    <label className='SignUp-Location-label' htmlFor="SignUp-Location">Location:</label>
                    <input type="text" name="location" onChange={SignUpChange} className='SignUp-Location' placeholder='City Location' autoComplete='off'  required/>
                    {Ack?(<span className='SignUp-Err'>{Errmsg.location}</span>):(<>{Errmsg.location}</>)}
                </div>
                    </div>

                <div className="SignUp-btns">
                    <button className='SignUp-Form-btn' onClick={ValidateForm}>Sign Up</button>
                    <p className='SignUp-Form-info'>Already have an account? <Link className='SignUp-Form-Login' to="/">Login</Link></p>
                    
                </div>
            </div> 
        </div>
    )
}

export default SignUp;