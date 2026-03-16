'use client';

import { useState, useEffect } from 'react';
import { getAvailableSlots, bookAppointment } from '@/app/actions/booking';
import dayjs from 'dayjs';

type Barber = { id: string; name: string; specialization: string };
type Slot = { time: string; isAvailable: boolean };

export default function BookingForm({ barbers }: { barbers: Barber[] }) {
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch slots when barber or date changes
  useEffect(() => {
    if (selectedBarber && date) {
      setLoading(true);
      getAvailableSlots(selectedBarber, date).then((fetchedSlots) => {
        setSlots(fetchedSlots);
        setLoading(false);
      });
      setSelectedTime(''); // reset time
    }
  }, [selectedBarber, date]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg('');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add selected states
    formData.append('barberId', selectedBarber);
    formData.append('date', date);
    formData.append('time', selectedTime);

    setLoading(true);
    const res = await bookAppointment(formData);
    setLoading(false);

    if (res.success) {
      setSuccess(true);
      form.reset();
      setSelectedBarber('');
      setDate('');
      setSelectedTime('');
      // Simulate real-time notification to barbers
      if (typeof window !== 'undefined') {
        alert('Notification envoyée aux barbers ! Nouveau rdv réservé.');
      }
    } else {
      setErrorMsg(res.error || 'Erreur inconnue');
    }
  }

  if (success) {
    return (
      <div className="success-message">
        <h3>✅ رنديفو تاعك راهو مكونفيرمي!</h3>
        <p>ماتنساوش تجي في الوقت خويا العزيز.</p>
        <button className="btn-primary" onClick={() => setSuccess(false)}>رنديفو جديد</button>
      </div>
    );
  }

  return (
    <form className="booking-form glass-panel" onSubmit={handleSubmit}>
      {errorMsg && <div className="error-alert">{errorMsg}</div>}
      
      <div className="form-group">
        <label>1. خير الحفاف تاعك</label>
        <div className="barber-selection">
          {barbers.map(barber => (
            <div 
              key={barber.id} 
              className={`selectable-card ${selectedBarber === barber.id ? 'selected' : ''}`}
              onClick={() => setSelectedBarber(barber.id)}
            >
              <h4>{barber.name}</h4>
              <span>{barber.specialization}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedBarber && (
        <div className="form-group slide-in">
          <label htmlFor="date">2. خير النهار</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            required 
            min={dayjs().format('YYYY-MM-DD')}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </div>
      )}

      {date && !loading && slots.length > 0 && (
        <div className="form-group slide-in">
          <label>3. خير الساعة</label>
          <div className="slots-grid">
            {slots.map(slot => (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.isAvailable}
                className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.isAvailable ? 'booked' : ''}`}
                onClick={() => setSelectedTime(slot.time)}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTime && (
        <div className="form-group slide-in details-group">
          <label>4. المعلومات تاعك</label>
          <input type="text" name="clientName" placeholder="الاسم تاعك" required className="input-field" />
          <input type="tel" name="clientPhone" placeholder="رقم التيليفون (مثال: 0555123456)" required className="input-field" />
          
          <button type="submit" className="btn-primary submit-btn" disabled={loading}>
            {loading ? 'يتم الحجز...' : 'أكد الرنديفو'}
          </button>
        </div>
      )}
    </form>
  );
}
