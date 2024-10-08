/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/**
 * @description Returns an item from localStorage if any, else creates a new one
 * @param {string} key
 * @param {string} [value='']
 * @return {*}  {*}
 */
export function getOrSetItem(key: string, value) {
	const db = localStorage;
	if (db.getItem(key) == null) {
		db.setItem(key, JSON.stringify(value));
	} else {
		return JSON.parse(db.getItem(key));
	}
	return value;
}
/**
 * @description returns an item from localStorage
 * @param {*} key
 * @return {*}  {(any | null)}
 */
export function getItemValue(key: string) {
	const db = localStorage;
	if (db.getItem(key) !== null) {
		return JSON.parse(db.getItem(key));
	}
	return null;
}
/**
 * @description creates an item and stores it in localStorage
 * @param {*} key
 * @param {string} [value='']
 * @return {*}  {(any | null)}
 */
export function setItemValue(key: string, value) {
	if (key !== null) {
		localStorage.setItem(key, JSON.stringify(value));
		return value;
	} return null;
}
/**
 * @description clears all items stored in localStorage
 
 * @return {*} 
 */
export function clearDB(): null {
	localStorage.clear();
	return null;
}
