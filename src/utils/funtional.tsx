/* =========================
   LOCAL STORAGE
========================= */

export const getStorage = <T = any>(key: string): T | null => {
    try {
        const value = localStorage.getItem(key);
        return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
        console.error('getStorage error:', error);
        return null;
    }
};

export const setStorage = (key: string, data: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('setStorage error:', error);
    }
};

export const removeStorage = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('removeStorage error:', error);
    }
};

/* =========================
   COOKIES
========================= */

export const getCookie = (name: string): string | null => {
    try {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const [cookieName, ...rest] = cookie.split('=');
            if (cookieName.trim() === name) {
                return decodeURIComponent(rest.join('=').trim());
            }
        }

        return null;
    } catch (error) {
        console.error('getCookie error:', error);
        return null;
    }
};

export const setCookie = (
    name: string,
    value: string,
    days: number = 7
): void => {
    try {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

        document.cookie = `
      ${name}=${encodeURIComponent(value)};
      expires=${date.toUTCString()};
      path=/;
      SameSite=Strict
    `;
    } catch (error) {
        console.error('setCookie error:', error);
    }
};

export const removeCookie = (name: string): void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

