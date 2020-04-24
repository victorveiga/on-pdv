export const isAuthenticated = ()=>{
    const token = localStorage.getItem('auth-token');

    if ((!token)||(token===null)||(token === '')){
        return false
    }
    
    return true;
}