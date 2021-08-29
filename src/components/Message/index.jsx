import React from "react";
import PropTypes from "prop-types";

const Message = ({ senderUuid, content, sentAt, removeItem }) => {
  const date = new Date(sentAt);
  return (
    <div className="row py-16">
      <div className="col-3">{senderUuid}</div>
      <div className="col-3">{content}</div>
      <div className="col-3">{date.toUTCString()}</div>
      <div className="col-3">
        <button onClick={removeItem}>Del</button>
      </div>
    </div>
  );
};

Message.propTypes = {
  senderUuid: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  sentAt: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default Message;
