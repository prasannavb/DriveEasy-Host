//React
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//CSS
import "./EditForm.css"

//Modules
import Loading from "../Loading/Loading";


const EditForm=(props)=>
{
    const {Updatepopup,Setpop}=props
    const user=useSelector((state)=>state.user)
    const [formdetails, Setform] = useState({
        sid: `${user.sid}`,
        car_no: props.data.car_no,
        img: props.data.img, 
        name: props.data.name,
        year: props.data.year,
        fuel: props.data.fuel,
        make:props.data.make,
        model: props.data.model,
        type:props.data.type,
        price: props.data.price,
        location: props.data.location,
        list_start: props.data.list_start,
        list_drop: props.data.list_drop,
    });  
    const [MinDate,SetMinDate]=useState()
    const [loading,Setloading]=useState(true)
    const [Errmsg,SetErrmsg]=useState({price:'',location:''})
    const [Ack,SetAck]=useState(false)
    
    const Navigate=useNavigate()

    const ValidateForm=()=>
    {
        if(formdetails.price==="" || formdetails.price===null)
        {
            SetErrmsg((prev)=>{return({...prev,price:"Enter the car price/Day"})})
            SetAck(true)
        }
        else
        {
            SetErrmsg((prev)=>{return({...prev,price:""})})
            SetAck(false)
        }
        if(formdetails.location==="" || formdetails.location==null)
        {
            SetErrmsg((prev)=>{return({...prev,location:"Location of car"})})
            SetAck(true)
        }
        else
        {
            SetErrmsg((prev)=>{return({...prev,location:""})})
            SetAck(false)
        }
        if(formdetails.price!="" && formdetails.price!=null && formdetails.location!="" && formdetails.location!=null)
        {
            CarFormSubmit()
        }
    }

    const CarFormSubmit=async()=>
    {
        await axios.put("https://drive-easy-host-server.vercel.app/EditCarDetails",formdetails)
        Updatepopup(); 
    }
    
     const CarDetails=(e)=>
    {
        const {name,value}=e.target;
        Setform({...formdetails,[name]:value.trim()})
    }

    const FindMinDate=()=>
    {
        let date=new Date().getDate()
        let month=new Date().getMonth()+1
        let year=new Date().getFullYear()
        let formattedMonth = month < 10 ? `0${month}` : month;
        let formattedDay = date < 10 ? `0${date}` : date;
        let day = `${year}-${formattedMonth}-${formattedDay}`;
        SetMinDate(day);
    }

    useEffect(()=>{
            FindMinDate()
    },[])


    useEffect(()=>{
        if(user.isAuth)
        {
            Setloading(false)
        }
        else
        {
            Navigate("/")
        }
    },[])

    const Back=()=>
    {
        Setpop(false)
    }
      
    if(loading)
    {
        return <Loading/>
    }

    return(
    <>
    <div className="EditCar-title-div">
        <h1 className="EditCar-title">Edit Car Details</h1>
    </div>
    <div className="EditCar">
        <div className="EditCar-Page">
            <div className="EditCar-Form">
                <div className="EditCar-div-1">
                    <div className="EditCar-div-Number">
                        <label className="EditCar-Carno-label" htmlFor="">Car Number:</label>
                        <input type="text" value={formdetails.car_no} className="EditCar-Carno"  name="car_no" onChange={CarDetails}  readOnly/>
                    </div>
                    <div className="EditCar-div-Name">
                        <label className="EditCar-Name-label" htmlFor="EditCar-Name">Name:</label>
                        <input type="text" value={formdetails.name} name="name" className="EditCar-Name" onChange={CarDetails} autoComplete="off" readOnly/>
                    </div>
                </div>

                <div className="EditCar-div-3">
                    <div className="EditCar-div-Fuel">
                        <label className="EditCar-Fuel-label"  htmlFor="EditCar-Fuel">Fuel:</label>
                        <input type="text" value={formdetails.fuel} name="fuel" className="EditCar-Fuel" onChange={CarDetails} readOnly/>
                    </div>

                    <div className="EditCar-div-Make">
                        <label className="EditCar-Make-label" htmlFor="EditCar-Make">Make:</label>
                        <input type="text" value={formdetails.make} name="make" className="EditCar-Make" onChange={CarDetails} readOnly/>
                    </div>
                    
                    <div className="EditCar-div-Model">
                        <label className="EditCar-Model-label" htmlFor="EditCar-Model">Model:</label>
                        <input type="text" value={formdetails.model} name="model" className="EditCar-Model" onChange={CarDetails} readOnly/>
                    </div>

                    <div className="EditCar-div-Type">
                        <label className="EditCar-Type-label" htmlFor="EditCar-Type">Type:</label>
                        <input type="text" value={formdetails.type} name="type" className="EditCar-Type" onChange={CarDetails} readOnly/>
                    </div>
                </div>

                <div className="EditCar-div-2">
                    <div className="EditCar-div-Year">
                        <label className="EditCar-Year-label" htmlFor="EditCar-Year">Year of Manufacture:</label>
                        <input type="number" value={formdetails.year} name="year" className="EditCar-Year" onChange={CarDetails} readOnly/>
                    </div>
                    <div className="EditCar-div-Price">
                        <label className="EditCar-Price-label" htmlFor="EditCar-Price">Price/Day:</label>
                        <input type="number" value={formdetails.price} name="price" onChange={CarDetails} className="EditCar-Price" placeholder="Price/Day" autoComplete="off" />
                        {Ack?(<span className="EditCar-Err">{Errmsg.price}</span>):(<span className="EditCar-Err">{Errmsg.price}</span>)}
                    </div>
                    <div className="EditCar-div-Location">
                        <label className="EditCar-Location-label" htmlFor="EditCar-Location">Location of Car:</label>
                        <input type="text" value={formdetails.location} name="location" onChange={CarDetails} className="EditCar-Location" placeholder="Car Location" autoComplete="off"/>
                        {Ack?(<span className="EditCar-Err">{Errmsg.location}</span>):(<span className="EditCar-Err">{Errmsg.location}</span>)}
                    </div>
                </div>

                <div className="EditCar-div-4">
                    <div className="EditCar-div-liststart">
                        <label className="EditCar-liststart-label" htmlFor="EditCar-liststart">List Start:</label>
                        <input type="date" value={formdetails.list_start} min={MinDate} name="list_start" className="EditCar-liststart"  onChange={CarDetails} />
                    </div>
                    <div className="EditCar-div-listdrop">
                        <label className="EditCar-listdrop-label" htmlFor="EditCar-listdrop">List Drop:</label>
                        <input type="date" value={formdetails.list_drop} min={MinDate} name="list_drop" className="EditCar-listdrop" onChange={CarDetails} />
                    </div>
                </div>

                <div className="EditCar-div-btns">
                    <button className="EditCar-Submit" onClick={ValidateForm}>Update</button> 
                    <button className="EditCar-Back" onClick={Back} >Back</button>
                </div>
            </div>
        </div>
    </div>
</>
)
}

export default EditForm;