import styles from "../styles/styles.module.css";

import { useProduct } from "../hooks/useProduct";
import { createContext, ReactElement, CSSProperties } from "react";
import { Product, ProductContextProps } from "../interfaces/interfaces";

export interface Props {
  product: Product;
  children?: ReactElement | ReactElement[];
  className?: string;
  style?: CSSProperties;
}
export const productContext = createContext({} as ProductContextProps);
const { Provider } = productContext;

export const ProductCard = ({ children, product, className, style }: Props) => {
  const { counter, increaseBy } = useProduct(0);

  return (
    <Provider
      value={{
        counter,
        increaseBy,
        product,
      }}
    >
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children}
      </div>
    </Provider>
  );
};
