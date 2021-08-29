import React from "react";

import Message from "../../components/Message";

import { deduplicate, filterData, removeItem } from "../../plugins/data";

import originalMessages from "../../assets/data.json";

const messages = deduplicate(originalMessages.messages);

const MessageList = () => {
  // all data
  const [data, setData] = React.useState([]);
  // message list for current page
  const [list, setList] = React.useState(messages);
  // current page for pagination
  const [page, setPage] = React.useState(1);
  // sort type
  const [sortType, setSortType] = React.useState("asc");
  // count per page: default count is 5
  const [countPerPage, setCountPerPage] = React.useState(5);

  React.useEffect(() => {
    // initialize data and deduplicate
    setData(deduplicate(originalMessages.messages));
  }, []);

  React.useEffect(() => {
    // fetch/filter data with pagination and sort
    const filteredData = filterData(data, page, sortType);
    setList(filteredData);
  }, [data, page, sortType]);

  return (
    <div>
      <div className="row">
        <div className="col-3">SenderUuid</div>
        <div className="col-3">Content</div>
        <div className="col-3">Date</div>
        <div className="col-3">Action</div>
      </div>
      {list.map((item) => (
        <Message
          key={`${item.uuid}-${item.content}`}
          senderUuid={item.senderUuid}
          content={item.content}
          sentAt={item.sentAt}
          removeItem={() => setData(removeItem(item, data))}
        />
      ))}
      <div className="float-right">
        {/* prev button:disabled when current page is 1 */}
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        {/* display current page/total page */}
        <span>
          {page}/{Math.ceil(data.length / countPerPage)}
        </span>
        {/* next button:disabled when current page is over the total page */}
        <button
          disabled={page * countPerPage > data.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        {/* sort button: can toggle asc and toggle */}
        <button
          onClick={() => setSortType(sortType === "asc" ? "desc" : "asc")}
        >
          Sort By Date {sortType.toUpperCase()}
        </button>
      </div>
    </div>
  );
};

export default MessageList;
