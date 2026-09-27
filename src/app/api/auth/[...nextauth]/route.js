import { dbConnect } from "@/lib/dbConnect"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
    // name and email
    name: 'Credentials',
    
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith@gamil.com" },
      password: { label: "Password", type: "password" }
    },

    async authorize(credentials, req) {
      
      const {email,password} = credentials

      const user = await dbConnect('users').findOne({email:email})

      if(!user){
        return null
      }

      const passwordOk = await bcrypt.compare(password,user.password)

      if(passwordOk){
        return user
      }

    
      return null
    }
  })
   
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }