import React, { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import {
  PictureOutlined,
  SendOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const MessageForm = (props) => {
  const [value, setValue] = useState("");
  const { chatId, creds } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = value.trim();
    if (text.length > 0) sendMessage(creds, chatId, { text });
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    isTyping(props, chatId);
  };

  const handleUpload = (e) => {
    sendMessage(creds, chatId, { files: e.target.files, text: "" });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Enter a message here ..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
        <input
          type="file"
          multiple={false}
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </label>
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="logout-button"
      >
        <LogoutOutlined />
      </button>
    </form>
  );
};

export default MessageForm;
