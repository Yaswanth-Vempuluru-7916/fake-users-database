import { users } from "@/app/util/db";
import { NextResponse } from "next/server";
import fs from 'fs'
//2.Get Specific user

export async function GET(_, res) {
    const { id } = await res.params;
    const user = users.filter((u) => u.id === id)
    return NextResponse.json({ user })
}

//3. Login

export async function POST(req, { params }) {
    let { name, email, password } = await req.json();
    const { id } = params

    const { name: uName, email: uEmail, password: uPassword } = users.find(u => u.id === id)

    if (uName === name && uEmail === email && uPassword === password) {
        return NextResponse.json({ result: "Succesfully logged in " })
    } else if (!name || !email || !password) {
        return NextResponse.json({ result: "Please fill all the details " })
    }
    return NextResponse.json({ result: "Invalid Credentials" })
}


//6.Deleting a user
export async function DELETE(req, res) {
    const { id } = await res.params;

    const userIndex = users.findIndex(user => user.id === id)

    if (userIndex === -1) {
        return NextResponse.json({ result: "User not found" }, { status: 404 })
    }

    //!array.splice(startIndex, deleteCount, item1, item2, ...)
    //?The `splice` method in JavaScript is used to modify an array by removing or replacing existing elements and/or adding new elements in place. The syntax for `splice` is:
    //? `startIndex`: The index at which to start changing the array.
    //? `deleteCount`: The number of elements to remove from the array, starting at the `startIndex`.
    //?`item1, item2, ...`: (Optional) The items to add to the array at the `startIndex`.


    //Remove the user from the users array

    users.splice(userIndex, 1)

    const updatedUsersArray = users;
    const updatedData = JSON.stringify(updatedUsersArray, null, 2)

    //Write the updated users array
    fs.writeFileSync('./app/util/db.js', `export const users = ${updatedData}`, 'utf-8')

    return NextResponse.json({ result: "User successfully deleted" })
}
