/**
 * Generates a random alphanumeric client ID of specified length prefixed with '#'
 * @param {number} length - Length of the alphanumeric part
 * @returns {string} The generated client ID
 */
export function generateClientId(length = 6) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `#${randomString}`;
}

export default generateClientId;
