import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/api/apiClient'
import { extractErrorMessages } from '../../util/errorUtils'
import { useNavigate } from 'react-router'
import useAuthStore from '../../lib/store/authStore'
import Image2 from '../../assets/images/authImage.jpg'
function LoginForm() {
  const navigate = useNavigate()
  const {setAuth } = useAuthStore();
   const [isLoading, setIsLoading] = useState()
   const [formValues, setFormValues] = useState({
            email:"",
            password:""   
        })

    const [error, setError] =useState(null);

    const handleInputChange = (e)=>{
        const { name, value} = e.target;
        setFormValues({
            ...formValues,
            [name] : value
        })
    }

    const loginMutation = useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post('/auth/login', credentials);
            console.log("response data", response)
            return response.data
        },
        onSuccess: (data)=>{

          // console.log("data received", data)
            if(data.token){
                const user = data.user;
                const token = data.token;
                setAuth(user, token)
                navigate('/dashboard')
            }
            
        },
        onError: (err)=>{
            console.log("err", err)
            setError(extractErrorMessages(err))
        }
    })

    const handleSubmit = (e)=>{
            e.preventDefault();
            setError(null)
    
            if(!formValues.email || !formValues.password){
                setError('All fields are required ')
                return
            }
    
            
            // TODO: Mutation
    
            loginMutation.mutate({
                email: formValues.email,
                password: formValues.password
            })
    
        }





  return (
    <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden mx-auto">
  {/* Left Side - Hidden on mobile */}
  <div className="hidden md:flex w-1/2 items-center justify-center">
    <img
      src={Image2}
      className="rounded-s-xl shadow-lg h-full object-cover"
      alt="Login visual"
    />
  </div>

  {/* Right Side - Always visible */}
  <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
    <p className="text-gray-500 mb-6">
      Don't have an account?{" "}
      <a className="text-blue-600 hover:underline" onClick={() => navigate("/register")}>
        Register Now
      </a>
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
          {error}
        </div>
      )}

      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          value={formValues.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          value={formValues.password}
          onChange={handleInputChange}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <LoaderCircle /> login account...
          </span>
        ) : (
          "Login Account"
        )}
      </button>

      <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-400">Go</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </form>
  </div>
</div>

  )
}

export default LoginForm