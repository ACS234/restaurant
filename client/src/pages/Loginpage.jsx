// import React, { useState } from 'react';
// import './Loginpage.css';
// // Import the image and assign it to a variable
// import img1 from '../public/lgin.jpg'; // Adjust the path based on your image location
// import { SIgnup,Login } from './services/ApiServices';

// function Loginpage() {
//     const [isLogin, setIsLogin] = useState(true);


//     const [formData,setFormData] = useState({
//             username:"",
//             email:"",
//             password:"",
//             password2:""
//     })

//     const[loginformdata,setLoginData] = useState({
//         username:"",
//         password:""
//     })


//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     }


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log("formData",formData)
//         const response = await SIgnup(formData).then((res) => {
//             console.log("res",res)
//         }).catch((err) => {
//             console.log("err",err)
//         });
//     }

//     const handleLoginSubmit = async (e) => {
//         e.preventDefault();
//         const response = await Login(loginformdata).then((res) => {
//             console.log("res",res)
//         }).catch((err) => {
//             console.log("err",err)
//         });
//     }


//     const handleLoginChange = (e) => {
//         const {name, value } = e.target;
//         setLoginData({
//             ...loginformdata,
//             [name]: value,
//         });
//     }
//     console.log("loginformdata",loginformdata)


    


//     return (
//         <div className='contener'>
//             {/* Using the imported image variable with img tag */}
//             <img src={img1} alt="background" className="background-img"/>
            
//             <div className='from-contener'>
//                 <div className='form-toggle'>
//                     <button className={isLogin ? 'active':""} onClick={()=>setIsLogin(true)}>LOGIN</button>
//                     <button className={!isLogin ? 'active' : ""} onClick={()=>setIsLogin(false)}>SIGNUP</button>
//                 </div>
//                 {isLogin ? (
//                     <div className='form'>
//                         <h2>Login Form</h2>
//                         <input 
//                         type="text"
//                         name='username'
//                         value={loginformdata?.username}
//                         onChange={handleLoginChange}
//                          placeholder='User-name'
//                           />
//                         <input
//                          type="password"
//                          name="password"
//                             value={loginformdata?.password}
//                             onChange={handleLoginChange}
//                           placeholder='password' />
//                         <a href="#">forgot password?</a>
//                         <button 
//                         onClick={handleLoginSubmit}
//                         >login</button>
//                         <p>Not a Member?<a href="#" onClick={()=>setIsLogin(false)}>Signup now </a></p>
//                     </div>
//                 ) : (
//                     <div className='form'>
//                         <h2>Signup Form</h2>
//                         <input 
//                         type="text"
//                         name='username'
//                         value={formData?.username}
//                         onChange={handleChange}
//                          placeholder='name'
//                           />
//                         <input
                        
//                         type="email"
//                         name='email'
//                         onChange={handleChange}
//                         value={formData?.email} 
//                         placeholder='email' 
                        
//                         />
//                         <input
//                          type="password"
//                          name='password'
//                          value={formData?.password}
//                          onChange={handleChange}
//                           placeholder='password'
//                            />
//                         <input
//                          type="password"
//                          name='password2'
//                          value={formData?.password2}
//                          onChange={handleChange}
//                           placeholder='confirm password'
//                           />
//                         <button 
//                          onClick={handleSubmit}
//                         >signup</button>
//                         <p>Already a Member?<a href="#" onClick={()=>setIsLogin(true)}>Login now </a></p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Loginpage;


// import React, { useState } from "react";
// import "./Loginpage.css";
// import img1 from "../public/lgin.jpg"; // Adjust the path based on your image location
// import { SIgnup, Login } from "./services/ApiServices";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Loginpage() {
//   const [isLogin, setIsLogin] = useState(true);

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     password2: "",
//   });

//   const [loginformdata, setLoginData] = useState({
//     username: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await SIgnup(formData);
//       console.log("res", response);
//       toast.success("Signup Successful! 🎉", { position: "top-right" });
//     } catch (error) {
//       console.error("err", error);
//       toast.error("Signup Failed. Please try again.", { position: "top-right" });
//     }
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await Login(loginformdata);
//       console.log("res", response);
//       toast.success("Login Successful! 🎉", { position: "top-right" });
//     } catch (error) {
//       console.error("err", error);
//       toast.error("Login Failed. Invalid credentials.", { position: "top-right" });
//     }
//   };

//   const handleLoginChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData({
//       ...loginformdata,
//       [name]: value,
//     });
//   };

//   return (
//     <div className="contener">
//       <ToastContainer /> {/* Toast Container must be added */}
//       <img src={img1} alt="background" className="background-img" />
//       <div className="from-contener">
//         <div className="form-toggle">
//           <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
//             LOGIN
//           </button>
//           <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
//             SIGNUP
//           </button>
//         </div>
//         {isLogin ? (
//           <div className="form">
//             <h2>Login Form</h2>
//             <input type="text" name="username" value={loginformdata?.username} onChange={handleLoginChange} placeholder="User-name" />
//             <input type="password" name="password" value={loginformdata?.password} onChange={handleLoginChange} placeholder="password" />
//             <a href="#">forgot password?</a>
//             <button onClick={handleLoginSubmit}>login</button>
//             <p>
//               Not a Member?
//               <a href="#" onClick={() => setIsLogin(false)}>
//                 Signup now{" "}
//               </a>
//             </p>
//           </div>
//         ) : (
//           <div className="form">
//             <h2>Signup Form</h2>
//             <input type="text" name="username" value={formData?.username} onChange={handleChange} placeholder="name" />
//             <input type="email" name="email" onChange={handleChange} value={formData?.email} placeholder="email" />
//             <input type="password" name="password" value={formData?.password} onChange={handleChange} placeholder="password" />
//             <input type="password" name="password2" value={formData?.password2} onChange={handleChange} placeholder="confirm password" />
//             <button onClick={handleSubmit}>signup</button>
//             <p>
//               Already a Member?
//               <a href="#" onClick={() => setIsLogin(true)}>
//                 Login now{" "}
//               </a>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Loginpage;

import React, { useState } from "react";
import "./Loginpage.css";
import img1 from "../public/lgin.jpg"; // Adjust path if needed
import { SIgnup, Login } from "./services/ApiServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Loginpage() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [loginformdata, setLoginData] = useState({
    username: "",
    password: "",
  });

  // Handle Signup Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login Input Change
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginformdata,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Signup Validation & Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password || !formData.password2) {
       
      return;
    }

    if (formData.password !== formData.password2) {
   
      return;
    }

    try {
      const response = await SIgnup(formData);
     
     

      // ✅ Clear Signup Form Data
      setFormData({
        username: "",
        email: "",
        password: "",
        password2: "",
      });

    } catch (error) {
      console.error("err", error);
    }
  };

  // ✅ Login Validation & Submission


  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginformdata.username || !loginformdata.password) {
      toast.error("Username and Password are required!", { position: "top-right" });
      return;
    }
    try {
      const response = await Login(loginformdata);
      console.log("res", response);
      // ✅ Clear Login Form Data
      setLoginData({
        username: "",
        password: "",
      });
    } catch (error) {
      console.error("err", error);
    }
  };





  return (
    <div className="contener">
      <ToastContainer /> {/* Toasts will show here */}
      <img src={img1} alt="background" className="background-img" />
      <div className="from-contener">
        <div className="form-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>
            LOGIN
          </button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>
            SIGNUP
          </button>
        </div>
        {isLogin ? (
          <div className="form">
            <h2>Login Form</h2>
            <input type="text" name="username" value={loginformdata.username} onChange={handleLoginChange} placeholder="User-name" />
            <input type="password" name="password" value={loginformdata.password} onChange={handleLoginChange} placeholder="password" />
            <a href="#">Forgot password?</a>
            <button onClick={handleLoginSubmit}>Login</button>
            <p>
              Not a Member?{" "}
              <a href="#" onClick={() => setIsLogin(false)}>
                Signup now
              </a>
            </p>
          </div>
        ) : (
          <div className="form">
            <h2>Signup Form</h2>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Name" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <input type="password" name="password2" value={formData.password2} onChange={handleChange} placeholder="Confirm Password" />
            <button onClick={handleSubmit}>Signup</button>
            <p>
              Already a Member?{" "}
              <a href="#" onClick={() => setIsLogin(true)}>
                Login now
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loginpage;
