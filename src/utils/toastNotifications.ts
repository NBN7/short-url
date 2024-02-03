import { toast } from "react-hot-toast";

const toastStyle = {
  style: {
    backgroundColor: "#18181B",
    color: "#ffffff",
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
