import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./NewsDetail.scss"
import { NewsType } from "../../types/news"
import Footer from "../../components/Footer"

export default function NewsDetail() {
    const { id } = useParams<{ id: string }>()
    const [news, setNews] = useState<NewsType | null>(null)

    useEffect(() => {
        fetch("/data/news.json")
            .then(res => res.json())
            .then(data => {
                const item = data.find((n: NewsType) => n.id === Number(id))
                setNews(item || null)
            })
    }, [id])

    if (!news) return null

    const paragraphs = news.text.split("\n\n")

    const formattedDate = new Date(news.date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })

    return (
        <div className="newsDetail">
            <div className="container">
                <div className="newsDetailContent">
                    <div className="newsDetailImg">
                        <img src={news.image} alt={news.title} />
                    </div>
                    <div className="newsDetailText">
                        <h1>{news.title}</h1>
                        <span className="date">{formattedDate}</span>
                        <div className="textContent">
                            {paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}