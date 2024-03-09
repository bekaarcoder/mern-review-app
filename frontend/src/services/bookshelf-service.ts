import client from '../api/client';

export interface ReadingStatus {
    status: 'Read' | 'Currently Reading' | 'Want To Read';
}

export interface ReadingShelfBook {
    _id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    book: {
        _id: string;
        title: string;
        author: {
            _id: string;
            name: string;
        };
        cover: {
            url: string;
        };
    };
}

export interface ReadingShelfCount {
    all: number;
    wantToRead: number;
    read: number;
    currentlyReading: number;
}

class BookShelfService {
    getReadingStatus(bookId: string) {
        const controller = new AbortController();
        const request = client.get<ReadingStatus>(`/shelves/status/${bookId}`, {
            withCredentials: true,
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    updateReadingStatus(bookId: string, data: ReadingStatus) {
        return client.post(`/shelves/update-status/${bookId}`, data, {
            withCredentials: true,
        });
    }

    removeReadingStatus(bookId: string) {
        return client.delete(`/shelves/remove/${bookId}`, {
            withCredentials: true,
        });
    }

    getAllReadingShelfCounts() {
        const controller = new AbortController();
        const request = client.get<ReadingShelfCount>('/shelves/count', {
            withCredentials: true,
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }

    getBookByReadingShelf(shelf: string) {
        const controller = new AbortController();
        const queryParams = new URLSearchParams();
        queryParams.append('shelf', shelf?.toString() || '');
        const request = client.get<ReadingShelfBook[]>(
            `/shelves/readingShelf?${queryParams.toString()}`,
            {
                signal: controller.signal,
                withCredentials: true,
            }
        );
        return { request, cancel: () => controller.abort() };
    }
}

export default new BookShelfService();
