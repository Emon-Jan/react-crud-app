import { Modal } from "antd";

const ModalComponent = ({
  visible,
  modalTitle,
  onCancel,
  onAction,
  children,
  okText,
  zIndex,
}) => {
  return (
    <Modal
      visible={visible}
      title={modalTitle}
      okText={okText}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={onAction}
      keyboard={false}
      zIndex={zIndex || 1000}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
