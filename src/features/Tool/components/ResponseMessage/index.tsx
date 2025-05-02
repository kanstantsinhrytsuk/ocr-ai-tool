import React from "react";
import Markdown from "react-markdown";

import type { Status } from "@constants/actions";

import { Message } from "./styled";


interface Result {
  status: Status;
  message: string;
}

const ResponseMessage = ({ result }: { result: Result }) => {
  const { status, message } = result;

  return (
    <Message status={status}>
      <Markdown>{message}</Markdown>
    </Message>
  );
}

export default ResponseMessage;