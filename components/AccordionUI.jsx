'use client'

import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react"
import { useState } from "react"
import AllUsers from "./AllUsers"
import SpecificUser from "./SpecificUser"
import CreateUser from "./CreateUser"
import UpdateUser from "./UpdateUser"
import DeleteUser from "./DeleteUser"

const AccordionUI = () => {
    const [open,setOpen]=useState(1)

    const handleOpen=(value)=>setOpen(open===value?0:value)

  return (
    <section className="w-[40rem]">
        <Accordion open={open===1}>
            <AccordionHeader onClick={()=>handleOpen(1)}>
                All Users
            </AccordionHeader>
            <AccordionBody>
               <AllUsers/>
            </AccordionBody>
        </Accordion>

        
        <Accordion open={open===2}>
        <AccordionHeader onClick={()=>handleOpen(2)}>
                Search for specific User
            </AccordionHeader>
            <AccordionBody>
              <SpecificUser/>
            </AccordionBody>
        </Accordion>

{/* Create a New User */}
        <Accordion open={open===3}>
        <AccordionHeader onClick={()=>handleOpen(3)}>
                Create  User
            </AccordionHeader>
            <AccordionBody>
              <CreateUser/>
            </AccordionBody>
        </Accordion>

{/* Update a  User */}
        <Accordion open={open===4}>
        <AccordionHeader onClick={()=>handleOpen(4)}>
                Update  User
            </AccordionHeader>
            <AccordionBody>
              <UpdateUser/>
            </AccordionBody>
        </Accordion>

{/* Delete   User */}
        <Accordion open={open===5}>
        <AccordionHeader onClick={()=>handleOpen(5)}>
                Delete  User
            </AccordionHeader>
            <AccordionBody>
              <DeleteUser/>
            </AccordionBody>
        </Accordion>
    </section>
  )
}

export default AccordionUI