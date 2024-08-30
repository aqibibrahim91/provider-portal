"use client";
import React, { useState, useEffect } from "react";
import {
  File,
  Search,
  Maximize,
  Bolt,
  Mail,
  SwatchBook,
  Menu,
} from "lucide-react";
import Image from "next/image";
import slogo from "../public/images/sicon.png";
import logo from "../public/images/logo.png";
import DashboardComponent from "./Dashboard";
import { Button } from "antd";
import IDSearch from "./IDSearch";
import InsertClaimComp from "./InsertClaim";
import LimitsComponent from "./Limits";
import TOBComponent from "./TOB";
import ContactComponent from "./Contact";
import PreApproval from "./PreApproval";
import HealthcareDetails from "../components/HealthCareDetails";
import BatchData from "./BatchData";
import { useDispatch, useSelector } from "react-redux";
import {
  HeaderSearchDeactive,
  removeClaimNumber,
  coll,
  collapsedActive,
  collapsedDeactive,
  deleteSearchID,
} from "./EditInvoiceSlice";
import { isMobile } from "react-device-detect";

const Sidebar = ({ session }) => {
  const claimBit = useSelector((state) => state.editCase.value);
  const searchHeaderBit = useSelector((state) => state.editCase.searchByHeader);
  const [collapsed, setCollapsed] = useState(false);
  const [printClaim, setPrintClaim] = useState(false);

  useEffect(() => {
    setCollapsed(isMobile);
    console.log(isMobile, "mbl");
    if (isMobile) {
      dispatch(collapsedActive());
    } else {
      dispatch(collapsedDeactive());
    }
  }, []);
  const [selectedKey, setSelectedKey] = useState("1");
  const [detailsBit, setDetailsBit] = useState(false);
  const [insertClaim, setInsertClaim] = useState(false);
  const [assuredID, setAssuredIDNew] = useState("");
  const [insertResponse, setInsertResponse] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (insertClaim || claimBit) {
      setSelectedKey("2");
    }
  }, [insertClaim, claimBit]);

  useEffect(() => {
    if (searchHeaderBit) {
      setSelectedKey("3");
    }
  }, [searchHeaderBit]);

  const [loading, setLoading] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed((prevState) => {
      const newState = !prevState;
      newState ? dispatch(collapsedActive()) : dispatch(collapsedDeactive());
      return newState;
    });
  };

  const handleClick = (key) => {
    setSelectedKey(key);
    setPrintClaim(false);
  };

  useEffect(() => {
    setInsertResponse("");
    if (selectedKey != 2) {
      dispatch(removeClaimNumber());
    } else if (selectedKey != 3) {
      dispatch(HeaderSearchDeactive());
      dispatch(deleteSearchID());
    }
  }, [selectedKey]);
  const items = [
    {
      label: "Dashboard",
      icon: <File />,
      component: (
        <>
          {detailsBit ? (
            <HealthcareDetails
              setDetailsBit={setDetailsBit}
              detailsBit={detailsBit}
              session={session}
            />
          ) : (
            <DashboardComponent
              setDetailsBit={setDetailsBit}
              detailsBit={detailsBit}
              session={session}
            />
          )}
        </>
      ),
      key: "1",
    },
    {
      label: "Insert Claim",
      component: (
        <InsertClaimComp
          session={session}
          setInsertClaim={setInsertClaim}
          insertClaim={insertClaim}
          setAssuredIDNew={setAssuredIDNew}
          assuredIDNew={assuredID}
          insertResponse={insertResponse}
          setPrintClaim={setPrintClaim}
          printClaim={printClaim}
        />
      ),
      icon: <File />,
      key: "2",
    },
    {
      label: "Search ID",
      component: (
        <IDSearch
          session={session}
          setInsertClaim={setInsertClaim}
          insertClaim={insertClaim}
          setAssuredIDNew={setAssuredIDNew}
          assuredIDNew={assuredID}
          setInsertResponse={setInsertResponse}
        />
      ),
      icon: <Search />,
      key: "3",
    },
    {
      label: "Limits",
      component: <LimitsComponent session={session} />,
      icon: <Maximize />,
      key: "4",
    },
    {
      label: "TOB",
      component: <TOBComponent session={session} />,
      icon: <Bolt />,
      key: "5",
    },
    {
      label: "Contact",
      component: <ContactComponent />,
      icon: <Mail />,
      key: "6",
    },
    {
      label: "Pre Approval Page",
      icon: <SwatchBook />,
      component: <PreApproval session={session} />,
      key: "7",
      
    },
  ];

  const renderContent = () => {
    const selectedItem = items.find((item) => item.key === selectedKey);
    return selectedItem ? (
      <div className="flex w-full mt-[92px] px-[14px]">
        {selectedItem.component}
      </div>
    ) : (
      <div>404 - Not Found</div>
    );
  };

  return (
    <div className="flex w-full absolute">
      <div
        className={`z-10 h-screen bg-white flex flex-col font-inter ${collapsed ? "w-20" : "w-[280px]"
          }`}
      >
        <div className={` ${collapsed ? "" : "w-[280px]"}`}>
          <div className="flex py-7">
            {collapsed ? (
              <Image
                src={slogo}
                width={38}
                height={39}
                className="flex justify-center m-auto " alt="mo-data"
              />
            ) : (
              <Image
                src={logo}
                width={197}
                height={39}
                className="flex pl-4 " alt="mo-data"
              />
            )}
          </div>

          <div className="flex flex-col relative ">
            <div className={`${collapsed ? "mt-6" : ""}`}>
              {" "}
              {items.map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleClick(item.key)}
                  className={`flex items-center text-base  gap-3  cursor-pointer  ${collapsed
                      ? "w-20  justify-center items-center align-middle flex"
                      : "w-[280px] pl-[40px]"
                    } ${selectedKey === item.key
                      ? "bg-[#113493] text-white"
                      : "bg-white text-black"
                    }`}
                  style={{ height: "80px", opacity: "0.8" }}
                >
                  {item.icon}
                  {!collapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </div>
              ))}
            </div>
            {!collapsed ? (
              <Button
                type="text"
                className="flex mt-2   absolute -top-16 right-0"
                onClick={() => toggleCollapsed()}
              >
                <Menu className="h-8 w-7" />
              </Button>
            ) : (
              <Button
                type="text"
                className="flex mt-2 absolute -top-6 left-2"
                onClick={() => toggleCollapsed()}
              >
                <Menu className="h-8 w-7" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full bg-red-500">{renderContent()}</div>
    </div>
  );
};

export default Sidebar;
