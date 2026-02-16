import { useEffect, useState } from "react"
import "./Home.scss"
import { NewsType } from "../../types/news"
import NewsCard from "./NewsCard"

export default function Home() {
    const [ news, setNews] = useState<NewsType[]>([])

    useEffect(() => {
        fetch("/data/news.json")
            .then(res => res.json())
            .then(data => setNews(data))
    }, [])

    return (
        <div className="home">
            <h1>Новости</h1>
            <div className="newsList">
                {news.length > 0 && news.map((e) => (
                    <NewsCard news={e} key={e.id}/>
                ))}
            </div>
        </div>
    )
}