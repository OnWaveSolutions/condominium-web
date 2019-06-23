import styled from "styled-components";
import { palette } from "styled-theme";

export const Wrapper = styled.div`
  width: auto;
  overflow: inherit;
  position: relative;
  .isoInvoiceTable {
    table {
      tbody {
        tr {
          td {
            .isoInvoiceBtnView {
              display: flex;
              flex-direction: row;
              > a {
                margin: ${(props: any) =>
                  props["data-rtl"] === "rtl" ? "0 0 0 15px" : "0 15px 0 0"};
              }
            }
          }
          &:hover {
            .isoInvoiceBtnView {
              ${"" /* opacity: 1; */};
            }
          }
        }
      }
    }
  }

  .invoiceListTable {
    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      &:hover {
        background-color: ${palette("secondary", 1)};
      }
    }

    .invoiceViewBtn {
      color: ${palette("text", 3)};

      &:hover {
        color: ${palette("primary", 0)};
      }
    }

    .invoiceDltBtn {
      font-size: 18px;
      border: 0;
      margin: 0 0.2em;

      &:hover {
        border: 0;
      }
    }
  }
`;

export const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette("primary", 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.pending {
    background-color: ${palette("error", 0)};
  }

  &.shipped {
    background-color: ${palette("warning", 0)};
  }

  &.delivered {
    background-color: ${palette("success", 0)};
  }
`;
