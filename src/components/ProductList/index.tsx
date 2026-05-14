import type {Product, Categories} from "../../types.ts";
import {Button} from "../../shared/components/Button";

export type ProductListProps = {
    products: Product[],
    categories: Categories[],
    onClickUpdate: (productId: string) => void
    onClickDelete: (productId: string) => void;
}

export default function ProductList({products, categories, onClickUpdate, onClickDelete}: ProductListProps) {

    function getCategoryName(id: number) {
        for (let i = 0;i < categories.length;i++) {
            if (id === categories[i].id) {
                return categories[i].name;
            }
        }
        return null;
    }

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
                    <td>{getCategoryName(product.categoryId)}</td>
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