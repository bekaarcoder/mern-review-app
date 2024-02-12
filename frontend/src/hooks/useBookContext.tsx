import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

export const useBookContext = () => {
    const context = useContext(BookContext);

    if (!context) {
        throw Error('useBookContext must be used inside BookContextProvider');
    }

    return context;
};
