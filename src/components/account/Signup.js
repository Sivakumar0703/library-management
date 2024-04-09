import * as yup from "yup";
import { useFormik } from "formik";
import image from "../../assets/signup-page-img.jpg";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext } from "react";
import { myContext } from "../../context/Context";

const Signup = () => {

  const {url} = useContext(myContext);

    // yup validation
  const signUpSchemaValidation = yup.object({
    userName: yup
      .string()
      .min(3, "name should have minimum 3 character")
      .required("Enter Your Name"),
    email: yup.string().email().required("Enter Email"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}/, "Enter valid mobile number")
      .required("Enter Mobile Number"),
    password: yup
      .string()
      .min(8, "enter minimum 8 character")
      .required("not valid"),
    confirmPassword: yup
      .string()
      .min(8, "enter minimum 8 character")
      .oneOf([yup.ref("password")], "Password Not Matched")
      .required("Enter Password to Confirm"),
  });

   //   formik
   const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
   useFormik({
     initialValues: {
       userName: "",
       email: "",
       mobile: "",
       password: "",
       confirmPassword: "",
     },

     validationSchema: signUpSchemaValidation,
     onSubmit: (newuser,{resetForm}) => {
        console.log(newuser);
        signup(newuser)
        resetForm()
     },
   });

   async function signup(userData){
      try {
        const register = url && await axios.post( `${url}/user/signup` , userData);
        toast.success(register.data.message.toUpperCase());
      } catch (error) {
        toast.error(error.response.data.message.toUpperCase());
      }
   }


  return (
    <div id="signup-container" className="row">
        <div id="signup-form" className="col-md-6 col-12" >
        <form onSubmit={handleSubmit}>
  <div className="mt-1">
    <label htmlFor="userName" className="form-label" >USER NAME</label>
    <input type="text" className="form-control input-field" id="userName"  value={values.userName} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
    {touched.userName && errors.userName ? (<p className='signup-error-msg' style={{color:"red"}}>{errors.userName}</p>) : (<p className='signup-error-msg hidden-msg'>error</p>)}
  </div>

  <div>
    <label htmlFor="email" className="form-label" >EMAIL</label>
    <input type="email" className="form-control input-field" id="email"  value={values.email} onChange={handleChange} onBlur={handleBlur}  autoComplete='off' />
    {touched.email && errors.email ? (<p className='signup-error-msg' style={{color:"red"}}>{errors.email}</p>) : (<p className='signup-error-msg hidden-msg'>error</p>)}
  </div>

  <div>
    <label htmlFor="mobile" className="form-label" >PHONE NUMBER</label>
    <input type="text" className="form-control input-field" id="mobile"  value={values.mobile} onChange={handleChange} onBlur={handleBlur}  autoComplete='off' />
    {touched.mobile && errors.mobile ? (<p className='signup-error-msg' style={{color:"red"}}>{errors.mobile}</p>) : (<p className='signup-error-msg hidden-msg'>error</p>)}
  </div>

  <div>
    <label htmlFor="password" className="form-label" >PASSWORD</label>
    <input type="text" className="form-control input-field" id="password"  value={values.password} onChange={handleChange} onBlur={handleBlur}  autoComplete='off' />
    {touched.password && errors.password ? (<p className='signup-error-msg' style={{color:"red"}}>{errors.password}</p>) : (<p className='signup-error-msg hidden-msg'>error</p>)}
  </div>

  <div>
    <label htmlFor="confirmPassword" className="form-label" >CONFIRM PASSWORD</label>
    <input type="text" className="form-control input-field" id="confirmPassword"  value={values.confirmPassword} onBlur={handleBlur}  onChange={handleChange} autoComplete='off' />
    {touched.confirmPassword && errors.confirmPassword ? (<p className='signup-error-msg' style={{color:"red"}}>{errors.confirmPassword}</p>) : (<p className='signup-error-msg hidden-msg'>error</p>)}
  </div>

  <div className='text-center mb-2'>
  <button type="submit" className="btn btn-primary" style={{textAlign:"center"}}>Register</button>
  </div>
        </form>
        </div>

        <div id="signup-img-container" className="col-md-6 col-12"  >
            <span className="signup-image-container" >
                <img src={image} alt='logo' />
            </span>
        </div>
    </div>
  )
}

export default Signup