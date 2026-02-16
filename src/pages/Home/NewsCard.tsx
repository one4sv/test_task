import { useNavigate } from "react-router-dom";
import { NewsType } from "../../types/news";
import { formattedDate } from "../../funcs/formattedDate";

export default function NewsCard({ news }: { news: NewsType }) {
    const navigate = useNavigate()

    return (
        <div className="newsCard" onClick={() => navigate(`/news/${news.id}`)}>
            <div className="newsCardImg">
                <img src={news.image} alt={news.title} />
            </div>
            <div className="newsCardContent">
                <h2>{news.title}</h2>
                <p className="desc">{news.desc}</p>
                <span className="date text">{formattedDate(news.date)}</span>
            </div>
        </div>
    )
}