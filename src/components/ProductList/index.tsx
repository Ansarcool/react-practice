import type {Product} from "../../types.ts";
import {Button} from "../../shared/components/Button";

export type ProductListProps = {
    products: Product[],
    onClickUpdate: (productId: string) => void
    onClickDelete: (productId: string) => void;
}

export default function ProductList({products, onClickUpdate, onClickDelete}: ProductListProps) {
    return (
        <table border={1}>
            <thead>
            <tr>
                <td>Название</td>
                <td>Стоимость</td>
                <td>Категория</td>
                <td></td>
            </tr>
            </thead>
            <tbody>
            {products.map(product => (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>
                        <Button onClick={() => onClickUpdate(product.id)}>Редактировать</Button>
                        <Button variant={"destructive"} onClick={() => onClickDelete(product.id)}>Удалить</Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}