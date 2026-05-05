import {createRoot} from "react-dom/client";
import "./index.css";

import Modal from "./shared/components/Modal"
import {type ReactElement, useState} from "react";
import ProductCreateForm from "./components/ProductCreateForm";
import type {Product} from "./types.ts";
import ProductList from "./components/ProductList";
import ProductUpdateForm from "./components/ProductUpdateForm";

export function ProductApp(): ReactElement {
    const [products, setProducts] = useState<Product[]>([]);
    const [updateProductId, setUpdateProductId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>
                Создать
            </button>
            <ProductList products={products} onClickUpdate={(productId) => setUpdateProductId(productId)}/>

            {updateProductId && (
                <Modal onClose={() => setUpdateProductId(null)}>
                    <ProductUpdateForm
                        products={products}
                        setProducts={setProducts}
                        productId={updateProductId}
                        onClose={() => setUpdateProductId(null)}
                    />
                </Modal>
            )}
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <ProductCreateForm products={products} setProducts={setProducts} onClose={() => setIsModalOpen(false)}/>
                </Modal>
            )}
        </>
    )
}

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <>
        <ProductApp/>
    </>
);