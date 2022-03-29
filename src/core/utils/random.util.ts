export const random50 = () => {
    return Math.random() < 0.5;
};

export const randomElement = (arr: any[]) => {
    return arr[Math.floor((Math.random() * arr.length))];
};
