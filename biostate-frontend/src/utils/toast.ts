import { toast } from "react-toastify";

const defaultToastOptions = {
  position: "bottom-center" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string
) => {
  switch (type) {
    case "success":
      toast.success(message, defaultToastOptions);
      break;
    case "error":
      toast.error(message, defaultToastOptions);
      break;
    case "info":
      toast.info(message, defaultToastOptions);
      break;
    case "warning":
      toast.warning(message, defaultToastOptions);
      break;
    default:
      toast(message, defaultToastOptions);
  }
};
