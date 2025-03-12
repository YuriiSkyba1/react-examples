import React, { useState } from 'react';

// Типізація вхідних даних
interface ACSystemData {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  energyConsumption: number;
  isActive: boolean;
}

interface ACSystemDashboardProps {
  data: ACSystemData[];
}

// Основний компонент
export const ACSystemDashboard: React.FC<ACSystemDashboardProps> = ({ data }) => {
  const [systems, setSystems] = useState<ACSystemData[]>(data);

  const toggleSystem = (id: string) => {
    setSystems((prev) =>
      prev.map((system) =>
        system.id === id ? { ...system, isActive: !system.isActive } : system
      )
    );
  };

  const getTemperatureColor = (temp: number) => {
    if (temp > 27) return 'red';
    if (temp >= 25) return 'orange';
    return 'green';
  };

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      {systems.map((system) => (
        <div
          key={system.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '220px',
          }}
        >
          <h3>{system.location}</h3>
          <p>
            <strong>Temperature:</strong>{' '}
            <span style={{ color: getTemperatureColor(system.temperature) }}>
              {system.temperature} °C
            </span>
          </p>
          <p>
            <strong>Humidity:</strong> {system.humidity}%
          </p>
          <p>
            <strong>Energy Consumption:</strong> {system.energyConsumption} kWh
          </p>
          <p>
            <strong>Status:</strong> {system.isActive ? 'ON' : 'OFF'}
          </p>
          <button onClick={() => toggleSystem(system.id)}>
            Turn {system.isActive ? 'OFF' : 'ON'}
          </button>
        </div>
      ))}
    </div>
  );
};

// Приклад використання компонента
const exampleData: ACSystemData[] = [
  {
    id: 'ac-101',
    location: 'Room 101',
    temperature: 22.5,
    humidity: 45,
    energyConsumption: 3.2,
    isActive: true,
  },
  {
    id: 'ac-102',
    location: 'Room 102',
    temperature: 24.1,
    humidity: 50,
    energyConsumption: 2.8,
    isActive: false,
  },
];

export const App = () => <ACSystemDashboard data={exampleData} />;
