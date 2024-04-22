import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderResponseToast(
  response?: {
    success: boolean;
    message: string;
  },
  callbacks?: {
    onSuccess?: () => void;
    onError?: () => void;
    onFinish?: () => void;
  },
  successNotification = true,
  errorNotification = true
) {
  const { onSuccess, onError, onFinish } = callbacks ?? {};
  toast.dismiss();
  if (!response?.success) {
    errorNotification && toast.error(response?.message);
    onError?.();
  } else {
    successNotification && toast.success(response.message);
    onSuccess?.();
  }
  onFinish?.();
}
