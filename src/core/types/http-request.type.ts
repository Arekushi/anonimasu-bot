const httpRequestTypes = [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS'
] as const;

export type HTTPRequestType = typeof httpRequestTypes[number];
