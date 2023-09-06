import BasicHeader from "./Header";
import { useEffect, useState } from "react";

const Authors = () => {
    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        await fetch("localhost:8000/api/authors")
        .then(response => {
            return response.json();
        })
        .then(data => {
            setAuthors(data)
        })
    };

    useEffect(() => {
        fetchAuthors();
    });

    return (
        <div className="authorsCon">
            <BasicHeader/>
            <div className="mapAuthors">
                {authors.length > 0 && (
                    <ul>
                        {authors.map(author => (
                            <li key={author._id}>{author.username}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Authors;