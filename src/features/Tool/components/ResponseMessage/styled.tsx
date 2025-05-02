import { styled } from "@mui/material/styles";
import { Status } from "../../../../constants/actions";

export const Message = styled("div")<{ status: Status }>`
  padding: 16px;
  background-color: ${({ status }) =>
    status === Status.Error ? "#f5dfe0" : "#f1fff3"};
  color: ${({ status }) =>
    status === Status.Error ? "#4c0e16" : "#01480a"};
`;