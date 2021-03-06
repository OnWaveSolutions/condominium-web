import { ComponentType } from "react";
import styled from "styled-components";
import { palette } from "styled-theme";
import { borderRadius, transition } from "../../shared-ui/settings/style/utils";

function withInputStyle<T extends object>(
  ComponentName: ComponentType<T>
): ComponentType<T> {
  return styled(ComponentName)`
    width: 100% !important;
    &.ant-input {
      cursor: text;
      text-align: ${(props: T) =>
        (props as any)["data-rtl"] === "rtl" ? "right" : "left"};
      color: ${palette("text", 1)};
      background-color: #fff;
      background-image: none;
      border: 1px solid ${palette("border", 0)};
      width: 100% !important;
      ${transition()};

      &:focus {
        border-color: ${palette("primary", 0)};
      }

      &.ant-input-lg {
        padding: 6px 10px;
      }

      &.ant-input-sm {
        padding: 1px 10px;
      }

      &::-webkit-input-placeholder {
        text-align: ${(props: T) =>
          (props as any)["data-rtl"] === "rtl" ? "right" : "left"};
        color: ${palette("grayscale", 0)};
      }

      &:-moz-placeholder {
        text-align: ${(props: T) =>
          (props as any)["data-rtl"] === "rtl" ? "right" : "left"};
        color: ${palette("grayscale", 0)};
      }

      &::-moz-placeholder {
        text-align: ${(props: T) =>
          (props as any)["data-rtl"] === "rtl" ? "right" : "left"};
        color: ${palette("grayscale", 0)};
      }
      &:-ms-input-placeholder {
        text-align: ${(props: T) =>
          (props as any)["data-rtl"] === "rtl" ? "right" : "left"};
        color: ${palette("grayscale", 0)};
      }
    }
  ` as any;
}

export default withInputStyle;
