// import { io, } from "socket.io-client";

// const config = useRuntimeConfig()
// export const url = `wss://ws.twelvedata.com/v1/quotes/price?apikey=${config.public.twelveKey}`

// export const socket = io(url, {
//    transports: ['websocket', "polling", 'webtransport',],
//    // withCredentials: true,
//    rejectUnauthorized: false,
// });

// socket.on("connect_error", (err) => {
//    console.log(err)
//    console.log(`connect_error due to ${err}`);
// });