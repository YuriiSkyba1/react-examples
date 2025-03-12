import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  name: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile: React.FC = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserProfile must be used within a UserProvider");
  }

  const { user, setUser } = context;

  return (
    <div>
      {user ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => setUser({ id: 1, name: "John Doe" })}>
          Login
        </button>
      )}
    </div>
  );
};

export const MyContextExample: React.FC = () => {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
};