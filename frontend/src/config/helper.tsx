export const formatDate = (dateString: string) => {
    const date: Date = new Date(dateString);
    const formattedDate: string = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return formattedDate;
};
