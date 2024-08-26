export default function StatusLabel(props) {
  const getStatusClass = () => {
    if (props.status == "Approved") {
      return "approved";
    } else if (props.status == "Under Review") {
      return "under-review";
    } else if (props.status == "Rejected") {
      return "rejected";
    }
  };
  return (
    <>
      <div
        className={`${getStatusClass()} mb-4 font-bold w-32 text-center rounded-full h-9 pt-2`}
      >
        {props.status}
      </div>
    </>
  );
}
