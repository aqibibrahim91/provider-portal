import Modal from "react-responsive-modal";
import { Spin } from "antd";

export default function Loader(props) {
  return (
    <Modal
      open={props.loading}
      classNames={"loading-modal"}
      center
      closeOnOverlayClick={false}
    >
      <Spin />
    </Modal>
  );
}
