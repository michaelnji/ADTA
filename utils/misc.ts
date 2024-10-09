import { useToast } from 'vue-toast-notification';

export const $toast = useToast()
export const wait = async (count: number) =>
    await new Promise((resolve) =>
        setTimeout(() => {
            console.log(`waited ${count / 1000} seconds, continuing`);
            resolve(null);
        }, count),
    );