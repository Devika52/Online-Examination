import React from 'react'

export const getUser = ()=>{
    return JSON.parse(window.localStorage.getItem('user'))
}

export default useAuth