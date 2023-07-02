export const yReflexionMatrix = [
    -1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
];

/**
 * 
 * @param {*} x translation vector's x coordinate
 * @param {*} y translation vector's y coordinate
 * @param {*} z translation vector's z coordinate
 * @returns translation matrix
 */
export function translate(x, y, z) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
    ];
}

/**
 * 
 * @param {*} angle rotation angle in degrees
 * @returns rotation matrix
 */
export function rotateZ(angle) {
    const rad = Math.PI * angle / 180;

    return [
        Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0, 0,
        -Math.sin(toRadians(angle)), Math.cos(toRadians(angle)), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
}

/**
 * 
 * @param {*} angle rotation angle in degrees
 * @returns rotation matrix
 */
export function rotateY(angle) {
    return [
        Math.cos(toRadians(angle)), 0, -Math.sin(toRadians(angle)), 0,
        0, 1, 0, 0,
        Math.sin(toRadians(angle)), 0, Math.cos(toRadians(angle)), 0,
        0, 0, 0, 1
    ];
}

/**
 * 
 * @param {*} angle rotation angle in degrees
 * @returns rotation matrix
 */
export function rotateX(angle) {
    return [
        1, 0, 0, 0,
        0, Math.cos(toRadians(angle)), Math.sin(toRadians(angle)), 0,
        0, -Math.sin(rad), Math.cos(rad), 0,
        0, 0, 0, 1
    ];
}

export function toRadians(angle) {
    return Math.PI * angle / 180;
}