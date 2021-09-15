export const getPropertyByIndex = (obj: any, index = 0): any => {
    return obj[Object.keys(obj)[index]];
}
