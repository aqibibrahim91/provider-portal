import React, { useEffect, useState } from "react";
import { Table, Button, Space, DatePicker, Input, Select } from "antd";
import { Trash2, SquarePen, Search } from "lucide-react";
import { apiClient } from "@/app/api";
import Loader from "./loader";
import { formatDate } from "@/utils/utils";
import toast from "react-hot-toast";
import moment from "moment"; // Import moment
import { useSession } from "next-auth/react";

const PreApproval = (props) => {
  const { data: session } = useSession;
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [newCase, setNewCase] = useState(false);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [assuredSearch, setAssuredSearch] = useState("");
  const [assuredData, setAssuredData] = useState();
  const [medicalService, setMedicalService] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doctor, setDoctor] = useState("");
  const [doctorContactNo, setDoctorContactNo] = useState("");
  const [caseDate, setCaseDate] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [treatmentNotes, setTreatmentNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [admissionError, setAdmissionError] = useState(false);
  const [dischargeError, setDischargeError] = useState(false);
  const [caseDateError, setCaseDateError] = useState(false);
  const [caseNumber, setCaseNumber] = useState("");

  useEffect(() => {
    getPreApprovalData();
  }, []);

  const getAssuredPerson = async (cardNumber = assuredSearch) => {
    setLoad(true);
    const token = session?.user?.image;
    const response = await apiClient(
      `${process.env.NEXT_PUBLIC_API_URL}/api/AssuredPerson/GetAssuredPerson?cardNumber=${cardNumber}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": true,
          "Content-type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setLoad(false);

    if (!response.ok) {
      console.error("HTTP Error:", response.status, response.statusText);
      setAssuredData();
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
      if (result?.isRequestSuccessful) {
        setAssuredData(result?.successResponse);
      } else {
        setAssuredData();
      }
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
    }
  };
  const getPreApprovalData = async () => {
    const id = session?.user?.email;

    const token = session?.user?.image;
    setLoad(true);
    const response = await apiClient(
      `${process.env.NEXT_PUBLIC_API_URL}/api/PreApproval/GetAll?pID=${id}`,
      {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": true,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    setLoad(false);
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
    try {
      const result = JSON.parse(text);
      console.log("API Response:", result);
      setData(result?.successResponse);
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
    }
  };
  const handleSubmit = async () => {
    if (
      admissionDate == null ||
      admissionDate == "" ||
      caseDate == null ||
      caseDate == "" ||
      dischargeDate == null ||
      dischargeDate == "" ||
      assuredData == null ||
      assuredData?.assuredID == null ||
      assuredData?.assuredID == ""
    ) {
      if (admissionDate == null || admissionDate == "") {
        setAdmissionError(true);
      }
      if (caseDate == null || caseDate == "") {
        setCaseDateError(true);
      }
      if (dischargeDate == null || dischargeDate == "") {
        setDischargeError(true);
      }
      if (assuredData?.assuredID == null || assuredData?.assuredID == "") {
        toast.error("Please search Assured Person first!", { id: 1 });
      }
    } else {
      const id = props.session?.user?.email;
      const token = props.session?.user?.image;
      var request = {
        approved: false,
        assuredID: assuredData?.assuredID,
        providerID: id,
        assuredContactNo: phoneNumber,
        doctor: doctor,
        doctorContactNo: doctorContactNo,
        caseDate: formatDate(caseDate),
        admissionDate: formatDate(admissionDate),
        dischargeDate: formatDate(dischargeDate),
        symptoms: symptoms,
        diagnosis: diagnosis,
        treatment: treatmentNotes,
        cost: estimatedCost.toString(),
        caseNo: caseNumber,
      };
      console.log("req: ", request);

      setLoad(true);
      const response = await apiClient(
        `${process.env.NEXT_PUBLIC_API_URL}/api/PreApproval/UpsertInPatient`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": true,
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(request),
        }
      );
      setLoad(false);
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
      try {
        const result = JSON.parse(text);
        console.log("API Response:", result);
        getPreApprovalData();
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
      }
      clearFormData();
      setNewCase(false);
    }
  };
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Case No", dataIndex: "caseNo", key: "caseNo" },
    { title: "Doctor Name", dataIndex: "doctorName", key: "doctorName" },
    { title: "Diagnosis", dataIndex: "diagnosis", key: "diagnosis" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    {
      title: "Approval Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => <>{record.status ? "Approved" : "Pending"}</>,
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <SquarePen
              onClick={() => handleEdit(record)}
              className="text-[#2B3F6C]"
            />
          </a>
        </Space>
      ),
    },
  ];

  const handleEdit = async (record) => {
    setPhoneNumber(record.assuredContactNo);
    setDoctor(record.doctorName);
    setDoctorContactNo(record.doctorContactNo);
    setCaseDate(record.caseDate ? moment(record.caseDate, "DD/MM/YYYY") : "");
    setAdmissionDate(
      record.admissionDate ? moment(record.admissionDate, "DD/MM/YYYY") : ""
    );
    setDischargeDate(
      record.dischargeDate ? moment(record.dischargeDate, "DD/MM/YYYY") : ""
    );
    setSymptoms(record.symptoms);
    setTreatmentNotes(record.treatment);
    setDiagnosis(record.diagnosis);
    setEstimatedCost(record.cost);
    setAssuredSearch(record.name);
    setCaseNumber(record.caseNo);
    setNewCase(true);
    await getAssuredPerson(record.assuredID);
  };
  const clearFormData = () => {
    setPhoneNumber("");
    setDoctor("");
    setDoctorContactNo("");
    setCaseDate("");
    setAdmissionDate("");
    setDischargeDate("");
    setSymptoms("");
    setTreatmentNotes("");
    setDiagnosis("");
    setEstimatedCost("");
    setAdditionalNotes("");
  };

  const toggleRowExpansion = (key) => {
    setExpandedRowKeys(
      (prevExpandedKeys) =>
        prevExpandedKeys.includes(key)
          ? prevExpandedKeys.filter((k) => k !== key) // Collapse the row if already expanded
          : [...prevExpandedKeys, key] // Expand the row if not already expanded
    );
  };

  const expandedRowRender = (record) => (
    <div
      style={{ padding: "16px", background: "#f5f5f5" }}
      className="flex justify-evenly"
    >
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[14px] leading-6">Admission Date</p>
        <p className="text-[#637381] text-[14px]">{record.admissionDate}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[14px] leading-6">Discharge Date</p>
        <p className="text-[#637381] text-[14px]">{record.dischargeDate}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[14px] leading-6">Case Date</p>
        <p className="text-[#637381] text-[14px]">{record.caseDate}</p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[14px] leading-6">Treatment</p>
        <p className="text-[#637381] text-[14px]">{record.treatment}</p>
      </div>
    </div>
  );

  return (
    <>
      <Loader loading={load} />
      {newCase ? (
        <div className="ml-1 w-full pr-[60px] flex flex-col">
          <div className="font-medium text-2xl">Search Assured ID</div>
          <div className=" w-full ">
            <div className="">
              <Input
                type="text"
                required
                placeholder="Search Assured ID"
                onChange={(e) => setAssuredSearch(e.target.value)}
                value={assuredSearch}
                className="h-12 w-[270px] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
              />
              <Button
                type="primary"
                htmlType="submit"
                className="bg-[#113493] border-none ml-2.5 text-white h-[46px] w-[46px] font-inter"
                onClick={() => getAssuredPerson()}
                loading={load}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {assuredData && (
            <div className="flex  gap-[22px] mt-[22px]">
              <div className="w-[70%] h-[827px] bg-white rounded-lg border border-[#E7E7E7]">
                <div className="py-3 border-b border-[#E7E7E7]">
                  <p className="ml-5 font-semibold text-base text-[#212B36]">
                    Personal Information
                  </p>
                </div>
                <div className="mt-8 w-full flex px-5 gap-[11px]">
                  <div className="w-1/2">
                    {" "}
                    <div className="mb-2 w-full !font-medium">
                      Type of Medical Service
                    </div>{" "}
                    <Input
                      style={{ fontFamily: "inter" }}
                      onChange={(e) => setMedicalService(e.target.value)}
                      value={medicalService}
                      type="text"
                      placeholder="Type of Medical Service"
                      className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                    />
                  </div>{" "}
                  <div className="w-1/2">
                    <div className="mb-2 w-full !font-medium">Phone Number</div>
                    <Input
                      style={{ fontFamily: "inter" }}
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, ""); // Removes all non-digit characters
                        setPhoneNumber(onlyDigits);
                      }}
                      value={phoneNumber}
                      pattern="[0-9]*"
                      type="text"
                      placeholder="Phone Number"
                      className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                    />
                  </div>
                </div>{" "}
                <div className="mt-8 w-full flex px-5 gap-[11px]">
                  <div className="w-1/2">
                    <div className="mb-2 w-full !font-medium">Doctor Name</div>{" "}
                    <Input
                      type="invoice_number"
                      onChange={(e) => setDoctor(e.target.value)}
                      value={doctor}
                      placeholder="Enter Doctor Name"
                      className="h-12 px-3  placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    />
                  </div>
                  <div className="w-1/2">
                    {" "}
                    <div className="mb-2 w-full !font-medium">
                      Doctor Contact Number
                    </div>{" "}
                    <Input
                      type="invoice_number"
                      onChange={(e) => {
                        const onlyDigits = e.target.value.replace(/\D/g, ""); // Removes all non-digit characters
                        setDoctorContactNo(onlyDigits);
                      }}
                      pattern="[0-9]*"
                      value={doctorContactNo}
                      placeholder="Enter Doctor Contact"
                      className="h-12 px-3  placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    />
                  </div>{" "}
                </div>{" "}
                <div className="mt-8 w-full flex px-5 gap-[11px]">
                  <div
                    className={`w-1/2 ${admissionError ? "border-red" : ""}`}
                  >
                    {" "}
                    <div className="mb-2 w-full !font-medium">
                      Estimated Date of Admission
                    </div>{" "}
                    <DatePicker
                      onChange={(e) => {
                        setAdmissionDate(e);
                        setAdmissionError(false);
                      }}
                      value={admissionDate}
                      className="h-12 w-full placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    />
                  </div>{" "}
                  <div
                    className={`w-1/2 ${dischargeError ? "border-red" : ""}`}
                  >
                    <div className="mb-2 w-full !font-medium">
                      {" "}
                      Estimated Date of Discharge
                    </div>
                    <DatePicker
                      value={dischargeDate}
                      onChange={(e) => {
                        setDischargeDate(e);
                        setDischargeError(false);
                      }}
                      className="h-12 w-full placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    />
                  </div>
                </div>{" "}
                <div className="mt-8 w-full flex px-5 gap-[11px]">
                  <div className={`w-1/2 ${caseDateError ? "border-red" : ""}`}>
                    {" "}
                    <div className="mb-2 w-full !font-medium">Case Date</div>
                    <DatePicker
                      value={caseDate}
                      onChange={(e) => {
                        setCaseDate(e);
                        setCaseDateError(false);
                      }}
                      className="h-12 w-full placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    />{" "}
                  </div>{" "}
                  <div className="w-1/2">
                    <div className="mb-2 w-full !font-medium"> Diagnosis</div>
                    <Input
                      style={{ fontFamily: "inter" }}
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      type="text"
                      placeholder="Diagnosis"
                      className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                    />{" "}
                  </div>
                </div>{" "}
                <div className="mt-8 w-full flex px-5 gap-[11px]">
                  <div className="w-1/2">
                    <div className="mb-2 w-full !font-medium">
                      {" "}
                      Treatment Notes
                    </div>
                    <Input
                      style={{ fontFamily: "inter" }}
                      value={treatmentNotes}
                      onChange={(e) => setTreatmentNotes(e.target.value)}
                      type="text"
                      placeholder="Enter  Treatment Notes"
                      className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                    />{" "}
                  </div>
                  <div className="w-1/2">
                    {" "}
                    <div className="mb-2 w-full !font-medium">
                      Estimated Cost
                    </div>{" "}
                    <Input
                      style={{ fontFamily: "inter" }}
                      value={estimatedCost}
                      onChange={(e) => setEstimatedCost(e.target.value)}
                      type="number"
                      placeholder="Enter Estimated Cost"
                      className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                    />{" "}
                  </div>{" "}
                </div>{" "}
                <div className="mt-8 w-full flex px-5 gap-[11px]">
                  <div className="w-1/2">
                    <div className="mb-2 w-full !font-medium">
                      {" "}
                      Additional Notes
                    </div>
                    <Input
                      style={{ fontFamily: "inter" }}
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      type="text"
                      placeholder="Enter Additional Notes"
                      className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                    />{" "}
                  </div>
                  <div className="w-1/2">
                    <div className="mb-2 w-full !font-medium">Symptoms</div>{" "}
                    <Input
                      style={{ fontFamily: "inter" }}
                      onChange={(e) => setSymptoms(e.target.value)}
                      value={symptoms}
                      type="text"
                      placeholder="Enter Symptoms"
                      className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                    />{" "}
                  </div>
                </div>{" "}
                <div className="flex justify-end  px-5 w-full pt-[30px] ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => setNewCase(false)}
                    className="bg-[#11349326] w-[134px] border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
                  >
                    Cancel
                  </Button>{" "}
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => handleSubmit()}
                    className="bg-[#113493] w-[134px] border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
                  >
                    Save
                  </Button>
                </div>
              </div>{" "}
              <div className="w-[30%]  bg-white rounded-lg border border-[#E7E7E7]">
                {" "}
                <div className="py-3 border-b border-[#E7E7E7]">
                  <p className="ml-5 font-semibold text-base text-[#212B36]">
                    Assured Person Details
                  </p>
                </div>
                {assuredData && (
                  <div class="px-7 pt-10 grid grid-cols-2 gap-6">
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Date of Birth</div>
                        <div class="text-gray-500 text-sm">
                          {formatDate(assuredData.birthDate)}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Employee Status</div>
                        <div class="text-gray-500 text-sm">
                          {assuredData.employmentStatus}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Gender</div>
                        <div class="text-gray-500 text-sm">
                          {assuredData.gender}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Start Date</div>
                        <div class="text-gray-500 text-sm">
                          {formatDate(assuredData.startDate)}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Policy</div>
                        <div class="text-gray-500 text-sm">
                          {assuredData.policyStatus}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">End Date</div>
                        <div class="text-gray-500 text-sm">
                          {formatDate(assuredData.endDate)}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Assured ID</div>
                        <div class="text-gray-500 text-sm">
                          {assuredData.assuredID}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Company Details</div>
                        <div class="text-gray-500 text-sm">
                          {assuredData.companyName}
                        </div>
                      </div>
                    </div>
                    <div class="bg-white flex justify-between ">
                      <div>
                        <div class="text-base font-medium">Status</div>
                        <div class="text-gray-500 text-sm">Assured</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="ml-1 w-full pr-[60px] flex flex-col">
          <div className="flex  items-center justify-between">
            <div className="font-medium text-2xl">Pre Approval</div>
            <div className="flex items-center">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setNewCase(true)}
                className="bg-[#113493] w-[212px] border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
              >
                Create New Case
              </Button>
            </div>
          </div>
          <Table
            dataSource={data}
            columns={columns}
            className=" w-full mt-[22px]"
            expandable={{
              expandedRowRender,
              rowExpandable: (record) => true,
              expandedRowKeys: expandedRowKeys, // Use state to control expanded rows
              onExpand: (expanded, record) => toggleRowExpansion(record.key), // Proper toggle function
            }}
            onRow={(record) => ({
              onClick: () => toggleRowExpansion(record.caseNo),
            })}
          />
        </div>
      )}
    </>
  );
};

export default PreApproval;
