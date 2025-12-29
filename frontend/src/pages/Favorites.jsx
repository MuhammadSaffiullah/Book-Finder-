import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { getFavorites } from '../utils/favorites';
import { BiHeart } from 'react-icons/bi';
import './Favorites.css';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = () => {
        setFavorites(getFavorites());
    };

    const handleRemove = () => {
        // When a book is removed, reload the list to update UI immediately
        loadFavorites();
    };

    return (
        <div className="favorites-container">
            <div className="favorites-header">
                <h1 className="favorites-title">Your <span className="text-gradient">Collection</span></h1>
                <p className="favorites-count">{favorites.length} books saved</p>
            </div>

            {favorites.length > 0 ? (
                <div className="books-grid">
                    {favorites.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>
            ) : (
                <div className="empty-favorites glass">
                    <BiHeart className="empty-icon" />
                    <h2>No favorites yet</h2>
                    <p>Start searching and save books you love!</p>
                </div>
            )}
        </div>
    );
};

export default Favorites;
