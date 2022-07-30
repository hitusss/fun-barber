import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateOffsetDate(dayOffset = 1) {
  const date = new Date();
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  function setDate() {
    if (date.getDate() + 3 <= lastDay) {
      date.setDate(date.getDate() + dayOffset);
    } else {
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);
    }

    if (date.toLocaleDateString(undefined, { weekday: "short" }) === "Sun") {
      setDate();
    }
  }

  setDate();

  return date;
}

async function seed() {
  await prisma.booking.deleteMany({});

  const date = generateOffsetDate(5);

  await prisma.booking.create({
    data: {
      date: date,
      hour: "10:00 AM",
      barber: "Jason Green",
      service: "Combo Hair + Beard",
      firstName: "Jason",
      lastName: "Green",
      phone: "123456789",
      email: "email@example.com",
    },
  });
  await prisma.booking.create({
    data: {
      date: date,
      hour: "11:00 AM",
      barber: "Jason Green",
      service: "Combo Hair + Beard",
      firstName: "Jason",
      lastName: "Green",
      phone: "123456789",
      email: "email@example.com",
    },
  });
  await prisma.booking.create({
    data: {
      date: date,
      hour: "10:00 AM",
      barber: "William Trott",
      service: "Combo Hair + Beard",
      firstName: "Jason",
      lastName: "Green",
      phone: "123456789",
      email: "email@example.com",
    },
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
