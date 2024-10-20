'use client'
import React, { useState } from 'react'
import { Button, Input } from '@material-tailwind/react'

const CreateUser = () => {

    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [age, setAge] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!id || !name || !email || !password || !age) {
            alert("Please fill all the input fields")
            return
        }

        try {
            const response = await fetch(`/api/users`,{
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({id,name,age,email,password})
            })

            if(response.ok){
                alert('User Successfully Created')
                clearForm()
            }else{
                alert('Something went wrong :(')
            }
        } catch (error) {
            alert(error)
            return
        }
    }

    const clearForm=()=>{
        setId('')
        setName('')
        setEmail('')
        setPassword('')
        setAge('')
   }

    return (
        <div className="flex justify-center items-center h-[500px] bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">Create User</h2>
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete='off'>
                    <Input
                        label="ID"
                        type="text"
                        placeholder='Enter User ID'
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />

                    <Input
                        label="Name"
                        type="text"
                        placeholder='Enter Full Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />

                    <Input
                        label="Age"
                        type="text"
                        placeholder='Enter Age'
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
                    />

                    <Button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors duration-300' type='submit'>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser
