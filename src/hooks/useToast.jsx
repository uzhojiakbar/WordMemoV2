import toast from "react-hot-toast";

export const useToast = (type="ok",text) => {
    if (type === "ok") {
        toast.success(text || "Tayyor");
    } else if (type === "err") {
        toast.error(text || "Xato");
    } else if (type === "wait") {
        toast.loading(text || "Kuting...");
    }
}