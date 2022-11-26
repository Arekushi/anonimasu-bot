export const getPropertyByIndex = (obj: any, index = 0): any => {
    return obj[Object.keys(obj)[index]];
};

export const merge = (target: any, source: any): any => {
    for (const key of Object.keys(source)) {
        try {
            if (source[key] instanceof Object) {
                target[key] = merge(target[key], source[key]);
            } else if (!target[key]) {
                target[key] = source[key];
            }
        } catch (e) {
            target[key] = source[key];
        }
    }

    return target ?? source;
};

export const isEmpty = (obj: any): boolean => {
    switch (obj) {
        case '':
        case null:
        case undefined:
            return true;
        default:
            return false;
    }
};
