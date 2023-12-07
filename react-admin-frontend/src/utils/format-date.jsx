import dayjs from 'dayjs';

const FormatDate = (date, format = 'HH:mm:ss - DD/MM/YYYY') => {
    if (!date) return '';
    return dayjs(date).format(format);
};

export default FormatDate;