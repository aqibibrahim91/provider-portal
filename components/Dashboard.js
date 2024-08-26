"use client";
import StatusLabel from "@/components/status-label";
import { Table, Progress, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import BatchData from "./BatchData";
import { apiClient } from "@/app/api";
import Loader from "./loader";

export default function Dashboard({ setDetailsBit, detailsBit, session }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(session.user?.image);
  const [selectedBatchNumber, setSelectedBatchNumber] = useState(null);
  const [batch, setBatch] = useState(false);
  const [providerDetails, setProviderDetails] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
    fetchProviderData();
  }, [session, token]);

  const fetchData = async (page, pageSize) => {
    if (session) {
      const id = session?.user?.email;
      const token = session?.user?.image;

      console.log("Session found. User ID:", id);
      try {
        const response = await apiClient(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Dashboard/GetBatchDetails?providerID=${id}&pageSize=${pageSize}&pageNumber=${page}`,
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

        const result = JSON.parse(text);
        const transformedData = transformData(result?.successResponse);
        

        setData(transformedData);
        setPagination({
          current: page,
          pageSize,
          total: result?.totalCount || 0,
        });

        if (result && result.providerID) {
          console.log("Provider ID:", result.successResponse.providerID);
        } else {
          console.warn("No providerID found in response");
        }
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No session available");
    }
  };

  const fetchProviderData = async () => {
    if (session) {
      const id = session?.user?.email;
      const token = session?.user?.image;

      console.log("Session found. User ID:", id);
      try {
        const response = await apiClient(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Dashboard/GetProviderName?pID=${id}`,
          {
            method: "POST",
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

        const result = JSON.parse(text);
        setProviderDetails(result?.successResponse);
        console.log("API Response:", result);
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("No session available");
    }
  };

  const transformData = (data) => {
    return (
      data?.map((item, index) => ({
        key: item.batchNo.trim() || index + 1,
        id: index + 1,
        batchNumber: item.batchNo.trim(),
        claims: item.claimsNo,
        sumOfClaims: item.sumOfClaim,
        status:
          item.status === "Auditing"
            ? "Auditing"
            : item.status === "Dispatching"
              ? "Dispatching"
              : item.status === "Rejected"
                ? "Rejected"
                : item.status === "Completed"
                  ? "Completed"
                  : "Unknown", // Handle any unexpected statuses
      })) || []
    );
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "20%",
    },
    {
      title: "Batch #",
      dataIndex: "batchNumber",
      key: "batchNumber",
      width: "20%",
    },
    {
      title: "Claims",
      dataIndex: "claims",
      key: "claims",
      width: "20%",
    },
    {
      title: "Sum of Claims",
      dataIndex: "sumOfClaims",
      key: "sumOfClaims",
      width: "20%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (_, record) => (
        <>
          <StatusLabel status={record.status} />
          <Progress
            percent={getStatusProgress(record.status)}
            size={[250, 10]}
            strokeColor={getProgressStatus(record.status)}
            showInfo={false}
            className="text-[12px]"
          />
        </>
      ),
    },
  ];

  const getStatusProgress = (status) => {
    switch (status) {
      case "Auditing":
        return 50;
      case "Dispatching":
        return 25;
      case "Reporting":
        return 75;
      case "Completed":
        return 100;
      default:
        return 0;
    }
  };

  const getProgressStatus = (status) => {
    switch (status) {
      case "Auditing":
        return "orange";
      case "Dispatching":
        return "blue";
      case "Completed":
        return "#5b8579";
      case "Rejected":
        return "red";
      default:
        return "gray";
    }
  };

  const handleTableChange = (pagination) => {
    fetchData(pagination.current, pagination.pageSize);
  };

  const handleClick = () => {
    setDetailsBit(!detailsBit);
  };

  const handleRowClick = (record) => {
    setBatch(true);
    setSelectedBatchNumber(record);
  };

  return (
    <>
      <Loader loading={loading} />
      {batch ? (
        <BatchData
          setBatch={setBatch}
          batchNumber={selectedBatchNumber}
          batch={batch}
          session={session}
        />
      ) : (

        <div className="flex w-full flex-col lg:pr-[60px]">
          <div className="h-[95px] flex align-middle justify-between items-center bg-[#E7E7E7] rounded-lg">
            <div className="p-[22px] flex">
              <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full">
                <span className="flex">AK</span>
              </div>
              <div className="ml-[15px] font-medium">
                <p>{providerDetails?.providerName}</p>
                <p>{providerDetails?.providerNameE}</p>
              </div>
            </div>
            <div className="flex align-middle items-center justify-center mr-[22px]">
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#113493] border-none ml-2.5 text-white h-[30px] w-[111px] font-inter"
                onClick={handleClick}
              >
                View Details
              </Button>
            </div>
          </div>
          <Table
            dataSource={data}
            columns={columns}
            rowKey="key"
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
              showTotal: (total) => `Total ${total} items`,
            }}
            onChange={handleTableChange}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
            })}
            className="!h-5"
          />
        </div>
      )}
    </>
  )
  return
}
