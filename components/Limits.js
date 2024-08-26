import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import { Search } from "lucide-react";
import noData from "../public/images/Missing.png";
import Image from "next/image";
const Limits = ({ session }) => {
  const [dataResponse, setDataResponse] = useState("");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       if (session) {
  //         const id = session?.user?.email;
  //         const token = session?.user?.image;

  //         console.log("Session found. User ID:", id);
  //         try {
  //           const response = await fetch(
  //             `${process.env.NEXT_PUBLIC_API_URL}/api/Limit/GetTableOfBenifits?assuredID=EAGRI-2023-001-I
  // `,
  //             {
  //               method: "GET",
  //               headers: {
  //                 "ngrok-skip-browser-warning": true,
  //                 "Content-type": "text/plain",
  //                 Authorization: `Bearer ${token}`,
  //               },
  //             }
  //           );

  //           if (!response.ok) {
  //             console.error("HTTP Error:", response.status, response.statusText);
  //             throw new Error(`HTTP error! Status: ${response.status}`);
  //           }

  //           const text = await response.text();
  //           const transformedData = transformData(text?.successResponse);
  //           setDataResponse(transformedData);
  //           if (!text) {
  //             console.warn("Empty response body");
  //             return;
  //           }
  //           console.log("Response Headers:", response.headers);

  //           try {
  //             const result = JSON.parse(text);
  //             console.log("API Response:", result);
  //             setDataResponse(result?.successResponse);
  //           } catch (jsonError) {
  //             console.error("Error parsing JSON response:", jsonError);
  //           }
  //         } catch (error) {
  //           console.error("Fetch error:", error);
  //         }
  //       } else {
  //         console.error("No session available");
  //       }
  //     };

  //     fetchData();
  //   }, []);
  const data = [
    { key: 1, description: "Dental Services", value: "N/A" },
    { key: 2, description: "Physiotherapy", value: "0" },
    { key: 3, description: "Medications", value: "N/A" },
  ];

  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];
  const transformData = (data) => {
    return (
      data?.map((item, index) => ({
        key: item.batchNo.trim() || index + 1,
        id: index + 1,
        batchNumber: item.batchNo.trim(),
        claims: item.claimsNo,
        sumOfClaims: item.sumOfClaim,
        status:
          item.status === 0
            ? "Under Review"
            : item.status === 1
            ? "Completed"
            : "Rejected",
      })) || []
    );
  };
  return (
    <div className="ml-1 w-full">
      <div className="flex items-center justify-between">
        <div className="font-medium text-2xl">Find Limits</div>
      </div>
      <div className="mt-[22px] flex">
        <Input
          type="text"
          placeholder="Enter Limit#"
          className="h-12 w-[270px] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
        />
        <Button
          type="primary"
          htmlType="submit"
          className="bg-[#113493] border-none ml-2.5 text-white h-[46px] w-[46px] font-inter"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-[22px]">
        {dataResponse ? (
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="w-1/3"
          />
        ) : (
          <div className="flex items-center m-auto flex-col justify-center mt-44 w-full">
            <div className="flex font-medium  flex-col text-xl font-inter justify-center ">
              No data available, please use Search
            </div>{" "}
            <Image
              src={noData}
              className="w-56 h-56 mt-3 flex justify-center"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Limits;
