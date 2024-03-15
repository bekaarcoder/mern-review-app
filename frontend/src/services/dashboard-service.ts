import client from '../api/client';

export interface ResourceCount {
    books: number;
    authors: number;
    users: number;
    reviews: number;
}

class DashboardService {
    getResourceCount() {
        const controller = new AbortController();
        const request = client.get<ResourceCount>('/dashboard/counts', {
            withCredentials: true,
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort() };
    }
}

export default new DashboardService();
