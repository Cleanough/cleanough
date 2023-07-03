export const fetcher = (...args: Array<any>) => {
    return fetch(args[0], args[1]).then(async (res) => {
        let payload;
        try {
            if (res?.status === 204) return null; // 204 does not have body
            payload = await res.json();
        } catch (e) {
            /* noop */
        }
        if (res.ok) {
            return payload;
        } else {
            return Promise.reject(
                payload?.error || new Error("Something went wrong")
            );
        }
    });
};
