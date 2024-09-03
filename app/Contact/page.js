import React from "react";
import { Button, Input } from "antd";

const { TextArea } = Input;
function Contact() {
  return (
    <div className="ml-1 w-full" style={{ fontFamily: "inter" }}>
      <div className="flex  items-center justify-between">
        <div className="font-medium text-2xl text-[#212B36]">Contact</div>
      </div>
      <div className="w-full mt-[22px] flex gap-[22px]">
        <div className="w-[70%] bg-white border border-[#E7E7E7] rounded-lg">
          <div className="py-3 border-b border-[#E7E7E7]">
            <p className="ml-5 font-semibold text-base text-[#212B36]">
              Personal Information
            </p>
          </div>
          <div className="mt-8 flex px-5 w-full gap-[11px]">
            <div className="w-1/2">
              {" "}
              <div className="mb-2  !font-medium">Full Name</div>{" "}
              <Input
                style={{ fontFamily: "inter" }}
                type="text"
                placeholder="Devid Jhon"
                className="h-12  rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
              />
            </div>{" "}
            <div className="w-1/2">
              <div className="mb-2 !font-medium">Phone Number</div>
              <Input
                style={{ fontFamily: "inter" }}
                type="text"
                placeholder="+9235645646456"
                className="h-12 w-full  rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
              />
            </div>
          </div>
          <div className="flex px-5  flex-col gap-[30px] mt-[30px]">
            <div>
              <div className="mb-2 !font-medium">Email</div>
              <Input
                style={{ fontFamily: "inter" }}
                type="text"
                placeholder="DevidJhon@gmail.com"
                className="h-12 w-full  rounded-lg text-sm bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
              />
            </div>{" "}
            <div>
              <div className="mb-2 !font-medium">Username</div>
              <Input
                style={{ fontFamily: "inter" }}
                type="text"
                placeholder="Devid Jhon"
                className="h-12 w-full  rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
              />
            </div>
          </div>
          <div>
            {" "}
            <div className="px-5 py-[30px] ">
              <div className="mb-2  !font-medium">BIO</div>

              <textarea
                placeholder="Enter Bio  details here...."
                className="resize-none text-[16px] w-full h-[196px] focus:!border-none focus:!ring-0 px-4 py-4 rounded-lg text-sm bg-[#F8FAFC] placeholder:text-[16px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
              ></textarea>
            </div>
            <div className="px-5 flex w-full justify-end">
              <Button
                type="primary"
                htmlType="submit"
                style={{ fontFamily: "inter" }}
                className="flex font-semibold h-12 text-base text-white rounded-lg mb-5 justify-end w-[120px]  bg-[#113493] py-[14px] px-10"
              >
                Send
              </Button>
            </div>
          </div>
        </div>{" "}
        <div className="w-[35%] flex-wrap lg:w-[30%] bg-white border border-[#E7E7E7] rounded-lg">
          <div className="py-3 border-b border-[#E7E7E7]">
            <p className="ml-5 font-semibold text-base text-[#212B36]">
              Company Details
            </p>
          </div>
          <div
            className="mt-8 flex flex-col px-5 "
            style={{ fontFamily: "inter" }}
          >
            <div className="font-medium flex">Contact No</div>
            <div className="flex flex-col">
              <p className="flex text-[#637381]  font-normal text-[14px] leading-5">
                +123-123-123
              </p>{" "}
              <p className="flex text-[#637381]  font-normal text-[14px] leading-5">
                +123-123-123
              </p>{" "}
              <p className="flex text-[#637381]  font-normal text-[14px] leading-5">
                +123-123-123
              </p>{" "}
            </div>
          </div>{" "}
          <div
            className="mt-8 flex flex-col px-5 flex-wrap "
            style={{ fontFamily: "inter" }}
          >
            <div className="font-medium flex ">Email Address</div>
            <div className="flex flex-col ">
              <p className="flex  text-[#637381] w-1/2 font-normal text-[14px] leading-5">
                michael@alkhalil@med.com
              </p>{" "}
              <p className="flex text-[#637381]  font-normal text-[14px] leading-5">
                araalbanlil@med.com{" "}
              </p>{" "}
              <p className="flex text-[#637381]  font-normal text-[14px] leading-5">
                khafilah@alkhalil@med.com
              </p>{" "}
            </div>
          </div>{" "}
          <div
            className="mt-8 flex flex-col px-5 "
            style={{ fontFamily: "inter" }}
          >
            <div className="font-medium flex">Address</div>
            <div className="flex flex-col">
              <p className="flex text-[#637381]  font-normal text-[14px] leading-5">
                r mi congue a. Curabitur cursus, ipsum ut lobortis sodales, enim
                arcu pellen
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
