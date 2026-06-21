export const getCriteriaStyle = (status: string) => {
    switch (status.toLowerCase()) {
        case 'ok':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'partial':
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        case 'no':
            return 'bg-red-100 text-red-700 border-red-200';
        default:
            return 'bg-gray-100 text-gray-700 border-gray-200';
    }
};

export const positionLabels: Record<string, string> = {
    "react-middle": "React — ведущий программист",
    "react-junior": "React — младший программист",
    "react-senior": "React — старший программист",
};

export const STATUS_CONFIG: Record<string, { label: string; color: string, indicator: string }> = {
    "new": {
        label: 'Новый',
        color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
        indicator: 'bg-blue-500'
    },
    "in_review": {
        label: 'На рассмотрении',
        color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
        indicator: 'bg-orange-500'
    },
    "invited": {
        label: 'Приглашён',
        color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
        indicator: 'bg-green-500'
    },
    "rejected": {
        label: 'Отклонён',
        color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
        indicator: 'bg-red-500'
    },
};
