import { dbConnect } from "@/lib/dbConnect"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
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
  }),

  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }), 

  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })

   
  ],

  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {

    try {
       if(!user.email){
      return false
    }

    const isExist = await dbConnect('users').findOne({email:user.email})

    const newUser={
      ...user,
      role:'tenant',
      provider:account.provider,
      providerAccountId: account.providerAccountId

    }

    if(!isExist){

      const result = await dbConnect('users').insertOne(newUser)

    }

    return true
      
    } catch (error) {
      return false
    }
     
   
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async jwt({ token, user, account, profile, isNewUser }) {

    
    if(user){
      token.email= user.email

      const dbUser = await dbConnect('users').findOne({email:user.email})

      token.role = dbUser?.role
    }

    return token
  },
  async session({ session, token, user }) {

    if(token){
      session.user.role = token.role
    }

    return session
  }
}

}