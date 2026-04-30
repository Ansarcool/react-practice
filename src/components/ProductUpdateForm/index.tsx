import {type ChangeEvent, useState} from "react";
import type {Product, ProductFormState} from "../../types.ts";
import './ProductUpdateForm.css';

export type ProductUpdateFormProps = {
    products: Product[],
    setProducts: (newProducts: Product[]) => void,
    productId: string,
    onClose: () => void,
}

export default function ProductUpdateForm({productId, products, setProducts, onClose}: ProductUpdateFormProps) {
    const product = products.find(p => p.id === productId);
    const [formState, setFormState] = useState<ProductFormState>({name: product?.name ?? '', price: product ? String(product.price) : '', category: product?.category ?? ''});

    if (!product) {
        return (
            <div>Товар не найден по id</div>
        )
    }
    const handleSubmit = (evt :React.SubmitEvent) => {
        evt.preventDefault();
        const newArr = products.filter(p => p.id !== productId)
        newArr.push({
            id: productId,
            name: formState.name,
            price: Number(formState.price),
            category: formState.category
        })
        setProducts(newArr);
        onClose();
    }
    return (
        // <div className={'modal'}>
        //     <h1>Редактировать товар</h1>
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
                    <input type="text" value={formState.category} onChange={(evt: ChangeEvent<HTMLInputElement>) => setFormState({
                        ...formState,
                        category: evt.target.value
                    })}/>
                </label>

                <button>Создать</button>
            </form>
        // </div>
    )
}