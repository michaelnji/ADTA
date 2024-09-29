import { customAlphabet } from 'nanoid';
const alphabet = '0123456789AEIOUBDJ';
export const idGen = customAlphabet(alphabet, 8);
