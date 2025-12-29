const STORAGE_KEY = 'book-finder-favorites';

export const getFavorites = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addFavorite = (book) => {
    const favorites = getFavorites();
    if (!favorites.some(fav => fav.id === book.id)) {
        const updated = [...favorites, book];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return true;
    }
    return false;
};

export const removeFavorite = (bookId) => {
    const favorites = getFavorites();
    const updated = favorites.filter(book => book.id !== bookId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isBookFavorite = (bookId) => {
    const favorites = getFavorites();
    return favorites.some(book => book.id === bookId);
};
