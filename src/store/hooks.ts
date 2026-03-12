import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector);

//  hook that gives you everything you need
export const useLang = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { lang, dir } = useSelector((state: RootState) => state.language);
  const { t } = useTranslation();
  const isAr = lang === "ar";

  return { lang, dir, isAr, t, dispatch };
};