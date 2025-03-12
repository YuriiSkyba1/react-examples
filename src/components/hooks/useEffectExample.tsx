import React, { useState, useEffect } from "react";
// type CountProps = {}

// export const MyEffectHook: React.FC = ({}:CountProps) =>{
//     const [count, setCount] = useState<number>(0)
//     useEffect(()=>{
// console.log('you clicked', count) // will show every time when count triggered
//     },[count])
//     return <>
//        <p>Count: {count}</p>
//             <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
//       <button onClick={() => setCount(prev => prev - 1)}>Decrement</button>
//     </>
// }

interface MyEffectHookProps {
    apiUrl: string;
  }
  
  interface UserData {
    id: number;
    name: string;
    username: string;
    email: string;
  }
  
  export const MyEffectHook: React.FC<MyEffectHookProps> = ({ apiUrl }) => {
    const [data, setData] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  console.log(data, 'data', apiUrl)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result: UserData[] = await response.json();
          setData(result);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [apiUrl]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h3>User Data:</h3>
        <ul>
          {data.map(user => (
            <li key={user.name}>{user.name} ({user.username})</li>
          ))}
        </ul>
      </div>
    );
  };
  