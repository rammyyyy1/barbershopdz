'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// List of available working hours (24/24)
const WORKING_HOURS = [
  '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', 
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', 
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', 
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

export async function getBarbers() {
  return await prisma.barber.findMany();
}

export async function getAvailableSlots(barberId: string, date: string) {
  // Get all appointments for this barber on this specific date
  const appointments = await prisma.appointment.findMany({
    where: {
      barberId,
      date,
    },
    select: {
      time: true,
    },
  });

  const bookedTimes = appointments.map((app: { time: string }) => app.time);

  // Return all working hours that are not yet booked
  return WORKING_HOURS.map((time) => ({
    time,
    isAvailable: !bookedTimes.includes(time),
  }));
}

export async function bookAppointment(formData: FormData) {
  try {
    const barberId = formData.get('barberId') as string;
    const clientName = formData.get('clientName') as string;
    const clientPhone = formData.get('clientPhone') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;

    if (!barberId || !clientName || !clientPhone || !date || !time) {
      return { success: false, error: 'كامل المعلومات لازم تعمرهم باش درير الرنديفو' };
    }

    // Check availability just in case
    const existing = await prisma.appointment.findUnique({
      where: {
        barberId_date_time: {
          barberId,
          date,
          time,
        },
      },
    });

    if (existing) {
      return { success: false, error: 'هاد الوقت ديجا محكوم، شوف وقت واحد آخر' };
    }

    await prisma.appointment.create({
      data: {
        barberId,
        clientName,
        clientPhone,
        date,
        time,
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Booking Error:', error);
    return { success: false, error: 'صرات مشكلة، سيي تعاود من بعد' };
  }
}

export async function getDashboardStats() {
  // Get today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const barbers = await prisma.barber.findMany({
    include: {
      appointments: {
        where: {
          date: {
            gte: today, // today or future
          },
        },
        orderBy: [
          { date: 'asc' },
          { time: 'asc' },
        ],
      },
    },
  });

  return barbers;
}
