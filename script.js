"use strict";

// I dont know, but it works
const n =
    "undefined" != typeof window &&
    "Microsoft Internet Explorer" ==
    (null === (o = window) ||
        void 0 === o ||
        null === (r = o.navigator) ||
        void 0 === r
        ? void 0
        : r.appName);

/**
 *
 * @param {string} e - message
 * @param {string} t - crypto key
 * @returns message encrypted
 */
function encrypt(e, { key: t = "" } = {}) {
    if (!t) throw new Error("key is not set!");
    let s = 0,
        a = [];
    if (n) {
        let s = 0,
            i = e.length;
        for (let e = 0; e < t.length; e++) s += t.charCodeAt(e);
        s %= i;
        for (let t = 0; t < e.length; t++)
            a.push(String.fromCharCode(e.charCodeAt((t + s) % i)));
    } else
        for (let i = 0; i < e.length; i++)
            a.push(String.fromCharCode(e.charCodeAt(i) ^ t.charCodeAt(s))),
                s++,
                s > t.length - 1 && (s = 0);
    return a.join("");
}



/**
 *
 * @param {string} e -  message encrypted
 * @param {string} t - crypto key
 * @returns message
 */
function decrypt(e, { key: t = "" } = {}) {
    if (!t) throw new Error("key is not set!");
    let s = 0,
        a = [];
    if (n) {
        let s = 0,
            i = e.length;
        for (let e = 0; e < t.length; e++) s += t.charCodeAt(e);
        (s %= i), (s = i - s);
        for (let t = 0; t < e.length; t++)
            a.push(String.fromCharCode(e.charCodeAt((t + s) % i)));
    } else
        for (let i = 0; i < e.length; i++)
            a.push(String.fromCharCode(e.charCodeAt(i) ^ t.charCodeAt(s))),
                s++,
                s > t.length - 1 && (s = 0);
    return a.join("");
}

(() => {
    const key = "2b30577d488a96d53a21b6670af52a99"; // Key này có thể mỗi máy sẽ khác nhau
    // Message from indexedDB Zalo
    const msgEncrypted = "\u0010\u0003FDZ\u0017T\fUL\u001a"; 
    const message = "Zalo to Hubspot <3";

    const messageDecrypted = encrypt(message, { key });
    console.log("Message Encrypted: ", messageDecrypted);

    console.log("Result 1: ", decrypt(messageDecrypted, { key }));

    console.log("Result 2: ", decrypt(msgEncrypted, { key }));
})();