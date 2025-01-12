import ReactMarkdown from "react-markdown"

export default function DishGenie(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Dish Genie Recommends:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}