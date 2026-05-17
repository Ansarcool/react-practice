import {type ChangeEvent, useState} from "react";
import type {Categories, Product, ProductFormState} from "../../types.ts";
import './ProductUpdateForm.css';
import * as React from "react";


export type ProductUpdateFormProps = {
    products: Product[],
    setProducts: (newProducts: Product[]) => void,
    categories: Categories[],
    productId: string,
    onClose: () => void,
}
const baseURL = "https://practicetasks.kz/api/products";
export default function ProductUpdateForm({productId, products, setProducts, categories, onClose}: ProductUpdateFormProps) {
    const product = products.find(p => p.id === productId);
    const [formState, setFormState] = useState<ProductFormState>({name: product?.name ?? '', price: product ? String(product.price) : '', category: product ? String(product.categoryId) : ''});

    if (!product) {
        return (
            <div>Товар не найден по id</div>
        )
    }
    const handleSubmit = (evt :React.SubmitEvent) => {
        evt.preventDefault();
        fetch(`${baseURL}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: productId,
                name: formState.name,
                price: Number(formState.price),
                categoryId: Number(formState.category)
            })
        })
            .then(res => res.json())
            .then(updated => {
                const newArr = products.filter(p => p.id !== productId);
                newArr.push(updated);
                setProducts(newArr);
                onClose();
                console.log(product.id);
            })
            .catch(err => {
                console.error(err);
            });
    }
    return (
            <form className={'form'} onSubmit={handleSubmit}>
                <label>
                    Название товара
                    <input type="text" value={formState.name} onChange={(evt: ChangeEvent<HTMLInputElement>) => setFormState({
                        ...formState,
                        name: evt.target.value
                    })}
                    />
                </label>
                <label>
                    Стоимость товара
                    <input type="number" value={formState.price} onChange={(evt: ChangeEvent<HTMLInputElement>) => setFormState({
                        ...formState,
                        price: evt.target.value
                    })}/>
                </label>

                <label>
                    Категория
                    <select
                        required={true}
                        value={formState.category}
                        onChange={(evt: ChangeEvent<HTMLSelectElement>) =>
                            setFormState({
                                ...formState,
                                category: evt.target.value
                            })
                        }
                    >
                        <option value="" disabled hidden>
                            Выберите категорию
                        </option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>

                <button>Редактировать</button>
            </form>
    )
}