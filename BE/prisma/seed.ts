import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // ─── Admin ────────────────────────────────────────────────────────────────
  const adminEmail = 'adminporto@gmail.com';
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    // Hash diambil dari export MySQL asli — password: porto123
    const hashedPassword = await bcrypt.hash('porto123', 10);
    await prisma.admin.create({
      data: { email: adminEmail, password: hashedPassword },
    });
    console.log(`✅ Admin seeded: ${adminEmail}`);
  } else {
    console.log(`⏭  Admin already exists: ${adminEmail}`);
  }

  // ─── Experiences ─────────────────────────────────────────────────────────
  const experiences = [
    {
      company: 'Airnav Indonesia',
      position: 'IT Development',
      year: '2025',
      period: 'Oct-Apr',
      description:
        'I work at AirNav Indonesia in the IT Development division. My role involves developing and maintaining internal applications that are used to support business processes and operational needs within the company. I collaborate with teams to design, build, and improve systems to ensure they are reliable, efficient, and aligned with organizational requirements.',
    },
    {
      company: 'Ijendev.id',
      position: 'Front End Developer',
      year: '2025',
      period: 'Mar - Aug',
      description:
        'I worked at Ijendev.id, a software house specializing in IoT-based website development. During my time there, I developed a web-based inventory and asset borrowing management system using React. I was responsible for building responsive and reusable UI components to support item tracking and borrowing workflows, ensuring a smooth and user-friendly experience. I also collaborated closely with the team to implement features that aligned with business and system requirements.',
    },
    {
      company: 'Dicoding',
      position: 'Front End Developer',
      year: '2024',
      period: 'Feb - Jul',
      description:
        'During my internship, I developed PureLipuran, a tourism website for Penglipuran Village. The website features vacation package booking and user review functionality, built using React and Tailwind CSS. I focused on creating responsive UI components and ensuring a smooth, consistent user experience across various devices.',
    },
    {
      company: 'PT Ratu Bio Indonesia',
      position: 'Fullstack Developer',
      year: '2024',
      period: 'Aug - Dec',
      description:
        'I worked at PT Ratu Bio Indonesia, a manufacturing company specializing in maklon services. In this role, I was involved in developing the company profile website. I built using React and Tailwind CSS as Front End tools and Laravel as Back End tools, implemented payment gateway integration, and developed product review features. I also integrated RESTful APIs to manage dynamic data and support seamless user interactions across the application.',
    },
  ];

  const existingExperiences = await prisma.experience.count();
  if (existingExperiences === 0) {
    await prisma.experience.createMany({ data: experiences });
    console.log(`✅ ${experiences.length} experiences seeded`);
  } else {
    console.log(`⏭  Experiences already exist (${existingExperiences} rows)`);
  }

  // ─── Tools ────────────────────────────────────────────────────────────────
  // Image URLs — pastikan file-nya ada di public/uploads/tools/
  // atau ganti dengan null jika file tidak tersedia.
  const tools = [
    {
      name: 'React',
      category: 'Frontend',
      image: 'http://localhost:3000/uploads/tools/1772315220614-680334225.png',
    },
    {
      name: 'Nuxt',
      category: 'Frontend',
      image: 'http://localhost:3000/uploads/tools/1772315263328-779016078.png',
    },
    {
      name: 'Vue',
      category: 'Frontend',
      image: 'http://localhost:3000/uploads/tools/1772315280957-519293657.png',
    },
  ];

  const existingTools = await prisma.tool.count();
  if (existingTools === 0) {
    await prisma.tool.createMany({ data: tools });
    console.log(`✅ ${tools.length} tools seeded`);
  } else {
    console.log(`⏭  Tools already exist (${existingTools} rows)`);
  }

  console.log('🎉 Seed complete');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
