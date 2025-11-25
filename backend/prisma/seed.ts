// prisma/seed.ts
import 'dotenv/config';
import {
  PrismaClient,
  Role,
  JobType,
  EmploymentType,
  ApplicationStatus,
} from '@prisma/client';
import { hashSync } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Bắt đầu seed dữ liệu đầy đủ...');

  // ===================================================================
  // 1. Tạo Users + hash password thật (dễ login test)
  // ===================================================================
  const hash = (pass: string) => hashSync(pass, 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@job.vn' },
    update: {},
    create: {
      email: 'admin@job.vn',
      name: 'Admin Platform',
      role: Role.ADMIN,
      passwordHash: hash('admin123'),
    },
  });

  const employerUser = await prisma.user.upsert({
    where: { email: 'hr@vntech.com' },
    update: {},
    create: {
      email: 'hr@vntech.com',
      name: 'HR VNTech',
      role: Role.EMPLOYER,
      passwordHash: hash('employer123'),
    },
  });

  const candidate1 = await prisma.user.upsert({
    where: { email: 'nguyenvana@gmail.com' },
    update: {},
    create: {
      email: 'nguyenvana@gmail.com',
      name: 'Nguyễn Văn A',
      phone: '0901234567',
      role: Role.CANDIDATE,
      avatarUrl:
        'https://ui-avatars.com/api/?name=Nguyen+Van+A&background=random',
      passwordHash: hash('candidate123'),
    },
  });

  const candidate2 = await prisma.user.upsert({
    where: { email: 'tranb@gmail.com' },
    update: {},
    create: {
      email: 'tranb@gmail.com',
      name: 'Trần Thị B',
      phone: '0912345678',
      role: Role.CANDIDATE,
      passwordHash: hash('candidate123'),
    },
  });

  // ===================================================================
  // 2. EmployerProfile + 2 công ty nữa để test
  // ===================================================================
  const company1 = await prisma.employerProfile.upsert({
    where: { userId: employerUser.id },
    update: {},
    create: {
      userId: employerUser.id,
      companyName: 'VNTech Solutions',
      companySize: '201-500',
      website: 'https://vntech.com',
      location: 'Quận 1, TP.HCM',
      description:
        'Công ty công nghệ hàng đầu Việt Nam, chuyên về Fintech & AI.',
    },
  });

  // ===================================================================
  // 3. Candidate Profiles
  // ===================================================================
  const profileA = await prisma.candidateProfile.upsert({
    where: { userId: candidate1.id },
    update: {},
    create: {
      userId: candidate1.id,
      headline: 'Senior Fullstack Engineer | React + Node.js + NestJS',
      location: 'Hà Nội',
      salaryExpectation: 35000000,
      experiences: {
        list: [
          {
            company: 'FPT Software',
            position: 'Fullstack Developer',
            from: '2021',
            to: '2024',
          },
          {
            company: 'VNG Corporation',
            position: 'Frontend Engineer',
            from: '2019',
            to: '2021',
          },
        ],
      },
      educations: {
        list: [
          { school: 'ĐH Bách Khoa Hà Nội', degree: 'Kỹ sư CNTT', year: 2019 },
        ],
      },
    },
  });

  const profileB = await prisma.candidateProfile.upsert({
    where: { userId: candidate2.id },
    update: {},
    create: {
      userId: candidate2.id,
      headline: 'UI/UX Designer | Figma Expert',
      location: 'TP. Hồ Chí Minh',
      salaryExpectation: 22000000,
    },
  });

  // ===================================================================
  // 4. Skills
  // ===================================================================
  const skillNames = [
    'React',
    'Node.js',
    'TypeScript',
    'NestJS',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'Figma',
    'UI/UX',
  ];
  for (const name of skillNames) {
    await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  // ===================================================================
  // 5. 4 Jobs đa dạng
  // ===================================================================
  await prisma.job.createMany({
    data: [
      {
        employerId: company1.id,
        title: 'Senior Backend Engineer (Node.js/NestJS)',
        slug: 'senior-backend-nestjs-2025',
        description: 'Tuyển gấp Senior Backend cho dự án Fintech quy mô lớn...',
        location: 'TP.HCM',
        minSalary: 40000000,
        maxSalary: 60000000,
        jobType: JobType.FULL_TIME,
        employmentType: EmploymentType.HYBRID,
      },
      {
        employerId: company1.id,
        title: 'Frontend React Developer',
        slug: 'frontend-react-2025',
        description:
          'Làm việc với team sản phẩm quốc tế, tech stack hiện đại...',
        location: 'Hà Nội',
        minSalary: 25000000,
        maxSalary: 40000000,
        jobType: JobType.FULL_TIME,
        employmentType: EmploymentType.REMOTE,
      },
      {
        employerId: company1.id,
        title: 'UI/UX Designer (Full-time)',
        slug: 'ui-ux-designer-2025',
        description: 'Thiết kế giao diện cho các sản phẩm Mobile & Web...',
        location: 'TP.HCM',
        minSalary: 18000000,
        maxSalary: 30000000,
        jobType: JobType.FULL_TIME,
        employmentType: EmploymentType.ONSITE,
      },
      {
        employerId: company1.id,
        title: 'DevOps Engineer (Contract 6 tháng)',
        slug: 'devops-contract-2025',
        description: 'Cần người có kinh nghiệm AWS, Kubernetes, CI/CD...',
        minSalary: 45000000,
        maxSalary: 65000000,
        jobType: JobType.CONTRACT,
        employmentType: EmploymentType.REMOTE,
      },
    ],
    skipDuplicates: true,
  });

  // Connect skills cho từng job
  const jobs = await prisma.job.findMany();
  await prisma.job.update({
    where: { id: jobs[0].id },
    data: {
      skills: {
        connect: [
          { name: 'Node.js' },
          { name: 'NestJS' },
          { name: 'PostgreSQL' },
          { name: 'Docker' },
        ],
      },
    },
  });
  await prisma.job.update({
    where: { id: jobs[1].id },
    data: {
      skills: {
        connect: [{ name: 'React' }, { name: 'TypeScript' }, { name: 'AWS' }],
      },
    },
  });
  await prisma.job.update({
    where: { id: jobs[2].id },
    data: { skills: { connect: [{ name: 'Figma' }, { name: 'UI/UX' }] } },
  });

  // ===================================================================
  // 6. Portfolio đầy đủ cho Nguyễn Văn A
  // ===================================================================
  await prisma.portfolio.create({
    data: {
      candidateId: profileA.id,
      userId: candidate1.id,
      title: 'Portfolio Nguyễn Văn A – Fullstack Developer',
      summary: 'Hơn 5 năm kinh nghiệm phát triển web fullstack.',
      items: {
        create: [
          {
            title: 'Hệ thống quản lý tài chính cá nhân (Next.js 14 + NestJS)',
            description:
              'Fullstack app với authentication, realtime chart, export PDF',
            mediaUrl: 'https://picsum.photos/800/600?random=1',
            link: 'https://finance.vana.dev',
            tag: 'Fullstack',
          },
          {
            title: 'Dashboard SaaS Analytics',
            description: 'Realtime analytics với WebSocket + Recharts',
            mediaUrl: 'https://picsum.photos/800/600?random=2',
            link: 'https://analytics.vana.dev',
            tag: 'Frontend',
          },
          {
            title: 'Mobile App đặt lịch khám bệnh (React Native)',
            description: 'Đã publish trên App Store & Google Play',
            mediaUrl: 'https://picsum.photos/800/600?random=3',
            link: 'https://github.com/vana/booking-rn',
            tag: 'Mobile',
          },
        ],
      },
    },
  });

  // ===================================================================
  // 7. Applications (có đủ trạng thái để test)
  // ===================================================================
  await prisma.application.createMany({
    data: [
      {
        jobId: jobs[0].id,
        candidateId: profileA.id,
        userId: candidate1.id,
        coverLetter:
          'Em có 4 năm kinh nghiệm NestJS và từng lead team 5 người...',
        resumeUrl: 'https://example.com/resume-vana.pdf',
        status: ApplicationStatus.INTERVIEW,
      },
      {
        jobId: jobs[1].id,
        candidateId: profileA.id,
        userId: candidate1.id,
        coverLetter:
          'Em rất yêu thích môi trường remote và đã làm React hơn 3 năm...',
        resumeUrl: 'https://example.com/resume-vana.pdf',
        status: ApplicationStatus.SHORTLISTED,
      },
      {
        jobId: jobs[2].id,
        candidateId: profileB.id,
        userId: candidate2.id,
        coverLetter:
          'Em có portfolio Figma rất mạnh, mong được trao đổi thêm...',
        resumeUrl: 'https://example.com/resume-tranb.pdf',
        status: ApplicationStatus.APPLIED,
      },
    ],
  });

  // ===================================================================
  // 8. Thêm 1 interview để test lịch phỏng vấn
  // ===================================================================
  const appInterview = await prisma.application.findFirst({
    where: { status: ApplicationStatus.INTERVIEW },
  });

  if (appInterview) {
    await prisma.interview.create({
      data: {
        applicationId: appInterview.id,
        scheduledAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // +3 ngày
        location: 'https://meet.google.com/abc-def-ghi',
        durationMins: 60,
        participants: {
          connect: [{ id: candidate1.id }, { id: employerUser.id }],
        },
        status: 'SCHEDULED',
        notes: 'Phỏng vấn vòng technical với team lead',
      },
    });
  }

  // ===================================================================
  // 9. Thêm vài notification để test bell
  // ===================================================================
  await prisma.notification.createMany({
    data: [
      {
        userId: candidate1.id,
        channel: 'IN_APP',
        title: 'Ứng tuyển thành công!',
        body: 'Bạn đã ứng tuyển vị trí Senior Backend Engineer tại VNTech Solutions',
      },
      {
        userId: candidate1.id,
        channel: 'IN_APP',
        title: 'Lịch phỏng vấn mới',
        body: 'Bạn có lịch phỏng vấn vào Thứ 6 này lúc 10:00 AM',
        data: { type: 'interview_scheduled' },
      },
    ],
  });

  console.log('HOÀN TẤT SEED DỮ LIỆU!');
  console.log('Thông tin đăng nhập nhanh:');
  console.log('Admin      → admin@job.vn     / admin123');
  console.log('Employer   → hr@vntech.com    / employer123');
  console.log('Candidate  → nguyenvana@gmail.com / candidate123');
  console.log('Candidate  → tranb@gmail.com  / candidate123');
  console.log(
    'Có 4 job, 3 application, 1 portfolio, 1 interview, notifications sẵn sàng test!',
  );
}

main()
  .catch((e) => {
    console.error('Lỗi seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
