import { ModalProps, Modal, Input } from "antd";
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
      onOk={() => onOk?.(roomId)}
      okText="Join"
    >
      <Input
        placeholder="Enter the Room Id here"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
    </Modal>
  );
}
