"use client";
import React, { useState } from "react";
import { Input, Button } from "antd";
import { Search, Bell, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addClaimNumber,
  editCaseActive,
  setSearchID,
  HeaderSearchActive,
} from "../components/EditInvoiceSlice";

function HeaderBar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.editCase.collapsed);
  console.log(collapsed, "pppop");
  const [claimNumber, setClaimNumberInput] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSignOut = async () => {
    await signOut({
      redirect: "/secure/login", // Redirect to home or login page after sign-out
    });
  };

  const handleClaimNumberChange = (e) => {
    const value = e.target.value;
    setClaimNumberInput(value);
  };
  const handleSearchIDChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
  };

  return (
    <div
      className={`flex items-center my-3 top-0 ${
        collapsed ? "ml-[70px]" : "ml-[280px]"
      }  h-[70px]`}
    >
      <div className="flex">
        <Input
          type="text"
          value={searchInput}
          onChange={handleSearchIDChange}
          placeholder="Search Card#"
          className="h-12 w-[222px] lg:w-[270px] ml-[14px] !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
        />
        <Button
          type="primary"
          htmlType="submit"
          className="bg-[#113493] border-none ml-2.5 text-white h-[46px] w-[46px] font-inter"
          onClick={() => {
            dispatch(HeaderSearchActive());
            dispatch(setSearchID(searchInput));
          }}
        >
          <Search className="h-5 w-5" />
        </Button>
        <Input
          type="text"
          placeholder="Search Claim#"
          value={claimNumber}
          onChange={handleClaimNumberChange}
          className="h-12 w-[222px] lg:w-[270px] ml-2.5 !font-inter rounded-lg text-sm font-medium bg-[#F8FAFC] placeholder:text-[15px] placeholder:text-[#ACB6BE] border border-[#E7E7E7]"
        />
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            dispatch(editCaseActive());
            dispatch(addClaimNumber(claimNumber));
          }}
          className="bg-[#113493] border-none ml-2.5 text-white h-[46px] w-[46px] font-inter"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex justify-end ml-auto lg:mr-16 ">
        <div className="flex lg:!gap-4">
          <Button type="text">
            <Bell className=" w-5 h-5 lg:h-6 lg:w-6" />{" "}
          </Button>
          <Button
            type="text"
            onClick={() => {
              handleSignOut();
            }}
          >
            <LogOut className=" w-5 h-5  lg:h-6 lg:w-6 hover:cursor-pointer" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderBar;
