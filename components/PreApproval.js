import React, { useState } from "react";
import { Table, Button, Space, DatePicker, Input, Select } from "antd";
import { Trash2, SquarePen, Search } from "lucide-react";

const PreApproval = () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [newCase, setNewCase] = useState(false);

  const dataSource = [
    {
      key: "1",
      id: "1",
      name: "Jim Green",
      case_no: "90943434",
      doctor_name: "Wahid",
      diagnosis: "Pancreatic Cyst Surgery- Inpatient",
      cost: "4564564",
      approval_status: "Approved",
    },
    {
      key: "2",
      id: "2",
      name: "Jim Green",
      case_no: "90943434",
      doctor_name: "Wahid",
      diagnosis: "Pancreatic Cyst Surgery- Inpatient",
      cost: "4564564",
      approval_status: "Approved",
    },
    {
      key: "3",
      id: "3",
      name: "Jim Green",
      case_no: "90943434",
      doctor_name: "Wahid",
      diagnosis: "Pancreatic Cyst Surgery- Inpatient",
      cost: "4564564",
      approval_status: "Approved",
    },
  ];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Case No", dataIndex: "case_no", key: "case_no" },
    { title: "Doctor Name", dataIndex: "doctor_name", key: "doctor_name" },
    { title: "Diagnosis", dataIndex: "diagnosis", key: "diagnosis" },
    { title: "Cost", dataIndex: "cost", key: "cost" },
    {
      title: "Approval Status",
      dataIndex: "approval_status",
      key: "approval_status",
    },
    {
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <SquarePen className="text-[#2B3F6C]" />
          </a>{" "}
          <a>
            <Trash2 className="text-red" />
          </a>{" "}
        </Space>
      ),
    },
  ];

  const toggleRowExpansion = (key) => {
    setExpandedRowKeys(
      expandedRowKeys.includes(key)
        ? expandedRowKeys.filter((k) => k !== key)
        : [...expandedRowKeys, key]
    );
  };

  const expandedRowRender = (record) => (
    <div
      style={{ padding: "16px", background: "#f5f5f5" }}
      className="flex justify-evenly"
    >
      <div className="flex flex-col gap-1">
        {" "}
        <p className="font-medium text-[14px] leading-6">Admission Date</p>
        <p className="text-[#637381] text-[14px]">12/09/2023</p>
      </div>
      <div className="flex flex-col gap-1">
        {" "}
        <p className="font-medium text-[14px] leading-6">Discharge Date</p>
        <p className="text-[#637381] text-[14px]">12/09/2023</p>
      </div>{" "}
      <div className="flex flex-col gap-1">
        {" "}
        <p className="font-medium text-[14px] leading-6">Case Date</p>
        <p className="text-[#637381] text-[14px]">12/09/2023</p>
      </div>{" "}
      <div className="flex flex-col gap-1">
        {" "}
        <p className="font-medium text-[14px] leading-6">Procedure</p>
        <p className="text-[#637381] text-[14px]">
          Procedure as P1 for dental Surgery
        </p>
      </div>{" "}
      <div className="flex flex-col gap-1">
        {" "}
        <p className="font-medium text-[14px] leading-6">Treatment</p>
        <p className="text-[#637381] text-[14px]">Test Treatment</p>
      </div>
    </div>
  );

  return (
    <>
      {newCase ? (
        <div className="ml-1 w-full pr-[60px] flex flex-col">
          <div className="flex  items-center justify-between">
            <div className="font-medium text-2xl">Search Assured Person</div>
            <div className="flex items-center">
              <Input
                type="email"
                placeholder="Enter Assured Person Name"
                className="h-12 w-[270px] ml-[14px] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
              />
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => setNewCase(true)}
                className="bg-[#113493] w-[46px] border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
              >
                <Search />
              </Button>
            </div>
          </div>{" "}
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
                  <Select
                    defaultValue="Provider Medical Service"
                    className="h-12 w-full  placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    style={{}}
                    options={[
                      {
                        value: "1",
                        label: "Liver Function Test LFT",
                      },
                    ]}
                  />
                </div>{" "}
                <div className="w-1/2">
                  <div className="mb-2 w-full !font-medium">Phone Number</div>
                  <Input
                    style={{ fontFamily: "inter" }}
                    type="text"
                    placeholder="+9235645646456"
                    className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                  />
                </div>
              </div>{" "}
              <div className="mt-8 w-full flex px-5 gap-[11px]">
                <div className="w-1/2">
                  {" "}
                  <div className="mb-2 w-full !font-medium">
                    Doctor Contact Number
                  </div>{" "}
                  <Input
                    type="invoice_number"
                    placeholder="Enter Doctor Contact"
                    className="h-12 px-3  placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                  />
                </div>{" "}
                <div className="w-1/2">
                  <div className="mb-2 w-full !font-medium">Case Date</div>
                  <DatePicker className="h-12 w-full placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]" />
                </div>
              </div>{" "}
              <div className="mt-8 w-full flex px-5 gap-[11px]">
                <div className="w-1/2">
                  {" "}
                  <div className="mb-2 w-full !font-medium">
                    Estimated Date of Admission
                  </div>{" "}
                  <DatePicker className="h-12 w-full placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]" />
                </div>{" "}
                <div className="w-1/2">
                  <div className="mb-2 w-full !font-medium">
                    {" "}
                    Estimated Date of Discharge
                  </div>
                  <DatePicker className="h-12 w-full placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]" />
                </div>
              </div>{" "}
              <div className="mt-8 w-full flex px-5 gap-[11px]">
                <div className="w-1/2">
                  {" "}
                  <div className="mb-2 w-full !font-medium">Symptoms</div>{" "}
                  <Input
                    style={{ fontFamily: "inter" }}
                    type="text"
                    placeholder="Enter Symptoms"
                    className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                  />{" "}
                </div>{" "}
                <div className="w-1/2">
                  <div className="mb-2 w-full !font-medium"> Diagnosis</div>
                  <Select
                    defaultValue="Select Diagnosis"
                    className="h-12 w-full  placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    style={{}}
                    options={[
                      {
                        value: "1",
                        label: "Liver Function Test LFT",
                      },
                    ]}
                  />{" "}
                </div>
              </div>{" "}
              <div className="mt-8 w-full flex px-5 gap-[11px]">
                <div className="w-1/2">
                  {" "}
                  <div className="mb-2 w-full !font-medium">Procedure</div>{" "}
                  <Select
                    defaultValue="Select Procedure"
                    className="h-12 w-full  placeholder:text-[#637381] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px]  border border-[#E7E7E7]"
                    style={{}}
                    options={[
                      {
                        value: "1",
                        label: "Liver Function Test LFT",
                      },
                    ]}
                  />{" "}
                </div>{" "}
                <div className="w-1/2">
                  <div className="mb-2 w-full !font-medium">
                    {" "}
                    Treatment Notes
                  </div>
                  <Input
                    style={{ fontFamily: "inter" }}
                    type="text"
                    placeholder="Enter  Treatment Notes"
                    className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                  />{" "}
                </div>
              </div>{" "}
              <div className="mt-8 w-full flex px-5 gap-[11px]">
                <div className="w-1/2">
                  {" "}
                  <div className="mb-2 w-full !font-medium">
                    Estimated Cost
                  </div>{" "}
                  <Input
                    style={{ fontFamily: "inter" }}
                    type="text"
                    placeholder="Enter Estimated Cost"
                    className="h-12  w-full rounded-lg text-sm  bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
                  />{" "}
                </div>{" "}
                <div className="w-1/2">
                  <div className="mb-2 w-full !font-medium">
                    {" "}
                    Additional Notes
                  </div>
                  <Input
                    style={{ fontFamily: "inter" }}
                    type="text"
                    placeholder="Enter Additional Notes"
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
                  onClick={() => setNewCase(true)}
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
              <div class="px-7 pt-10 grid grid-cols-2 gap-6">
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">Date of Birth</div>
                    <div class="text-gray-500 text-sm">In Active</div>
                  </div>
                </div>
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">Employee Status</div>
                    <div class="text-gray-500 text-sm">In Active</div>
                  </div>
                </div>
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">Gender</div>
                    <div class="text-gray-500 text-sm">Male</div>
                  </div>
                </div>
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">Start Date</div>
                    <div class="text-gray-500 text-sm">24th July, 2025</div>
                  </div>
                </div>
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">Policy</div>
                    <div class="text-gray-500 text-sm">Active</div>
                  </div>
                </div>
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">End Date</div>
                    <div class="text-gray-500 text-sm">24th July, 2025</div>
                  </div>
                </div>
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">Assured ID</div>
                    <div class="text-gray-500 text-sm">123-332-112-1</div>
                  </div>
                </div>
                <div class="bg-white flex justify-between ">
                  <div>
                    <div class="text-base font-medium">Company Details</div>
                    <div class="text-gray-500 text-sm">
                      Medicare Health Insurance Company
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
            </div>
          </div>
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
            dataSource={dataSource}
            columns={columns}
            className=" w-full mt-[22px]"
            expandable={{
              expandedRowRender,
              rowExpandable: (record) => true,
              expandedRowKeys: expandedRowKeys,
              onExpand: (expanded, record) => toggleRowExpansion(record.key),
            }}
            onRow={(record) => ({
              onClick: () => toggleRowExpansion(record.key),
            })}
          />
        </div>
      )}
    </>
  );
};

export default PreApproval;
