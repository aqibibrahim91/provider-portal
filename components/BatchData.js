import React, { useEffect, useState } from "react";
import { Table, Button, Space } from "antd";
import DataTable from "./DataTable";
import { ArrowLeft } from "lucide-react";
import noData from "../public/images/Missing.png";
import Image from "next/image";
import { apiClient } from "@/app/api";
import Loader from "./loader";
import Dashboard from "./Dashboard";

function BatchData({  batchNumber, session,onCloseBatch }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0)
  const [back,setBack] = useState(false);
  const handleBackToDashboard = () => {
    if (onCloseBatch) {
        onCloseBatch(); // Safely call onCloseBatch if it exists
    } else {
        console.error("onCloseBatch function is not passed or undefined");
    }
};
  const columns = [
    {
      title: "Sre#",
      dataIndex: "sr",
      key: "sr",
    },
    {
      title: "Claim No#",
      dataIndex: "claimNo",
      key: "claimNo",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Card#",
      dataIndex: "cardNo",
      key: "cardNo",
    },
    {
      title: "Gross",
      dataIndex: "Gross",
      key: "Gross",
    },
  ];

  useEffect(() => {
    fetchData();
  }, [pageIndex]);
  const fetchData = async () => {
    const token = session?.user?.image;
    setLoading(true);
    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/GetBatchInsights?batchNumber=${batchNumber?.batchNumber}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const json = await response.json();
        if (json) {
          setTotalCount(json.totalCount)
          const transformedData = await transformData(json?.successResponse);
          setData(transformedData);
        } else {
          console.warn("Empty JSON response body");
        }
      } else {
        const text = await response.text();
        console.warn("Unexpected response format:", text);
      }
    } catch (error) {
      console.error("Fetch error:", error.message || error);
    } finally {
      setLoading(false);
    }
  };


  const transformData = (data) => {
    return (
      data?.map((item, index) => ({
        sr: (index + 1) + (10 * (pageIndex - 1)),
        claimNo: item?.claimNumber,
        name: item?.assuredPersonName,
        cardNo: item?.cardNumber,
        Gross: item?.gross,
      })) || []
    );
  };
  const handleDataChange = (pagination) => {
    setPageIndex(pagination.current)
  }
  
  return (
    (
      < div className="ml-1 w-full lg:pr-[60px] flex flex-col" >
        <Loader loading={loading} />
        {
          data ? (
            <>
              <div>
                <Button
                  className=" w-[212px] border-none h-[35px] font-inter text-base"
                  onClick={handleBackToDashboard}
                >
                  <ArrowLeft />
                  Back to Dashboard
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="font-medium text-2xl">Batch Data</div>
                <div className="flex items-center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-[#113493] w-[212px] border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
                  >
                    Print Report
                  </Button>
                </div>
              </div>
              <div className="flex gap-2.5 mt-10 flex-wrap w-full">
                <div className="flex flex-col bg-white rounded p-5 flex-grow  ">
                  <div className="text-base text-[#637381] s">Batch No#</div>
                  <div className="font-bold text-[28px] leading-9 text-[#637381]">
                    {batchNumber?.batchNumber}
                  </div>
                </div>
                <div className="flex flex-col bg-white rounded p-5 flex-grow ">
                  <div className="text-base text-[#637381]">No. of Claims</div>
                  <div className="font-bold text-[28px] leading-9 text-[#637381]">
                    {batchNumber?.claims}
                  </div>
                </div>
                <div className="flex flex-col bg-white rounded p-5 flex-grow ">
                  <div className="text-base text-[#637381]">Sum of Claims</div>
                  <div className="font-bold text-[28px] leading-9 text-[#637381]">
                    {batchNumber?.sumOfClaims}
                  </div>
                </div>
                <div className="flex flex-col bg-white rounded p-5 flex-grow ">
                  <div className="text-base text-[#637381]">Status</div>
                  <div className="font-bold text-[28px] leading-9 text-[#637381]">
                    {batchNumber?.status}
                  </div>
                </div>
              </div>
              <div className="flex text-[25px] py-[22px] leading-6 text-black font-medium">
                Claims Data
              </div>
              <div className="flex bg-white rounded-[20px] w-full flex-col">
                <Table
                  columns={columns}
                  dataSource={data}
                  className={`!font-inter`}
                  onChange={handleDataChange}
                  pagination={{
                    current: pageIndex,
                    total: totalCount, // total count returned from backend
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center m-auto flex-col justify-center mt-44 w-full">
              <div className="flex font-medium  flex-col text-xl font-inter justify-center ">
                No data available
              </div>{" "}
              <Image src={noData} className="w-56 h-56 mt-3 flex justify-center" alt="no-data" />
              <div className="flex items-center">
                <Button
                  type="primary"
                  onClick={handleBackToDashboard}
                  htmlType="submit"
                  className="bg-[#113493] w-[212px] mt-3 border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )
        }
      </div >
    )


  );
}

export default BatchData;
