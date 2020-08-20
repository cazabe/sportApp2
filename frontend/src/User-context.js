import React , {useState} from 'react';

export const UserContext = React.createContext();

const ContextWrapper = (props) => {
    const defaultValueHandler = ()=>{
        const user = localStorage.getItem('user')
        if(user){
            return true;
        }else{
            return false;
        }
    }
const [isLoggedIn , setIsLoggedIn] = useState(defaultValueHandler());

const user ={
    isLoggedIn, 
    setIsLoggedIn
}

return(
    <UserContext.Provider value={user}>
        {props.children}
    </UserContext.Provider>
)

}

export default ContextWrapper;