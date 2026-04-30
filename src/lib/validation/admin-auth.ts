export type AdminLoginState = {
  email?: string;
  message?: string;
  status: "idle" | "error";
};

export type AdminLoginInput = {
  email: string;
  password: string;
};

type AdminLoginValidationResult =
  | { data: AdminLoginInput; success: true }
  | { email: string; message: string; success: false };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateAdminLoginForm(
  formData: FormData,
): AdminLoginValidationResult {
  const email = readString(formData, "email").toLowerCase();
  const password = readRawString(formData, "password");

  if (!email || !password) {
    return {
      email,
      message: "Informe e-mail e senha para acessar a área administrativa.",
      success: false,
    };
  }

  if (email.length > 160 || !emailPattern.test(email)) {
    return {
      email,
      message: "Informe um e-mail válido para acessar a área administrativa.",
      success: false,
    };
  }

  if (password.length > 256) {
    return {
      email,
      message: "A senha informada é inválida.",
      success: false,
    };
  }

  return {
    data: { email, password },
    success: true,
  };
}

function readString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value.trim() : "";
}

function readRawString(formData: FormData, field: string) {
  const value = formData.get(field);

  return typeof value === "string" ? value : "";
}
