import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

export async function seedAdmin(prisma: PrismaService) {
  const admins = [
    { email: 'adminporto@gmail.com', password: 'porto123' },
  ];

  for (const adminData of admins) {
    const existing = await prisma.admin.findUnique({
      where: { email: adminData.email },
    });

    if (existing) {
      console.log(`Admin ${adminData.email} already exists`);
      continue;
    }

    const hashed = await bcrypt.hash(adminData.password, 10);
    await prisma.admin.create({
      data: { email: adminData.email, password: hashed },
    });
    console.log(`Admin ${adminData.email} seeded`);
  }
}