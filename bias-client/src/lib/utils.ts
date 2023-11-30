import moment, { Moment } from 'moment';

export function formatTime(timeStr) {
    const arr = timeStr.split(' ');
    return `${arr[0].substring(0, 3)} ${arr.slice(1).join(' ')}`;
}
export function formatRemainTime(time, now?: Moment) {
    if (moment(time).valueOf() < (now || moment()).valueOf()) {
        return {
            text: 'Expired',
            color: 'red',
        };
    } else {
        let duration = moment.duration(moment(time).diff(now || moment()));
        let days = duration.days();
        let hours = duration.hours();
        let minutes = duration.minutes();
        let seconds = duration.seconds();
        let formattedDuration =
            days > 0
                ? days + 'd ' + hours + 'h ' + minutes + 'm'
                : hours + 'h ' + minutes + 'm ' + seconds + 's';
        return { text: formattedDuration, color: '' };
    }
}

const addrShorten = (addr: string): string => {
    return addr && addr.length > 6 ? addr.substring(0, 6) + '...' + addr.substring(addr.length - 5, addr.length) : null;
};

const capitalizeFirstLetter = (text: string): string => {
    return text?.length && text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeAllFirstLetter = (text: string): string => {
    return text?.length &&
        text.split(" ").map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(" ")
};

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
}

const unique = (arr: string[]) => {
    if (!arr) return [];
    let tmp = {};
    arr.forEach((str) => (tmp[str] = ''));
    return Object.keys(tmp).sort();
};

export const compareIgnoringCase = (str1: string, str2: string) => {
    return str1 && str2 && str1.toLowerCase() === str2.toLowerCase();
};

export const fillZero = (x) => ('00' + x).slice(-2);

export { addrShorten, capitalizeFirstLetter, pad, unique };
import React, { useEffect, useState } from 'react';

const getDateDiff = (dateTimeStamp, hideAgo?) => {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = Math.abs(now - dateTimeStamp);
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    let result;
    if (monthC >= 1) {
        result = '' + Math.floor(monthC) + ' month' + (Math.floor(monthC) > 1 ? 's' : '') + (hideAgo ? '' : ' ago');
    } else if (dayC >= 1) {
        result = '' + Math.floor(dayC) + ' day' + (Math.floor(dayC) > 1 ? 's' : '') + (hideAgo ? '' : ' ago');
    } else if (hourC >= 1) {
        result = '' + Math.floor(hourC) + ' hour' + (Math.floor(hourC) > 1 ? 's' : '') + (hideAgo ? '' : ' ago');
    } else if (minC > 1) {
        result = '' + Math.floor(minC) + ' minutes' + (hideAgo ? '' : ' ago');
    } else {
        result = 'Now';
    }
    return result;
};

const customFormat = (date, formatString) => {
    if (!date) return '';
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    YY = ((YYYY = date.getFullYear()) + '').slice(-2);
    MM = (M = date.getMonth() + 1) < 10 ? '0' + M : M;
    MMM = (MMMM = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][M - 1]).substring(0, 3);
    DD = (D = date.getDate()) < 10 ? '0' + D : D;
    DDD = (DDDD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()]).substring(0, 3);
    th = D >= 10 && D <= 20 ? 'th' : (dMod = D % 10) == 1 ? 'st' : dMod == 2 ? 'nd' : dMod == 3 ? 'rd' : 'th';
    formatString = formatString
        .replace('#YYYY#', YYYY)
        .replace('#YY#', YY)
        .replace('#MMMM#', MMMM)
        .replace('#MMM#', MMM)
        .replace('#MM#', MM)
        .replace('#M#', M)
        .replace('#DDDD#', DDDD)
        .replace('#DDD#', DDD)
        .replace('#DD#', DD)
        .replace('#D#', D)
        .replace('#th#', th);
    h = hhh = date.getHours();
    if (h == 0) h = 24;
    // if (h > 12) h -= 12;
    hh = h < 10 ? '0' + h : h;
    hhhh = hhh < 10 ? '0' + hhh : hhh;
    AMPM = (ampm = hhh < 12 ? 'AM' : 'PM').toUpperCase();
    mm = (m = date.getMinutes()) < 10 ? '0' + m : m;
    ss = (s = date.getSeconds()) < 10 ? '0' + s : s;
    return formatString
        .replace('#hhhh#', hhhh)
        .replace('#hhh#', hhh)
        .replace('#hh#', hh)
        .replace('#h#', h)
        .replace('#mm#', mm)
        .replace('#m#', m)
        .replace('#ss#', ss)
        .replace('#s#', s)
        .replace('#ampm#', ampm)
        .replace('#AMPM#', AMPM);
};

const customUTCFormat = (date: Date, formatString) => {
    if (!date) return '';
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    YY = ((YYYY = date.getUTCFullYear()) + '').slice(-2);
    MM = (M = date.getUTCMonth() + 1) < 10 ? '0' + M : M;
    MMM = (MMMM = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][M - 1]).substring(0, 3);
    DD = (D = date.getUTCDate()) < 10 ? '0' + D : D;
    DDD = (DDDD = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getUTCDay()]).substring(0, 3);
    th = D >= 10 && D <= 20 ? 'th' : (dMod = D % 10) == 1 ? 'st' : dMod == 2 ? 'nd' : dMod == 3 ? 'rd' : 'th';
    formatString = formatString
        .replace('#YYYY#', YYYY)
        .replace('#YY#', YY)
        .replace('#MMMM#', MMMM)
        .replace('#MMM#', MMM)
        .replace('#MM#', MM)
        .replace('#M#', M)
        .replace('#DDDD#', DDDD)
        .replace('#DDD#', DDD)
        .replace('#DD#', DD)
        .replace('#D#', D)
        .replace('#th#', th);
    h = hhh = date.getUTCHours();
    if (h == 0) h = 24;
    // if (h > 12) h -= 12;
    hh = h < 10 ? '0' + h : h;
    hhhh = hhh < 10 ? '0' + hhh : hhh;
    AMPM = (ampm = hhh < 12 ? 'AM' : 'PM').toUpperCase();
    mm = (m = date.getUTCMinutes()) < 10 ? '0' + m : m;
    ss = (s = date.getUTCSeconds()) < 10 ? '0' + s : s;
    return formatString
        .replace('#hhhh#', hhhh)
        .replace('#hhh#', hhh)
        .replace('#hh#', hh)
        .replace('#h#', h)
        .replace('#mm#', mm)
        .replace('#m#', m)
        .replace('#ss#', ss)
        .replace('#s#', s)
        .replace('#ampm#', ampm)
        .replace('#AMPM#', AMPM);
};

const getDateDiff2 = (date1, date2) => {
    var diffValue = date1.getTime() - date2.getTime();
    if (diffValue < 0) {
        return '00:00:00';
    }

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var now = new Date().getTime();
    var dayC = Math.floor(diffValue / day);
    diffValue -= dayC * day;
    var hourC = Math.floor(diffValue / hour);
    diffValue -= hourC * hour;
    var minC = Math.floor(diffValue / minute);
    var secondC = Math.floor((diffValue - minC * minute) / 1000);

    let result = '';
    if (dayC >= 1) {
        result = '' + Math.floor(dayC) + 'D ';
    }
    result += (hourC < 10 ? '0' + hourC : hourC) + ':';
    result += (minC < 10 ? '0' + minC : minC) + ':';
    result += secondC < 10 ? '0' + secondC : secondC;

    return result;
};



const useTimer = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const tmp = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(tmp);
    }, []);

    return { now };
};

function getTimeDiffAndFormat(time1Stamp: number, time2Stamp: number) {
    const time1 = time1Stamp;
    const time2 = time2Stamp;
    const cha = time1 > time2 ? time1 - time2 : time2 - time1;
    const day = Math.floor(cha / (24 * 3600 * 1000));
    const hours = Math.floor(cha % (24 * 3600 * 1000) / (3600 * 1000));
    const minutes = Math.floor(cha % (24 * 3600 * 1000) % (3600 * 1000) / (60 * 1000));
    const seconds = Math.floor(cha % (24 * 3600 * 1000) % (3600 * 1000) % (60 * 1000) / 1000);
    return `${day ? day + 'D ' : ''}${hours ? hours + 'h ' : ''}${minutes ? minutes + 'm ' : ''}${seconds ? seconds + 's ' : ''}`
}
export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export { getDateDiff, getDateDiff2, customFormat, useTimer, customUTCFormat, getTimeDiffAndFormat };
const numberToLetter = (num) => {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    } else {
        return num;
    }
};

function toFixedIfNecessary(value, dp): number {
    return value ? +parseFloat(value).toFixed(dp) : 0;
}
function removeUnecessaryZero(value, dp) {
    return +parseFloat(value).toFixed(dp);
}

const sum = (array, keyword?: string, defaultValue?) => {
    return (
        array?.reduce((total, item) => {
            let temp = parseInt(keyword ? item[keyword] : item);
            if (isNaN(temp)) temp = 0;
            return total + (temp||defaultValue);
        }, 0) || 0
    );
};

/**
 * @returns Minimum value = 0
 */
const max = (array, keyword?: string) => {
    if (!array?.length) return 0;
    else
        return array.reduce((maxVal, item) => {
            if (keyword) {
                if (item[keyword] > maxVal) maxVal = item[keyword];
            } else {
                if (item > maxVal) maxVal = item;
            }
            return maxVal;
        }, -1);
    // let res = -1
    // array?.forEach(ele => {
    //     if (keyword) {
    //         if (ele[keyword] > res)
    //             res = ele[keyword]
    //     } else {
    //         if (ele > res)
    //             res = ele
    //     }
    // });
    // return res
};

const calcDecimal = (value: number, decimal: number) => {
    let res = value;
    for (let i = 0; i < decimal; i++) {
        res /= 10;
    }
    return res;
};

export { numberToLetter, toFixedIfNecessary, sum, max, calcDecimal };

export function fillArrayWithNumbers(n) {
    var arr = Array.apply(null, Array(n));
    return arr.map(function (x, i) { return i });
}