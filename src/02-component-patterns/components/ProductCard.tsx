import styles from "../styles/styles.module.css";

import { useProduct } from "../hooks/useProduct";
import { createContext, CSSProperties } from "react";
import {
  InitialValues,
  OnChangeArgs,
  Product,
  ProductCardHandlers,
  ProductContextProps,
} from "../interfaces/interfaces";

export interface Props {
  value?: number;
  product: Product;
  className?: string;
  style?: CSSProperties;
  onChange?: (args: OnChangeArgs) => void;
  //children?: ReactElement | ReactElement[];
  children: (args: ProductCardHandlers) => JSX.Element;
  initialValues?: InitialValues;
}

export const productContext = createContext({} as ProductContextProps);
const { Provider } = productContext;

export const ProductCard = ({
  value,
  style,
  product,
  children,
  onChange,
  className,
  initialValues,
}: Props) => {
  const { counter, increaseBy, maxCount, isMaxCountReached, reset } =
    useProduct({
      value,
      product,
      onChange,
      initialValues,
    });

  return (
    <Provider
      value={{
        counter,
        product,
        maxCount,
        increaseBy,
      }}
    >
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children({
          count: counter,
          isMaxCountReached,
          maxCount: initialValues?.maxCount,
          product,
          increaseBy,
          reset,
        })}
      </div>
    </Provider>
  );
};
