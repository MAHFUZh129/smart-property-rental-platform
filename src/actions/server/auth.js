"use server"

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
    const result = await users.insertOne({
        name: userData.name,
        email: userData.email,
        photoURL: userData.photoURL,
        password: userData.password,
        role: userData.role,
    });

    // 4. Success response
    return {

        success: true,
        message: "Registration successful"
    };

}