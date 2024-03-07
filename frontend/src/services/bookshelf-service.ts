import client from '../api/client';

export interface ReadingStatus {
    status: 'Read' | 'Currently Reading' | 'Want To Read';
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
}

export default new BookShelfService();
