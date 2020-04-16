export const isAuthenticated = ()=>{
    const nome_usuario = localStorage.getItem('on-pdv-user-nome')

    if ((!nome_usuario)||(nome_usuario===null)||(nome_usuario === '')){
        return false
    }
    
    return true;
}