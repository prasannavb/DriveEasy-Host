//React
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//CSS
import "./AddCar.css"

//Firebase
import { storage1 } from '../UserConfig/firebase';
import { ref, uploadBytes } from 'firebase/storage';

//Antd-Framework
import { ConfigProvider,notification} from "antd";

//Modules
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import Loading from '../Loading/Loading'

const AddCar=()=>
{
    const user=useSelector((state)=>state.user)
    const[formdetails,Setform]=useState({sid:`${user.sid}`,car_no:'',img:'',name:'',year:'',fuel:'',make:'',model:'',type:'',price:'',location:'',desc:''})
    const[loading,Setloading]=useState(true)
    const [Ack,SetAck]=useState(false)
    const [Fuel,SetFuel]=useState([])
    const [Make,SetMake]=useState([])
    const [Model,SetModel]=useState([])
    const [Type,SetType]=useState([])
    const [Errmsg,SetErr]=useState({car_no:'',img:'',name:'',year:'',fuel:'',make:'',model:'',type:'',price:'',location:'',rcbook:'',Insurance:'',selectedFiles:'',desc:''})
    const [Minyear,SetMinYear]=useState()
    const [selectedFiles, setSelectedFiles] = useState([]);
    const RcbookRef=useRef('')
    const InsuranceRef=useRef('')
    const [Primaryfilename,SetPrimaryFileName]=useState({car:'No file chosen',rcbook:'No file chosen',insurance:'No file chosen'})
    const [api, contextHolder] = notification.useNotification();

    const Navigate=useNavigate()

    const openNotification = (message) => {
        message.includes('Successfully')?( api.success({
            message:message,
            placement:"topRight",
            duration:2,
            style: {
                background:"#5cb85c	",
            }
        }))
          :(
            api.error({
                message: message,
                placement:"topRight",
                duration:2,
                style: {
                    background:"rgb(223, 67, 67)",
                }
            })
          )
      };


    const ValidateForm=()=>
    {
        if(formdetails.car_no.trim()==='' || formdetails.car_no==null)
        {
            SetErr((prev)=>{return({...prev,car_no:"Enter the Car number"})})
            SetAck(true)
        }
        else if(formdetails.car_no.length>4 || (formdetails.car_no.length>0 && formdetails.car_no.length<4))
        {
            SetErr((prev)=>{return({...prev,car_no:"Enter a valid car number"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,car_no:""})})
            SetAck(false)
        }


        if(formdetails.name.trim()==='' || formdetails.name===null)
        {
            SetAck(true)
            SetErr((prev)=>{return({...prev,name:"Enter the name"})})
        }
        else
        {
            SetErr((prev)=>{return({...prev,name:""})})
            SetAck(false)
        }

        if(formdetails.fuel==='' || formdetails.fuel===null)
        {
            SetAck(true)
            SetErr((prev)=>{return({...prev,fuel:"Enter the Fuel Category"})})
        }
        else
        {
            SetErr((prev)=>{return({...prev,fuel:""})})
            SetAck(false)
        }

        if(formdetails.make==='' || formdetails.make===null)
        {
            SetAck(true)
            SetErr((prev)=>{return({...prev,make:"Enter the Vehicle brand "})})
        }
        else
        {
            SetErr((prev)=>{return({...prev,make:""})})
            SetAck(false)
        }

        if(formdetails.model==='' || formdetails.model===null)
        {
            SetAck(true)
            SetErr((prev)=>{return({...prev,model:"Enter the Vehicle model"})})
        }
        else
        {
            SetErr((prev)=>{return({...prev,model:""})})
            SetAck(false)
        }

        if(formdetails.type==='' || formdetails.type===null)
        {
            SetAck(true)
            SetErr((prev)=>{return({...prev,type:"Enter the Transmission type"})})
        }
        else
        {
            SetErr((prev)=>{return({...prev,type:''})})
            SetAck(false)
        }

        if(formdetails.year.trim()==='' || formdetails.year===null)
        {
            SetAck(true)
            SetErr((prev)=>{return({...prev,year:"Enter the year of manufacturer"})})
        }
        else if(Number(formdetails.year)<2000 || Number(formdetails.year)>new Date().getFullYear() || formdetails.year<4)
        {
            SetAck(true)
            SetErr((prev)=>{return({...prev,year:"Enter a Valid year between 2000-"+`${new Date().getFullYear()}`})})
        }
        else
        {
            SetErr((prev)=>{return({...prev,year:""})})
            SetAck(false)
        }

        if(formdetails.price.trim()==='' || formdetails.price===null)
        {
            SetErr((prev)=>{return({...prev,price:"Cost per day "})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,price:''})})
            SetAck(false)
        }

        if(formdetails.location.trim()==='' || formdetails.location===null)
        {
            SetErr((prev)=>{return({...prev,location:"Enter the location of car"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,location:""})})
            SetAck(false)
        }
        if(formdetails.img==='' || formdetails.img===null)
        {
            SetErr((prev)=>{return({...prev,img:"Choose your main car image"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,img:""})})
            SetAck(false)
        }
        if(selectedFiles.length===0)
        {
            SetErr((prev)=>{return({...prev,selectedFiles:"Choose your others image"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,selectedFiles:""})})
            SetAck(false)
        }

        if(InsuranceRef.current==='' || InsuranceRef.current===null)
        {
            SetErr((prev)=>{return({...prev,Insurance:"Upload your insurance "})})
            SetAck(true)      
          }
          else
          {
            SetErr((prev)=>{return({...prev,Insurance:""})})
            SetAck(false)
          }
        if(RcbookRef.current===null || RcbookRef.current==='')
        {
            SetErr((prev)=>{return({...prev,rcbook:"Upload your rcbook"})})
            SetAck(true)
                }
        else
        {
            SetErr((prev)=>{return({...prev,rcbook:""})})
            SetAck(false)
        }

        if(formdetails.desc===null || formdetails.desc==='')
        {
            SetErr((prev)=>{return({...prev,desc:"Describe your vehicle"})})
            SetAck(true)
        }
        else
        {
            SetErr((prev)=>{return({...prev,desc:''})})
            SetAck(false)
        }

        if(formdetails.img!=='' && formdetails.img!==null && selectedFiles.length>0 && RcbookRef.current!=='' && RcbookRef.current!==null && InsuranceRef.current!==null && InsuranceRef.current!=='' && formdetails.car_no.trim()!="" && formdetails.car_no!=null && formdetails.car_no.length===4  && formdetails.name.trim()!=""  && formdetails.name!=null && formdetails.fuel!=null && formdetails.fuel!="" && formdetails.year!=null && formdetails.year!="" && Number(formdetails.year)>=2000 && Number(formdetails.year)<=Minyear &&  formdetails.make!="" && formdetails.make!=null && formdetails.model!="" && formdetails.model!=null &&  formdetails.type!="" && formdetails.type!=null && formdetails.price.trim()!="" && formdetails.price!=null && formdetails.location.trim()!="" && formdetails.location!=null)
        {
            CarFormSubmit()
        }
        else
        {
            return;
        }
    }


    const CarFormSubmit=async()=>
    {
        if(formdetails.car_no.trim()!="" && formdetails.car_no!=null && formdetails.car_no.length===4 && formdetails.img!="" && formdetails.img!=null && formdetails.name.trim()!=""  && formdetails.name!=null && formdetails.fuel!=null && formdetails.fuel!="" && formdetails.year!=null && formdetails.year!="" && Number(formdetails.year)>=2000 && Number(formdetails.year)<=2023 &&  formdetails.make!="" && formdetails.make!=null && formdetails.model!="" && formdetails.model!=null && formdetails.type!="" && formdetails.type!=null  && formdetails.price.trim()!="" && formdetails.price!=null && formdetails.location.trim()!="" && formdetails.location!=null )
       {
          const {data}=await axios.post("https://drive-easy-host-server.vercel.app/AddCars",formdetails)
          if(data.action)
          {
            ImagesUploadToFirebase()
          }
          else
          {
            openNotification(data.status)
          }
       }
    }
    
     const CarDetails=(e)=>
    {
        const {name,value}=e.target;
        Setform({...formdetails,[name]:value.trim()})
    }

    const getInputDetails=async()=>
    {
        const {data}=await axios.get("https://drive-easy-host-server.vercel.app/InputDetails")
        SetFuel(data.Fuel)
        SetMake(data.Make)
        SetModel(data.Model)
        SetType(data.Type)
    
    }

    const getThisYear=()=>
    {
        var date=new Date().getFullYear()
        SetMinYear(date)
    }

    useEffect(()=>{
        if(user.isAuth)
        {
            getInputDetails()
            getThisYear()
            Setloading(false) 
        }
        else
        {
            Navigate("/")
        }
    },[])


    const ConvertImage = (e) => {
                const reader=new FileReader()
                reader.readAsDataURL(e.target.files[0]);

                reader.onload = () => {
                    Setform((prev) => ({
                        ...prev,
                        img: reader.result,
                    }));
                };
                SetPrimaryFileName((prev)=>{return({...prev,[e.target.name]:e.target.files[0].name})})
        };


function generateRandomName() {
        const uniqueId = Math.random().toString(36).substr(2, 9);
        const timestamp = new Date().getTime();
        const randomName = `${uniqueId}_${timestamp}`;

        const fileExtension = ".jpg";
      
        return `${randomName}${fileExtension}`;
      }

      const ImagesUploadToFirebase = async () => {

        const insuranceRef=ref(  storage1,
            `/CarImages/${user.sid}/${formdetails.car_no}/Insurance.jpg/`)
            
        const rcbookRef=ref(  storage1,
            `/CarImages/${user.sid}/${formdetails.car_no}/RCBook.jpg/`)

                await uploadBytes(insuranceRef, InsuranceRef.current);
                await uploadBytes(rcbookRef, RcbookRef.current);

        for (const file of selectedFiles) {
            const randomname = generateRandomName();
            const imageRef = ref(
                storage1,
                `/CarImages/${user.sid}/${formdetails.car_no}/images/${randomname}`
            );
    
            try {
                await uploadBytes(imageRef, file);
            } catch (error) {
                openNotification('Error Try again')
                return;

            }
        }
        openNotification('Successfully Registered')
        setTimeout(()=>{Navigate('/Dashboard')},3000)
    };

    const handlecarimageChange = (e) => {
      const files = e.target.files;
      setSelectedFiles(Array.from(files));
    };

    const handleBookimageChange = (e) => {
      if (e && e.target && e.target.name) {
          if (e.target.name === 'rcbook' && e.target.files && e.target.files[0]) {
              RcbookRef.current = e.target.files[0];
          } else if (e.target.name === 'insurance' && e.target.files && e.target.files[0]) {
              InsuranceRef.current = e.target.files[0];
          }

          if (e.target.files && e.target.files[0].name !== undefined) {
              SetPrimaryFileName((prev) => {
                  return { ...prev, [e.target.name]: e.target.files[0].name };
              });
          }
      }
    };
    
    if(loading)
    {
        return <Loading/>
    }
    return(
     <>
        <div className="AddCar">
            <Navbar/>
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
                <div className="AddCar-Layout">
                
                <div className="AddCar-Form">
                <div className="AddCar-title-div">
                    <h1 className="AddCar-title">Your Vehicle</h1>
                </div>
                    <div className="AddCar-div-1">
                            <div className="AddCar-div-Number">
                                <label className="AddCar-Carno-label" htmlFor="">Car Number:</label>
                                <input type="text" name="car_no" onChange={CarDetails} className="AddCar-Carno" placeholder="Car Number" minLength={4}  maxLength={4} autoComplete="off" required/>
                                {Ack?(<span className="AddCar-Err">{Errmsg.car_no}</span>):(<span className="AddCar-Err">{Errmsg.car_no}</span>)}
                            </div>
    
                            <div className="AddCar-div-Name">
                                <label className="AddCar-Name-label" htmlFor="AddCar-Name">Name:</label>
                                <input type="text" name="name" onChange={CarDetails} className="AddCar-Name" placeholder="Name of car" autoComplete="off" required/>
                                {Ack?(<span className="AddCar-Err" >{Errmsg.name}</span>):(<span className="AddCar-Err">{Errmsg.name}</span>)}
                            </div>
                    </div>
     
                    <div className="AddCar-div-2">
                        <div className="AddCar-div-Year">
                            <label className="AddCar-Year-label" htmlFor="AddCar-Year">Year of Manufacture:</label>
                            <input type="number" name="year" onChange={CarDetails} min={2000} max={new Date().getFullYear()} minLength={4} maxLength={4} className="AddCar-Year" placeholder="Year of manufacture" autoComplete="off" required/>
                            {Ack?(<span className="AddCar-Err">{Errmsg.year}</span>):(<span className="AddCar-Err">{Errmsg.year}</span>)}
                        </div>
                        <div className="AddCar-div-Price">
                            <label className="AddCar-Price-label" htmlFor="AddCar-Price">Price/Day:</label>
                            <input type="number" name="price" onChange={CarDetails} className="AddCar-Price"  placeholder="Price/day" autoComplete="off" required/>
                            {Ack?(<span className="AddCar-Err">{Errmsg.price}</span>):(<span className="AddCar-Err">{Errmsg.price}</span>)}
                        </div>
    
                        <div className="AddCar-div-Location">
                            <label className="AddCar-Location-label" htmlFor="AddCar-Location">Location of Car:</label>
                            <input type="text" name="location" onChange={CarDetails} className="AddCar-Location"  placeholder="Location of Car" autoComplete="off" required/>
                            {Ack?(<span className="AddCar-Err">{Errmsg.location}</span>):(<span className="AddCar-Err">{Errmsg.location}</span>)}
                        </div>
                    </div>
    
                    <div className="AddCar-div-3">
                    <div className="AddCar-div-Fuel">
                            <label className="AddCar-Fuel-label"  htmlFor="AddCar-Fuel">Fuel:</label>
                            <select className="AddCar-Fuel" name="fuel" onChange={CarDetails} autoComplete="off">
                                <option value="">Fuel</option>
                                {Fuel.map((data)=>{
                                    return(
                                        <option name="fuel" key={data.id} onChange={CarDetails} value={data.fuel}>{data.fuel}</option>
                                    )
                                })}
                            </select>
                            {Ack?(<span className="AddCar-Err">{Errmsg.fuel}</span>):(<span className="AddCar-Err">{Errmsg.fuel}</span>)}
                        </div>
    
                        <div className="AddCar-div-Make">
                            <label className="AddCar-Make-label" htmlFor="AddCar-Make">Make:</label>
                            <select className="AddCar-Make" name="make" onChange={CarDetails} autoComplete="off">
                                <option value="">Make</option>
                                {Make.map((data)=>{
                                    return(
                                        <option name="make" key={data.id} onChange={CarDetails} value={data.make}>{data.make}</option>
                                    )
                                })}
                            </select>
                            {Ack?(<span className="AddCar-Err">{Errmsg.make}</span>):(<span className="AddCar-Err">{Errmsg.make}</span>)}
                        </div>
                        
                        <div className="AddCar-div-Model">
                            <label className="AddCar-Model-label" htmlFor="AddCar-Model">Model:</label>
                            <select className="AddCar-Model" name="model" onChange={CarDetails} autoComplete="off">
                                <option value="">Model</option>
                                {Model.map((data)=>{
                                    return(
                                        <option name="model" key={data.id} onChange={CarDetails} value={data.model}>{data.model}</option>
                                    )
                                })}
                            </select>
                            {Ack?(<span className="AddCar-Err">{Errmsg.model}</span>):(<span className="AddCar-Err">{Errmsg.model}</span>)}
                        </div>
    
                        <div className="AddCar-div-Type">
                            <label className="AddCar-Type-label" htmlFor="AddCar-Type">Type:</label>
                            <select className="AddCar-Type" name="type" onChange={CarDetails} autoComplete="off">
                                <option value="">Type</option>
                                {Type.map((data)=>{
                                    return(
                                        <option name="type" key={data.id} onChange={CarDetails} value={data.type}>{data.type}</option>
                                    )
                                })}
                            </select>
                            {Ack?(<span className="AddCar-Err">{Errmsg.type}</span>):(<span className="AddCar-Err">{Errmsg.type}</span>)}
                        </div>
    
                    </div>
                    <div className="AddLicense-Layout">
                        <div className="AddLicense-div-1">
                            <h1>Car Images</h1>
                                
                                <div className="AddLicense-Container-1">
                                <div className="AddLicense-PrimaryImg">
                                <b>Primary Image of car:</b>
                                <div>
                                <input type="file" id="actual-btn" name="car" onChange={ConvertImage} hidden/>
                                <label htmlFor="actual-btn">Choose File</label>
                                <span id="file-chosen">{Primaryfilename.car}</span>
                                </div>
                            {Ack?(<span className="AddLicense-Err">{Errmsg.img}</span>):(<span className="AddLicense-Err">{Errmsg.img}</span>)}

                            </div>
                            <div className="AddLicense-TextDesc">
                                <b>Describe your vehicle:</b>
                                <div>
                                    <textarea name="desc" onChange={CarDetails}  cols="30" rows="10"></textarea>
                                </div>
                                {Ack?(<span className="AddLicense-Err">{Errmsg.desc}</span>):(<span className="AddLicense-Err">{Errmsg.desc}</span>)}

                            </div>
                                </div>

                                <div className="AddLicense-SecondaryImg">
                                    <b>Add other images:</b>
                                    <div className="Xlsx-file-upload">
                                      <input type="file" className="input is-info" accept=".jpg,.png,.jpeg" onChange={handlecarimageChange} multiple name="holiday_data" />
                                      <div className="Xlsx-file-btns">
                                        <span>Upload your<span className='xlsx'>.Jpg</span><span className='xls'>.Png</span> here!</span>
                                      </div>
                                    </div>
                            {Ack?(<span className="AddLicense-Err">{Errmsg.selectedFiles}</span>):(<span className="AddLicense-Err">{Errmsg.selectedFiles}</span>)}

                                </div>
                        </div>
                        <div className="AddLicense-div-2">
                        <div className="AddLicense-BookImg">
                                <b>RC Book :</b>
                                <div>
                                <input type="file" onChange={handleBookimageChange} name="rcbook"  id="rcbook-btn" hidden/>
                                <label htmlFor="rcbook-btn">Choose File</label>
                                <span id="file-chosen">{Primaryfilename.rcbook}</span>
                                </div>
                            {Ack?(<span className="AddLicense-Err">{Errmsg.rcbook}</span>):(<span className="AddLicense-Err">{Errmsg.rcbook}</span>)}

                            </div>
                        <div className="AddLicense-BookImg">
                                <b>Insurance:</b>
                                <div>
                                <input type="file" onChange={handleBookimageChange} name="insurance" id="insurance-btn" hidden/>
                                <label htmlFor="insurance-btn">Choose File</label>
                                <span id="file-chosen">{Primaryfilename.insurance}</span>
                                </div>
                            {Ack?(<span className="AddLicense-Err">{Errmsg.Insurance}</span>):(<span className="AddLicense-Err">{Errmsg.Insurance}</span>)}

                            </div>

                        </div>
                    </div>

                        <div className="AddCar-div-btns">
                            <button className="AddCar-Nextbtn" onClick={ValidateForm}>Submit</button>
                        </div>
    
                </div> 
        </div>
    </div> 
    <Footer/>
     </>
    )
}
export default AddCar;