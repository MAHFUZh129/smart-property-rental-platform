import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

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
      

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
   
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }