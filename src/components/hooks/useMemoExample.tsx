import React, { useState, useMemo } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

export const MyMemoExample: React.FC = () => {
  const [users] = useState<User[]>([
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
  ]);

  const [filterAge, setFilterAge] = useState<number>(30);

  const filteredUsers = useMemo(() => {
    console.log("Computing filtered users...");
    return users.filter(user => user.age >= filterAge);
  }, [users, filterAge]);

  return (
    <div>
      <h3>Filtered Users (Age ≥ {filterAge}):</h3>
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name} ({user.age} years)</li>
        ))}
      </ul>

      <button onClick={() => setFilterAge(prev => prev + 1)}>
        Increase Age Filter
      </button>
      <button onClick={() => setFilterAge(prev => prev - 1)}>
        Decrease Age Filter
      </button>
    </div>
  );
};
