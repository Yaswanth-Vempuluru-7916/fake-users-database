import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'


//1.All Users Data
export function GET() {
    const data = users;
    return NextResponse.json({ data }, { status: 200 })
}

//4.Create new user

export async function POST(req, res) {
    let { id, name, email, password, age } = await req.json()

    //check if the data is provided
    if (!name || !email || !password || !id || !age) {
        return NextResponse.json(
            { result: "Required field not found" },
            { status: 400 }
        )
    } else {
        //Add the new user
        users.push({ id, name,age, email, password })
        //Extract just the user array
        const updatedUsersArray = users;
        const updatedData = JSON.stringify(updatedUsersArray, null, 2)

        //Write the updated users array
        fs.writeFileSync('./app/util/db.js',`export const users = ${updatedData}`,'utf-8')
    }

    return NextResponse.json({ id, name, age, email, password })
}   

//5.Update user

export async function PUT(req,res){
    let { id, name, email, password, age } = await req.json()
    //Find the user in the users array
    
    const userIndex = users.findIndex((user)=>user.id===id)

    if(userIndex===-1){
        return NextResponse.json({result : "User not found"},{status : 404})
    }

    if(name){
        users[userIndex].name = name
    }
    if(email){
        users[userIndex].email = email
    }
    if(password){
        users[userIndex].password = password
    }
    if(age){
        users[userIndex].age = age
    }
    
    //Extract just the user array
    const updatedUsersArray = users;
    const updatedData = JSON.stringify(updatedUsersArray, null, 2)
    
        //Write the updated users array
        fs.writeFileSync('./app/util/db.js',`export const users = ${updatedData}`,'utf-8')

        return NextResponse.json({result : "User successfully updated"})
        
    }