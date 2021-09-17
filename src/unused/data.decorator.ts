export const data = () => {
    return (target: Object, propertyKey: string) => {
        const descriptor = {
            get(this: any) {    
              return this[propertyKey];
            },

            set(newValue: any) {
                this[propertyKey] = newValue;
            }
          };

        Object.defineProperty(target, propertyKey, descriptor);
    }
}
