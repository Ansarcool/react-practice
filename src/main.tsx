import {createRoot} from "react-dom/client";
import "./index.css";
import Modal from "./shared/components/Modal"
import {type ReactElement, useEffect, useState} from "react";
import ProductCreateForm from "./components/ProductCreateForm";
import type {Product, Categories} from "./types.ts";
import ProductList from "./components/ProductList";
import ProductUpdateForm from "./components/ProductUpdateForm";
const baseURL = "https://practicetasks.kz/api/products";
const categoriesURL = "https://practicetasks.kz/api/categories";
export function ProductApp(): ReactElement {
    const [products, setProducts] = useState<Product[]>([]);
    const [updateProductId, setUpdateProductId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Categories[]>([])
    useEffect(() => {
        fetch(baseURL)
            .then((res => {
                if (res.ok) {
                    return res.json()
                }
            }))
            .then((data) => {
                setProducts(data)
            })
        fetch(categoriesURL)
            .then((res => {
                if (res.ok) {
                    return res.json();
                }
            }))
            .then((data) => {
                setCategories(data)
            })
    }, []);
    return (
        <>
            <button onClick={() => setIsModalOpen(true)}>
                Создать
            </button>
            <ProductList products={products} categories={categories} onClickUpdate={(productId) => setUpdateProductId(productId)}
                         onClickDelete={(productId) => setProducts(products.filter(p => p.id !== productId))}/>

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
        {/*<App/>*/}
    </>
)