import React, { useState } from 'react'
import api from '../../lib/api/apiClient';
import { useNavigate } from 'react-router'
import { useMutation } from '@tanstack/react-query'
import { extractErrorMessages } from '../../util/errorUtils';
import { LoaderCircle } from 'lucide-react';
// import { input } from '../ui/input'
function RegisterForm() {
    const navigate = useNavigate()
     const [formValues, setFormValues] = useState({
        name: "",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleinputChange = (e)=>{
        const { name, value} = e.target;
        setFormValues({
            ...formValues,
            [name] : value
        })
    }

     const registerMutation = useMutation({
        mutationFn: async (userData) => {
            const response = await api.post('/auth/register', userData);
            console.log("response data", response)
            return response.data
        },
        onSuccess: (data)=>{
            navigate('/login')
        },
        onError: (err)=>{
            console.log("err", err)
            setError(extractErrorMessages(err))
        }
    })

    const [error, setError] =useState(null);

     const handleSubmit = (e)=>{
        e.preventDefault();
        setError(null)

        if(!formValues.name || !formValues.email || !formValues.password){
            setError('All fields are required ')
            return
        }

        if(formValues.password !== formValues.confirmPassword){
            setError('Passwords do not match')
            return
        }

        // TODO: Mutation

        registerMutation.mutate({
            name: formValues.name,
            email: formValues.email,
            password: formValues.password
        })

    }

  return (
   

       <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden mx-auto">
  {/* Left Side (Image) - Hidden on Mobile */}
  <div className="hidden md:flex w-1/2 items-center justify-center">
    <img
      src="https://plus.unsplash.com/premium_photo-1729009106410-9d37259015e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D"
      className="h-full object-cover"
      alt="Register visual"
    />
  </div>

  {/* Right Side (Form) */}
  <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
    <p className="text-gray-500 mb-6">
      Have you an account?{" "}
      <a
        href="#"
        className="text-blue-600 hover:underline"
        onClick={() => navigate("/")}
      >
        Login Now
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
          type="text"
          name="name"
          placeholder="Enter your full name"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formValues.name}
          onChange={handleinputChange}
        />
      </div>
      <div>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          value={formValues.email}
          onChange={handleinputChange}
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
          onChange={handleinputChange}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter your confirm password"
          name="confirmPassword"
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
          value={formValues.confirmPassword}
          onChange={handleinputChange}
        />
      </div>

      <div className="py-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {registerMutation.isPending ? (
            <span className="flex items-center gap-2">
              <LoaderCircle /> Creating account....
            </span>
          ) : (
            "Creating Account"
          )}
        </button>
      </div>

      <div className="flex items-center my-2">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </form>
  </div>
</div>

  );
}

export default RegisterForm