import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    // You can add additional custom logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // This function is called to check if the user is authorized
        // If there's no token, return false to prevent access
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/login", "/Dashboard"] };
