import moment from 'moment';

export const getGabDefault = (start: Date, target: Date) => {
    return moment(start).diff(target);
};
