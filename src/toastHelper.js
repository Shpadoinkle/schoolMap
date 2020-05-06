import { css } from "glamor";
import { toast } from "react-toastify";
import themeStore from "./mobx/theme";

const basicStyle = (color) => ({
  className: css({
    backgroundColor: color || themeStore.GREEN,
    paddingLeft: 15,
    borderRadius: 5,
  }),
  bodyClassName: css({
    color: "#fff",
  }),
});

export const toastSuccess = (text) => {
  toast.error(text, basicStyle());
};

export const toastError = (text) => {
  toast.error(text, basicStyle(themeStore.RED));
};
