import { Get } from "./Requests";

export const getUsersData =(params)=> Get("/admin/getAllUsers", params)