import axios from "axios";

export const api = axios.create({
    baseURL: "ec2-54-145-43-46.compute-1.amazonaws.com:3333",
});
