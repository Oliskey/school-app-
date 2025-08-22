
export enum DashboardType {
  Admin = 'Admin',
  Teacher = 'Teacher',
  Parent = 'Parent',
  Student = 'Student',
}

export interface Exam {
  id: number;
  type: string;
  date: string;
  time?: string;
  className: string;
  subject: string;
  isPublished: boolean;
  teacherId?: number; // To associate exams with the teacher who created them
}

export type AttendanceStatus = 'Present' | 'Absent' | 'Leave' | 'Late';

export interface AcademicRecord {
    subject: string;
    score: number; // out of 100
    term: 'Term 1' | 'Term 2' | 'Term 3';
    teacherRemark?: string;
}

export interface BehaviorNote {
    id: number;
    date: string;
    type: 'Positive' | 'Negative';
    title: string;
    note: string;
    by: string; // Teacher's name
    suggestions?: string[];
}

export type Department = 'Science' | 'Commercial' | 'Arts';

export type Rating = 'A' | 'B' | 'C' | 'D' | 'E' | '';

export interface ReportCardAcademicRecord {
    subject: string;
    ca: number;
    exam: number;
    total: number;
    grade: string;
    remark: string;
}

export interface ReportCard {
    term: string; // e.g., "Second Term"
    session: string; // e.g., "2023/2024"
    academicRecords: ReportCardAcademicRecord[];
    skills: Record<string, Rating>;
    psychomotor: Record<string, Rating>;
    attendance: {
        total: number;
        present: number;
        absent: number;
        late: number;
    };
    teacherComment: string;
    principalComment: string;
    isPublished: boolean;
}

export interface Student {
    id: number;
    name: string;
    avatarUrl: string;
    grade: number;
    section: string;
    department?: Department;
    attendanceStatus: AttendanceStatus;
    academicPerformance?: AcademicRecord[];
    behaviorNotes?: BehaviorNote[];
    reportCards?: ReportCard[];
}

export type StudentReportInfo = Student & { isPublished: boolean };

export interface StudentAttendance {
  studentId: number;
  date: string; // YYYY-MM-DD
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
}

export interface Teacher {
    id: number;
    name: string;
    avatarUrl: string;
    subject: string;
    classes: string[];
    email: string;
    phone: string;
}

export interface ClassInfo {
    id: string;
    subject: string;
    grade: number;
    section:string;
    department?: Department;
    studentCount: number;
}


export interface Notice {
  id: number;
  title: string;
  content: string;
  timestamp: string; // ISO string for sorting
  category: 'Event' | 'Urgent' | 'Holiday' | 'General';
  isPinned: boolean;
  imageUrl?: string;
  audience: Array<'all' | 'parents' | 'teachers' | 'students'>;
  className?: string;
}

export type EventType = 'Sport' | 'Culture' | 'Exam' | 'Holiday' | 'General';

export interface CalendarEvent {
  id: number;
  date: string; // YYYY-MM-DD format
  title: string;
  type: EventType;
  description?: string;
}

export type BookCategory = 'Fiction' | 'Science' | 'History' | 'Comics';

export interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  category: BookCategory;
}

export type DigitalResourceType = 'PDF' | 'Video' | 'Slides';

export interface DigitalResource {
  id: number;
  title: string;
  type: DigitalResourceType;
  subject: string;
  description: string;
  thumbnailUrl: string;
}

export interface VideoLesson extends DigitalResource {
  type: 'Video';
  videoUrl: string; // e.g., YouTube embed URL
  duration: string; // e.g., "12:35"
  notes: string; // Markdown formatted notes
  relatedResourceIds: number[]; // IDs of related resources
}


export interface Driver {
  name: string;
  avatarUrl:string;
  phone: string;
}

export interface PickupPoint {
  id: number;
  name: string;
  position: { top: string; left: string };
  isUserStop: boolean;
}

export interface Permission {
  id: string;
  label: string;
  enabled: boolean;
}

export type RoleName = 'Admin' | 'Teacher' | 'Parent' | 'Student';

export interface Role {
  id: RoleName;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  permissions: Permission[];
}

export type AuditLogActionType = 'login' | 'logout' | 'create' | 'update' | 'delete' | 'publish' | 'payment';

export interface AuditLog {
  id: number;
  user: {
    name:string;
    avatarUrl: string;
    role: RoleName;
  };
  action: string;
  timestamp: string; // ISO string
  type: AuditLogActionType;
}

export interface Photo {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface Assignment {
  id: number;
  title: string;
  className: string; // e.g., "Grade 10A"
  subject: string;
  dueDate: string; // ISO string
  totalStudents: number;
  submissionsCount: number;
}

export type GradingStatus = 'Graded' | 'Ungraded';

export interface Submission {
  id: number;
  assignmentId: number;
  student: {
    id: number;
    name: string;
    avatarUrl: string;
  };
  submittedAt: string; // ISO string
  isLate: boolean;
  status: GradingStatus;
  grade?: number; // score out of 100
  feedback?: string;
  textSubmission?: string;
  files?: { name: string; size: number }[];
}


export type StudentAssignment = Assignment & {
  submission?: Submission;
}

export type CurriculumSubjectCategory =
  | 'Core'
  | 'Elective'
  | 'Compulsory'
  | 'Foundational Play-Based Learning'
  | 'Core Foundational'
  | 'Pre-Primary Core'
  | 'Pre-Vocational Electives'
  | 'Other Electives';


export interface CurriculumSubject {
  name: string;
  category: CurriculumSubjectCategory;
}

export interface StudentFeeInfo {
  id: number;
  name: string;
  avatarUrl: string;
  grade: number;
  section: string;
  totalFee: number;
  paidAmount: number;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
}

export interface Message {
  id: string;
  senderId: number; // 4 for the logged-in student, others for participants
  text: string;
  timestamp: string; // ISO string
}

export interface Conversation {
  id: string;
  participant: {
    id: number;
    name: string;
    avatarUrl: string;
    role: 'Parent' | 'Student' | 'Teacher';
  };
  lastMessage: {
    text: string;
    timestamp: string; // ISO string
  };
  unreadCount: number;
  messages: Message[];
}


export type AnnouncementCategory = 'General' | 'Homework' | 'Test Reminder' | 'Event';

export interface TimetableEntry {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string; // "09:00"
  endTime: string; // "10:00"
  subject: string;
  className: string; // e.g., "Grade 11C"
}

export interface StudentPerformanceData {
  id: number;
  name: string;
  avatarUrl: string;
  grade: number;
  section: string;
  averageScore: number;
}

export interface SubjectAverage {
  subject: string;
  averageScore: number;
}

export interface AttendanceCorrelationPoint {
  attendanceBracket: string; // e.g., "90-100%"
  averageScore: number;
}

export type ActivityCategory = 'Club' | 'Sport' | 'Cultural';

export interface Activity {
  id: number;
  name: string;
  category: ActivityCategory;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface ExtracurricularEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  category: ActivityCategory;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string; // e.g., 'bg-green-100 text-green-800'
}

export interface Certificate {
  id: number;
  name: string;
  issuedDate: string; // YYYY-MM-DD
  issuer: string;
  fileUrl: string; // mock URL
}

export interface Award {
  id: number;
  name: string;
  date: string; // YYYY-MM-DD
  description: string;
}

export interface FeeBreakdownItem {
    item: string;
    amount: number;
}

export interface PaymentHistoryItem {
    id: string;
    date: string;
    amount: number;
    method: 'Bank Transfer' | 'Card' | 'Cash';
}

export interface ProgressReport {
    studentId: number;
    strengths: string[];
    areasForImprovement: string[];
    generalRemark: string;
}

export interface BehaviorAlert {
    id: number;
    studentId: number;
    studentName: string;
    type: 'Positive' | 'Incident';
    title: string;
    summary: string;
    timestamp: string; // ISO string
}

export interface Parent {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  childIds?: number[];
}

export type ComplaintStatus = 'Submitted' | 'In Progress' | 'Resolved' | 'Closed';

export interface ComplaintUpdate {
  timestamp: string; // ISO string
  status: ComplaintStatus;
  comment: string;
  by: 'You' | 'Admin';
}

export interface Complaint {
  id: string;
  category: 'Bus Service' | 'Academics' | 'Teacher Conduct' | 'Facilities' | 'Other';
  rating: number; // 1-5
  comment: string;
  imageUrl?: string;
  timeline: ComplaintUpdate[];
}

export type NotificationCategory = 'Fees' | 'Attendance' | 'Message' | 'Event' | 'Volunteering' | 'Homework';

export interface Notification {
  id: number;
  category: NotificationCategory;
  title: string;
  summary: string;
  timestamp: string; // ISO String
  isRead: boolean;
  audience: Array<'admin' | 'parent' | 'student' | 'teacher'>;
  studentId?: number; // Optional, to link to a specific child
  relatedId?: number; // e.g. parentId, eventId, etc.
}

export interface PTAMeeting {
  id: number;
  title: string;
  date: string; // ISO string
  time: string;
  agenda: { title: string; presenter: string }[];
  isPast: boolean;
}

export interface LearningResource {
  id: number;
  title: string;
  type: 'PDF' | 'Video';
  subject: string;
  description: string;
  url: string; // download or view link
  thumbnailUrl: string;
}

export interface SchoolPolicy {
  id: number;
  title:string;
  description: string;
  url: string; // download link
}

export interface VolunteeringOpportunity {
  id: number;
  title: string;
  description: string;
  date: string; // ISO string
  spotsAvailable: number;
  spotsFilled: number;
}

export interface PermissionSlip {
  id: number;
  title: string;
  description: string;
  date: string; // ISO string
  location: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

// For Admin Online Store
export interface StoreProduct {
  id: number;
  name: string;
  category: 'Uniform' | 'Book' | 'Stationery';
  price: number;
  imageUrl: string;
  stock: number;
}

export interface StoreOrder {
  id: string;
  customerName: string;
  items: { productName: string, quantity: number }[];
  totalAmount: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  orderDate: string; // ISO string
}

// For Teacher Collaboration Forum
export interface ForumPost {
  id: number;
  author: {
    name: string;
    avatarUrl: string;
  };
  content: string;
  timestamp: string; // ISO string
}

export interface ForumTopic {
  id: number;
  title: string;
  authorName: string;
  createdAt: string; // ISO string
  posts: ForumPost[];
  postCount: number;
  lastActivity: string; // ISO string
}

// For Parent Appointment Scheduling
export interface AppointmentSlot {
  time: string; // e.g., "09:00 AM"
  isBooked: boolean;
}

export interface Appointment {
  id: number;
  teacherId: number;
  parentId: number;
  studentId: number;
  date: string; // YYYY-MM-DD
  time: string;
  reason: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}

// For Student Gamified Quizzes
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: number;
  subject: string;
  title: string;
  questionCount: number;
  points: number;
  questions: QuizQuestion[];
}

export interface LessonPlan {
  id: number;
  title: string;
  grade: string;
  subject: string;
  objectives: string[];
  materials: string[];
  activities: {
    title: string;
    description: string;
  }[];
  assessment: string;
}