//React 
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

//CSS
import './Navbar.css'

//Antd-Framework 
import {BarChartOutlined,CarOutlined,PhoneOutlined,SettingOutlined,BookOutlined,PlusSquareOutlined,UserOutlined} from '@ant-design/icons'

//Images
import Logo from '../Images/Logo.png'
const Navbar=()=>
{
    const location = useLocation();
    const isActiveLink = (path) => {
      return location.pathname === path;
    };

    return(
        <div className="Navbar">
            <div className="Navbar-Logo-div">
                <img src={Logo} alt="Company Logo" className="Navbar-Logo" />
                <h2 className="Navbar-Logo-title">DriveEasy</h2>
            </div>
            <div className="Navbar-items">
                <Link to="/Dashboard" className={`Navbar-links ${isActiveLink('/Dashboard') && 'active'}`}><BarChartOutlined style={{marginRight:'2%',fontSize:'25px'}}/> Dashbaord</Link>
                <Link to="/MyCars" className={`Navbar-links ${isActiveLink('/MyCars') && 'active'}`}><CarOutlined style={{marginRight:'2%',fontSize:'25px'}} />My Cars</Link>
                <Link to="/AddCar" className={`Navbar-links ${isActiveLink('/AddCar') && 'active'}`}><PlusSquareOutlined  style={{marginRight:'2%',fontSize:'25px'}} />Add my car</Link>
                <Link to="/Contact" className={`Navbar-links ${isActiveLink('/Contact') && 'active'}`}><PhoneOutlined  style={{marginRight:'2%',fontSize:'20px',transform:'rotateY(180deg)'}} /> Contact</Link>
                <Link to='/ViewBooking' className={`Navbar-links ${isActiveLink('/ViewBooking') && 'active'}`}><BookOutlined style={{marginRight:'2%',fontSize:'25px'}} /> View Bookings</Link>
                <Link to='/ShowMap' className={`Navbar-links ${isActiveLink('/ShowMap') && 'active'}`}><SettingOutlined style={{marginRight:'2%',fontSize:'25px'}} />Service Centers</Link>
                <Link to='/Profile' className={`Navbar-links ${isActiveLink('/Profile') && 'active'}`}><UserOutlined  style={{marginRight:'2%',fontSize:'25px'}} />Settings</Link>
            </div>
        </div>
    )
}

export default Navbar; 