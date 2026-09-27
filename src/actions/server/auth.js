"use server"

import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/dbConnect"


const users = await dbConnect('users')

export const registerUser = async (userData) => {


    // 1. is exist
    const isExist = await users.findOne({ email: userData.email })

    // 2. already exists
    if (isExist) {
        return {
            success: false,
            message: "Email already exists"
        };
    }

    
    // 3. New user create   
    const hashPassword = await bcrypt.hash(userData.password,12)

    const newUser = {
         name: userData.name,
        email: userData.email,
        image: userData.photoURL,
        password: hashPassword,
        role: userData.role,

    }

    const result = await users.insertOne(newUser)

    // 4. Success response
    return {

        success: true,
        message: "Registration successful"
    };

}