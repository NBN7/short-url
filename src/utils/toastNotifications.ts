import { toast } from "react-hot-toast";

const toastStyle = {
  style: {
    backgroundColor: "#006FEF",
    color: "#fff",
    borderRadius: "10px",
  },
  duration: 1500,
};

export const toastSuccess = (message: string) => {
  toast.success(message, toastStyle);
};

export const toastError = (message: string) => {
  toast.error(message, toastStyle);
};
