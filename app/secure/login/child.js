"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { Input, Button, Form } from "antd";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { getServerSession } from "next-auth/next";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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
      });
      if (res.status == 200) {
        redirect("/");
      } else {
        toast.error("Invalid Username or Passsword");
        // Handle invalid credentials
        console.error(res.error || "Invalid credentials");
      }
    } catch (error) {
      // Handle other errors
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
