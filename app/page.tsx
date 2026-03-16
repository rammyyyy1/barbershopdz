import BookingForm from './components/BookingForm';
import { getBarbers } from './actions/booking';

export default async function Home() {
  let barbers: any[] = [];
  try {
    barbers = await getBarbers();
  } catch (error) {
    console.error("Error fetching data during Netlify build:", error);
    barbers = []; 
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">احكم بلاصتك عند أحسن الحفافين، وماتستناش فالصف!</h1>
          <p className="hero-subtitle">صالون حلاقة بمواصفات عالمية، حفافين محترفين وخدمة شابة للرجال.</p>
          <a href="#booking" className="btn-primary hero-btn">احكم رنديفو دوكا</a>
        </div>
      </section>

      {/* Barbers Section */}
      <section className="section bg-pattern" id="barbers">
        <div className="container">
          <h2 className="section-title">الحفافين تاوعنا</h2>
          <div className="barbers-grid">
            {barbers.map(barber => (
              <div key={barber.id} className="barber-card glass-panel group-hover">
                <div className="barber-avatar">
                  <span>{barber.name.charAt(0)}</span>
                </div>
                <h3>{barber.name}</h3>
                <p className="specialization">{barber.specialization}</p>
                <a href="#booking" className="btn-outline">نحفف عند {barber.name}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section" id="pricing">
        <div className="container">
          <h2 className="section-title">الأسعار ولي باك</h2>
          
          <div className="pricing-grid">
            <div className="price-card glass-panel">
              <div className="price-icon">👦</div>
              <h3>دراري صغار</h3>
              <p className="price">400 دج</p>
            </div>
            <div className="price-card glass-panel">
              <div className="price-icon">👨</div>
              <h3>كبار</h3>
              <p className="price">500 دج</p>
            </div>
            <div className="price-card glass-panel">
              <div className="price-icon">🧔</div>
              <h3>حفافة + لحية</h3>
              <p className="price">650 دج</p>
            </div>
          </div>

          <div className="packs-grid mt-4">
            <div className="pack-card premium-glass">
              <div className="pack-badge">Max Level</div>
              <h3>باك 1 (العناية الفائقة)</h3>
              <ul className="pack-features">
                <li>حفافة نقيّة</li>
                <li>بروتين ماركة BIO CAVIAR جودة عالية</li>
              </ul>
              <p className="price-highlight">2000 دج</p>
            </div>
            <div className="pack-card premium-glass">
              <div className="pack-badge">Soin Complet</div>
              <h3>باك 2 (عناية متكاملة)</h3>
              <ul className="pack-features">
                <li>حفافة نقيّة</li>
                <li>بروتين الشعر</li>
                <li>عناية بالبشرة (Soin de visage)</li>
              </ul>
              <p className="price-highlight">2400 دج</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="section bg-dark" id="booking">
        <div className="container booking-section-container">
          <div className="booking-header text-center">
            <h2 className="section-title text-white">احكم الرنديفو تاعك</h2>
            <p className="text-gray">خير الحفاف، الوقت لي يخرج عليك، ومبروك عليك التحفيفة الزينة.</p>
          </div>
          
          <div className="booking-form-wrapper">
            <BookingForm barbers={barbers} />
          </div>
        </div>
      </section>
      
      <footer className="footer">
        <div className="container">
          <p>© 2026 Barber Shop DZ. جميع الحقوق محفوظة.</p>
          <a href="/dashboard" className="admin-link">Dashboard الحفافين</a>
        </div>
      </footer>
    </main>
  );
}
