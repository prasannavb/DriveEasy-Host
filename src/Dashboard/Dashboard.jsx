//CSS
import './Dashboard.css'

//React
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


//Modules
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Loading from '../Loading/Loading'
import GraphCount from '../GraphCount'


//Antd-Framework
import {CheckSquareOutlined,CarOutlined,CodeSandboxOutlined,ArrowUpOutlined,BookOutlined,DollarCircleOutlined,StarFilled,DownloadOutlined} from '@ant-design/icons'
import { Empty } from 'antd';

//Chart
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; 


const Dashboard=()=>
{
  const user=useSelector((state)=>state.user)
  const [loading,Setloading]=useState(true)
  const [BookingList,SetBookingList]=useState([])
  const [CardsCount,SetCardsCount]=useState({})
  const [graphdata,Setgraphdata]=useState({ActiveBookingcnt:'',UpcomingBookingcnt:'',PastBookingcnt:''})

  const Navigate=useNavigate()

  const getBookingList=async(sid)=>
  {
    const {data}=await axios.post('https://drive-easy-host-server.vercel.app/BookingList',{sid})
    SetBookingList(data)
    Setloading(false)
  }

  const getUserCars=async(sid)=>
  {
    const {data}=await axios.post('https://drive-easy-host-server.vercel.app/UserCarsCount',{sid})
    SetCardsCount(data)
  }

const getGraphDetails=async(sid)=>
{
  const {data}=await axios.post('https://drive-easy-host-server.vercel.app/BookingsPerMonth',{sid})
  const Activecars=await GraphCount(data.ActiveBookings,"Active")
  const Upcomingcars=await GraphCount(data.ActiveBookings,"Upcoming")
  Setgraphdata((prev) => ({
    ...prev,
    ActiveBookingcnt: Activecars,
    UpcomingBookingcnt: Upcomingcars,
    PastBookingcnt:data.PastBooking,
  }));
}

const data = {
  labels: ['Active','Past','Upcoming'],
  datasets: [
    {
      label: 'My Bookings',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgb(255, 99, 132)',
      hoverBorderColor: 'rgba(75,192,192,1)',
      data: [graphdata.ActiveBookingcnt,graphdata.PastBookingcnt,graphdata.UpcomingBookingcnt],
    },
  ],
}; 

  useEffect(()=>{
    if(user.isAuth)
    {
      getGraphDetails(user.sid)
      getBookingList(user.sid)
      getUserCars(user.sid)
    }
    else
    {
      Navigate('/')
    }
  },[])

  if(loading)
  {
    return <Loading/>
  }

  return(
    <>
    <div className='DashboardPage'>
    <Navbar/>
      <div className="Dashboard">
          <div className="Dashboard-CardDeck">
            <div className="Dashboard-Cards" id='Dashboard-Cards-1'>
              <div className="Dashboard-Cards-title">
              <BookOutlined  style={{marginLeft:'10%',marginRight:'5%',fontSize:'25px'}}/>
                  <h3>Total Cars</h3>
              </div>
              <div className="Dashboard-Cards-info">
                <h2>{CardsCount.carcount}</h2>
                <ArrowUpOutlined style={{fontSize:'30px',color:'#3f8600'}} />
              </div>
            </div>
            <div className="Dashboard-Cards" id='Dashboard-Cards-2'>
              <div className="Dashboard-Cards-title">
                <CheckSquareOutlined  style={{marginLeft:'10%',marginRight:'5%',fontSize:'25px'}}/>
                <h3>Verfied Cars</h3>
              </div>
              <div className="Dashboard-Cards-info">
                  <h2>{CardsCount.verifycarcount}</h2>
                  <ArrowUpOutlined style={{fontSize:'30px',color:'#3f8600'}} />
              </div>
            </div>
            <div className="Dashboard-Cards" id='Dashboard-Cards-3'>
              <div className="Dashboard-Cards-title">
                <CarOutlined style={{marginLeft:'10%',marginRight:'5%',fontSize:'25px'}}/>
                <h3>Bookings</h3>
              </div>
              <div className="Dashboard-Cards-info">
                <h2>{CardsCount.ActiveCars}</h2>
                 <ArrowUpOutlined style={{fontSize:'30px',color:'#3f8600'}} />
              </div>
            </div>
            <div className="Dashboard-Cards" id='Dashboard-Cards-4'>
              <div className="Dashboard-Cards-title">
                <DollarCircleOutlined style={{marginLeft:'10%',marginRight:'5%',fontSize:'25px'}}/>
                <h3>Total Earnings</h3>
              </div>
              <div className="Dashboard-Cards-info">
                <h2>&#x20B9;{CardsCount.TotalSum}</h2>
                <ArrowUpOutlined style={{fontSize:'30px',color:'#3f8600'}} />
              </div>
            </div>
            </div>

        <div className="Dashboard-Graph">
          <Bar data={data}/>
        </div>
       
        <div className="Dashboard-Table-div">
          <div className="Dashboard-Table-board">
            <div className='Dashboard-Table-board-icons'>
              <CodeSandboxOutlined style={{fontSize:'30px',marginLeft:'5%',marginRight:'3%'}} />
              <h3>Booking List</h3>
            </div>
            <div className='Dashboard-Table-board-btns'>
                <button><DownloadOutlined style={{marginRight:'2%',fontSize:'18px'}} /> Download</button>
            </div>
          </div>
          <div className="Dashboard-Table-headings">
            <div><b>Customer Name</b></div>
            <div><b>Contact No</b></div>
            <div><b>Car Number</b></div>
            <div><b>Start Date</b></div>
            <div><b>Drop Date</b></div>
            <div><b>Total Cost</b></div>
            <div><b>Ratings</b></div>
          </div>    
       
          <div className='Dashboard-Table-RecordsDiv'>
             {BookingList.length>0?(
                 <>
                  {BookingList.map((data)=>{
                  return(
                    <div className='Dashboard-Table-Records' key={data._id}>
                    <div ><p>{data.userdetails.name}</p></div>
                    <div ><p>{data.userdetails.phone}</p></div>
                    <div><p>{data.bookingDetails.car_no}</p></div>
                    <div className='Dashboard-Table-MarginRight' ><p>{data.bookingDetails.start_date.split('-')[2]}-{data.bookingDetails.start_date.split('-')[1]}-{data.bookingDetails.start_date.split('-')[0]}</p></div>
                    <div ><p>{data.bookingDetails.drop_date.split('-')[2]}-{data.bookingDetails.drop_date.split('-')[1]}-{data.bookingDetails.drop_date.split('-')[0]}</p></div>
                    <div className='Dashboard-Table-Margin'><p>&#x20B9;{data.bookingDetails.amount}</p></div>
                    <div className='Dashboard-Table-Margin'><p><StarFilled /> {data.cardetails.ratings}</p></div>
                    </div>
                    )
                  })}
                 </>
             ):(
                <div className="Dashboard-Table-Empty">
                  <Empty />
                </div>
                )}
          </div>
        </div>
      </div>
    </div>
  <Footer/>
</>
)
}

export default Dashboard;

