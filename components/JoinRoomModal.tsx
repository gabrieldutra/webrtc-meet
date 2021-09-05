import { ModalProps, Modal, Input, Form } from "antd";
import { useState } from "react";

export interface JoinRoomModalProps extends Omit<ModalProps, "onOk"> {
  onOk?: (roomId: string) => void;
}

export function JoinRoomModal({ onOk, ...otherProps }: JoinRoomModalProps) {
  const [roomId, setRoomId] = useState("");
  return (
    <Modal
      title="Join an existing room"
      {...otherProps}
      okButtonProps={{ htmlType: "submit", form: "joinRoomModalForm" }}
      okText="Join"
    >
      <Form
        id="joinRoomModalForm"
        onFinish={({ roomId }) => onOk?.(roomId)}
        validateMessages={{ required: "This field is required!" }}
      >
        <Form.Item name="roomId" label="Room ID" rules={[{ required: true }]}>
          <Input
            autoFocus
            placeholder="Enter the Room Id here"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
