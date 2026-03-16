import { getDashboardStats } from '@/app/actions/booking';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const barbers = await getDashboardStats();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>💈 لوحة تحكم الحفافين (Dashboard)</h1>
        <a href="/" className="btn-outline">الرجوع للموقع</a>
      </header>

      <main className="dashboard-main">
        {barbers.map(barber => (
          <div key={barber.id} className="admin-barber-card glass-panel">
            <div className="admin-barber-header">
              <h2>{barber.name}</h2>
              <span className="badge">{barber.appointments.length} رنديفو</span>
            </div>

            <div className="appointments-list">
              {barber.appointments.length === 0 ? (
                <p className="empty-state">ماكاش رنديفوات حاليا.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>الكليون</th>
                      <th>التيليفون</th>
                      <th>التاريخ</th>
                      <th>الساعة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {barber.appointments.map(app => (
                      <tr key={app.id}>
                        <td>{app.clientName}</td>
                        <td dir="ltr">{app.clientPhone}</td>
                        <td>{app.date}</td>
                        <td className="time-highlight">{app.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
