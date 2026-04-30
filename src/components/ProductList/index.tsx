import type {Product} from "../../types.ts";
export type ProductListProps = {
    products: Product[],
    onClickUpdate: (productId: string) => void
}

export default function ProductList({products, onClickUpdate}: ProductListProps) {
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
                        <button onClick={() => onClickUpdate(product.id)}>Редактировать</button>
                        <button>Удалить</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}