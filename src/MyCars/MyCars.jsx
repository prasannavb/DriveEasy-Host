//React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

//Module 
import EditForm from "../EditCar/EditForm";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";

//CSS
import './MyCars.css'

//Antd-Framework
import {EnvironmentOutlined,CarOutlined,CalendarFilled,StarFilled,LeftOutlined} from '@ant-design/icons'
import { Empty ,Modal ,ConfigProvider,notification,Avatar,Rate} from "antd";

//CustomSVGIcons
import { FuelIcon,GearIcon } from "../SVGIcons/SvgComponent";

const MyCars=()=>
{
    const user=useSelector((state)=>state.user)
    const [popup,Setpop]=useState(false)
    const [isdelete,Setdelete]=useState(false)
    const [singlecar,Setsinglecar]=useState({})
    const [Reviews,SetReviews]=useState(false)
    const [AllReviews,SetAllReviews]=useState([])
    const [ShowSingleReview,SetShowSingleReview]=useState(false)
    const [SingleReviewData,SetSingleReviewData]=useState({})
    const [loading,Setloading]=useState(true)
    const [isArray,SetArray]=useState(true)
    const [sellercarslist,Setsellercarlist]=useState([]);
    const [api, contextHolder] = notification.useNotification();

    const navigate=useNavigate()
    
    const openNotification = (message) => {
        message.includes('Car has been edited') || message.includes('Success') ? (
            api.success({
            message:message,
            placement:"topRight",
            duration:3,
            style: {
                background:"#5cb85c	",
            }
        }))
        :(
        api.error({
            message: message,
            placement:"topRight",
            duration:3,
            style: {
                background:"rgb(223, 67, 67)",
              }
        })
        )
    };

    const getCarDetails=async(sid)=>
    {
        const {data}=await axios.post("https://drive-easy-host-server.vercel.app/VerifiedCars",{sid})
        if(data.length>0)
        {
            SetArray(true)
            Setsellercarlist(data)
        }
        else
        {
            SetArray(false)
        }
        Setloading(false)
    }

    useEffect(()=>
    {
        if(user.isAuth)
        {
            getCarDetails(user.sid) 
        }
        else
        {
            navigate("/")
        }
    },[])

    const Updatepopup=async()=>
    {
        openNotification('Car has been edited')
        getCarDetails(user.sid)
        Setpop(false)
    }

    const Edit=async(cardata)=>
    {
        const {data}=await axios.put("https://drive-easy-host-server.vercel.app/EditCarDetails",cardata)
        if(data.action)
        {
            Setsinglecar((prev)=>{return({...prev,cardata})})
            Setpop(true)
        }
        else
        {
            openNotification(data.status)
        }
    }

    const Delete=async()=>
    {
        const {data} = await axios.delete("https://drive-easy-host-server.vercel.app/DeleteCarDetail", {
            data: { car_no: singlecar.car_no }
          });       
          if(data.action)
          {
            openNotification(data.status)
            getCarDetails(user.sid)
          }
          else
          {
            openNotification(data.status)
          }
          Setdelete(false)

    }

    const VerifiedCars=async(sid)=>
    {
        const {data}=await axios.post("https://drive-easy-host-server.vercel.app/VerifiedCars",{sid})
        if(data.length>0)
        {
            SetArray(true)
            Setsellercarlist(data)
        }
        else
        {
            SetArray(false)
        }
    }
    
    const UnVerifiedCars=async(sid)=>
    {
        const {data}=await axios.post("https://drive-easy-host-server.vercel.app/UnVerifiedCars",{sid})
        if(data.length>0)
        {
            SetArray(true)
            Setsellercarlist(data)
        }
        else
        {
            SetArray(false)
        }
    }

    const FindReviews=async(car_no)=>
    {
        const {data}=await axios.post('https://drive-easy-host-server.vercel.app/findReviews',{car_no})
        if(data.action)
        {
            SetAllReviews(data.reviews)
        }
        SetReviews(true)
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

            <Modal title="Remove my car" centered  open={isdelete} okText="Remove my car" cancelText="Close" onOk={Delete} onCancel={()=>{Setdelete(false)}} okButtonProps={{style:{color: 'white',backgroundColor: '#333',},}} cancelButtonProps={{style: {color: 'white',backgroundColor: '#333',},}}>
                <p>We appreciate you being part of our community! If you've decided to remove your car, thank you for sharing it with us. Feel free to come back anytime!</p>
            </Modal>
        
            <ConfigProvider
              theme={{
              token: {
                colorBgMask:"rgba(0, 0, 0, 0.80)"	,
                zIndexPopupBase:"9999",
                colorIcon:"white",
                colorIconHover:"white",
                padding:0,
                paddingLG:0,
                paddingContentHorizontalLG: 0,
                paddingMD:0,
                paddingSM:0,
                paddingXL:0,
              },
               }}
            >
                <Modal  footer={null} centered open={ShowSingleReview} okText={"Extend"}  cancelText={"Cancel"} onOk={()=>{SetShowSingleReview(false)}} onCancel={()=>{SetShowSingleReview(false)}}>
                    <div className="Bookings-SingleReview-Cards">
                        <h2>Ratings & Reviews</h2>
                        <div className="Bookings-SingleReview-Cards-div-1">
                            <Avatar
                                size={65}
                                alt='Profile'	
                                src="https://cdn-icons-png.freepik.com/256/10302/10302971.png"
                            />
                            <p>
                            {SingleReviewData.name}
                            </p>
                        </div>
                        <div className="Bookings-SingleReview-Cards-div-2">
                            <Rate  disabled value={parseFloat(SingleReviewData.car_rating)} allowHalf={true}/>    
                        </div>
                        <div className="Bookings-SingleReview-Cards-div-3">
                            <p>{SingleReviewData.car_review} </p>
                        </div> 
                    </div>
                </Modal>
            </ConfigProvider>

            {popup?(<>
               <EditForm data={singlecar} Updatepopup={Updatepopup} Setpop={Setpop} />
            </>):(
            <>
                <div className="MyCars-Page">
                    <Navbar/>
                        {Reviews?(<>
                           {AllReviews.length>0?(
                                <div className="MyCars-Review-layout">
                                    <div className="MyCars-Review-header">
                                        <button onClick={()=>{SetAllReviews([]),SetReviews(false)}}><LeftOutlined style={{fontSize:'20px'}}/>Back</button>
                                        <h2>Ratings & Reviews</h2>
                                    </div>
                                    <div className="MyCars-Review-CardDeck">
                                        {AllReviews.map((data)=>{
                                            return(
                                                <div key={data._id} className="MyCars-Reviews-Card" onClick={()=>{SetShowSingleReview(true),SetSingleReviewData(data)}}>
                                                    <div className="MyCars-Review-Cards-div-1">
                                                        <Avatar
                                                            size={65}
                                                            alt='Profile'	
                                                            src="https://cdn-icons-png.freepik.com/256/10302/10302971.png"
                                                        />
                                                        <p>{data.name}</p>
                                                    </div>
                                                    <div className="MyCars-Review-Cards-div-2">
                                                        <Rate  disabled value={parseFloat(data.car_rating)} allowHalf={true}/>    
                                                    </div>
                                                    <div className="MyCars-Review-Cards-div-3">
                                                        <p>{data.car_review.slice(0,110)} {data.car_review.length>110?("..."):("")} </p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                    </div>
       ):(
        <>
        <div className="MyCars-Review-Emptylayout">
            <div className="MyCars-Review-header">
                <button onClick={()=>{SetAllReviews([]),SetReviews(false)}}><LeftOutlined style={{fontSize:'20px'}}/>Back</button>
                <h2>Ratings & Reviews</h2>
            </div>
            <div className="MyCars-Review-Empty">
                <Empty/>
            </div>
        </div>
        </>
       )}
    </>):<>
    <div className='MyCars'>         
        {isArray?(
            <div className="MyCars-CardDeck"> 
                <div className="MyCars-Topbtn">
                    <button onClick={()=>{VerifiedCars(user.sid)}} id="MyCars-Verified">Verified Cars</button>
                    <button onClick={()=>{UnVerifiedCars(user.sid)}} id="MyCars-UnVerified">Not Verified Cars</button>
            </div>
            {sellercarslist.map((data)=>{
                return(
                <div className="MyCars-Card" key={data._id}>
                    <div className="MyCars-Verify" style={data.isverified ? {backgroundColor:'#27AE60'} : {backgroundColor:'#E74C3C'}}>
                        {data.isverified ? (<b style={{color:'white' }}><StarFilled style={{fontSize:'20px',marginRight:'2px'}}/> Verified</b>) : (
                            <b style={{ color: "white" }}> <StarFilled style={{fontSize:'20px',marginRight:'2px'}}/>Not verified</b>
                        )}
                </div>
                <div className="MyCars-Details">
                    <div className="MyCars-Img">
                        <img className="MyCars-CarImg" src={data.img} alt="CarImage" />
                    </div>
                    <div className="MyCars-CarDetails">
                    <div className="MyCars-CarDetails-Name">
                        <h2>{data.make} {data.name} {data.year}</h2>
                    </div>

                    <div className="MyCars-CarDetails-Type">
                       <b><FuelIcon width='22px' height='22px' style={{ marginRight: '5px' }} /> Fuel: <span>{data.fuel}</span></b>
                       <b><CarOutlined style={{fontSize:'22px',marginRight:'4%'}} /> Model: <span>{data.model}</span></b>
                       <b><GearIcon width='20px' height='20px' style={{ marginRight: '5px' }}/> Type: <span>{data.type}</span></b>
                    </div>

                    <div className="MyCars-CarDetails-Dates">
                       <b><CalendarFilled  style={{fontSize:'15px',marginRight:'2%'}}/>List Start: <span>{data.list_start.split('-')[2]}-{data.list_start.split('-')[1]}-{data.list_start.split('-')[0]}</span> </b>
                       <b><CalendarFilled  style={{fontSize:'15px',marginRight:'2%'}}/>List Drop:  <span>{data.list_drop.split('-')[2]}-{data.list_drop.split('-')[1]}-{data.list_drop.split('-')[0]}</span> </b> 
                    </div>

                    <div className="MyCars-CarDetails-Primary">
                       <b>Vehicle Number: <span>{data.car_no}</span></b>
                       <b><EnvironmentOutlined style={{fontSize:'20px',marginRight:'2%'}}/> Location: <span>{data.location}</span> </b>
                    </div>

                    <div className="MyCars-CarDetails-Secondary">
                        <div className="MyCars-CarDetails-Ratings">
                           <b><StarFilled style={{fontSize:'15px',marginRight:'2px'}}/>Ratings:  </b><span> {data.ratings}</span>
                        </div>
                        <div className="MyCars-CarDetails-Price">
                            <b>Price:<span> &#x20B9;{data.price}</span></b>
                        </div>
                    </div>
                    <div className="MyCars-CarDetails-btns">
                        {data.isverified?(<>
                            <button className="MyCars-CarDetails-Editbtn" onClick={()=>{Edit(data),Setsinglecar(data)}}>Edit</button>
                            <button className="MyCars-CarDetails-Deletebtn" onClick={()=>{Setdelete(true),Setsinglecar((data))}}>Delete</button>
                            <button className="MyCars-CarDetails-Ratingbtn" onClick={()=>{FindReviews(data.car_no)}}>Reviews</button>
                        </>):(<>
                           <button className="MyCars-CarDetails-Deletebtn" onClick={()=>{Setdelete(true),Setsinglecar((data))}}>Delete</button>
                        </>)}
                    </div>
                </div>
        </div>
 </div>)
})}
</div>):(
    <div className="MyCars-CardDeck"> 
        <div className="MyCars-Topbtn">
            <button onClick={()=>{VerifiedCars(user.sid)}} id="MyCars-Verified">Verified Cars</button>
            <button onClick={()=>{UnVerifiedCars(user.sid)}} id="MyCars-UnVerified">Not Verified Cars</button>
        </div>
        <div className="MyCars-Empty">
            <Empty/>
            <ul>
                <li> <p>No cars available at the moment.</p></li>
                <li>
                <p>Please add a car to continue.</p></li>
            </ul>
            <button className="MyCars-Empty-AddCar" onClick={()=>{navigate('/AddCar')}}>Add car</button>
        </div>
</div>
)}
</div>
</>
}
</div>
<Footer/>
</>
)}
</>
)
}

export default MyCars;