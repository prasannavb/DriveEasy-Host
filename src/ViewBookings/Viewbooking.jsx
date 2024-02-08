//React
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Module
import CheckBooking from "./CheckBooking";
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Loading from "../Loading/Loading";

//CSS
import "./ViewBooking.css"

//Antd-Framework
import {EnvironmentOutlined,CarOutlined,CalendarFilled,StarFilled} from '@ant-design/icons'
import { Empty,Modal,notification,ConfigProvider  } from "antd";

//CustomSVGIcons
import { FuelIcon,GearIcon } from "../SVGIcons/SvgComponent";

//Images
import ViewBookingImg from '../Images/ViewBookingImg.jpg'

const ViewBooking=()=>
{
    const user=useSelector((state)=>state.user)
    const [loading,SetLoading]=useState(true)
    const [ActiveCars,SetActiveCars] =useState([])
    const [SingleCar,SetSingleCar]=useState({bookingDetails:''})
    const [Active,SetActive]=useState(true)
    const [Upcoming,SetUpcoming]=useState(false)
    const [CancelCar,SetCancelCar]=useState(false)
    const [api, contextHolder] = notification.useNotification();

    const Navigate=useNavigate()

    const openNotification = (message) => {
        message.includes("Customer")
          ? api.success({
              message: message,
              placement: "topRight",
              duration: 3,
              style: {
                background: "#5cb85c	",
              },
            })
          : api.error({
              message: message,
              placement: "topRight",
              duration: 3,
              style: {
                background: "rgb(223, 67, 67)",
              },
            });
      };
      

    const getActiveBookings=async(sid)=>
    {
        const {data}=await axios.post("https://drive-easy-host-server.vercel.app/ActiveBookings",{sid})
        const newdata=await CheckBooking(data,"Active")
        SetActiveCars((prev)=>newdata)
        SetUpcoming(false)
        SetActive(true)
        SetLoading(false)
    }

    const getPastBookings=async(sid)=>
    {
        const {data}=await axios.post("https://drive-easy-host-server.vercel.app/PastBookings",{sid})
        SetActiveCars((prev)=>data)
        SetUpcoming(false)
        SetActive(false)
    }

    const getUpcomingBookings=async(sid)=>
    {
        const {data}=await axios.post("https://drive-easy-host-server.vercel.app/ActiveBookings",{sid})
        const newdata=await CheckBooking(data,"Upcoming")
        SetActiveCars((prev)=>newdata)
        SetUpcoming(true)
        SetActive(false)

    }

    useEffect(()=>{
        if(user.isAuth)
        {
            getActiveBookings(user.sid);
        }
        else
        {
            Navigate("/")
        }
    },[])

    const CancelTrip=async()=>
    {
        const {data}=await axios.post('https://drive-easy-host-server.vercel.app/CancelTrip',SingleCar.bookingDetails)
        if(data.action)
        {
            openNotification(data.status)
            getUpcomingBookings(user.sid)
        }
        else
        {
            openNotification(data.status)
        }
        SetCancelCar(false)

    }

    if(loading)
    {
        return <Loading/>
    }

    return(
    <>
       <ConfigProvider 
            theme={{
                token: {
                colorText:"white",
                colorSuccess:"white",
                colorError:"white"
                },
            }}>
            {contextHolder}
        </ConfigProvider>
                       
        <Modal centered  open={CancelCar} okText="Cancel the trip" cancelText="Back to Safety" onOk={CancelTrip} onCancel={()=>{SetCancelCar(false)}} okButtonProps={{style: {color: 'white',backgroundColor: '#E74C3C',},}}  cancelButtonProps={{style: { color: 'white', backgroundColor: '#333', }, }}>
                <div className="ViewBookings-CancelModal">
                    <img src={ViewBookingImg} alt="BackToSafety" />
                    <h2>Are you sure you're ready?</h2>
                    <p>Repeated cancellations may result in a loss of trust from our customers and could discourage future bookings.</p>
                </div>
        </Modal>

        <div className="ViewBookings">
            <Navbar/>
            <div className="ViewBookings-Page">
                <div className="ViewBookings-Topbtns">
                    <button className="ViewBookings-Topbtns-Active" onClick={()=>{getActiveBookings(user.sid)}}>Active</button>
                    <button className="ViewBookings-Topbtns-Past" onClick={()=>getPastBookings(user.sid)}>Past</button>
                    <button className="ViewBookings-Topbtns-Upcoming" onClick={()=>{getUpcomingBookings(user.sid)}}>Upcoming</button>
                </div>

                {ActiveCars.length?(<>
                    {ActiveCars.map((data)=>{
                        return(
                    <div className="ViewBookings-Card" key={data._id}>
                        <div className="ViewBookings-Verify" style={Active ? { backgroundColor: '#27AE60' } : (Upcoming ? { backgroundColor: '#007bff' } : { backgroundColor: '#E74C3C' })}>
                           {Active? (<b style={{color:'white' }}><StarFilled style={{fontSize:'20px',marginRight:'2px'}}/>Active</b>) : ('')}
                           {Upcoming? (<b style={{color:'white' }}><StarFilled style={{fontSize:'20px',marginRight:'2px'}}/> Upcoming</b>) : ('')}
                           {(Upcoming || Active)?(''): (<b style={{color:'white' }}><StarFilled style={{fontSize:'20px',marginRight:'2px'}}/> Past</b>)}
                       </div>
                    <div className="ViewBookings-Details">
                         <div className="ViewBookings-Img">
                            <img className="ViewBookings-CarImg" src={data.cardetails.img} alt="CarImage" />
                         </div>
                         <div className="ViewBookings-CarDetails">
                             <div className="ViewBookings-CarDetails-Name">
                                <h2>{data.cardetails.make} {data.cardetails.name} {data.cardetails.year}</h2>
                             </div>
                             
                             <div className="ViewBookings-CarDetails-Type">
                                <b><FuelIcon width='22px' height='22px' style={{ marginRight: '5px' }} /> Fuel: <span>{data.cardetails.fuel}</span></b>
                                <b><CarOutlined style={{fontSize:'22px',marginRight:'4%'}} /> Model: <span>{data.cardetails.model}</span></b>
                                <b><GearIcon width='20px' height='20px' style={{ marginRight: '5px' }}/> Type: <span>{data.cardetails.type}</span></b>
                             </div>
                             <div className="ViewBookings-CarDetails-Dates">
                                <b><CalendarFilled  style={{fontSize:'15px',marginRight:'2%'}}/> Start date: <span>{data.bookingDetails.start_date.split('-')[2]}-{data.bookingDetails.start_date.split('-')[1]}-{data.bookingDetails.start_date.split('-')[0]}</span> </b>
                                <b><CalendarFilled  style={{fontSize:'15px',marginRight:'2%'}}/> Drop date: <span>{data.bookingDetails.drop_date.split('-')[2]}-{data.bookingDetails.drop_date.split('-')[1]}-{data.bookingDetails.drop_date.split('-')[0]}</span> </b> 
                             </div>
                             <div className="ViewBookings-CarDetails-Primary">
                                <b>Vehicle Number: <span>{data.bookingDetails.car_no}</span></b>
                                <b><EnvironmentOutlined style={{fontSize:'20px',marginRight:'2%'}}/> Location: <span>{data.cardetails.location}</span> </b>
                                <b>Amount:<span> &#x20B9;{data.bookingDetails.amount}</span></b>
                             </div>
                             <div className="ViewBookings-UserDetails-user">
                                <b>User Details:</b>
                             </div>
                             <div className="ViewBookings-CarDetails-Secondary">
                                 <div className="ViewBookings-CarDetails-Price">
                                    <b>Name:<span>{data.userdetails.name}</span></b>
                                 </div>
                                 <div className="ViewBookings-CarDetails-Price">
                                    <b>Contact No:<span>{data.userdetails.phone}</span></b>
                                 </div>
                                    {Upcoming?(<button className="ViewBookings-CarDetails-Cancelbtn" onClick={()=>{SetSingleCar(data),SetCancelCar(true)}}>Cancel</button>):(<></>)}
                             </div>
                    </div>
                </div>
            </div>
)
})}
</>):(
    <div className="ViewBookings-Empty">
        <Empty/>
        <ul>
            <li> <p>No  cars available at the moment.</p></li>
            <li> <p>Try improving the car specs.</p></li>
            <li> <p>Try reducing the price.</p></li>
        </ul>
    </div>
)}
    </div>
</div>
<Footer/>
</>
)    
}

export default ViewBooking;