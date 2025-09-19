import React from 'react';
import { Exam, Notice, CalendarEvent, Book, Driver, PickupPoint, Role, AuditLog, Photo, ClassInfo, Student, BehaviorNote, AcademicRecord, Assignment, Submission, Department, Teacher, StudentFeeInfo, Conversation, TimetableEntry, DigitalResource, StudentPerformanceData, SubjectAverage, AttendanceCorrelationPoint, StudentAttendance, Message, VideoLesson, Activity, ExtracurricularEvent, Badge, Certificate, Award, FeeBreakdownItem, PaymentHistoryItem, ProgressReport, BehaviorAlert, Parent, Complaint, Notification, PTAMeeting, LearningResource, SchoolPolicy, VolunteeringOpportunity, PermissionSlip, StoreProduct, StoreOrder, ForumTopic, AppointmentSlot, Quiz, LessonPlan, PDResource, HealthLogEntry, ActivityCategory, AIGame, SavedTimetable, BusRoute, BusRosterEntry } from './types';
// FIX: Added all required icons to the import statement.
import { AdminIcon, TeacherNavIcon, ParentNavIcon, StudentNavIcon, FootballIcon, PaintBrushIcon, MusicNoteIcon, BookOpenIcon, BeakerIcon, TrophyIcon, MaskIcon, PerfectAttendanceIcon, StarStudentIcon, ScienceFairWinnerIcon, SportsmanshipIcon, ReadingChallengeIcon, HelpingHandIcon, MegaphoneIcon, UserGroupIcon } from './constants';
import { getCurriculum } from './curriculumData';

// --- DYNAMIC DATE HELPERS ---
const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();
const hoursAgo = (hr: number) => new Date(now.getTime() - hr * 60 * 60 * 1000).toISOString();
const minutesAgo = (min: number) => new Date(now.getTime() - min * 60 * 1000).toISOString();

const daysFromNow = (days: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

const toISODateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

const toISOTimestampString = (date: Date): string => {
    return date.toISOString();
};


export const getSubjectsForStudent = (student: Student): string[] => {
    const grade = student.grade;
    let level = '';
    
    if (grade >= 1 && grade <= 6) {
        level = `Primary ${grade}`;
    } else if (grade >= 7 && grade <= 9) {
        level = `JSS ${grade - 6}`;
    } else if (grade >= 10 && grade <= 12) {
        level = `SSS ${grade - 9}`;
    } else {
        return [];
    }

    const curriculumSubjects = getCurriculum(level, student.department);
    return curriculumSubjects.map(s => s.name);
};


export let mockStudents: Student[] = [
  { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', 
    academicPerformance: [
      {subject: 'Mathematics', score: 85, term: 'Term 1'}, 
      {subject: 'English', score: 90, term: 'Term 1'}, 
      {subject: 'Physics', score: 82, term: 'Term 1'},
      {subject: 'Mathematics', score: 88, term: 'Term 2'}, 
      {subject: 'English', score: 92, term: 'Term 2'}, 
      {subject: 'Physics', score: 85, term: 'Term 2'}
    ], 
    behaviorNotes: [{id: 1, date: toISODateString(daysFromNow(-15)), type: 'Positive', title: 'Helpful in Class', note: 'Very helpful during group activities.', by: 'Mr. John Adeoye'}],
    reportCards: [
        {
            term: "First Term",
            session: "2023/2024",
            status: 'Published',
            academicRecords: [
                { subject: 'English Language', ca: 35, exam: 55, total: 90, grade: 'A', remark: 'Excellent grasp of literary concepts.' },
                { subject: 'General Mathematics', ca: 32, exam: 53, total: 85, grade: 'B', remark: 'Good effort.' },
                { subject: 'Civic Education', ca: 34, exam: 50, total: 84, grade: 'B', remark: 'Understands civic duties.' },
                { subject: 'Computer Studies/ICT', ca: 38, exam: 58, total: 96, grade: 'A', remark: 'Outstanding logical skills.' },
                { subject: 'Physics', ca: 30, exam: 52, total: 82, grade: 'B', remark: 'Shows potential.' },
                { subject: 'Chemistry', ca: 28, exam: 49, total: 77, grade: 'C', remark: 'Good.' },
                { subject: 'Biology', ca: 31, exam: 50, total: 81, grade: 'B', remark: 'Very good.' },
            ],
            skills: { 'Neatness': 'A', 'Punctuality': 'B', 'Teamwork/Cooperation': 'A' },
            psychomotor: { 'Handwriting': 'A' },
            attendance: { total: 110, present: 108, absent: 1, late: 1 },
            teacherComment: "Adebayo demonstrated strong abilities in analytical subjects. His participation has improved.",
            principalComment: "An excellent start to the session. Keep up the good work."
        },
        {
            term: "Second Term",
            session: "2023/2024",
            status: 'Published',
            academicRecords: [
                { subject: 'English Language', ca: 36, exam: 56, total: 92, grade: 'A', remark: 'Excellent.' },
                { subject: 'General Mathematics', ca: 33, exam: 54, total: 87, grade: 'B', remark: 'Consistent improvement.' },
                { subject: 'Civic Education', ca: 35, exam: 52, total: 87, grade: 'B', remark: 'Great participation.' },
                { subject: 'Computer Studies/ICT', ca: 37, exam: 57, total: 94, grade: 'A', remark: 'Top of the class.' },
                { subject: 'Physics', ca: 31, exam: 53, total: 84, grade: 'B', remark: 'Good practical skills.' },
                { subject: 'Chemistry', ca: 30, exam: 51, total: 81, grade: 'B', remark: 'Shows improvement.' },
                { subject: 'Biology', ca: 32, exam: 52, total: 84, grade: 'B', remark: 'Good.' },
            ],
            skills: { 'Neatness': 'A', 'Punctuality': 'A' },
            psychomotor: { 'Handwriting': 'A' },
            attendance: { total: 115, present: 110, absent: 3, late: 2 },
            teacherComment: "Adebayo is a diligent student with a strong potential to excel even further. He is encouraged to participate more actively in class discussions.",
            principalComment: "A very good result. Keep up the hard work."
        },
        {
            term: "Third Term",
            session: "2023/2024",
            status: 'Submitted',
            academicRecords: [
                { subject: 'English Language', ca: 38, exam: 57, total: 95, grade: 'A', remark: 'Outstanding performance.' },
                { subject: 'General Mathematics', ca: 35, exam: 55, total: 90, grade: 'A', remark: 'Excellent problem-solving.' },
                { subject: 'Civic Education', ca: 33, exam: 48, total: 81, grade: 'B', remark: 'Very good.' },
                { subject: 'Computer Studies/ICT', ca: 39, exam: 59, total: 98, grade: 'A', remark: 'Exceptional talent.' },
                { subject: 'Physics', ca: 33, exam: 54, total: 87, grade: 'B', remark: 'Very good understanding.' },
                { subject: 'Chemistry', ca: 32, exam: 50, total: 82, grade: 'B', remark: 'Good.' },
                { subject: 'Biology', ca: 34, exam: 53, total: 87, grade: 'B', remark: 'Great work.' },
            ],
            skills: { 'Neatness': 'A', 'Punctuality': 'A', 'Teamwork/Cooperation': 'A' },
            psychomotor: { 'Handwriting': 'A' },
            attendance: { total: 120, present: 118, absent: 1, late: 1 },
            teacherComment: "Adebayo has had a stellar year, finishing strong. His dedication is a model for his peers.",
            principalComment: "An outstanding session overall. Well done, Adebayo!"
        }
    ],
  },
  { id: 2, name: 'Chidinma Okoro', avatarUrl: 'https://i.pravatar.cc/150?u=chidinma', grade: 10, section: 'B', department: 'Commercial', attendanceStatus: 'Present', 
    academicPerformance: [{subject: 'Mathematics', score: 78, term: 'Term 2'}, {subject: 'English', score: 82, term: 'Term 2'}, {subject: 'Economics', score: 75, term: 'Term 2'}], 
    behaviorNotes: [],
    reportCards: [
        {
            term: "First Term",
            session: "2023/2024",
            status: 'Published',
            academicRecords: [
                { subject: 'English', ca: 30, exam: 45, total: 75, grade: 'C', remark: 'Good effort.' },
                { subject: 'Mathematics', ca: 28, exam: 48, total: 76, grade: 'C', remark: 'Satisfactory.' },
                { subject: 'Economics', ca: 32, exam: 50, total: 82, grade: 'B', remark: 'Very good understanding of concepts.' },
            ],
            skills: { 'Punctuality': 'B', 'Participation in Class': 'B' },
            psychomotor: { 'Handwriting': 'B' },
            attendance: { total: 110, present: 109, absent: 1, late: 0 },
            teacherComment: "Chidinma has settled in well and shows great potential in Commercial subjects.",
            principalComment: "A promising start. Keep working hard."
        },
        {
            term: "Second Term",
            session: "2023/2024",
            status: 'Draft',
            academicRecords: [
                { subject: 'English', ca: 32, exam: 48, total: 80, grade: 'B', remark: 'Shows marked improvement.' },
                { subject: 'Mathematics', ca: 30, exam: 49, total: 79, grade: 'C', remark: 'Steady progress.' },
                { subject: 'Economics', ca: 34, exam: 53, total: 87, grade: 'B', remark: 'Excellent analytical skills.' },
            ],
            skills: { 'Punctuality': 'A', 'Participation in Class': 'B' },
            psychomotor: { 'Handwriting': 'B' },
            attendance: { total: 115, present: 115, absent: 0, late: 0 },
            teacherComment: "Chidinma continues to show great progress and works diligently in class.",
            principalComment: "Very good improvement this term."
        }
    ],
  },
  { id: 3, name: 'Musa Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=musa', grade: 9, section: 'A', attendanceStatus: 'Present', 
    academicPerformance: [{subject: 'Mathematics', score: 68, term: 'Term 2'}, {subject: 'English', score: 72, term: 'Term 2'}, {subject: 'History', score: 65, term: 'Term 2'}], 
    behaviorNotes: [
        {id: 1, date: toISODateString(daysFromNow(-13)), type: 'Negative', title: 'Classroom Disruption', note: 'Musa was talking repeatedly during the lesson, which distracted other students.', by: 'Mr. Adeoye', suggestions: ['Discuss the importance of listening when others are speaking.', 'Find a less disruptive way to ask questions, like raising his hand.']},
        {id: 2, date: toISODateString(daysFromNow(-7)), type: 'Positive', title: 'Excellent Teamwork', note: 'He worked very well with his group on the history project, contributing great ideas and helping his peers.', by: 'Mrs. Zainab Musa'},
    ],
    reportCards: [
      {
        term: "Second Term",
        session: "2023/2024",
        status: 'Published',
        academicRecords: [
            { subject: 'Mathematics', ca: 28, exam: 40, total: 68, grade: 'D', remark: 'Needs to practice more regularly.' },
            { subject: 'English', ca: 30, exam: 42, total: 72, grade: 'C', remark: 'Good comprehension skills.' },
            { subject: 'History', ca: 25, exam: 40, total: 65, grade: 'D', remark: 'Shows interest but needs to improve on dates.' },
        ],
        skills: { 'Punctuality': 'B', 'Participation in Class': 'C' },
        psychomotor: { 'Handwriting': 'B' },
        attendance: { total: 115, present: 110, absent: 5, late: 0 },
        teacherComment: "Musa is a capable student who needs to apply himself more consistently to his studies. He has shown improvement this term.",
        principalComment: "A satisfactory result. There is room for improvement."
    }
    ],
  },
  { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', grade: 11, section: 'C', department: 'Science', attendanceStatus: 'Present', 
    academicPerformance: [
      {subject: 'Chemistry', score: 92, term: 'Term 1'}, 
      {subject: 'Biology', score: 88, term: 'Term 1'}, 
      {subject: 'English', score: 85, term: 'Term 1'}, 
      {subject: 'Physics', score: 90, term: 'Term 1'},
      {subject: 'Chemistry', score: 95, term: 'Term 2', teacherRemark: "Exceptional understanding of stoichiometry."}, 
      {subject: 'Biology', score: 91, term: 'Term 2', teacherRemark: "Very detailed and accurate lab reports."}, 
      {subject: 'English', score: 89, term: 'Term 2', teacherRemark: "Excellent analytical skills in literature."}, 
      {subject: 'Physics', score: 92, term: 'Term 2', teacherRemark: "Consistently scores high on practical assessments."},
    ], 
    behaviorNotes: [
        {id: 1, date: toISODateString(daysFromNow(-120)), type: 'Positive', title: 'Excellent Lab Participation', note: 'Excellent participation in Chemistry lab experiments. Showed great leadership and followed safety protocols perfectly.', by: 'Ms. Amina Sani'},
        {id: 2, date: toISODateString(daysFromNow(-30)), type: 'Positive', title: 'High-Quality Work', note: 'Consistently submits high-quality English essays. A pleasure to have in class.', by: 'Mrs. Funke Akintola'},
        {id: 3, date: toISODateString(daysFromNow(-3)), type: 'Negative', title: 'Homework Not Submitted', note: 'Failed to submit the Physics assignment that was due today.', by: 'Dr. Tunde Bello', suggestions: ['Help establish a routine for checking homework deadlines.', 'Review the assignment with her to ensure she understands the requirements.']},
    ],
    reportCards: [
        {
            term: "First Term",
            session: "2023/2024",
            status: 'Published',
            academicRecords: [
                { subject: 'English Language', ca: 30, exam: 55, total: 85, grade: 'B', remark: 'Solid performance.' },
                { subject: 'General Mathematics', ca: 38, exam: 58, total: 96, grade: 'A', remark: 'Outstanding logical skills.' },
                { subject: 'Civic Education', ca: 33, exam: 55, total: 88, grade: 'B', remark: 'Good.' },
                { subject: 'Physics', ca: 33, exam: 57, total: 90, grade: 'A', remark: 'Grasps concepts quickly.' },
                { subject: 'Chemistry', ca: 35, exam: 57, total: 92, grade: 'A', remark: 'Excellent start.' },
                { subject: 'Biology', ca: 32, exam: 56, total: 88, grade: 'B', remark: 'Good understanding.' },
            ],
            skills: { 'Neatness': 'A', 'Punctuality': 'A', 'Homework Completion': 'A' },
            psychomotor: { 'Handwriting': 'A', 'Drawing/Art Skills': 'B' },
            attendance: { total: 110, present: 108, absent: 2, late: 0 },
            teacherComment: "Fatima has had a fantastic start to the session. Her focus and dedication are commendable.",
            principalComment: "An excellent beginning. Keep up the great work."
        },
        {
            term: "Second Term",
            session: "2023/2024",
            status: 'Published',
            academicRecords: [
                { subject: 'English Language', ca: 32, exam: 57, total: 89, grade: 'B', remark: 'Excellent analytical skills.' },
                { subject: 'General Mathematics', ca: 37, exam: 56, total: 93, grade: 'A', remark: 'Very impressive work.' },
                { subject: 'Civic Education', ca: 35, exam: 56, total: 91, grade: 'A', remark: 'Excellent.' },
                { subject: 'Physics', ca: 35, exam: 57, total: 92, grade: 'A', remark: 'Consistently scores high.' },
                { subject: 'Chemistry', ca: 38, exam: 57, total: 95, grade: 'A', remark: 'Exceptional understanding.' },
                { subject: 'Biology', ca: 35, exam: 56, total: 91, grade: 'A', remark: 'Very detailed lab reports.' },
            ],
            skills: { 'Neatness': 'A', 'Punctuality': 'A', 'Participation in Class': 'B', 'Homework Completion': 'A' },
            psychomotor: { 'Handwriting': 'A', 'Drawing/Art Skills': 'B' },
            attendance: { total: 115, present: 112, absent: 1, late: 2 },
            teacherComment: "Fatima is an exemplary student who excels academically. She is a role model for her peers. Keep up the fantastic work!",
            principalComment: "An outstanding result. Fatima is a beacon of academic excellence in our school."
        },
        {
            term: "Third Term",
            session: "2023/2024",
            status: 'Draft',
            academicRecords: [],
            skills: {},
            psychomotor: {},
            attendance: { total: 0, present: 0, absent: 0, late: 0 },
            teacherComment: "",
            principalComment: ""
        }
    ]
  },
  { id: 5, name: 'Emeka Nwosu', avatarUrl: 'https://i.pravatar.cc/150?u=emeka', grade: 12, section: 'A', department: 'Arts', attendanceStatus: 'Leave', 
    academicPerformance: [{subject: 'Physics', score: 94, term: 'Term 2'}, {subject: 'Computer Science', score: 98, term: 'Term 2'}, {subject: 'English', score: 88, term: 'Term 1'}], 
    behaviorNotes: [],
    reportCards: [],
  },
  { id: 6, name: 'Yusuf Aliyu', avatarUrl: 'https://i.pravatar.cc/150?u=yusuf', grade: 9, section: 'B', attendanceStatus: 'Present', 
    academicPerformance: [{subject: 'Mathematics', score: 81, term: 'Term 2'}, {subject: 'English', score: 79, term: 'Term 2'}], 
    behaviorNotes: [],
    reportCards: [],
  },
  { id: 7, name: 'Ngozi Eze', avatarUrl: 'https://i.pravatar.cc/150?u=ngozi', grade: 11, section: 'A', department: 'Science', attendanceStatus: 'Late', 
    academicPerformance: [{subject: 'Chemistry', score: 88, term: 'Term 2'}, {subject: 'Biology', score: 85, term: 'Term 2'}, {subject: 'English', score: 90, term: 'Term 1'}], 
    behaviorNotes: [],
    reportCards: [],
  },
  { id: 8, name: 'Bolanle Ojo', avatarUrl: 'https://i.pravatar.cc/150?u=bolanle', grade: 10, section: 'C', department: 'Arts', attendanceStatus: 'Absent', 
    academicPerformance: [{subject: 'Mathematics', score: 65, term: 'Term 2'}, {subject: 'English', score: 61, term: 'Term 2'}], 
    behaviorNotes: [{id: 1, date: toISODateString(daysFromNow(-10)), type: 'Negative', title: 'Distracted', note: 'Distracted during the lesson.', by: 'Mr. Adeoye'}],
    reportCards: [],
  },
  { id: 9, name: 'Tunde Bakare', avatarUrl: 'https://i.pravatar.cc/150?u=tunde', grade: 12, section: 'B', department: 'Commercial', attendanceStatus: 'Present', 
    academicPerformance: [{subject: 'Physics', score: 89, term: 'Term 2'}, {subject: 'Computer Science', score: 92, term: 'Term 2'}], 
    behaviorNotes: [],
    reportCards: [],
  },
  { id: 10, name: 'Aisha Mohammed', avatarUrl: 'https://i.pravatar.cc/150?u=aisha', grade: 9, section: 'C', attendanceStatus: 'Present', 
    academicPerformance: [{subject: 'English', score: 90, term: 'Term 2'}, {subject: 'History', score: 88, term: 'Term 2'}], 
    behaviorNotes: [],
    reportCards: [],
  },
  { id: 11, name: 'Chioma Adekunle', avatarUrl: 'https://i.pravatar.cc/150?u=chioma', grade: 11, section: 'C', department: 'Science', attendanceStatus: 'Present', 
    academicPerformance: [{subject: 'Mathematics', score: 95, term: 'Term 2'}, {subject: 'English', score: 91, term: 'Term 2'}], 
    reportCards: [
      {
            term: "Second Term",
            session: "2023/2024",
            status: 'Published',
            academicRecords: [
                { subject: 'English', ca: 36, exam: 55, total: 91, grade: 'A', remark: 'A pleasure to have in class.' },
            ],
            skills: { 'Punctuality': 'A' },
            psychomotor: { 'Handwriting': 'B' },
            attendance: { total: 115, present: 115, absent: 0, late: 0 },
            teacherComment: "Chioma is an outstanding and well-behaved student. Her dedication is commendable.",
            principalComment: "Excellent work, Chioma. Keep it up.",
        }
    ],
  },
  // --- NEW STUDENTS FOR MRS. AKINTOLA'S CLASSES ---
  // Grade 7A (5 students)
  { id: 12, name: 'Femi Adekunle', avatarUrl: 'https://i.pravatar.cc/150?u=femi', grade: 7, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 88, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 13, name: 'Blessing Chukwu', avatarUrl: 'https://i.pravatar.cc/150?u=blessing', grade: 7, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 92, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 14, name: 'Sadiq Bello', avatarUrl: 'https://i.pravatar.cc/150?u=sadiq', grade: 7, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 85, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 15, name: 'Tari Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=tari', grade: 7, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 78, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 16, name: 'Zainab Idris', avatarUrl: 'https://i.pravatar.cc/150?u=zainab', grade: 7, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 90, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  // Grade 8A (5 students)
  { id: 17, name: 'David Okon', avatarUrl: 'https://i.pravatar.cc/150?u=david', grade: 8, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 82, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 18, name: 'Grace Olamide', avatarUrl: 'https://i.pravatar.cc/150?u=grace', grade: 8, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 89, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 19, name: 'Isaac Danjuma', avatarUrl: 'https://i.pravatar.cc/150?u=isaac', grade: 8, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 76, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 20, name: 'Joy Adebayo', avatarUrl: 'https://i.pravatar.cc/150?u=joy', grade: 8, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 91, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 21, name: 'Kingsley Nwachukwu', avatarUrl: 'https://i.pravatar.cc/150?u=kingsley', grade: 8, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 84, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  // Grade 9A (4 new students, +1 existing)
  { id: 22, name: 'Lola Shodiya', avatarUrl: 'https://i.pravatar.cc/150?u=lola', grade: 9, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 87, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 23, name: 'Mike Efe', avatarUrl: 'https://i.pravatar.cc/150?u=mike', grade: 9, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 79, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 24, name: 'Nneka Obi', avatarUrl: 'https://i.pravatar.cc/150?u=nneka', grade: 9, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 93, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 25, name: 'Olaoluwa Peters', avatarUrl: 'https://i.pravatar.cc/150?u=olaoluwa', grade: 9, section: 'A', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 81, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  // Grade 10A (3 new students, +2 existing)
  { id: 26, name: 'Peter Umoh', avatarUrl: 'https://i.pravatar.cc/150?u=peter', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 86, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 27, name: 'Queeneth Akpan', avatarUrl: 'https://i.pravatar.cc/150?u=queeneth', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 90, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 28, name: 'Richard Udo', avatarUrl: 'https://i.pravatar.cc/150?u=richard', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 83, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
];

export let mockTeachers: Teacher[] = [
  { id: 1, name: 'Mr. John Adeoye', avatarUrl: 'https://i.pravatar.cc/150?u=adeoye', subjects: ['Mathematics', 'General Mathematics'], classes: ['10A', '10B', '11C'], email: 'j.adeoye@school.com', phone: '123-456-7890', status: 'Active' },
  { id: 2, name: 'Mrs. Funke Akintola', avatarUrl: 'https://i.pravatar.cc/150?u=funke', subjects: ['English', 'English Language', 'Literature-in-English'], classes: ['7A', '8A', '9A', '10A'], email: 'f.akintola@school.com', phone: '123-456-7891', status: 'Active' },
  { id: 3, name: 'Dr. Tunde Bello', avatarUrl: 'https://i.pravatar.cc/150?u=bello', subjects: ['Physics', 'Basic Technology'], classes: ['10A', '11C', '12A'], email: 't.bello@school.com', phone: '123-456-7892', status: 'Active' },
  { id: 4, name: 'Ms. Amina Sani', avatarUrl: 'https://i.pravatar.cc/150?u=amina', subjects: ['Chemistry', 'Basic Science'], classes: ['10B', '11A', '11C'], email: 'a.sani@school.com', phone: '123-456-7893', status: 'Active' },
  { id: 5, name: 'Mrs. Zainab Musa', avatarUrl: 'https://i.pravatar.cc/150?u=zainab', subjects: ['History', 'Social Studies'], classes: ['9A', '9B', '12A'], email: 'z.musa@school.com', phone: '123-456-7894', status: 'Active' },
];

export let mockParents: Parent[] = [
    { id: 1001, name: 'Mr. & Mrs. Ibrahim', email: 'm.ibrahim@email.com', phone: '555-0101', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', childIds: [3] },
    { id: 1002, name: 'Mrs. Bello', email: 'f.bello@email.com', phone: '555-0102', avatarUrl: 'https://i.pravatar.cc/150?u=parent2', childIds: [4] },
];

// --- NEW DATA FOR ANALYTICS & REPORTS ---
export const mockEnrollmentData: { year: number, count: number }[] = [
  { year: 2020, count: 850 },
  { year: 2021, count: 920 },
  { year: 2022, count: 980 },
  { year: 2023, count: 1050 },
  { year: 2024, count: 1120 },
];

export const mockSubjectAverages: SubjectAverage[] = [
    { subject: 'Mathematics', averageScore: 82 },
    { subject: 'English', averageScore: 88 },
    { subject: 'Physics', averageScore: 78 },
    { subject: 'Chemistry', averageScore: 75 },
    { subject: 'Biology', averageScore: 81 },
    { subject: 'Computer Science', averageScore: 91 },
];

export const mockTopStudents: StudentPerformanceData[] = [
    { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', grade: 11, section: 'C', averageScore: 92 },
    { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo', grade: 10, section: 'A', averageScore: 89 },
    { id: 11, name: 'Chioma Adekunle', avatarUrl: 'https://i.pravatar.cc/150?u=chioma', grade: 11, section: 'C', averageScore: 88 },
];

export const mockAttendanceCorrelation: AttendanceCorrelationPoint[] = [
    { attendanceBracket: '60-70%', averageScore: 65 },
    { attendanceBracket: '70-80%', averageScore: 72 },
    { attendanceBracket: '80-90%', averageScore: 81 },
    { attendanceBracket: '90-100%', averageScore: 89 },
];

export const mockProgressData: ProgressReport[] = [
    { 
        studentId: 3, 
        strengths: ["Shows great enthusiasm in history.", "Improving in teamwork.", "Good creative ideas in projects."],
        areasForImprovement: ["Consistency in completing math homework.", "Focus during individual classwork.", "Following instructions carefully."],
        generalRemark: "Musa is a bright student with a lot of potential. Focusing on consistency will greatly improve his academic outcomes."
    },
    { 
        studentId: 4, 
        strengths: ["Exceptional analytical skills in Sciences.", "Consistently high performer.", "Demonstrates leadership in group activities."],
        areasForImprovement: ["Could participate more in literature discussions to share insights.", "Time management on larger projects."],
        generalRemark: "Fatima is a model student. She is encouraged to continue challenging herself and sharing her knowledge with peers."
    }
];

export let mockNotifications: Notification[] = [
    { id: 1, category: 'Fees', title: 'Term 2 Fees Due', summary: 'Reminder: Your child\'s second term fees are due by July 30th, 2024.', timestamp: daysAgo(2), isRead: false, audience: ['parent'], studentId: 3 },
    { id: 2, category: 'Attendance', title: 'Absence Notification', summary: 'Bolanle Ojo was marked absent today, July 15th, 2024.', timestamp: hoursAgo(5), isRead: false, audience: ['parent'], studentId: 8 },
    { id: 3, category: 'Event', title: 'Sports Day!', summary: 'Annual Inter-House Sports Day is this Friday. Come cheer for our students!', timestamp: daysAgo(1), isRead: true, audience: ['all'] },
    { id: 4, category: 'Message', title: 'New Message from Mr. Adeoye', summary: 'I would like to discuss Musa\'s progress in Mathematics...', timestamp: hoursAgo(2), isRead: false, audience: ['parent'], studentId: 3 },
    { id: 5, category: 'Homework', title: 'New Physics Assignment', summary: 'A new assignment on "Newton\'s Laws of Motion" has been posted.', timestamp: hoursAgo(8), isRead: true, audience: ['student'], studentId: 4 },
    { id: 6, category: 'Volunteering', title: 'Call for Volunteers', summary: 'We need parent volunteers for the upcoming school fair. Sign up now!', timestamp: daysAgo(3), isRead: true, audience: ['parent'] },
    // FIX: Changed 'General' to 'Event' to match the NotificationCategory type.
    { id: 7, category: 'Event', title: 'Mid-term Break', summary: 'The school will be on mid-term break from Aug 5th to Aug 9th.', timestamp: daysAgo(10), isRead: true, audience: ['all']},
    // FIX: Changed 'Urgent' to 'Event' to match the NotificationCategory type.
    { id: 8, category: 'Event', title: 'School Closure', summary: 'Due to unforeseen circumstances, the school will be closed tomorrow.', timestamp: hoursAgo(1), isRead: false, audience: ['all']},
];

export let mockExamsData: Exam[] = [
  { id: 1, type: 'Mid-term', date: '2024-08-12', time: '09:00 AM', className: 'Grade 10A', subject: 'Mathematics', isPublished: true, teacherId: 1 },
  { id: 2, type: 'Final', date: '2024-09-10', time: '10:00 AM', className: 'Grade 11C', subject: 'Physics', isPublished: true, teacherId: 3 },
  { id: 3, type: 'Quiz', date: '2024-08-05', time: '11:00 AM', className: 'Grade 9A', subject: 'History', isPublished: true, teacherId: 5 },
  { id: 4, type: 'Test', date: '2024-08-20', time: '01:00 PM', className: 'Grade 10A', subject: 'English', isPublished: false, teacherId: 2 },
  { id: 5, type: 'Assessment', date: '2024-08-22', time: '09:00 AM', className: 'Grade 7A', subject: 'English', isPublished: true, teacherId: 2 },
];

export let mockStudentFees: StudentFeeInfo[] = [
    { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo', grade: 10, section: 'A', totalFee: 150000, paidAmount: 150000, dueDate: '2024-07-30', status: 'Paid' },
    { id: 2, name: 'Chidinma Okoro', avatarUrl: 'https://i.pravatar.cc/150?u=chidinma', grade: 10, section: 'B', totalFee: 150000, paidAmount: 100000, dueDate: '2024-07-30', status: 'Unpaid' },
    { id: 3, name: 'Musa Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=musa', grade: 9, section: 'A', totalFee: 120000, paidAmount: 50000, dueDate: '2024-07-30', status: 'Unpaid' },
    { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', grade: 11, section: 'C', totalFee: 180000, paidAmount: 180000, dueDate: '2024-07-30', status: 'Paid' },
    { id: 8, name: 'Bolanle Ojo', avatarUrl: 'https://i.pravatar.cc/150?u=bolanle', grade: 10, section: 'C', totalFee: 150000, paidAmount: 0, dueDate: '2024-06-30', status: 'Overdue' },
];

export let mockAssignments: Assignment[] = [
    { id: 1, title: 'Essay on "Things Fall Apart"', className: 'Grade 10A', subject: 'English', dueDate: daysFromNow(5).toISOString(), totalStudents: 25, submissionsCount: 18 },
    { id: 2, title: 'Quadratic Equations Worksheet', className: 'Grade 10A', subject: 'Mathematics', dueDate: daysFromNow(3).toISOString(), totalStudents: 25, submissionsCount: 22 },
    { id: 3, title: 'Lab Report: Titration', className: 'Grade 11C', subject: 'Chemistry', dueDate: daysFromNow(10).toISOString(), totalStudents: 28, submissionsCount: 15 },
    { id: 4, title: 'Oral Presentation: The Nigerian Civil War', className: 'Grade 9A', subject: 'History', dueDate: daysFromNow(12).toISOString(), totalStudents: 30, submissionsCount: 5 },
    { id: 5, title: 'Practical: Ohm\'s Law', className: 'Grade 11C', subject: 'Physics', dueDate: daysFromNow(7).toISOString(), totalStudents: 28, submissionsCount: 20 },
];

export let mockSubmissions: Submission[] = [
    { id: 101, assignmentId: 1, student: { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo' }, submittedAt: daysAgo(1), isLate: false, status: 'Graded', grade: 85, feedback: "A very well-written essay. Your points were clear and well-supported. Try to expand more on the cultural context next time." },
    { id: 102, assignmentId: 2, student: { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo' }, submittedAt: daysAgo(0), isLate: false, status: 'Ungraded' },
    { id: 103, assignmentId: 1, student: { id: 26, name: 'Peter Umoh', avatarUrl: 'https://i.pravatar.cc/150?u=peter' }, submittedAt: daysAgo(2), isLate: false, status: 'Graded', grade: 78, feedback: "Good analysis, but be mindful of grammatical errors." },
    { id: 104, assignmentId: 3, student: { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima' }, submittedAt: daysAgo(0), isLate: false, status: 'Ungraded', textSubmission: "The titration experiment was conducted to determine the concentration of the unknown acid. The endpoint was reached when the solution turned a faint pink color..." },
];

export let mockNotices: Notice[] = [
  { id: 1, title: 'Mid-term Break Announcement', content: 'The school will be on mid-term break from Monday, August 5th to Friday, August 9th. School resumes on Monday, August 12th.', timestamp: daysAgo(10), category: 'Holiday', isPinned: true, audience: ['all'] },
  { id: 2, title: 'Parent-Teacher Conference', content: 'The Parent-Teacher Conference for this term is scheduled for Saturday, August 3rd. Please book your appointments.', timestamp: daysAgo(15), category: 'Event', isPinned: false, audience: ['parents', 'teachers'] },
  { id: 3, title: 'Inter-House Sports Heat', content: 'The annual Inter-House Sports heat will take place this Friday. Students should come in their sports attire.', timestamp: daysAgo(2), category: 'Event', isPinned: false, imageUrl: 'https://picsum.photos/seed/sports/400/200', audience: ['students', 'teachers'] },
  { id: 4, title: 'Urgent: Water Pipe Maintenance', content: 'Due to urgent maintenance on the main water pipe, the school will close at 1 PM tomorrow, July 18th.', timestamp: hoursAgo(3), category: 'Urgent', isPinned: false, audience: ['all'] },
  { id: 5, title: 'JSS 3 English Homework', content: 'Reminder for all JSS 3 students: Your essay on "A Day I Will Never Forget" is due this Friday.', timestamp: daysAgo(1), category: 'General', isPinned: false, audience: ['students'], className: 'Grade 9A' },
];

export let mockStudentAttendance: StudentAttendance[] = [
    { studentId: 3, date: toISODateString(daysFromNow(-2)), status: 'Present' },
    { studentId: 3, date: toISODateString(daysFromNow(-3)), status: 'Absent' },
    { studentId: 4, date: toISODateString(daysFromNow(-1)), status: 'Present' },
    { studentId: 4, date: toISODateString(daysFromNow(-2)), status: 'Late' },
    { studentId: 4, date: toISODateString(daysFromNow(-3)), status: 'Present' },
];

export let mockTimetableData: TimetableEntry[] = [
    { day: 'Monday', startTime: '09:00', endTime: '09:45', subject: 'Mathematics', className: 'Grade 10A' },
    { day: 'Monday', startTime: '09:45', endTime: '10:30', subject: 'English', className: 'Grade 10A' },
    { day: 'Tuesday', startTime: '09:00', endTime: '09:45', subject: 'Physics', className: 'Grade 11C' },
    { day: 'Friday', startTime: '11:30', endTime: '12:15', subject: 'Chemistry', className: 'Grade 11C' },
    // Student specific (Fatima Bello - Grade 11C)
    { day: new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any, startTime: '09:00', endTime: '09:45', subject: 'Physics', className: 'Grade 11C' },
    { day: new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any, startTime: '09:45', endTime: '10:30', subject: 'Chemistry', className: 'Grade 11C' },
    // Teacher specific (Mrs. Funke Akintola)
    { day: new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any, startTime: '10:30', endTime: '11:15', subject: 'English', className: 'Grade 10A' },
    { day: new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any, startTime: '11:30', endTime: '12:15', subject: 'Literature-in-English', className: 'Grade 9A' },
    { day: new Date().toLocaleDateString('en-US', { weekday: 'long' }) as any, startTime: '13:45', endTime: '14:30', subject: 'English', className: 'Grade 8A' },
];

export let mockConversations: Conversation[] = [
    {
        id: 'conv1',
        participant: { id: 1001, name: 'Mr. & Mrs. Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', role: 'Parent' },
        lastMessage: { text: 'Thank you for the update on his performance.', timestamp: hoursAgo(2) },
        unreadCount: 0,
        messages: [
            { id: 'm1', senderId: 2, text: 'Hello, I wanted to discuss Musa\'s recent test scores.', timestamp: hoursAgo(3), type: 'text' },
            { id: 'm2', senderId: 1001, text: 'Okay, I am available to chat now.', timestamp: hoursAgo(2.5), type: 'text' },
            { id: 'm3', senderId: 1001, text: 'Thank you for the update on his performance.', timestamp: hoursAgo(2), type: 'text' },
        ]
    },
    {
        id: 'conv2',
        participant: { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo', role: 'Student' },
        lastMessage: { text: 'Good morning, ma. I have submitted the essay.', timestamp: hoursAgo(5) },
        unreadCount: 1,
        messages: [
            { id: 'm4', senderId: 1, text: 'Good morning, ma. I have submitted the essay.', timestamp: hoursAgo(5), type: 'text' },
        ]
    },
    {
        id: 'conv3',
        participant: { id: 1002, name: 'Mrs. Bello', avatarUrl: 'https://i.pravatar.cc/150?u=parent2', role: 'Parent' },
        lastMessage: { text: 'I saw the notification. Thank you for letting me know.', timestamp: daysAgo(1) },
        unreadCount: 0,
        messages: []
    }
];

export let mockAdminConversations: Conversation[] = [
    {
        id: 'admin_conv_1',
        participant: { id: 2, name: 'Mrs. Funke Akintola', avatarUrl: 'https://i.pravatar.cc/150?u=funke', role: 'Teacher' },
        lastMessage: { text: 'The reports for JSS 1 have been submitted for review.', timestamp: hoursAgo(1) },
        unreadCount: 1,
        messages: [{ id: 'adm1', senderId: 2, text: 'The reports for JSS 1 have been submitted for review.', timestamp: hoursAgo(1), type: 'text' }]
    },
    {
        id: 'admin_conv_2',
        participant: { id: 1001, name: 'Mr. & Mrs. Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', role: 'Parent' },
        lastMessage: { text: 'Good morning, I have a question about the school fees portal.', timestamp: hoursAgo(4) },
        unreadCount: 1,
        messages: [{ id: 'adm2', senderId: 1001, text: 'Good morning, I have a question about the school fees portal.', timestamp: hoursAgo(4), type: 'text' }]
    },
];

export let mockCalendarEvents: CalendarEvent[] = [
  { id: 1, date: '2024-08-03', title: 'Parent-Teacher Conference', type: 'General' },
  { id: 2, date: '2024-08-05', title: 'Mid-term Break Starts', type: 'Holiday' },
  { id: 3, date: '2024-08-12', title: 'Mid-term Exams Start', type: 'Exam', description: 'Exams for all classes begin.' },
  { id: 4, date: '2024-08-23', title: 'Inter-House Sports Day', type: 'Sport', description: 'Annual sports competition.' },
  { id: 5, date: '2024-09-02', title: 'Cultural Day', type: 'Culture', description: 'A celebration of diverse cultures.' },
];

export let mockDigitalResources: (DigitalResource | VideoLesson)[] = [
  { id: 1, title: 'Introduction to Photosynthesis', type: 'Video', subject: 'Biology', description: 'A detailed video explaining the process of photosynthesis.', thumbnailUrl: 'https://picsum.photos/seed/biology/400/300', videoUrl: 'https://www.youtube.com/embed/DixEbnOM5i4', duration: "8:42", notes: "### Key Concepts\n- **Chlorophyll**: The green pigment in plants.\n- **Sunlight**: The energy source.\n- **Formula**: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂", relatedResourceIds: [2] },
  { id: 2, title: 'The Nigerian Civil War: A Summary', type: 'PDF', subject: 'History', description: 'A comprehensive PDF document covering the key events.', thumbnailUrl: 'https://picsum.photos/seed/history/400/300' },
  { id: 3, title: 'Solving Quadratic Equations', type: 'Video', subject: 'Mathematics', description: 'Step-by-step guide to solving quadratic equations.', thumbnailUrl: 'https://picsum.photos/seed/math/400/300' },
  { id: 4, title: 'Shakespeare\'s "Macbeth" Analysis', type: 'Slides', subject: 'Literature-in-English', description: 'Presentation slides on key themes and characters.', thumbnailUrl: 'https://picsum.photos/seed/english/400/300' },
  { id: 5, title: 'The Laws of Motion', type: 'Video', subject: 'Physics', description: "An engaging video explaining Newton's three laws of motion.", thumbnailUrl: 'https://picsum.photos/seed/physics/400/300' },
];

export const mockPickupPoints: PickupPoint[] = [
  { id: 1, name: 'School', position: { top: '8%', left: '10%' }, isUserStop: false },
  { id: 2, name: 'Main Gate', position: { top: '25%', left: '40%' }, isUserStop: false },
  { id: 3, name: 'Library Junction', position: { top: '15%', left: '70%' }, isUserStop: false },
  { id: 4, name: 'City Mall', position: { top: '55%', left: '80%' }, isUserStop: false },
  { id: 5, name: 'My Stop', position: { top: '60%', left: '30%' }, isUserStop: true },
  { id: 6, name: 'Last Stop', position: { top: '80%', left: '15%' }, isUserStop: false },
];

export let mockRolesAndPermissions: Role[] = [
  { id: 'Admin', name: 'Administrator', description: 'Full access to all system features.', icon: AdminIcon, permissions: [
      { id: 'manage-users', label: 'Manage Students & Staff', enabled: true },
      { id: 'manage-finances', label: 'Manage Finances', enabled: true },
      { id: 'view-analytics', label: 'View School Analytics', enabled: true },
      { id: 'send-announcements', label: 'Send Announcements to All', enabled: true },
  ]},
  { id: 'Teacher', name: 'Teacher', description: 'Access to classroom and student management tools.', icon: TeacherNavIcon, permissions: [
      { id: 'manage-own-exams', label: 'Create & Manage Own Exams', enabled: true },
      { id: 'mark-attendance', label: 'Mark Class Attendance', enabled: true },
      { id: 'enter-results', label: 'Enter Student Results', enabled: true },
      { id: 'access-library', label: 'Access E-Learning Library', enabled: true },
  ]},
  { id: 'Parent', name: 'Parent', description: 'Access to their child\'s records and school info.', icon: ParentNavIcon, permissions: [
      { id: 'view-reports', label: 'View Child\'s Report Cards', enabled: true },
      { id: 'view-attendance', label: 'View Child\'s Attendance', enabled: true },
      { id: 'track-bus', label: 'Track School Bus', enabled: false },
      { id: 'view-fees', label: 'View & Pay Fees', enabled: true },
  ]},
  { id: 'Student', name: 'Student', description: 'Access to learning materials and personal records.', icon: StudentNavIcon, permissions: [
      { id: 'view-timetable', label: 'View Timetable', enabled: true },
      { id: 'view-own-results', label: 'View Own Results', enabled: true },
      { id: 'access-library', label: 'Access E-Learning Library', enabled: true },
      { id: 'use-study-buddy', label: 'Use AI Study Buddy', enabled: true },
  ]},
];

export let mockAuditLogs: AuditLog[] = [
  { id: 1, user: { name: 'Admin', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' }, action: 'Logged into the system.', timestamp: minutesAgo(5), type: 'login' },
  { id: 2, user: { name: 'Mrs. Funke Akintola', avatarUrl: 'https://i.pravatar.cc/150?u=funke', role: 'Teacher' }, action: 'Published results for Grade 10A English.', timestamp: hoursAgo(1), type: 'publish' },
  { id: 3, user: { name: 'Admin', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' }, action: 'Updated student profile for Adebayo Adewale.', timestamp: hoursAgo(3), type: 'update' },
  { id: 4, user: { name: 'Mr. & Mrs. Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', role: 'Parent' }, action: 'Made a fee payment of NGN 50,000.', timestamp: daysAgo(1), type: 'payment' },
  { id: 5, user: { name: 'Admin', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' }, action: 'Deleted an exam schedule.', timestamp: daysAgo(2), type: 'delete' },
];

export let mockPhotos: Photo[] = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/sportsday/400/400', caption: 'Sports Day 2024' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/sciencefair/400/400', caption: 'Science Fair Winners' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/culturalday/400/400', caption: 'Cultural Day Celebration' },
    { id: 4, imageUrl: 'https://picsum.photos/seed/classroom/400/400', caption: 'A day in the lab' },
    { id: 5, imageUrl: 'https://picsum.photos/seed/artclass/400/400', caption: 'Art Class Creations' },
    { id: 6, imageUrl: 'https://picsum.photos/seed/graduation/400/400', caption: 'Graduating Class' },
];

export let mockClasses: ClassInfo[] = [
    { id: '7A', subject: 'English', grade: 7, section: 'A', studentCount: 25 },
    { id: '8A', subject: 'English', grade: 8, section: 'A', studentCount: 28 },
    { id: '9A', subject: 'English', grade: 9, section: 'A', studentCount: 30 },
    { id: '10A', subject: 'English', grade: 10, section: 'A', studentCount: 25, department: 'Science' },
];

export let mockFeeBreakdown: FeeBreakdownItem[] = [
    { item: 'Tuition Fee', amount: 120000 },
    { item: 'Bus Service', amount: 25000 },
    { item: 'Uniform', amount: 20000 },
    { item: 'Textbooks', amount: 15000 },
];

export let mockPaymentHistory: PaymentHistoryItem[] = [
    { id: 'TXN12345', date: '2024-07-01', amount: 100000, method: 'Card' },
    { id: 'TXN12346', date: '2024-04-15', amount: 80000, method: 'Bank Transfer' },
];

export let mockBadges: Badge[] = [
    { id: 1, name: 'Perfect Attendance', description: 'Awarded for not missing a single day in a term.', icon: PerfectAttendanceIcon, color: 'bg-green-100 text-green-800' },
    { id: 2, name: 'Star Student', description: 'Top 5% academic performance in a term.', icon: StarStudentIcon, color: 'bg-yellow-100 text-yellow-800' },
    { id: 3, name: 'Science Fair Winner', description: 'First place in the annual science fair.', icon: ScienceFairWinnerIcon, color: 'bg-blue-100 text-blue-800' },
    { id: 4, name: 'Sportsmanship Award', description: 'Exemplary conduct during sports activities.', icon: SportsmanshipIcon, color: 'bg-red-100 text-red-800' },
    { id: 5, name: 'Reading Challenge', description: 'Completed the termly reading challenge.', icon: ReadingChallengeIcon, color: 'bg-indigo-100 text-indigo-800' },
    { id: 6, name: 'Helping Hand', description: 'Recognized for helping peers and teachers.', icon: HelpingHandIcon, color: 'bg-pink-100 text-pink-800' },
];

export let mockCertificates: Certificate[] = [
    { id: 1, name: 'Certificate of Academic Excellence', issuedDate: '2024-04-12', issuer: 'Smart School Academy', fileUrl: '#' },
    { id: 2, name: 'Participation in National Debate', issuedDate: '2024-02-20', issuer: 'Nigerian Schools Debate Council', fileUrl: '#' },
];

export let mockAwards: Award[] = [
    { id: 1, name: 'Principal\'s Honor Roll', date: '2024-04-12', description: 'Recognized for achieving an overall average of over 90%.' },
];

export let mockComplaints: Complaint[] = [
  { id: 'COMP-001', category: 'Bus Service', rating: 2, comment: "The school bus is frequently late in the mornings.", timeline: [
      { timestamp: daysAgo(5), status: 'Submitted', comment: "The school bus is frequently late in the mornings.", by: 'You' },
      { timestamp: daysAgo(4), status: 'In Progress', comment: 'We are looking into the route schedule. Thank you for your feedback.', by: 'Admin' },
  ]},
  { id: 'COMP-002', category: 'Academics', rating: 5, comment: "Mrs. Akintola has been an amazing English teacher for my child.", timeline: [
      { timestamp: daysAgo(10), status: 'Submitted', comment: "Mrs. Akintola has been an amazing English teacher for my child.", by: 'You' },
      { timestamp: daysAgo(9), status: 'Resolved', comment: 'Thank you for your kind feedback. It has been passed on to the teacher.', by: 'Admin' },
  ]},
];

export let mockLearningResources: LearningResource[] = [
    { id: 1, title: 'Tips for Supporting Your Child with Homework', type: 'PDF', subject: 'General', description: 'A helpful guide for parents.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/homework/400/200' },
    { id: 2, title: 'Understanding the JSS Curriculum', type: 'Video', subject: 'Academics', description: 'An overview of what your child will learn in junior secondary.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/curriculum/400/200' },
];

export let mockSchoolPolicies: SchoolPolicy[] = [
    { id: 1, title: 'Student Code of Conduct', description: 'The official guidelines for student behavior and discipline.', url: '#' },
    { id: 2, title: 'Uniform & Dress Code Policy', description: 'Details on required school attire.', url: '#' },
];

export let mockPtaMeetings: PTAMeeting[] = [
    { id: 1, title: 'Third Term General Meeting', date: daysFromNow(15).toISOString(), time: '10:00 AM', agenda: [
        { title: 'Principal\'s Welcome Address', presenter: 'School Principal' },
        { title: 'Review of Last Term\'s Performance', presenter: 'Head of Academics' },
        { title: 'Upcoming Events & Calendar', presenter: 'School Admin' },
    ], isPast: false },
    { id: 2, title: 'Second Term General Meeting', date: daysAgo(90), time: '10:00 AM', agenda: [], isPast: true },
];

export let mockVolunteeringOpportunities: VolunteeringOpportunity[] = [
    { id: 1, title: 'Annual School Fair Chaperone', description: 'Help supervise students at various game stalls.', date: daysFromNow(25).toISOString(), spotsAvailable: 10, spotsFilled: 4 },
    { id: 2, title: 'Library Book Sorting', description: 'Assist the librarian in organizing new books.', date: daysFromNow(18).toISOString(), spotsAvailable: 5, spotsFilled: 5 },
];

export const mockPermissionSlip: PermissionSlip = {
    id: 1,
    title: 'Excursion to National Museum',
    description: 'We are pleased to announce an educational excursion to the National Museum for all Grade 9 students. This trip will provide students with a hands-on learning experience related to their history curriculum. Transportation will be by the school bus.',
    date: daysFromNow(12).toISOString(),
    location: 'National Museum, Lagos',
    status: 'Pending',
};

export let mockStoreProducts: StoreProduct[] = [
    { id: 1, name: 'School Blazer', category: 'Uniform', price: 15000, imageUrl: 'https://picsum.photos/seed/blazer/300/300', stock: 50 },
    { id: 2, name: 'Math Textbook JSS1', category: 'Book', price: 3500, imageUrl: 'https://picsum.photos/seed/mathbook/300/300', stock: 120 },
    { id: 3, name: 'School Tie', category: 'Uniform', price: 1500, imageUrl: 'https://picsum.photos/seed/tie/300/300', stock: 80 },
    { id: 4, name: 'Scientific Calculator', category: 'Stationery', price: 5000, imageUrl: 'https://picsum.photos/seed/calculator/300/300', stock: 35 },
];

export let mockStoreOrders: StoreOrder[] = [
    { id: 'ORD-001', customerName: 'Mrs. Bello', items: [{ productName: 'School Blazer', quantity: 1 }], totalAmount: 15000, status: 'Delivered', orderDate: daysAgo(5) },
    { id: 'ORD-002', customerName: 'Mr. Ibrahim', items: [{ productName: 'Math Textbook JSS1', quantity: 2 }], totalAmount: 7000, status: 'Shipped', orderDate: daysAgo(2) },
    { id: 'ORD-003', customerName: 'Mrs. Okoro', items: [{ productName: 'School Tie', quantity: 2 }, { productName: 'Scientific Calculator', quantity: 1 }], totalAmount: 8000, status: 'Pending', orderDate: hoursAgo(6) },
];

export let mockForumTopics: ForumTopic[] = [
  { id: 1, title: 'Strategies for Teaching Large Classes', authorName: 'Mr. John Adeoye', createdAt: daysAgo(5), postCount: 8, lastActivity: hoursAgo(3), posts: [
      { id: 101, author: { name: 'Mr. John Adeoye', avatarUrl: 'https://i.pravatar.cc/150?u=adeoye' }, content: 'I\'m looking for new ideas to keep my large math classes engaged. What works for you all?', timestamp: daysAgo(5) },
      { id: 102, author: { name: 'Mrs. Funke Akintola', avatarUrl: 'https://i.pravatar.cc/150?u=funke' }, content: 'Group work has been a lifesaver for me! I divide them into smaller groups with assigned roles.', timestamp: daysAgo(4) },
  ]},
  { id: 2, title: 'Best Digital Tools for Science Labs', authorName: 'Ms. Amina Sani', createdAt: daysAgo(2), postCount: 4, lastActivity: hoursAgo(8), posts: [
     { id: 201, author: { name: 'Ms. Amina Sani', avatarUrl: 'https://i.pravatar.cc/150?u=amina' }, content: 'Does anyone have recommendations for virtual lab software?', timestamp: daysAgo(2) },
  ]},
];

export const mockAppointmentSlots: AppointmentSlot[] = [
    { time: '09:00 AM', isBooked: true }, { time: '09:30 AM', isBooked: false }, { time: '10:00 AM', isBooked: false },
    { time: '10:30 AM', isBooked: true }, { time: '11:00 AM', isBooked: false }, { time: '11:30 AM', isBooked: true },
];

export let mockQuizzes: Quiz[] = [
    { id: 1, subject: 'Mathematics', title: 'Algebra Basics', questionCount: 10, points: 100, questions: [
        { question: 'What is x if 2x + 5 = 15?', options: ['3', '5', '10', '2.5'], correctAnswer: '5' },
        { question: 'What is the square root of 81?', options: ['7', '8', '9', '10'], correctAnswer: '9' },
    ]},
    { id: 2, subject: 'English', title: 'Literary Devices', questionCount: 15, points: 150, questions: [
        { question: 'What is a metaphor?', options: ['A comparison using "like" or "as"', 'Giving human qualities to objects', 'A direct comparison of two unlike things', 'An exaggeration'], correctAnswer: 'A direct comparison of two unlike things' },
    ]},
];

export let mockPdResources: PDResource[] = [
    { id: 1, type: 'Article', title: '5 Strategies for Differentiated Instruction', source: 'Edutopia', summary: 'Practical tips for catering to diverse learning needs in a single classroom.', url: '#' },
    { id: 2, type: 'Video', title: 'The Power of Project-Based Learning', source: 'YouTube', summary: 'A TED talk on how PBL can boost student engagement and real-world skills.', url: '#' },
    { id: 3, type: 'Workshop', title: 'AI in the Classroom (Upcoming)', source: 'School Admin', summary: 'Internal workshop on leveraging AI tools for lesson planning and student support. Register by Friday.', url: '#' },
];

export let mockHealthLogs: HealthLogEntry[] = [
    { id: 1, studentId: 8, studentName: 'Bolanle Ojo', studentAvatar: 'https://i.pravatar.cc/150?u=bolanle', date: daysAgo(1), time: '10:15 AM', reason: 'Headache', notes: 'Given paracetamol and rested for 30 minutes. Felt better and returned to class.', medicationAdministered: { name: 'Paracetamol', dosage: '500mg' }, parentNotified: true, recordedBy: 'Nurse Aisha' },
    { id: 2, studentId: 15, studentName: 'Tari Johnson', studentAvatar: 'https://i.pravatar.cc/150?u=tari', date: daysAgo(1), time: '01:30 PM', reason: 'Minor Injury', notes: 'Scraped knee during recess. Cleaned the wound and applied a bandage. Parent notified via phone call.', parentNotified: true, recordedBy: 'Nurse Aisha' },
    // FIX: Changed property 'name' to 'studentName' to match the HealthLogEntry interface.
    { id: 3, studentId: 3, studentName: 'Musa Ibrahim', studentAvatar: 'https://i.pravatar.cc/150?u=musa', date: daysAgo(3), time: '11:00 AM', reason: 'Stomach Ache', notes: 'Complained of a stomach ache. Rested in the sick bay. Did not require medication. Parent was notified and picked him up.', parentNotified: true, recordedBy: 'Nurse Aisha' },
];

// FIX: Added mockActivities export to resolve import error in ExtracurricularsScreen.
export let mockActivities: Activity[] = [
  { id: 1, name: 'Debate Club', category: 'Club', description: 'Sharpen your public speaking and critical thinking skills.', icon: UserGroupIcon },
  { id: 2, name: 'School Football Team', category: 'Sport', description: 'Join the school team and compete in local tournaments.', icon: FootballIcon },
  { id: 3, name: 'Art & Craft Club', category: 'Cultural', description: 'Express your creativity through painting, drawing, and crafts.', icon: PaintBrushIcon },
  { id: 4, name: 'Music Club', category: 'Club', description: 'Learn to play an instrument or join the school choir.', icon: MusicNoteIcon },
  { id: 5, name: 'Press Club', category: 'Club', description: 'Be the voice of the school, report on events and write articles.', icon: MegaphoneIcon },
];

// FIX: Added mockExtracurricularEvents export to resolve import error in ExtracurricularsScreen.
export let mockExtracurricularEvents: ExtracurricularEvent[] = [
  { id: 1, title: 'Inter-House Football Match', date: toISODateString(daysFromNow(10)), category: 'Sport' },
  { id: 2, title: 'Annual Art Exhibition', date: toISODateString(daysFromNow(25)), category: 'Cultural' },
  { id: 3, title: 'Debate Club Tryouts', date: toISODateString(daysFromNow(5)), category: 'Club' },
];

export let mockCustomAIGames: AIGame[] = [];
// FIX: Changed to an object wrapper to allow mutable reference across modules, resolving import assignment errors.
export let mockSavedTimetable: { current: SavedTimetable | null } = { current: null };

// --- NEW DATA FOR BUS ROSTER ---
export const mockDrivers: Driver[] = [
  { id: 1, name: 'Mr. Tunde Adekunle', avatarUrl: 'https://i.pravatar.cc/150?u=driver1', phone: '+234 802 345 6789' },
  { id: 2, name: 'Mrs. Fatima Sani', avatarUrl: 'https://i.pravatar.cc/150?u=driver2', phone: '+234 803 123 4567' },
  { id: 3, name: 'Mr. Emeka Okoro', avatarUrl: 'https://i.pravatar.cc/150?u=driver3', phone: '+234 804 987 6543' },
];

export const mockBusRoutes: BusRoute[] = [
    { id: 'route-a', name: 'Route A', description: 'Ikoyi - Victoria Island' },
    { id: 'route-b', name: 'Route B', description: 'Lekki Phase 1 - Ajah' },
    { id: 'route-c', name: 'Route C', description: 'Surulere - Yaba' },
];

export let mockBusRoster: BusRosterEntry[] = [
    // Pre-assign a driver for today for demo purposes
    { routeId: 'route-a', driverId: 1, date: new Date().toISOString().split('T')[0] },
    { routeId: 'route-b', driverId: 2, date: new Date().toISOString().split('T')[0] },
];