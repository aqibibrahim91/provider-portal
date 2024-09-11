"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/images/logo.png";
import { Input, Button, Form } from "antd";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleLogin = async (values) => {
    setIsSubmitting(true);

    try {
      const res = await signIn("credentials", {
        username: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/Dashboard",
      });

      if (res?.status === 200 || res.ok) {
        router.push("/Dashboard");
      } else if (!res?.status === 200 || !res.ok) {
        toast.error("Invalid Username or Password");
        console.error(res.error || "Invalid credentials");
      } else {
        toast.error("Unexpected login error. Please try again.");
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Login failed: ${error.response.data.message || error.message}`
        );
        console.error("Response error:", error.response);
      } else if (error.request) {
        toast.error(
          "Network error. Please check your connection and try again."
        );
        console.error("Network error:", error.request);
      } else {
        console.error("Login error:", error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleLogin = async (values) => {
  //   setIsSubmitting(true);

  //   try {
  //     // Attempt to log in using the credentials
  //     const res = await signIn("credentials", {
  //       username: values.email,
  //       password: values.password,
  //       redirect: false, // Set to false to handle redirect manually
  //       callbackUrl: "/Dashboard",
  //     });

  //     if (res?.status === 200 || res.ok) {
  //       // Redirect to dashboard on successful login
  //       router.push("/Dashboard", undefined, { shallow: false });
  //     } else if (res?.error) {
  //       // Handle specific credential error
  //       toast.error("Invalid Username or Password");
  //       console.error(res.error || "Invalid credentials");
  //     } else {
  //       // Handle unexpected response structure
  //       toast.error("Unexpected login error. Please try again.");
  //       console.error("Unexpected response:", res);
  //     }
  //   } catch (error) {
  //     // Handle network or other unexpected errors
  //     if (error.response) {
  //       // If the error is related to the response from the server
  //       toast.error(
  //         `Login failed: ${error.response.data.message || error.message}`
  //       );
  //       console.error("Response error:", error.response);
  //     } else if (error.request) {
  //       // If the request was made but no response received (e.g., network issue)
  //       toast.error(
  //         "Network error. Please check your connection and try again."
  //       );
  //       console.error("Network error:", error.request);
  //     } else {
  //       // Any other kind of unexpected error
  //       toast.error("Login failed. Please try again.");
  //       console.error("Login error:", error.message);
  //     }
  //   } finally {
  //     setIsSubmitting(false); // Reset the submitting state after everything
  //   }
  // };

  return (
    <div className="flex justify-center items-center align-middle h-screen">
      <div className="w-[524px] h-[489px] bg-white flex justify-center align-middle items-center">
        <div className="w-[400px] h-[359px]  font-inter flex flex-col justify-between">
          <div className="flex flex-col items-center">
            <Image
              src={logo}
              width={197}
              height={39}
              className="justify-center flex m-auto"
            />
            <Form
              onFinish={handleLogin}
              className="w-full mt-[52px]"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Email"
                  className="h-12 w-full !font-inter rounded-none placeholder:text-[15px] placeholder:text-[#ACB6BE]"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="h-12 w-full !font-inter rounded-none mt-[25px] placeholder:text-[15px] placeholder:text-[#ACB6BE]"
                  iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                  className="mt-[25px]  w-full bg-[#3056D3] border-none text-white h-12 font-inter"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="flex justify-center  text-[#ADADAD] text-base !font-inter hover:cursor-pointer">
            Forget Password?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
