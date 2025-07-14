import React from 'react'
import RegisterForm from '../../components/auth/RegisterForm'

function RegisterPage() {
  return (
   <div className='min-h-screen flex flex-col items-center justify-center bg-background'>

      <div className='absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50' />

      <div className='z-10 w-full max-w-max px-4'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-bold text-foreground'>Join us today</h1>
          <p>Create an account just few steps</p>
        </div>

        
      {/* Registration form */} 

      <RegisterForm />
      </div>


    </div>
  )
}

export default RegisterPage