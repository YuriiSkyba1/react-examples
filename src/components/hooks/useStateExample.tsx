import { useState } from "react";

// interface HookProperty {
//     name: string;
// }
type HookProperty = {
    name: string;
}

export const MyStateHook = ({name}: HookProperty) => {
    const [count, setCount] = useState<number>(0)
    // function increment(){
    //     return setCount(prev => prev+1)
    // }

    return <div>
            <p>{name}</p>
            <p>Count: {count}</p>
            <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
            <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
            </div>;
}






// type User = {
// name: string;
// age: number;
// }
// export const UserComponent = () => {
//     const [user, setUser] = useState<User | null>(null)
//     const loadUser = () => {
//         setUser({name:'Yura', age: 25,})
//     }
//     return <>
//     {user? <div>userName:{user.name}</div> : <button onClick={loadUser}>Load User</button>}
//     </>
// }