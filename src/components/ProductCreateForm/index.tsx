import {type ChangeEvent, useState} from "react";
import type {Product, ProductFormState} from "../../types.ts";

const initialState: ProductFormState = {name: '', price: '', category: ''};
export type ProductCreateFormProps = {
    products: Product[];
    setProducts: (NewProducts: Product[]) => void;
    onClose: () => void;
}
export default function ProductCreateForm({products, setProducts, onClose}: ProductCreateFormProps) {
    const [formState, setFormState] = useState<ProductFormState>(initialState)
    const isDisabled = formState.name === "" || formState.price === "" || formState.category === "";

    const handleSubmit = (evt: React.SubmitEvent) => {
        evt.preventDefault();
        setProducts([...products, {...formState, price: Number(formState.price), id: crypto.randomUUID()}])
        setFormState(initialState)
        onClose();
    }
    return (
        <div>
            <h1>Заполните форму:</h1>
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
                    <input
                        type="text"
                        value={formState.category}
                        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                            setFormState({
                                ...formState,
                                category: evt.target.value
                            });

                        }}
                        required={true}
                    />
                </label>
                <button disabled={isDisabled}>Отправить</button>
            </form>
        </div>
    )

}

