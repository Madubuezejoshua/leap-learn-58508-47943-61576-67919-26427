// Core type definitions for the LMS

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  profilePicture?: string;
}

export type UserRole = 'student' | 'coordinator' | 'teacher' | 'admin';

export interface UserRoleData {
  userId: string;
  role: UserRole;
  createdAt: string;
  updatedAt?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: 'NGN';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnailUrl: string;
  instructorId: string;
  instructorName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  enrollmentCount: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  enrollmentCode: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentReference: string;
  amount: number;
  enrolledAt: string;
  verifiedAt: string | null;
  verifiedBy: string | null;
}

export type ClassType = 'physical' | 'online';

export interface ScheduledClass {
  id: string;
  courseId: string;
  courseName: string;
  teacherId: string;
  teacherName: string;
  title: string;
  description: string;
  classType: ClassType;
  meetingLink: string | null;
  location: string | null;
  startTime: string;
  endTime: string;
  maxStudents: number;
  enrolledStudents: string[];
  createdAt: string;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}

export interface ClassAttendance {
  id: string;
  classId: string;
  studentId: string;
  studentName: string;
  enrollmentCode: string;
  attendedAt: string;
  status: 'present' | 'absent' | 'late';
}
