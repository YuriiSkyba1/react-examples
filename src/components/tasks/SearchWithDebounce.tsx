import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

// Інтерфейс користувача, що отримується з API
interface User {
  id: number;
  name: string;
  email: string;
}

// Основний компонент для пошуку з debounce
export const SearchWithDebounce: React.FC = () => {
  // Стан для тексту запиту користувача
  const [query, setQuery] = useState<string>('');
  // Стан для результатів пошуку
  const [results, setResults] = useState<User[]>([]);
  // Стан для індикатора завантаження
  const [loading, setLoading] = useState<boolean>(false);
  // Стан для обробки помилок
  const [error, setError] = useState<string | null>(null);

  // Функція для отримання користувачів з API за пошуковим запитом
  const fetchUsers = async (searchQuery: string) => {
    setLoading(true); // Початок завантаження
    setError(null);   // Скидання попередніх помилок

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?name_like=${searchQuery}`);
      if (!res.ok) throw new Error(`Error: ${res.status}`); // Обробка статусу помилки

      const data: User[] = await res.json();
      setResults(data); // Встановлення результатів
    } catch (err) {
      setError((err as Error).message); // Встановлення повідомлення про помилку
    } finally {
      setLoading(false); // Завершення завантаження
    }
  };

  // Використання debounce для затримки запиту на 500 мс після останнього вводу
  const debouncedFetchUsers = useCallback(debounce(fetchUsers, 500), []);

  // Викликаємо debounced запит кожного разу, коли змінюється query
  useEffect(() => {
    if (query.trim()) {
      debouncedFetchUsers(query);
    } else {
      setResults([]); // Якщо запит порожній, очищаємо результати
    }

    // Cleanup (скасування debounced запиту при демонтажі компонента або зміні query)
    return () => debouncedFetchUsers.cancel();
  }, [query, debouncedFetchUsers]);

  return (
    <div>
      {/* Поле для вводу запиту пошуку */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
      />

      {/* Повідомлення про завантаження під час виконання запиту */}
      {loading && <p>Loading...</p>}

      {/* Повідомлення про помилку, якщо запит завершився невдало */}
      {error && <p>Error: {error}</p>}

      {/* Список результатів пошуку */}
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};
