import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import avatar from "../public/images/avatar.jpg";
import Image from "next/image";
import {
  Mail,
  MapPin,
  CalendarCheck2,
  CalendarX2,
  NotebookTabs,
  Search,
} from "lucide-react";
import { formatDate } from "../utils/utils";
import noData from "../public/images/Missing.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addClaimNumber,
  removeClaimNumber,
  setSearchID,
  deleteSearchID,
} from "./EditInvoiceSlice";
import { apiClient } from "@/app/api";
function IDSearch({
  session,
  setInsertClaim,
  insertClaim,
  setAssuredIDNew,
  assuredIDNew,
  setInsertResponse,
}) {
  const dispatch = useDispatch();
  const searchHeaderValue = useSelector((state) => state.editCase.searchID);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [assuredID, setAssuredID] = useState();

  const fetchData = async () => {
    if (!searchHeaderValue) {
      return;
    }
    const token = session?.user?.image;
    setLoading(true);
    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/AssuredPerson/GetAssuredPerson?cardNumber=${searchHeaderValue}`,
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

      const text = await response.text();
      if (!text) {
        console.warn("Empty response body");
        return;
      }

      console.log("Response Headers:", response.headers);

      try {
        const result = JSON.parse(text);
        setData(result?.successResponse);
        setAssuredIDNew(result?.successResponse?.assuredID);
        console.log("API Response:", result);
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }

    setLoading(false);
  };

  const handleInsertClick = async () => {
    const token = session?.user?.image;

    if (assuredIDNew) {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/InsertClaim`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": true,
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            assuredID: assuredIDNew,
            providerID: session?.user?.email,
            providersUserName: session?.user?.name,
          }),
        }
      );
      const text = await response.json();
      if (text?.successResponse) {
        setInsertResponse(text?.successResponse);
        setInsertClaim(true);
        dispatch(addClaimNumber(text?.successResponse?.claimNumber));
      }
    } else {
      console.warn("Assured ID is required");
    }
  };
  useEffect(() => {
    fetchData();
  }, [searchHeaderValue]);
  const handleSearchIDChange = (e) => {
    const value = e.target.value;
    setAssuredID(value);
  };

  return (
    <div className="mt-[10px] flex flex-col w-full">
      <div className="font-medium text-2xl">Search User ID</div>
      <div className="flex mt-2 pr-[60px] ">
        <div className="flex justify-between w-full ">
          <div className="flex">
            <Input
              type="text"
              value={assuredID}
              required
              placeholder="Search Assured ID"
              onChange={handleSearchIDChange}
              className="h-12 w-[270px] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
            />
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#113493] border-none ml-2.5 text-white h-[46px] w-[46px] font-inter"
              onClick={() => {
                dispatch(setSearchID(assuredID));
              }}
              loading={loading}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
          {data && (
            <div className="flex ">
              {/* <Button
                type="primary"
                htmlType="submit"
                className="bg-[#11349326] w-[160px] border-none ml-2.5 text-black h-[48px] font-inter font-semibold text-base"
              >
                Print Form
              </Button> */}
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => handleInsertClick()}
                className="bg-[#113493] w-[160px] border-none ml-2.5 text-white h-[48px] font-inter font-semibold text-base"
              >
                Insert Claim
              </Button>
            </div>
          )}
        </div>
      </div>

      {data ? (
        <div className="ml-1 w-full lg:pr-[60px] pr-[65px] ">
          <div className="flex items-center justify-between"></div>
          <div className=" mt-5 lg:mt-[10px] border border-[#E7E7E7] bg-white flex flex-col">
            <div className="lg:mt-5 mb-5 px-5 h-[80px] flex">
              {/* <Image src={avatar} height={80} objectFit="cover" width={80} /> */}
              <div className="py-[15px] pl-5   font-semibold text-base text-[#212B36]">
                {data?.assuredName}
                <div className="font-inter"> {data?.assuredNameA} </div>
              </div>
            </div>
            <div className="lg:h-[335px] px-5 pb-5 flex lg:gap-[147px] ">
              <div className="w-[33%]">
                <div className="flex gap-3 ">
                  <div className="flex justify-center align-middle mt-1 ">
                    <CalendarCheck2 className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle ">
                    <div className="flex text-lg font-semibold">
                      Date of Birth
                    </div>
                    <p className="flex text-[#637381] font-medium ">
                      {formatDate(data.birthDate)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-[30px] ">
                  <div className="flex justify-center align-middle mt-1 ">
                    <Mail className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle ">
                    <div className="flex text-lg font-semibold">Gender</div>
                    <p className="flex text-[#637381] font-medium ">
                      {data?.gender}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-[30px]">
                  <div className="flex justify-center align-middle mt-1 ">
                    <MapPin className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle  ">
                    <div className="flex text-lg font-semibold">Policy</div>
                    <p className="flex text-[#637381] font-medium ">
                      {data?.policyStatus}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-[30px]">
                  <div className="flex justify-center align-middle mt-1 ">
                    <NotebookTabs className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle  ">
                    <div className="flex text-lg font-semibold">Customer Name</div>
                    <p className="flex text-[#637381] font-medium ">
                      {data?.custName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[33%]">
                <div className="flex gap-3 ">
                  <div className="flex justify-center align-middle mt-1 ">
                    <Mail className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle ">
                    <div className="flex text-lg font-semibold">Assured ID</div>
                    <p className="flex text-[#637381] font-medium ">
                      {data?.assuredID}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-[30px] ">
                  <div className="flex justify-center align-middle mt-1 ">
                    <Mail className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle ">
                    <div className="flex text-lg font-semibold">Status</div>
                    <p className="flex text-[#637381] font-medium ">Assured</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-[30px]">
                  <div className="flex justify-center align-middle mt-1 ">
                    <MapPin className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle  ">
                    <div className="flex text-lg font-semibold">
                      Employee Status
                    </div>
                    <p className="flex text-[#637381] font-medium ">
                      {data?.employmentStatus}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[33%]">
                <div className="flex gap-3 ">
                  <div className="flex justify-center align-middle mt-1">
                    <CalendarCheck2 className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle ">
                    <div className="flex text-lg font-semibold">Start Date</div>
                    <p className="flex text-[#637381] font-medium ">
                      {formatDate(data.startDate)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-[30px] ">
                  <div className="flex justify-center align-middle mt-1 ">
                    <CalendarX2 className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle ">
                    <div className="flex text-lg font-semibold">End Date</div>
                    <p className="flex text-[#637381] font-medium ">
                      {formatDate(data.endDate)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 mt-[30px]">
                  <div className="flex justify-center align-middle mt-1 ">
                    <NotebookTabs className="text-[#3056D3] w-[18px] h-[18px]" />
                  </div>
                  <div className="flex flex-col align-middle  ">
                    <div className="flex text-lg font-semibold">
                      Company Details
                    </div>
                    <p className="flex text-[#637381] font-medium ">
                      {data?.companyName}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end mt-[22px]">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-[#11349326] w-[160px] border-none ml-2.5 text-black h-[48px] font-inter font-semibold text-base"
            >
              Find Limits
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center m-auto flex-col justify-center mt-44 w-full">
          <div className="flex font-medium  flex-col text-xl font-inter justify-center ">
            No data available, please use Search
          </div>{" "}
          <Image src={noData} className="w-56 h-56 mt-3 flex justify-center" />
        </div>
      )}
    </div>
  );
}

export default IDSearch;
