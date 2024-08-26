import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import { Search } from "lucide-react";
import DataTable from "./DataTable";
import noData from "../public/images/Missing.png";
import Image from "next/image";
import { apiClient } from "@/app/api";
const TableData = [
  {
    key: "1",
    serialNo: "123-332-112-1",
    ServiceStartDate: "12 / 09 / 2025",
    Provider: "New York No. 1 Lake Park",
    MedicalService: "LFT",
    CoInsurance: "11235",
    NoofTimesAllowed: "10",
    ClaimNo: "150546-4646",
  },
  {
    key: "2",
    serialNo: "123-332-112-1",
    ServiceStartDate: "12 / 09 / 2025",
    Provider: "New York No. 1 Lake Park",
    MedicalService: "LFT",
    CoInsurance: "11235",
    NoofTimesAllowed: "10",
    ClaimNo: "150546-4646",
  },
  {
    key: "3",
    serialNo: "123-332-112-1",
    ServiceStartDate: "12 / 09 / 2025",
    Provider: "New York No. 1 Lake Park",
    MedicalService: "LFT",
    CoInsurance: "11235",
    NoofTimesAllowed: "10",
    ClaimNo: "150546-4646",
  },
];

const columns = [
  {
    title: "Sr#",
    dataIndex: "serialNo",
    key: "serialNo",
  },
  {
    title: "Medical Service",
    dataIndex: "MedicalService",
    key: "MedicalService",
  },
  {
    title: "Co-Insurance",
    dataIndex: "CoInsurance",
    key: "CoInsurance",
  },
  {
    title: "Limit",
    dataIndex: "limit",
    key: "limit",
  },
  {
    title: "Service Start Date",
    dataIndex: "ServiceStartDate",
    key: "ServiceStartDate",
  },
  {
    title: "No. of Times Allowed",
    dataIndex: "NoofTimesAllowed",
    key: "NoofTimesAllowed",
  },
  {
    title: "Not Allowed",
    dataIndex: "NotAllowed",
    key: "NotAllowed",
  },
];
function TOB({ session }) {
  const [data, setData] = useState("");
  const [assuredID, setAssuredID] = useState("");
  const handleClick = async () => {
    {
      if (session) {
        const id = session?.user?.email;
        const token = session?.user?.image;

        console.log("Session found. User ID:", id);
        try {
          const response = await apiClient(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Limit/GetTableOfBenifits?assuredID=${assuredID}
`,
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
          const transformedData = transformData(text?.successResponse);
          setData(transformedData);
          if (!text) {
            console.warn("Empty response body");
            return;
          }
          console.log("Response Headers:", response.headers);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      } else {
        console.error("No session available");
      }
    }
  };
  const transformData = (data) => {
    return (
      data?.map((item, index) => ({
        // key: item.batchNo.trim() || index + 1,
        serialNo: index + 1,
        // serialNo: item.batchNo.trim(),
        Provider: item.claimsNo,
        MedicalService: item.accntNam,
        CoInsurance: item.coInsurance,
        NoofTimesAllowed: item.times,
        limit: item.limit,
        NotAllowed: item.NotAllowed,
        ServiceStartDate: item.startDate,
      })) || []
    );
  };

  return (
    <div className="ml-1 w-full  ">
      <div className="flex  items-center justify-between">
        <div className="font-medium text-2xl">Table of Benefits</div>
      </div>
      <div className="mt-[22px] flex">
        <Input
          type="text"
          placeholder="Search Assured ID"
          onChange={(e) => setAssuredID(e.target.value)}
          className="h-12 w-[270px] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
        />
        <Button
          type="primary"
          htmlType="submit"
          className="bg-[#113493] border-none ml-2.5 text-white h-[46px] w-[46px] font-inter"
          onClick={handleClick}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      {data ? (
        <div className=" flex  mt-[22px]  bg-white rounded-[20px] w-full flex-col">
          <DataTable columns={columns} dataSource={data} />
        </div>
      ) : (
        <div className="flex items-center m-auto flex-col justify-center py-20w-full">
          <div className="flex font-medium  flex-col text-xl py-4 font-inter justify-center ">
            No data available, please use Search
          </div>{" "}
          <Image src={noData} className="w-56 h-56 mt-3 flex justify-center" alt="mo-data"  />
        </div>
      )}
    </div>
  );
}

export default TOB;
