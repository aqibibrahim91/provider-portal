"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  HeaderSearchDeactive,
  removeClaimNumber,
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

  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState("1");

  useEffect(() => {
    setCollapsed(isMobile);
    if (isMobile) {
      dispatch(collapsedActive());
    } else {
      dispatch(collapsedDeactive());
    }
  }, []);

  useEffect(() => {
    if (claimBit) {
      setSelectedKey("2");
    }
  }, [claimBit]);

  useEffect(() => {
    if (searchHeaderBit) {
      setSelectedKey("3");
    }
  }, [searchHeaderBit]);

  useEffect(() => {
    if (selectedKey !== "2") {
      dispatch(removeClaimNumber());
    }
    if (selectedKey !== "3") {
      dispatch(HeaderSearchDeactive());
      dispatch(deleteSearchID());
    }
  }, [selectedKey, dispatch]);

  const toggleCollapsed = () => {
    setCollapsed((prevState) => {
      const newState = !prevState;
      newState ? dispatch(collapsedActive()) : dispatch(collapsedDeactive());
      return newState;
    });
  };
  const handleClick = (key, href) => {
    setPrintClaim(false);
    router.replace(href);
    setSelectedKey(key);
  };

  const items = [
    {
      label: <Link href="/Dashboard">Dashboard</Link>,
      icon: <File />,
      key: "1",
      href: "/Dashboard",
    },
    {
      label: <Link href="/insertClaim">Insert Claim</Link>,
      icon: <File />,
      key: "2",
      href: "/insertClaim",
    },
    {
      label: <Link href="/IdSearch">Search ID</Link>,
      icon: <Search />,
      key: "3",
      href: "/IdSearch",
    },
    {
      label: <Link href="/Limits">Limits</Link>,
      icon: <Maximize />,
      key: "4",
      href: "/Limits",
    },
    {
      label: <Link href="/TOB">TOB</Link>,
      icon: <Bolt />,
      key: "5",
      href: "/TOB",
    },
    {
      label: <Link href="/Contact">Contact</Link>,
      icon: <Mail />,
      key: "6",
      href: "/Contact",
    },
    {
      label: <Link href="/Preapproval">Pre Approval</Link>,
      icon: <SwatchBook />,
      key: "7",
      href: "/Preapproval",
    },
  ];

  return (
    <div className="flex">
      <div
        className={`z-10 h-screen bg-white flex flex-col font-inter ${
          collapsed ? "w-20" : "w-[280px]"
        } transition-width duration-300`}
      >
        <div className={` ${collapsed ? "" : "w-[280px]"}`}>
          <div className="flex py-7">
            {collapsed ? (
              <Image
                src={slogo}
                width={38}
                height={39}
                className="flex justify-center m-auto"
                alt="mo-data"
              />
            ) : (
              <Image
                src={logo}
                width={197}
                height={39}
                className="flex pl-4"
                alt="mo-data"
              />
            )}
          </div>

          <div className="flex flex-col relative">
            <div className={`${collapsed ? "mt-6" : ""}`}>
              {items.map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleClick(item.key, item.href)}
                  className={`flex items-center text-base gap-3 cursor-pointer ${
                    collapsed
                      ? "w-20 justify-center items-center align-middle flex"
                      : "w-[280px] pl-[40px]"
                  } ${
                    selectedKey === item.key
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
            <Button
              type="text"
              className={`flex mt-2 absolute ${
                collapsed ? "-top-6 left-2" : "-top-16 right-0"
              }`}
              onClick={() => toggleCollapsed()}
            >
              <Menu className="h-8 w-7" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        {/* Add your page content or other components here */}
      </div>
    </div>
  );
};

export default Sidebar;
