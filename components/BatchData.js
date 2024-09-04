import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Space } from "antd";
import DataTable from "./DataTable";
import { ArrowLeft } from "lucide-react";
import noData from "../public/images/Missing.png";
import Image from "next/image";
import { apiClient } from "@/app/api";
import Loader from "./loader";
import Dashboard from "./Dashboard";
import { useDispatch } from "react-redux";
import {
    addClaimNumber,
    editCaseActive,
} from "../components/EditInvoiceSlice";
import ReactToPrint from "react-to-print";
import Barcode from "react-barcode";


function BatchData({ batch, setBatch, batchNumber, session, setDetailsBit, detailsBit, onCloseBatch }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [back, setBack] = useState(false);
    const [displayBarcode, setDisplayBarcode] = useState(false);
    const dispatch = useDispatch();
    const componentRef = useRef();
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
            render: (_, record) => (
                <>
                    <div className="flex">
                        <div className="my-auto">
                            {record.claimNo}
                        </div>
                        <div>
                            {<Barcode displayValue={false} value={record.claimNo} className="h-[40px] w-[100px] barcode claims-barcode" />}
                        </div>

                    </div>
                </>
            )
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
            title: () => (<div className="text-center">Status</div>),
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    <div className={`text-center ${record.isSubmitted && "text-[#ef4444]"}`}>{record.isSubmitted ? "Submitted" : "Open"}</div>
                    <div className="text-center text-[#ef4444]	 font-bold">{record.isSubmitted ? "" : getRemainingTime(record)}</div>
                </>
            )
        },
        {
            title: "Gross",
            dataIndex: "Gross",
            key: "Gross",
        },
    ];
    const getRemainingTime = (record) => {
        var time = record.expiryDate;
        if (time == null) {
            return ""
        }
        const targetTime = new Date(time);

        // Get the current time
        const currentTime = new Date();

        // Calculate the difference in milliseconds
        const timeDifference = targetTime - currentTime;

        // Convert milliseconds to hours
        const hoursRemaining = Math.floor(timeDifference / (1000 * 60 * 60));

        console.log("time: ", time)
        console.log("hoursRemaining: ", targetTime)

        // Return the remaining hours
        return `${hoursRemaining} hours remaining`;
    }

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
                isSubmitted: item?.isSubmitted,
                expiryDate: item?.expiryDate
            })) || []
        );
    };
    const handleDataChange = (pagination) => {
        setPageIndex(pagination.current)
    }
    const handleRowClick = (record) => {
        console.log("record: ", record)
        dispatch(editCaseActive());
        dispatch(addClaimNumber(record.claimNo));
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
                                    onClick={() => { setBack(true) }}
                                >
                                    <ArrowLeft />
                                    Back to Dashboard
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="font-medium text-2xl">Batch Data</div>
                                <div className="flex items-center">
                                    {/* <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-[#113493] w-[212px] border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
                  >
                    Print Report
                  </Button> */}
                                    <ReactToPrint
                                        trigger={() => (
                                            <div className="flex  ">
                                                {" "}
                                                <button className="mt-[25px] hover:border-[#3056D3] hover:border font-inter rounded-lg mr-4 flex text-center justify-center font-semibold items-center w-[200px] bg-[#113493] border-none text-white h-12 ">
                                                    Print Report
                                                </button>
                                            </div>
                                        )}
                                        content={() => componentRef.current}
                                    />
                                </div>
                            </div>
                            <div ref={componentRef}>
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
                                        onRow={(record) => ({
                                            onClick: () => handleRowClick(record),
                                        })}
                                    />
                                </div>
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
