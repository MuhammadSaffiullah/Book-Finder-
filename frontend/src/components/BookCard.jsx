import React, { useState, useEffect } from 'react';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { addFavorite, removeFavorite, isBookFavorite } from '../utils/favorites';
import './BookCard.css';

const BookCard = ({ book, onRemove }) => {
    const [favorite, setFavorite] = useState(false);
    const { id, volumeInfo } = book;
    const { title, authors, imageLinks, description, infoLink } = volumeInfo || {};

    // Handle case where imageLinks is undefined
    const thumbnail = imageLinks?.thumbnail?.replace('http:', 'https:') || 'https://via.placeholder.com/128x192?text=No+Image';

    useEffect(() => {
        setFavorite(isBookFavorite(id));
    }, [id]);

    const handleToggleFavorite = (e) => {
        e.preventDefault(); // Prevent navigating if wrapped in link
        e.stopPropagation();

        if (favorite) {
            removeFavorite(id);
            setFavorite(false);
            if (onRemove) onRemove(id);
        } else {
            addFavorite(book);
            setFavorite(true);
        }
    };

    return (
        <div className="book-card glass fade-in">
            <div className="book-image-container">
                <img src={thumbnail} alt={title} className="book-image" />
                <button
                    className={`favorite-btn ${favorite ? 'active' : ''}`}
                    onClick={handleToggleFavorite}
                    aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {favorite ? <BiSolidHeart /> : <BiHeart />}
                </button>
            </div>

            <div className="book-info">
                <h3 className="book-title" title={title}>{title}</h3>
                <p className="book-author">{authors?.join(', ') || 'Unknown Author'}</p>

                <div className="book-actions">
                    <a href={infoLink} target="_blank" rel="noopener noreferrer" className="btn-details">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
