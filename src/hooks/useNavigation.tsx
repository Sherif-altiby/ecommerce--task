import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path: string, params?: Record<string, string>) => {
    if (params) {
      const query = new URLSearchParams(params).toString();
      navigate(`${path}?${query}`);
    } else {
      navigate(path);
    }
  };

  return { goTo };
};