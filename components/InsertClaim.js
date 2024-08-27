import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import {
  Save,
  ReceiptText,
  Trash2,
  SquarePen,
  Cross,
  X,
  LoaderCircle,
} from "lucide-react";
import Avatar from "../public/images/avatar.jpg";
import Image from "next/image";
import { Select, DatePicker, Input, Table, Space } from "antd";
import DataTable from "./DataTable";
import { Search } from "lucide-react";
import { formatDate } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { editCaseDeactive, setClaimNumber } from "./EditInvoiceSlice";
import DeleteModal from "./Modal"; // Import the Modal component
import toast from "react-hot-toast";
import PrintComponentPages from "./PrintForm2";
import { apiClient } from "@/app/api";
import Loader from "./loader";
import PrintParentComponent from "./PrintParentComponent";
import {
  addClaimNumber,
  editCaseActive,
} from "../components/EditInvoiceSlice";
import Modal from "react-responsive-modal";

function InsertClaim({
  session,
  InsertClaim,
  setInsertClaim,
  setAssuredIDNew,
  assuredID,
  insertResponse,
  setPrintClaim,
  printClaim,
}) {
  const dispatch = useDispatch();
  const claimNumber = useSelector((state) => state.editCase?.claimNo?.trim()); // Ensure the slice name is correct
  dispatch(editCaseDeactive());
  // const claimNumber = useSelector((state) => state.editCase.claimNumber);
  const [medicalServices, setMedicalServices] = useState([]);
  const [providerMedicalServices, setProviderMedicalServices] = useState([]);
  const [claimNo, setClaimNo] = useState(claimNumber);
  const [edit, setEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotAvailable, setIsNotAvailable] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0)

  const [loading, setLoading] = useState(false);
  const [claimLoad, setClaimLoad] = useState(false);
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [invoiceSubmitted, setInvoiceSubmitted] = useState(false);

  const [editInvoiceBit, setEditInvoiceBit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [gridLoading, setGridLoading] = useState(false);
  const [data, setData] = useState("");
  const [tableData, setTableData] = useState("");
  const id = session?.user?.email;
  const token = session?.user?.image;
  const [claimNumberInput, setClaimNumberInput] = useState("");
  const [submitConfirmation, setSubmitConfirmation] = useState(false);
  const [formState, setFormState] = useState({
    invoiceNumber: "",
    treatmentDate: null,
    providerMedicalService: "",
    medicalService: "",
    gross: "",
    note: "",
    currency: 1,
    ClaimNumber: claimNo
      ? claimNumber
        ? claimNumber
        : data?.claimNumber
      : data?.claimNumber,
    assuredID: data?.assuredID,
    batchNumber: data?.batchNumber,
    providerUserName: session?.user?.name,
    AccntNum: "",
    keyRef: "",
    orignalInv: "",
    diagID: "",
    outPatint: data?.outPatient,
  });
  const formatDatee = (date) => {
    if (!date) return ""; // Handle case where date might be undefined or null
    // Check if the date is already in "YYYY-MM-DD" format
    if (date.includes("-")) {
      return date;
    }

    // Assuming date is in "MM/DD/YYYY" format
    const [month, day, year] = date.split("/");
    return `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
  };


  useEffect(() => {
    if (claimNumber) {
      setClaimNo(claimNumber);
    }
  }, [claimNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "invoiceNumber" && edit) {
      setFormState((prevState) => ({
        ...prevState,
        orignalInv: value,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const handleSelectChange = (name) => (value) => {
    if (name === "providerMedicalService") {
      const selected = providerMedicalServices?.find(
        (service) => service.value === value
      );
      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        gross: selected ? selected.price : "",
      }));
      fetchMedicalServicesByProvider(selected?.value)
    } else {
      const selected = medicalServices.find(
        (service) => service.value === value
      );

      setFormState((prevState) => ({
        ...prevState,
        [name]: value,
        AccntNum: value,
      }));
      selectedMedicalService(selected?.value);

    }
  };
  const fetchMedicalServicesByProvider = async (value = "") => {
    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/GetMedicalServices?providerAccountNumber=${value ?? ""}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        })

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.isRequestSuccessful) {
        // Transform the data to fit the Select component format
        const options = data.successResponse.map((service) => ({
          value: service.accntNum,
          label: service.accntNam,
        }));

        setMedicalServices(options);
      }
    } catch (error) {
      console.error("Error fetching medical services:", error);
    }
  };

  const selectedMedicalService = async (value) => {
    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/GetProviderMedicalService?providerID=${id}&medWorkId=${value ?? ""}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.isRequestSuccessful) {
        const options = data.successResponse.map((service) => ({
          value: service.medicalService,
          price: service?.price,
          label: `${service.medicalServiceName}`,
        }));
        setProviderMedicalServices(options);
        if (options.length == 1) {

          if (options[0].value == null && options[0].label == "null" && !edit) {

            setFormState((prevState) => ({
              ...prevState,
              gross: options[0]?.price,
            }))
          }
        }

      } else {
        console.error("Request was not successful:", data.errorDetail);
        setProviderMedicalServices(null);
        setFormState((prevState) => ({
          ...prevState,
          providerMedicalService: "",
        }));
        // if (!editInvoiceBit) {
        //   setFormState((prevState) => ({
        //     ...prevState,
        //     gross: "",
        //   }));
        // }
      }
    } catch (error) {
      console.error("apiClient error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCheckboxChange = () => {
    setIsNotAvailable((prev) => !prev);
    if (!isNotAvailable) {
      // Set the invoice number to "Not Available" when the checkbox is selected
      setFormState((prev) => ({ ...prev, invoiceNumber: "Not Available" }));
    } else {
      // Clear the invoice number when the checkbox is deselected
      setFormState((prev) => ({ ...prev, invoiceNumber: "" }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = edit
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/UpdateClaim`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/InsertInvoice`;

    var requestBody = formState
    if (!requestBody.currency) {
      requestBody.currency = 1
    }
    if (!requestBody.ClaimNumber) {
      requestBody.ClaimNumber = claimNo
        ? claimNumber
          ? claimNumber
          : data?.claimNumber
        : data?.claimNumber
    }
    if (!requestBody.batchNumber) {
      requestBody.batchNumber = data?.batchNumber
    }
    if (!requestBody.assuredID) {
      requestBody.assuredID = data?.assuredID
    }

    if (validateRequest(requestBody)) {
      setLoading(true)
      const response = await apiClient(apiUrl, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      setLoading(false)
      const text = await response.json();

      if (text?.successResponse) {
        setClaimLoad(true);
        setInvoiceSubmitted(!invoiceSubmitted)
        edit
          ? toast.success("Claim updated Successfully")
          : toast.success("Claim Added Successfully");
        setEdit(false);
        setEditInvoiceBit(false)
        setFormState("");
        setIsNotAvailable(false)

        //   // setFormState("");
      } else {
        setClaimLoad(false);
        console.warn("Assured ID is required");
      }
      setClaimLoad(false);
    }
    else {
      toast.error("Please fill in all the fields!", { id: 1 })
    }
  };
  const isInvalidValue = (value) => {
    return value === null || value === undefined || value === "";
  };
  const validateRequest = (request) => {
    if (
      isInvalidValue(request.invoiceNumber) ||
      isInvalidValue(request.treatmentDate) ||
      isInvalidValue(request.medicalService) ||
      isInvalidValue(request.gross)
    ) {
      return false; // Return false if any value is invalid
    }

    // If all properties are valid
    return true;

  }

  useEffect(() => {
    setInsertClaim(false);
    if (!claimNo) return;


    fetchDataClaim();
  }, [claimNo, claimLoad, invoiceSubmitted]);
  const fetchDataClaim = async () => {
    // setEdit(false);
    {
      if (session) {
        const id = session?.user?.email;
        const token = session?.user?.image;
        setLoading(true);
        console.log("Session found. User ID:", id);
        try {
          setLoading(true);

          const response = await apiClient(
            `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/GetClaimData?claimNumber=${claimNo}&providerID=${id}`,
            {
              method: "GET",
              headers: {
                "ngrok-skip-browser-warning": true,
                "Content-type": "text/plain",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const text = await response.json();
          if (!text?.isRequestSuccessful) {
            toast?.error("No Data Found");
            setLoading(false);

            setData("");
            console.error(
              "HTTP Error:",
              response.status,
              response.statusText
            );
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            setData(text?.successResponse);
          }

          setFormState((prevState) => ({
            ...prevState,
            batchNumber: text?.successResponse?.batchNumber,
            assuredID: text?.successResponse?.assuredID,
          }));
          if (!text) {
            console.warn("Empty response body");
            toast.error("No Data Found");
            setLoading(false);
            return;
          }
          console.log("Response Headers:", response.headers);
        } catch (error) {
          console.error("apiClient error:", error);
          setLoading(false);
        }
      } else {
        console.error("No session available");
      }
    }
    setLoading(false);
    setClaimLoad(false);
  };
  useEffect(() => {
    if (!claimNo) return;

    fetchData();
  }, [claimLoad, claimNo, isModalOpen, claimSubmitted, pageIndex, invoiceSubmitted]);

  useEffect(() => {
    if (!claimNo) return;
    fetchProviderMedicalServices();
    fetchMedicalServices();
  }, [claimNo, invoiceSubmitted]);
  const fetchMedicalServices = async () => {
    if (!claimNo) return;

    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/GetMedicalServices?providerID=${id}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.isRequestSuccessful) {
        // Transform the data to fit the Select component format
        const options = data.successResponse.map((service) => ({
          value: service.accntNum,
          label: service.accntNam,
        }));

        setMedicalServices(options);
      } else {
        console.error("Request was not successful:", data.errorDetail);
      }
    } catch (error) {
      console.error("apiClient error:", error);
    } finally {
    }
  };
  const fetchProviderMedicalServices = async () => {
    if (!claimNo) return;

    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/GetProviderMedicalService?providerID=${id}`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.isRequestSuccessful) {
        // Transform the data to fit the Select component format
        const options = data.successResponse.map((service) => ({
          value: service.medicalService,
          price: service?.price,
          label: `${service.medicalServiceName} `, // Include price in the label
        }));
        setProviderMedicalServices(options);
      } else {
        console.error("Request was not successful:", data.errorDetail);
      }
    } catch (error) {
      console.error("apiClient error:", error);
    }
  };

  const fetchData = async () => {
    if (session) {
      const id = session?.user?.email;
      const token = session?.user?.image;

      console.log("Session found. User ID:", id);
      try {
        setGridLoading(true);
        const response = await apiClient(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/ShowGridData?claimNumber=${claimNo}&pageIndex=${pageIndex}&pageSize=${10}`,
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
          toast?.error("No Data Found");
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
          console.log("API Response:", result);
          const transformedData = transformData(result?.successResponse);
          setTotalCount(result.totalCount)
          setTableData(transformedData);
          setGridLoading(false);
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
        }
      } catch (error) {
        console.error("apiClient error:", error);
        setGridLoading(false);
      }
    } else {
      console.error("No session available");
      setGridLoading(false);
    }
    setGridLoading(false);
  };

  const transformData = (data) => {
    return (
      data?.map((item, index) => ({
        invoice: item?.orignalInv,
        claims: item.claimNo,
        Gross: item.gross,
        date: formatDate(item?.treatmentDate),
        MedicalService: item?.medicalService,
        Provider: item?.providerMedicalService,
        note: item?.note,
        keyRef: item?.keyRef,
        accntNum: item?.accntnum,
      })) || []
    );
  };

  const handleEditClick = (record) => {
    setSelectedRow(record.keyRef);
    setEdit(true);
    setEditInvoiceBit(true);
    selectedMedicalService(record?.accntNum);
    setFormState({
      medicalService: record?.accntNum,
      diagID: record?.accntNum,
      claimNumber: record?.claims,
      gross: record?.Gross,
      orignalInv: record?.invoice,
      keyRef: record?.keyRef,
      note: record?.note,
      treatmentDate: record?.date,
      invoiceNumber: record?.invoice,
    });
  };
  const handleDeleteClick = (record) => {
    setSelectedRow(record);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };
  const handleConfirmDelete = async (record) => {
    const token = session?.user?.image;
    try {
      setLoading(true);
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/DeleteClaimData?claimNumber=${record.claims}&keyRef=${record?.keyRef}`,
        {
          method: "DELETE",
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.isRequestSuccessful) {
        console.log("Record deleted successfully:", data);
        toast.success("Record deleted successfully");
      } else {
        console.error("Delete request was not successful:", data.errorDetail);
      }
    } catch (error) {
      console.error("apiClient error:", error);
    } finally {
      setLoading(false)
      handleCloseModal();
    }
  };
  const handleEditClickEnd = () => {
    setEdit(false);
    // setEditInvoiceBit(false)
    setFormState("");
    fetchProviderMedicalServices();
    fetchMedicalServices();

  };

  const columns = [
    {
      title: "Invoice#",
      dataIndex: "invoice",
      key: "invoice",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Provider Medical Service",
      dataIndex: "Provider",
      key: "Provider",
      render: (_, record) => {
        return (
          <>{record.Provider ? record.Provider : "-"}</>
        )
      }
    },
    {
      title: "Medical Service",
      dataIndex: "MedicalService",
      key: "MedicalService",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (_, record) => {
        return (
          <>{record.note ? record.note : "-"}</>
        )
      }
    },
    {
      title: "Gross",
      dataIndex: "Gross",
      key: "Gross",
    },
    {
      title: "",
      dataIndex: "",
      key: "accntNum",
    },
    {
      title: "",
      dataIndex: "",
      key: "keyRef",
    },
    data?.isSubmitted === null
      ? {
        title: "Actions", // Added title for the actions column
        key: "action",
        render: (_, record) =>
        (
          <Space size="middle">
            <a>
              {selectedRow === record.keyRef && edit ? (
                <X
                  className="text-[#2B3F6C]"
                  onClick={() => handleEditClickEnd(record)}
                />
              ) : (
                <SquarePen
                  className="text-[#2B3F6C]"
                  onClick={() => handleEditClick(record)}
                />
              )}
            </a>{" "}
            <a>
              <Trash2
                className="text-red
                  "
                onClick={() => handleDeleteClick(record)}
              />
            </a>{" "}
          </Space>
        )


        ,
      }
      : {},
  ];
  const submitClaim = async () => {
    setSubmitConfirmation(true)
  };
  const onYesSubmitConfirmation = () => {
    makeSubmitAPICall()
    closeSubmitConfirmation()
  }
  const closeSubmitConfirmation = () => {
    setSubmitConfirmation(false)
  }
  const makeSubmitAPICall = async () => {
    const token = session?.user?.image;

    try {
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Claim/SubmitClaim?claimNumber=${claimNo}`,
        {
          method: "PUT",
          headers: {
            "ngrok-skip-browser-warning": true,
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toast?.success("Claim Submitted Successfully");
        setClaimSubmitted(true);
      }

      const data = await response.json();
      if (data.isRequestSuccessful) {
        console.log("Record deleted successfully:", data);
        toast?.success("Claim Submitted Successfully");
      } else {
        console.error("Delete request was not successful:", data.errorDetail);
      }
    } catch (error) {
      console.error("apiClient error:", error);
    }
    setClaimLoad(true);
  }
  const handleDataChange = (pagination) => {
    setPageIndex(pagination.current)
  }
  const handleClaimNumberChange = (e) => {
    const value = e.target.value;
    setClaimNumberInput(value);
  };
  return (
    <>
      <Loader loading={loading} />
      {" "}
      {!printClaim ? (
        <div className="mt-[10px] flex flex-col w-full">
          <div className="font-medium text-2xl">Search User ID</div>
          <div className="flex mt-2 pr-[60px] ">
            <div className="flex justify-between w-full ">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search Claim Number"
                  value={claimNumberInput}
                  onChange={handleClaimNumberChange}
                  className="h-12 w-[270px] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#113493] border-none ml-2.5 text-white h-[46px] w-[46px] font-inter"
                  onClick={() => {
                    dispatch(editCaseActive());
                    dispatch(addClaimNumber(claimNumberInput));
                  }}
                  loading={loading}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {data && !loading && (
            <div className="ml-1 w-full lg:pr-[60px]  ">
              <div className="flex  items-center align-middle justify-between pr-5 lg:pr-auto">
                <div className="font-medium text-2xl flex">Insert Claim</div>

                <div className="flex items-center ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-[#11349326] w-[160px] border-none ml-2.5 text-black h-[48px] font-inter font-semibold text-base"
                  >
                    <Save className="w-6 h-6" />
                    Scan Docs
                  </Button>
                  <Button
                    onClick={() => setPrintClaim(true)}
                    type="primary"
                    htmlType="submit"
                    className="bg-[#113493] w-[160px] border-none ml-2.5 text-white h-[48px] font-inter font-semibold text-base"
                  >
                    Print Claim
                  </Button>{" "}
                  {data?.isSubmitted === null ? (
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => submitClaim()}
                      className="bg-[#113493] w-[160px] border-none ml-2.5 text-white h-[48px] font-inter font-semibold text-base"
                    >
                      Submit Claim
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>{" "}
              <>
                <div
                  className={`flex ${data?.isSubmitted ? "lg:h-[150px]" : "lg:h-[410px]"
                    }  mt-[22px] pt-5 bg-white rounded-[20px] w-full flex-col`}
                >
                  <div className="flex w-full justify-between px-5 ">
                    <div className="lg:w-[70%] lg:h-[115px] pr-[22px]  border-r border-[#E7E7E7] flex flex-col">
                      <div className="flex w-full">
                        {" "}
                        <Image
                          alt="mo-data"
                          src={Avatar}
                          height={50}
                          width={50}
                          className="flex max-h-[50px] rounded-md mt-1"
                        />
                        <div className="ml-[15px] w-full">
                          {" "}
                          <div className="font-medium font-base text-[#212B36] ">
                            {" "}
                            {data?.assuredNameE}
                          </div>
                          <div className="font-medium font-base text-[#212B36]">
                            {" "}
                            {data?.assuredName}
                          </div>
                        </div>
                        <div className="flex gap-2.5 ">
                          <div className="flex justify-end bg-[#3056D3] px-2 py-[3px] max-w-[65px] h-[28px] rounded-md align-middle items-center">
                            <p className="text-sm font-medium text-white">
                              {" "}
                              {data?.gender}
                            </p>
                          </div>{" "}
                          <div className="flex justify-end bg-[#3056D3] px-2 py-[3px] w-[75px] h-[28px] rounded-md align-middle items-center">
                            {data?.employmentStatus ? (
                              <p className="text-sm font-medium text-white">
                                {" "}
                                In Active
                              </p>
                            ) : (
                              ""
                            )}{" "}
                          </div>{" "}
                          <div className="flex justify-center bg-[#3056D3] px-2 py-[3px] w-24 h-[28px] rounded-md align-middle items-center">
                            {data?.outPatient ? (
                              <p className="text-sm font-medium text-white">
                                Out Patient
                              </p>
                            ) : (
                              <p className="text-sm font-medium text-white">
                                {" "}
                                In Patient
                              </p>
                            )}
                          </div>{" "}
                        </div>
                      </div>
                      <div className=" lg:h-[41px] py-[22px] flex gap-4 flex-wrap lg:gap-[44px]">
                        <div className="flex flex-col align-middle ">
                          <div className="flex text-md font-semibold">
                            Birth Date
                          </div>
                          <p className="flex text-[#637381] font-medium  text-sm">
                            {formatDate(data?.birthDate)}
                          </p>
                        </div>{" "}
                        <div className="flex flex-col align-middle ">
                          <div className="flex text-md font-semibold">
                            Assured ID
                          </div>
                          <p className="flex text-[#637381] font-medium  text-sm">
                            {data?.assuredID}
                          </p>
                        </div>{" "}
                        <div className="flex flex-col align-middle ">
                          <div className="flex text-md font-semibold">
                            Batch No
                          </div>
                          <p className="flex text-[#637381] font-medium  text-sm">
                            {data?.batchNumber}
                          </p>
                        </div>{" "}
                        <div className="flex flex-col align-middle ">
                          <div className="flex text-md font-semibold">
                            Claim No
                          </div>
                          <p className="flex text-[#637381] font-medium  text-sm">
                            {claimNo}
                          </p>
                        </div>{" "}
                        {/* <div className="flex flex-col align-middle ">
                <div className="flex text-md font-semibold">Birth Date</div>
                <p className="flex text-[#637381] font-medium  text-sm">
                  24th July, 1985
                </p>
              </div>{" "} */}
                        <div className="flex flex-col align-middle ">
                          <div className="flex text-md font-semibold">
                            Entered by
                          </div>
                          <p className="flex text-[#637381] font-medium  text-sm ">
                            {data?.enteredBy}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[30%] pl-[22px] h-[115px] flex align-middle items-center  m-auto justify-center">
                      <div className="flex lg:gap-[62px] flex-col lg:flex-row">
                        <div className="lg:w-[114px]  flex flex-col">
                          <p className="font-bold text-[28px]  flex justify-center ">
                            {data?.serviceGross}
                          </p>
                          <div className="flex w-full text-base text-[#637381] justify-center  ">
                            <p className="flex text-center"> Services Gross</p>
                          </div>
                        </div>
                        <div className="w-[114px]">
                          <p className="font-bold text-[28px] flex justify-center ">
                            {data?.totalServices}
                          </p>
                          <p className="flex text-base text-[#637381]">
                            Total Services
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {!data?.isSubmitted && (
                    <>
                      <div className="border border-[#E7E7E7] my-[22px]  mx-5" />

                      <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex align-middle pl-2.5 w-full ">
                          <div className="flex gap-2.5 w-full">
                            <div className="flex w-full flex-col lg:flex-row gap-2.5">
                              <div className="flex flex-col w-full  ">
                                <div className="flex text-md font-semibold justify-between w-full ">
                                  <p className="flex"> Invoice#</p>
                                  <div className="flex gap-2 items-center align-middle">
                                    <Checkbox
                                      onChange={handleCheckboxChange}
                                      className="   w-4 h-4 uppercase flex "
                                      checked={isNotAvailable}
                                    />
                                    <span className=" !font-inter text-sm  flex ">
                                      Not Available
                                    </span>
                                  </div>
                                </div>
                                <Input
                                  type="text"
                                  name="invoiceNumber"
                                  placeholder="Enter Invoice#"
                                  className="h-12 px-3 w-full   mt-3 placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] border border-[#E7E7E7]"
                                  value={
                                    edit
                                      ? formState.orignalInv
                                      : formState.invoiceNumber
                                  }
                                  disabled={isNotAvailable}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="flex flex-col lg:w-full">
                                <div className="flex text-md font-semibold">
                                  Treatment Date
                                </div>
                                <input
                                  type="date"
                                  className="h-12 mt-3 px-3 placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] border border-[#E7E7E7]"
                                  value={formatDatee(formState.treatmentDate)}
                                  onChange={(e) => {
                                    setFormState((prevState) => ({
                                      ...prevState,
                                      treatmentDate: e.target.value,
                                    }));
                                  }}
                                  max={new Date().toLocaleDateString('en-CA')}
                                  min={new Date("2000-01-01").toLocaleDateString('en-CA')}
                                />
                              </div>
                            </div>
                            <div className="flex flex-col lg:flex-row w-full gap-2.5">
                              <div className="flex flex-col lg:w-full pr-2 ">
                                <div className="flex text-md font-semibold">
                                  Provider Medical Service
                                </div>
                                <Select
                                  showSearch
                                  value={
                                    formState?.providerMedicalService
                                      ? formState?.providerMedicalService
                                      : "Select Provider Medical Service"
                                  }
                                  className="h-12 mt-3 placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] border border-[#E7E7E7]"
                                  options={providerMedicalServices}
                                  loading={loading}
                                  onChange={handleSelectChange(
                                    "providerMedicalService"
                                  )}
                                  filterOption={(input, option) =>
                                    option.label
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  optionFilterProp="label"
                                  placeholder="Provider Medical Service"
                                  allowClear
                                />
                              </div>
                              <div className="flex flex-col lg:w-full pr-2 ">
                                <div className="flex text-md font-semibold">
                                  Medical Service
                                </div>
                                <Select
                                  showSearch
                                  value={
                                    formState?.medicalService
                                      ? formState?.medicalService
                                      : "Select Medical Service"
                                  }
                                  defaultValue="Select Medical Service"
                                  className="h-12 mt-3 placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] border border-[#E7E7E7]"
                                  options={medicalServices}
                                  loading={loading}
                                  optionFilterProp="label"
                                  onChange={handleSelectChange(
                                    "medicalService"
                                  )}
                                  allowClear
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex align-middle px-2.5 mt-[22px] w-full mb-5 lg:mb-0">
                          <div className="grid grid-cols-2 lg:flex gap-2.5 w-full">
                            <div className="flex flex-col lg:w-1/4">
                              <div className="flex text-md font-semibold">
                                Gross
                              </div>
                              <Input
                                type="number"
                                name="gross"
                                value={formState.gross}
                                placeholder="Enter Gross"
                                className="h-12 px-3  mt-3 placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] border border-[#E7E7E7]"
                                onChange={handleChange}
                                min={0}
                              />
                            </div>
                            <div className="flex flex-col lg:w-1/4">
                              <div className="flex text-md font-semibold">
                                Note (If Any)
                              </div>
                              <Input
                                type="text"
                                name="note"
                                placeholder="Enter Note"
                                className="h-12 px-3  mt-3 placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] border border-[#E7E7E7]"
                                value={formState.note}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex flex-col lg:w-1/4">
                              <div className="flex text-md font-semibold">
                                Currency
                              </div>
                              <input
                                type="text"
                                readOnly
                                value={"LYD"}
                                onChange={handleChange}
                                className="h-12 px-3  mt-3 placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] border border-[#E7E7E7]"
                                placeholder="Enter Currency"
                              />
                            </div>
                            <div className="flex flex-col items-center justify-end lg:w-1/4 pr-2">
                              <Button
                                type="primary"
                                htmlType="submit"
                                className="bg-[#113493] border-none w-full  text-white h-[48px] font-inter font-semibold text-base"
                              >
                                <ReceiptText />
                                {edit ? "Save Invoice" : "Add Invoice"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </>
                  )}
                </div>
                <div className=" flex  mt-[22px]  bg-white rounded-[20px] w-full flex-col">
                  <Table
                    columns={columns}
                    dataSource={tableData}
                    className={`!font-inter`}
                    onChange={handleDataChange}
                    pagination={{
                      current: pageIndex,
                      total: totalCount, // total count returned from backend
                    }}
                  />
                  <DeleteModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    record={selectedRow}
                    session={session}
                  />
                </div>{" "}
              </>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <PrintParentComponent setPrintClaim={setPrintClaim} data={data} session={session} />
        </div>
      )}

      <Modal
        open={submitConfirmation}
        center
        onClose={() => closeSubmitConfirmation()}
      >
        <div className="p-5 text-lg font-semibold">
          Are you sure you want to submit claim?
        </div>
        <div className="justify-center flex gap-3">
          <Button type="primary" className="bg-green p-5 text-md text-white border-none font-inter font-semibold text-base hover:bg-green" onClick={() => onYesSubmitConfirmation()}>Yes</Button>
          <Button type="primary" className="bg-red p-5 text-md text-white border-none font-inter font-semibold text-base hover:bg-red" onClick={() => closeSubmitConfirmation()}>No</Button>
        </div>
      </Modal>
    </>
  );
}

export default InsertClaim;
