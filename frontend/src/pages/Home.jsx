import React, { useState } from 'react';
import axios from 'axios';
import { BiSearch } from 'react-icons/bi';
import BookCard from '../components/BookCard';
import './Home.css';

const Home = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searched, setSearched] = useState(false);

    const searchBooks = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setSearched(true);
        setBooks([]);

        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20`);
            setBooks(response.data.items || []);
        } catch (err) {
            setError('Failed to fetch books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <section className="hero-section glass">
                <h1 className="hero-title">Discover Your Next <span className="text-gradient">Favorite Book</span></h1>
                <p className="hero-subtitle">Search millons of books, save your favorites, and build your digital library.</p>

                <form onSubmit={searchBooks} className="search-form">
                    <div className="search-input-wrapper">
                        <BiSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by title, author, or ISBN..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <button type="submit" className="search-btn">Search</button>
                </form>
            </section>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Finding books...</p>
                </div>
            ) : (
                <div className="books-grid">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))
                    ) : (
                        searched && <div className="no-results">No books found. Try a different search.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
