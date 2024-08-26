import React from "react";
import { Table } from "antd";

const DataTable = ({ columns, dataSource, className = "" }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      className={`!font-inter ${className}`}
    />
  );
};

export default DataTable;
