import React from "react";
import { Button, Input } from "antd";
import { Save, ReceiptText, Trash2, SquarePen, Search } from "lucide-react";

function SearchAssured() {
  return (
    <div className="ml-1 w-full pr-[60px] flex flex-col">
      <div className="flex  items-center justify-between">
        <div className="font-medium text-2xl">Batch Data</div>
        <div className="flex items-center">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#113493] w-[212px] border-none ml-2.5 text-white h-[48px] font-inter !font-medium text-base"
          >
            <Search />
          </Button>
        </div>
      </div>{" "}
    </div>
  );
}

export default SearchAssured;
