"use server"

import { cookies } from "next/headers"

export const setRouter=(slug)=>{
cookies().set("route",slug)
}


export const getRouter=async()=>{
    const routeValue =await cookies().get('route')
    return routeValue
}