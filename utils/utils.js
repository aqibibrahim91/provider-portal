export const getDashboardData = () => {
  return [
    {
      key: "1",
      id: "1",
      batchNumber: "07-2024-213-1",
      claims: "01",
      sumOfClaims: 15,
      status: "Completed",
    },
    {
      key: "2",
      id: "2",
      batchNumber: "07-2024-213-1",
      claims: "01",
      sumOfClaims: 15,
      status: "Rejected",
    },
    {
      key: "3",
      id: "3",
      batchNumber: "07-2024-213-1",
      claims: "01",
      sumOfClaims: 15,
      status: "Under Review",
    },
  ];
};
export const TableData = [
  {
    key: "1",
    invoice: "1",
    date: "12 / 09 / 2025",
    Provider: "New York No. 1 Lake Park",
    MedicalService: "LFT",
    Gross: "11235",
  },
  {
    key: "2",
    invoice: "2",
    date: "12 / 09 / 2025",
    Provider: "New York No. 1 Lake Park",
    MedicalService: "LFT",
    Gross: "11235",
  },
  {
    key: "3",
    invoice: "3",
    date: "12 / 09 / 2025",
    Provider: "New York No. 1 Lake Park",
    MedicalService: "LFT",
    Gross: "11235",
  },
];
export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};
