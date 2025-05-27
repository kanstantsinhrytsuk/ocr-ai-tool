import React from "react";
import ReactJson from "react-json-view";

import { Status } from "@constants/actions";

import { Message } from "./styled";


interface Result {
  status: Status;
  data: object;
}

const ResponseMessage = ({ result }: { result: Result }) => {
  const { status, data } = result;

  if (status === Status.Error) {
    return (
      <Message status={status}>
        {data.message || "An error occurred"}
      </Message>
    );
  }

  return (
    <Message status={status}>
      <ReactJson src={data} />
    </Message>
  );
}

export default ResponseMessage;