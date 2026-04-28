import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MOCK_PATIENTS } from '../patients/mockData';
import styles from './Analytics.module.css';

export const Analytics = () => {
  const statusData = [
    { name: 'Stable', value: MOCK_PATIENTS.filter(p => p.status === 'Stable').length },
    { name: 'Critical', value: MOCK_PATIENTS.filter(p => p.status === 'Critical').length },
    { name: 'Discharged', value: MOCK_PATIENTS.filter(p => p.status === 'Discharged').length },
  ];

  const COLORS = ['#10b981', '#ef4444', '#6b7280'];

  const ageData = [
    { group: '20-30', count: MOCK_PATIENTS.filter(p => p.age >= 20 && p.age <= 30).length },
    { group: '31-50', count: MOCK_PATIENTS.filter(p => p.age > 30 && p.age <= 50).length },
    { group: '51+', count: MOCK_PATIENTS.filter(p => p.age > 50).length },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>System Analytics</h1>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Patient Status Distribution</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle" 
                wrapperStyle={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Age Demographics</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageData}>
              <XAxis dataKey="group" stroke="var(--text-secondary)" axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="count" fill="var(--accent-yellow)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;