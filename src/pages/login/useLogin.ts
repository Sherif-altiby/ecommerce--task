import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "./loginSchema";
import { DUMMY_USERS } from "./constants";
import { useLang } from "../../store/hooks";

export const useLogin = () => {
  const navigate              = useNavigate();
  const { isAr }              = useLang();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [success,   setSuccess]   = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const user = DUMMY_USERS.find(
      (u) => u.email === data.email && u.password === data.password
    );

    if (user) {
    //   tokenService.setToken(user.token);
      localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));
      setSuccess(true);
      setTimeout(() => navigate("/"), 1000);
    } else {
      setAuthError(
        isAr
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة"
          : "Invalid email or password"
      );
    }

    setIsLoading(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    touchedFields,
    onSubmit,
    isLoading,
    authError,
    success,
  };
};