import React from "react";
import { create } from "zustand";
import client from "./api";

const UserService = create ((set) => ({
    isUsersLoading : false,
    allUsers : [],

    getUsers : async (page) =>{
        set({isUsersLoading : true})

        try {
            const result = await client.get(`/admin/getuser/all?page=${page}&limit=10`)
            set({allUsers:result?.data?.users})

            return{
                success : true,
                message: result.data.message,
                resdata : result.data,
            }
        } catch (error) {
            const msg = error?.result?.data?.message || error?.data?.message ||'Failed to fetch users';
            console.log('error fetching users', msg)

            return {
                success : false,
                message : msg,
            }
            
        } finally{
            set ({isUsersLoading : false})
        }
    },


}))

export default UserService;