import React, { useEffect, useState } from "react";
import { Button } from "antd";
import avatar from "../public/images/avatar.jpg";
import Image from "next/image";
import { Mail, MapPin, Globe, Phone, Banknote, XIcon } from "lucide-react";
import { apiClient } from "@/app/api";
// { detailsBit, setDetailsBit, session }
function HealthCareDetails({ onClose, session }) {
  const [data, setData] = useState("");
  // const handleClick = () => {
  //   setDetailsBit(!detailsBit);
  // };
  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const id = session?.user?.email;
        const token = session?.user?.image;

        console.log("Session found. User ID:", id);
        try {
          const response = await apiClient(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Dashboard/GetProviderDetails?pID=${id}`,
            {
              method: "GET",
              headers: {
                "ngrok-skip-browser-warning": true,
                "Content-type": "text/plain",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            console.error("HTTP Error:", response.status, response.statusText);
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const text = await response.json();
          setData(text?.successResponse);
          if (!text) {
            console.warn("Empty response body");
            return;
          }

          console.log("Response Headers:", response.headers);

          try {
            const result = JSON.parse(text);
            console.log("API Response:", result);
            if (result && result.providerID) {
              console.log("Provider ID:", result.successResponse.providerID);
            } else {
              console.warn("No providerID found in response");
            }
          } catch (jsonError) {
            console.error("Error parsing JSON response:", jsonError);
          }
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else {
        console.error("No session available");
      }
    };
    fetchData();
  }, []);
  function getInitials(data) {
    if (!data || !data.providerName) {
      return "";
    }

    return data.providerName
      .split(" ") // Split the string by spaces
      .map((word) => word.charAt(0)) // Get the first letter of each word
      .join(""); // Join the letters back into a single string
  }
  const initials = getInitials(data);

  return (
    <div className="ml-1 w-full pr-[60px] ">
      <div className="flex  items-center justify-between">
        <div className="font-medium text-2xl">View Healthcare Details</div>
      </div>
      <div className="mt-[22px] border rounded-lg border-[#E7E7E7] bg-white  flex flex-col">
        <div className="mt-5 mb-8 px-5  flex justify-between">
          <div className="flex">
            <div className="h-20 w-20 flex items-center align-middle justify-center bg-[#113493] rounded text-white font-bold font-inter text-2xl">
              {/* {initials} */} AL
            </div>
            <div className="py-[15px] pl-5  font-semibold text-base text-[#212B36]">
              {data?.providerName}
              <div className="font-inter"> {data?.providerNameE}</div>
            </div>
          </div>
          <div
            className="hover:text-red hover:cursor-pointer"
            
            onClick={onClose}
            // onClick={handleClick}
          >
            <XIcon />
          </div>
        </div>{" "}
        <div className=" px-5  pb-5 flex gap-[147px] ">
          <div className="w-[33%]">
            <div className=" flex gap-3 ">
              <div className="flex justify-center align-middle mt-1 ">
                <Mail className="text-[#3056D3] w-[18px] h-[18px]" />
              </div>
              <div className="flex flex-col align-middle ">
                <div className="flex text-lg font-semibold">Email</div>
                <p className="flex text-[#637381] font-medium ">
                  {data?.email}
                </p>
              </div>
            </div>{" "}
            <div className=" flex gap-3 mt-[30px] ">
              <div className="flex justify-center align-middle mt-1 ">
                <MapPin className="text-[#3056D3] w-[18px] h-[18px]" />
              </div>
              <div className="flex flex-col align-middle ">
                <div className="flex text-lg font-semibold">Address</div>
                <p className="flex text-[#637381] font-medium ">
                  {data?.address}
                </p>
              </div>
            </div>{" "}
          </div>
          <div className="w-[33%]">
            <div className=" flex gap-3 ">
              <div className="flex justify-center align-middle mt-1 ">
                <Banknote className="text-[#3056D3] w-[18px] h-[18px]" />
              </div>
              <div className="flex flex-col align-middle ">
                <div className="flex text-lg font-semibold">Currency</div>
                <p className="flex text-[#637381] font-medium ">
                  {" "}
                  {data?.currency}
                </p>
              </div>
            </div>{" "}
            <div className=" flex gap-3  mt-[30px]">
              <div className="flex justify-center align-middle mt-1 ">
                <Phone className="text-[#3056D3] w-[18px] h-[18px]" />
              </div>
              <div className="flex flex-col align-middle  ">
                <div className="flex text-lg font-semibold">Phone</div>
                <p className="flex text-[#637381] font-medium ">
                  {data?.phone}
                </p>{" "}
              </div>
            </div>
          </div>{" "}
          <div className="w-[33%]">
            <div className=" flex gap-3 ">
              <div className="flex justify-center align-middle mt-1">
                <Globe className="text-[#3056D3] w-[18px] h-[18px]" />
              </div>
              <div className="flex flex-col align-middle ">
                <div className="flex text-lg font-semibold">Country</div>
                <p className="flex text-[#637381] font-medium ">
                  {data?.country}
                </p>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default HealthCareDetails;
