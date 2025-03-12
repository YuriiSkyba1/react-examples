import React, { useRef } from 'react';

interface ColumnConfig<T> {
  header: string;
  render: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
}

export const GenericTable = <T extends { id: number }>({ data, columns }: GenericTableProps<T>) => {
  const bottomRef = useRef<HTMLTableRowElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ maxHeight: '200px', overflow: 'auto', border: '1px solid #ccc' }}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id} ref={index === data.length - 1 ? bottomRef : null}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{column.render(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={scrollToBottom}>Прокрутити до кінця таблиці</button>
    </div>
  );
};

// Приклад використання компонента:

type User = { id: number; name: string; email: string };

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  { id: 3, name: 'Mike Smith', email: 'mike@example.com' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com' },
  { id: 5, name: 'Chris Johnson', email: 'chris@example.com' },
];

export const App = () => (
  <GenericTable
    data={users}
    columns={[
      { header: 'Name', render: (user) => user.name },
      { header: 'Email', render: (user) => user.email },
    ]}
  />
);
