import { useParams } from "react-router-dom";
import { useQuery }  from "@tanstack/react-query";
import { useState }  from "react";
import { productKeys } from "./useProducts";
import { getProductById } from "../services/product";
import type { TabKey } from "../types";


export const useProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: productKeys.detail(Number(id)),
    queryFn:  () => getProductById(Number(id)),
    enabled:  !!id,
    staleTime: 1000 * 60 * 5,
  });

  // Image carousel index
  const [activeImage, setActiveImage] = useState(0);

  // Zoom lightbox
  const [zoomOpen, setZoomOpen] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  // Quantity
  const [qty, setQty] = useState(1);
  const increment = () => setQty((q) => Math.min(q + 1, product?.stock ?? 99));
  const decrement = () => setQty((q) => Math.max(q - 1, 1));

  return {
    product,
    isLoading,
    isError,
    activeImage, setActiveImage,
    zoomOpen, setZoomOpen,
    activeTab, setActiveTab,
    qty, increment, decrement,
  };
};