import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import toast, { Toaster } from "react-hot-toast";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const payload = {
            uName: credentials.username,
            uPass: credentials.password,
          };
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/authenticate`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          if (!res.ok) {
            toast.error("There is some problem");
            throw new Error("Invalid Credentials");
          }

          const user = await res.json();
          if (user && user?.isRequestSuccessful) {
            const userObj = {
              name: user?.successResponse?.providersUser?.uName,
              image: user?.successResponse?.token,
              email: user?.successResponse?.providersUser?.providerID,
            };

            return userObj;
          } else {
            console.error("Invalid response from server:", user);
            toast.error("Invalid Username or Password");
            return null;
          }
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.name;
        token.id = user.id;
        token.access_token = user.image;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.token = token.access_token;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: "MgeJInQGmzVFvhxack/ZMdlzwz5ZBGl7oB8J2lN4J0E=",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
