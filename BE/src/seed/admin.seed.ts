import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from '../auth/admin.entity';

export async function seedAdmin(dataSource: DataSource) {
  const adminRepo = dataSource.getRepository(Admin);

  // Data admin yang ingin di-seed
  const admins = [
    { email: 'adminporto@gmail.com', password: 'porto123' },
  ];

  for (const adminData of admins) {
    const existing = await adminRepo.findOne({
      where: { email: adminData.email },
    });

    if (existing) {
      console.log(`Admin ${adminData.email} already exists`);
      continue;
    }

    const hashed = await bcrypt.hash(adminData.password, 10);
    await adminRepo.save({ email: adminData.email, password: hashed });
    console.log(`Admin ${adminData.email} seeded`);
  }
}