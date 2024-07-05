
export const getUser = ()=>{
    return JSON.parse(window.localStorage.getItem('user'))
}

export const setUser = (user)=>{
    window.localStorage.setItem('user', JSON.stringify(user));
}
