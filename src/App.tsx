import {useEffect, useState} from "react";

type CharacterInfo = {
    "name": string,
    "height": number,
    "mass": number,
    "hair_color": string,
    "skin_color": string,
    "eye_color": string,
    "birth_year": string,
    "gender": string,
    "url": string
}
type ApiResponse = {
    results: CharacterInfo[]
}
const URL = "https://swapi.nomoreparties.co/people"
export function App() {
    const [response, setResponse] = useState<ApiResponse | null>(null);

    useEffect(() => {
        fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then((data: ApiResponse) => {
                setResponse(data)
            })
    }, []);

    return (
        <table border={1}>
            <thead>
            <tr>
                <td>Имя</td>
                <td>Рост</td>
                <td>Вес</td>
                <td>Цвет волос</td>
                <td>Цвет кожи</td>
                <td>Цвет глаз</td>
                <td>Дата рождение</td>
                <td>Пол</td>
            </tr>
            </thead>
            <tbody>
            {response && response.results.map(character => (
                <tr key={character.url}>
                    <td>{character.name}</td>
                    <td>{character.height}</td>
                    <td>{character.mass}</td>
                    <td>{character.hair_color}</td>
                    <td>{character.skin_color}</td>
                    <td>{character.eye_color}</td>
                    <td>{character.birth_year}</td>
                    <td>{character.gender}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}