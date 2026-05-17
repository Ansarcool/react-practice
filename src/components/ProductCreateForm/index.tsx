import {type ChangeEvent, useState} from "react";
import type {Categories, Product, ProductFormState} from "../../types.ts";
import * as React from "react";
import {Button} from "../../shared/components/Button";

const initialState: ProductFormState = {name: '', price: '', category: ''};
export type ProductCreateFormProps = {
    products: Product[];
    categories: Categories[];
    setProducts: (NewProducts: (Product | {
        name: string;
        price: number;
        category: string;
        id: string;
        categoryId: number;
    })[]) => void;
    onClose: () => void;
}
const baseURL = "https://practicetasks.kz/api/products";

export default function ProductCreateForm({products, categories, setProducts, onClose}: ProductCreateFormProps) {
    const [formState, setFormState] = useState<ProductFormState>(initialState)
    const isDisabled = formState.name === "" || formState.price === "" || formState.category === "";
    const handleSubmit = (evt: React.SubmitEvent) => {
        evt.preventDefault();
        fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: formState.name, price: Number(formState.price), categoryId: Number(formState.category)}),
        })
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
            .then(() => {
                setProducts([
                    ...products, {name: formState.name, price: Number(formState.price), categoryId: Number(formState.category), id: crypto.randomUUID()}
                ])
                onClose();
            })
            .catch((err) => {
                console.error(err);
            })
    }
    return (
        <div>
            <form className="form" autoComplete={"off"} onSubmit={handleSubmit}>
                <label className="label">
                    Название товара:
                    <input
                        type="text"
                        value={formState.name}
                        onChange={(evt: ChangeEvent<HTMLInputElement>) => setFormState({
                            ...formState,
                            name: evt.target.value
                        })}
                        required={true}
                    />
                </label>
                <label className="label">
                    Стоимость товара:
                    <input
                        type="number"
                        value={formState.price}
                        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                            setFormState({
                                ...formState,
                                price: evt.target.value
                            });
                        }}
                        required={true}
                    />
                </label>
                <label>
                    Категория:
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
                <Button className={"button-create"} disabled={isDisabled}>Создать</Button>
            </form>
        </div>
    )
}