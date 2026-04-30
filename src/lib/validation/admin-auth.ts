export type AdminLoginState = {
  email?: string;
  message?: string;
  status: "idle" | "error";
};
