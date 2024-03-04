import { useContext } from 'react';
import { BookDetailContext } from '../context/BookDetailContext';

export const useBookDetailContext = () => {
    const context = useContext(BookDetailContext);

    if (!context) {
        throw Error(
            'useBookDetailContext must be used inside BookContextProvider'
        );
    }

    return context;
};
