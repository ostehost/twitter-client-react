const sortItems = (items, sortBy, sortOrder) => {
    try {
        items.sort((a, b) => {
            switch (sortBy) {
                case 'created_at':
                    if (sortOrder === 1) {
                        return Date.parse(a.created_at) < Date.parse(b.created_at) ? 1 : -1;
                    } else {
                        return Date.parse(a.created_at) > Date.parse(b.created_at) ? 1 : -1;
                    }
                default:
                    if (sortOrder === 1) {
                        return a[sortBy] < b[sortBy] ? 1 : -1;
                    } else {
                        return a[sortBy] > b[sortBy] ? 1 : -1;
                    }
            }
        });
    } catch (error) {

    }
}

export default sortItems;