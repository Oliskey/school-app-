import React from 'react';
import { Exam, Notice, CalendarEvent, Book, Driver, PickupPoint, Role, AuditLog, Photo, ClassInfo, Student, BehaviorNote, AcademicRecord, Assignment, Submission, Department, Teacher, StudentFeeInfo, Conversation, TimetableEntry, DigitalResource, StudentPerformanceData, SubjectAverage, AttendanceCorrelationPoint, StudentAttendance, Message, VideoLesson, Activity, ExtracurricularEvent, Badge, Certificate, Award, FeeBreakdownItem, PaymentHistoryItem, ProgressReport, BehaviorAlert, Parent, Complaint, Notification, PTAMeeting, LearningResource, SchoolPolicy, VolunteeringOpportunity, PermissionSlip, StoreProduct, StoreOrder, ForumTopic, AppointmentSlot, Quiz, LessonPlan, PDResource, HealthLogEntry } from './types';
import { AdminIcon, TeacherNavIcon, ParentNavIcon, StudentNavIcon, FootballIcon, PaintBrushIcon, MusicNoteIcon, BookOpenIcon, BeakerIcon, TrophyIcon, MaskIcon, PerfectAttendanceIcon, StarStudentIcon, ScienceFairWinnerIcon, SportsmanshipIcon, ReadingChallengeIcon, HelpingHandIcon, MegaphoneIcon } from './constants';
import { getCurriculum } from './curriculumData';

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


export const mockStudents: Student[] = [
  { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', 
    academicPerformance: [
      {subject: 'Mathematics', score: 85, term: 'Term 1'}, 
      {subject: 'English', score: 90, term: 'Term 1'}, 
      {subject: 'Physics', score: 82, term: 'Term 1'},
      {subject: 'Mathematics', score: 88, term: 'Term 2'}, 
      {subject: 'English', score: 92, term: 'Term 2'}, 
      {subject: 'Physics', score: 85, term: 'Term 2'}
    ], 
    behaviorNotes: [{id: 1, date: '2024-07-10', type: 'Positive', title: 'Helpful in Class', note: 'Very helpful during group activities.', by: 'Mr. John Adeoye'}],
    reportCards: [
        {
            term: "First Term",
            session: "2023/2024",
            isPublished: true,
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
            isPublished: true,
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
            isPublished: false,
            academicRecords: [
                { subject: 'English Language', ca: 38, exam: 57, total: 95, grade: 'A', remark: 'Outstanding performance.' },
                { subject: 'General Mathematics', ca: 35, exam: 55, total: 90, grade: 'A', remark: 'Excellent problem-solving.' },
                { subject: 'Civic Education', ca: 0, exam: 0, total: 0, grade: '', remark: '' },
                { subject: 'Computer Studies/ICT', ca: 39, exam: 59, total: 98, grade: 'A', remark: 'Exceptional talent.' },
                { subject: 'Physics', ca: 33, exam: 54, total: 87, grade: 'B', remark: 'Very good understanding.' },
                { subject: 'Chemistry', ca: 0, exam: 0, total: 0, grade: '', remark: '' },
                { subject: 'Biology', ca: 0, exam: 0, total: 0, grade: '', remark: '' },
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
            isPublished: true,
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
            isPublished: false,
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
        {id: 1, date: '2024-07-12', type: 'Negative', title: 'Classroom Disruption', note: 'Musa was talking repeatedly during the lesson, which distracted other students.', by: 'Mr. Adeoye', suggestions: ['Discuss the importance of listening when others are speaking.', 'Find a less disruptive way to ask questions, like raising his hand.']},
        {id: 2, date: '2024-07-18', type: 'Positive', title: 'Excellent Teamwork', note: 'He worked very well with his group on the history project, contributing great ideas and helping his peers.', by: 'Mrs. Zainab Musa'},
    ],
    reportCards: [
      {
        term: "Second Term",
        session: "2023/2024",
        isPublished: true,
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
        {id: 1, date: '2024-03-15', type: 'Positive', title: 'Excellent Lab Participation', note: 'Excellent participation in Chemistry lab experiments. Showed great leadership and followed safety protocols perfectly.', by: 'Ms. Amina Sani'},
        {id: 2, date: '2024-06-20', type: 'Positive', title: 'High-Quality Work', note: 'Consistently submits high-quality English essays. A pleasure to have in class.', by: 'Mrs. Funke Akintola'},
        {id: 3, date: '2024-07-22', type: 'Negative', title: 'Homework Not Submitted', note: 'Failed to submit the Physics assignment that was due today.', by: 'Dr. Tunde Bello', suggestions: ['Help establish a routine for checking homework deadlines.', 'Review the assignment with her to ensure she understands the requirements.']},
    ],
    reportCards: [
        {
            term: "First Term",
            session: "2023/2024",
            isPublished: true,
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
            isPublished: true,
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
            isPublished: false, // This report is not published
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
    behaviorNotes: [{id: 1, date: '2024-07-15', type: 'Negative', title: 'Distracted', note: 'Distracted during the lesson.', by: 'Mr. Adeoye'}],
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
            isPublished: true,
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
  { id: 27, name: 'Queeneth Akpan', avatarUrl: 'https://i.pravatar.cc/150?u=queeneth', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 94, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 28, name: 'Richard Onu', avatarUrl: 'https://i.pravatar.cc/150?u=richard', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 80, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  // Grade 11A (4 new students, +1 existing)
  { id: 29, name: 'Sarah Gbadamosi', avatarUrl: 'https://i.pravatar.cc/150?u=sarah', grade: 11, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 95, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 30, name: 'Titi Williams', avatarUrl: 'https://i.pravatar.cc/150?u=titi', grade: 11, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 83, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 31, name: 'Uche Martins', avatarUrl: 'https://i.pravatar.cc/150?u=uche', grade: 11, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 88, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 32, name: 'Victor Eze', avatarUrl: 'https://i.pravatar.cc/150?u=victor', grade: 11, section: 'A', department: 'Science', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 77, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  // Grade 12A (4 new students, +1 existing)
  { id: 33, name: 'Wale Adenuga', avatarUrl: 'https://i.pravatar.cc/150?u=wale', grade: 12, section: 'A', department: 'Arts', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 96, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 34, name: 'Xena Chukwu', avatarUrl: 'https://i.pravatar.cc/150?u=xena', grade: 12, section: 'A', department: 'Arts', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 89, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 35, name: 'Yemi Alade', avatarUrl: 'https://i.pravatar.cc/150?u=yemi', grade: 12, section: 'A', department: 'Arts', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 92, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  { id: 36, name: 'Zubby Michael', avatarUrl: 'https://i.pravatar.cc/150?u=zubby', grade: 12, section: 'A', department: 'Arts', attendanceStatus: 'Present', academicPerformance: [{subject: 'English', score: 85, term: 'Term 1'}], behaviorNotes: [], reportCards: [] },
  // --- NEW PRIMARY SCHOOL STUDENTS ---
  { id: 37, name: 'Bisi Adeyemi', avatarUrl: 'https://i.pravatar.cc/150?u=bisi', grade: 1, section: 'A', attendanceStatus: 'Present', academicPerformance: [], behaviorNotes: [], reportCards: [] },
  { id: 38, name: 'Chike Obi', avatarUrl: 'https://i.pravatar.cc/150?u=chike', grade: 2, section: 'B', attendanceStatus: 'Present', academicPerformance: [], behaviorNotes: [], reportCards: [] },
  { id: 39, name: 'Dayo Kuti', avatarUrl: 'https://i.pravatar.cc/150?u=dayo', grade: 3, section: 'A', attendanceStatus: 'Absent', academicPerformance: [], behaviorNotes: [], reportCards: [] },
  { id: 40, name: 'Efe Oghenekaro', avatarUrl: 'https://i.pravatar.cc/150?u=efe', grade: 4, section: 'C', attendanceStatus: 'Present', academicPerformance: [], behaviorNotes: [], reportCards: [] },
  { id: 41, name: 'Funmi Williams', avatarUrl: 'https://i.pravatar.cc/150?u=funmi', grade: 5, section: 'A', attendanceStatus: 'Late', academicPerformance: [], behaviorNotes: [], reportCards: [] },
  { id: 42, name: 'Gozie Okeke', avatarUrl: 'https://i.pravatar.cc/150?u=gozie', grade: 6, section: 'B', attendanceStatus: 'Present', academicPerformance: [], behaviorNotes: [], reportCards: [] },
];

export const mockClasses: ClassInfo[] = [
  { id: '10A-Math', subject: 'Mathematics', grade: 10, section: 'A', department: 'Science', studentCount: 5 },
  { id: '12B-Phy', subject: 'Physics', grade: 12, section: 'B', department: 'Science', studentCount: 1 },
  { id: '12A-Lit', subject: 'Literature', grade: 12, section: 'A', department: 'Arts', studentCount: 5 },
  // --- CLASSES FOR MRS. AKINTOLA ---
  { id: '7A-Eng', subject: 'English', grade: 7, section: 'A', studentCount: 5 },
  { id: '8A-Eng', subject: 'English', grade: 8, section: 'A', studentCount: 5 },
  { id: '9A-Eng', subject: 'English', grade: 9, section: 'A', studentCount: 5 },
  { id: '10A-Eng', subject: 'English', grade: 10, section: 'A', department: 'Science', studentCount: 5 },
  { id: '11A-Eng', subject: 'English', grade: 11, section: 'A', department: 'Science', studentCount: 5 },
  { id: '12A-Eng', subject: 'English', grade: 12, section: 'A', department: 'Arts', studentCount: 5 },
];

export const mockAssignments: Assignment[] = [
  { id: 1, title: 'Photosynthesis Essay', className: 'Grade 11C', subject: 'Biology', dueDate: '2024-08-10T23:59:59Z', totalStudents: 2, submissionsCount: 1 },
  { id: 2, title: 'Ionic Bonds Worksheet', className: 'Grade 11C', subject: 'Chemistry', dueDate: '2024-08-12T23:59:59Z', totalStudents: 2, submissionsCount: 1 },
  { id: 3, title: 'Macbeth Character Analysis', className: 'Grade 11C', subject: 'English', dueDate: '2024-08-05T23:59:59Z', totalStudents: 1, submissionsCount: 1 },
  { id: 4, title: 'Newtonian Physics Problems', className: 'Grade 11C', subject: 'Physics', dueDate: '2024-08-15T23:59:59Z', totalStudents: 1, submissionsCount: 0 },
  { id: 5, title: 'Map of Nigeria Drawing', className: 'Grade 9A', subject: 'Geography', dueDate: '2024-08-18T23:59:59Z', totalStudents: 3, submissionsCount: 2 },
  { id: 6, title: 'Basic Algebra Worksheet', className: 'Grade 9A', subject: 'Mathematics', dueDate: '2024-08-20T23:59:59Z', totalStudents: 3, submissionsCount: 0 },
  { id: 7, title: 'Historical Events Timeline', className: 'Grade 11C', subject: 'History', dueDate: '2024-07-20T23:59:59Z', totalStudents: 1, submissionsCount: 0 },
];

export const mockSubmissions: Submission[] = [
  // Submissions for assignment 2
  { 
    id: 201, 
    assignmentId: 2, 
    student: { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima' }, 
    submittedAt: '2024-08-11T15:00:00Z', 
    isLate: false, 
    status: 'Graded', 
    grade: 95, 
    feedback: "Excellent work, Fatima. You have a strong grasp of ionic bonds. For next time, try to include a diagram to illustrate your points for full marks.",
    textSubmission: "I found this topic very interesting. My answers are in the attached document.",
    files: [{ name: 'ionic_bonds_worksheet_fatima.pdf', size: 120450 }]
  },
  // Submission for assignment 3
  { 
    id: 301, 
    assignmentId: 3, 
    student: { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima' }, 
    submittedAt: '2024-08-04T22:00:00Z', 
    isLate: false, 
    status: 'Ungraded',
    textSubmission: "Please find my analysis of Lady Macbeth's character arc attached."
  },
];

export const mockTeachers: Teacher[] = [
  { id: 1, name: 'Mr. John Adeoye', avatarUrl: 'https://i.pravatar.cc/150?u=john', subject: 'Mathematics', classes: ['10A', '11B'], email: 'j.adeoye@school.com', phone: '123-456-7890' },
  { id: 2, name: 'Mrs. Funke Akintola', avatarUrl: 'https://i.pravatar.cc/150?u=funke', subject: 'English', classes: ['7A', '8A', '9A', '10A', '11A', '12A'], email: 'f.akintola@school.com', phone: '123-456-7891' },
  { id: 3, name: 'Dr. Tunde Bello', avatarUrl: 'https://i.pravatar.cc/150?u=tunde_bello', subject: 'Physics', classes: ['12A', '12B', '11C'], email: 't.bello@school.com', phone: '123-456-7892' },
  { id: 4, name: 'Ms. Amina Sani', avatarUrl: 'https://i.pravatar.cc/150?u=amina', subject: 'Chemistry', classes: ['11A', '11C'], email: 'a.sani@school.com', phone: '123-456-7893' },
  { id: 5, name: 'Mr. Emeka Obi', avatarUrl: 'https://i.pravatar.cc/150?u=emeka_obi', subject: 'Biology', classes: ['10B', '10C', '11C'], email: 'e.obi@school.com', phone: '123-456-7894' },
  { id: 6, name: 'Mrs. Zainab Musa', avatarUrl: 'https://i.pravatar.cc/150?u=zainab_musa', subject: 'History', classes: ['9B'], email: 'z.musa@school.com', phone: '123-456-7895' },
  { id: 7, name: 'Mr. David Audu', avatarUrl: 'https://i.pravatar.cc/150?u=david_audu', subject: 'Geography', classes: ['10A', '11C'], email: 'd.audu@school.com', phone: '123-456-7880' },
  { id: 8, name: 'Ms. Grace Effiong', avatarUrl: 'https://i.pravatar.cc/150?u=grace_effiong', subject: 'Art', classes: ['9A', '9B', '9C'], email: 'g.effiong@school.com', phone: '123-456-7881' },
  { id: 9, name: 'Mr. Samuel Pwajok', avatarUrl: 'https://i.pravatar.cc/150?u=samuel', subject: 'P.E.', classes: ['All'], email: 's.pwajok@school.com', phone: '123-456-7882' },
  { id: 10, name: 'Mrs. Linda Ibeh', avatarUrl: 'https://i.pravatar.cc/150?u=linda', subject: 'Computer Science', classes: ['10B', '11A', '12A'], email: 'l.ibeh@school.com', phone: '123-456-7883' },
];

const now = new Date();
const minutesAgo = (min: number) => new Date(now.getTime() - min * 60 * 1000).toISOString();
const hoursAgo = (hr: number) => new Date(now.getTime() - hr * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000).toISOString();

export const mockHealthLogs: HealthLogEntry[] = [
    { id: 1, studentId: 3, studentName: 'Musa Ibrahim', studentAvatar: 'https://i.pravatar.cc/150?u=musa', date: daysAgo(1), time: '10:15 AM', reason: 'Headache', notes: 'Complained of a headache after first period. Rested for 20 minutes and felt better. No medication given.', parentNotified: false, recordedBy: 'Admin Nurse' },
    { id: 2, studentId: 8, studentName: 'Bolanle Ojo', studentAvatar: 'https://i.pravatar.cc/150?u=bolanle', date: daysAgo(2), time: '02:00 PM', reason: 'Minor Injury', notes: 'Scraped knee during recess. Cleaned the wound and applied a bandage.', parentNotified: true, recordedBy: 'Admin Nurse' },
    { id: 3, studentId: 41, studentName: 'Funmi Williams', studentAvatar: 'https://i.pravatar.cc/150?u=funmi', date: daysAgo(5), time: '11:30 AM', reason: 'Fever', notes: 'Temperature of 38.2°C. Administered Paracetamol after parental consent. Parent picked her up.', medicationAdministered: { name: 'Paracetamol', dosage: '250mg' }, parentNotified: true, recordedBy: 'Admin Nurse' },
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: { id: 2, name: 'Mrs. Funke Akintola', avatarUrl: mockTeachers[1].avatarUrl, role: 'Teacher' },
    lastMessage: { text: "No problem, I'll take a look and get back to you with feedback soon.", timestamp: minutesAgo(3) },
    unreadCount: 1,
    messages: [
        { id: 'msg1-1', senderId: 2, text: "Hello Fatima, please remember the deadline for the Macbeth essay is tomorrow.", timestamp: hoursAgo(26) },
        { id: 'msg1-2', senderId: 4, text: "Yes Mrs. Akintola, I've submitted the essay. Could you please check it?", timestamp: minutesAgo(5) },
        { id: 'msg1-3', senderId: 2, text: "Of course, Fatima. I see it here.", timestamp: minutesAgo(4) },
        { id: 'msg1-4', senderId: 2, text: "No problem, I'll take a look and get back to you with feedback soon.", timestamp: minutesAgo(3) },
    ]
  },
  {
    id: 'conv-2',
    participant: { id: 1001, name: 'Mr. Adewale (Adebayo\'s Parent)', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', role: 'Parent' },
    lastMessage: { text: "Thank you for the update on his performance.", timestamp: hoursAgo(2) },
    unreadCount: 0,
    messages: [
      { id: 'msg3', senderId: 2, text: "Good afternoon Mr. Adewale. Just wanted to let you know Adebayo scored 91% on the last test.", timestamp: hoursAgo(3) },
      { id: 'msg4', senderId: 1001, text: "That's wonderful news! Thank you for the update on his performance.", timestamp: hoursAgo(2) },
    ]
  },
  {
    id: 'conv-3',
    participant: { id: 1, name: 'Mr. John Adeoye', avatarUrl: mockTeachers[0].avatarUrl, role: 'Teacher' },
    lastMessage: { text: "The new math curriculum is available on the portal.", timestamp: hoursAgo(6) },
    unreadCount: 1,
    messages: [
      { id: 'msg5', senderId: 1, text: "The new math curriculum is available on the portal.", timestamp: hoursAgo(6) },
    ]
  },
  {
    id: 'conv-4',
    participant: { id: 10, name: 'Aisha Mohammed', avatarUrl: mockStudents[9].avatarUrl, role: 'Student' },
    lastMessage: { text: "I'm having trouble with question 5 on the worksheet.", timestamp: daysAgo(1) },
    unreadCount: 0,
    messages: [
      { id: 'msg6', senderId: 10, text: "Good morning Mrs. Akintola. I'm having trouble with question 5 on the worksheet.", timestamp: daysAgo(1) },
      { id: 'msg7', senderId: 2, text: "No problem, Aisha. Let's discuss it after class today.", timestamp: hoursAgo(23) },
    ]
  },
  {
    id: 'conv-5',
    participant: { id: 1002, name: 'Mrs. Okoro (Chidinma\'s Parent)', avatarUrl: 'https://i.pravatar.cc/150?u=parent2', role: 'Parent' },
    lastMessage: { text: "Can we schedule a meeting for next week?", timestamp: daysAgo(2) },
    unreadCount: 0,
    messages: [
       { id: 'msg8', senderId: 1002, text: "Hello, Can we schedule a meeting for next week?", timestamp: daysAgo(2) }
    ]
  },
  // --- Conversations specifically for Fatima Bello (Student ID 4) ---
  {
    id: 'conv-fatima-parent',
    participant: { id: 1001, name: "Mrs. Bello", avatarUrl: 'https://i.pravatar.cc/150?u=parent1', role: 'Parent' },
    lastMessage: { text: "Please remember to get your sports uniform from the store.", timestamp: hoursAgo(6) },
    unreadCount: 2,
    messages: [
      { id: 'msg-fp-1', senderId: 1001, text: "Hi honey, just a reminder about the inter-house sports next week.", timestamp: hoursAgo(7) },
      { id: 'msg-fp-2', senderId: 1001, text: "Please remember to get your sports uniform from the store.", timestamp: hoursAgo(6) },
    ]
  },
  {
    id: 'conv-fatima-classmate',
    participant: { id: 11, name: 'Chioma Adekunle', avatarUrl: mockStudents.find(s=>s.id === 11)!.avatarUrl, role: 'Student' },
    lastMessage: { text: "Are you ready for the Chemistry test tomorrow?", timestamp: daysAgo(1) },
    unreadCount: 0,
    messages: [
      { id: 'msg-fc-1', senderId: 11, text: "Hey! Are you ready for the Chemistry test tomorrow?", timestamp: daysAgo(1) },
      { id: 'msg-fc-2', senderId: 4, text: "I think so! I've been studying the mole concept all day.", timestamp: hoursAgo(23) },
    ]
  }
];

export const mockAdminConversations: Conversation[] = [
  {
    id: 'conv-admin-1',
    participant: { id: 2, name: 'Mrs. Funke Akintola', avatarUrl: mockTeachers[1].avatarUrl, role: 'Teacher' },
    lastMessage: { text: "Yes, I'll get the reports submitted by end of day.", timestamp: hoursAgo(1) },
    unreadCount: 0,
    messages: [
        { id: 'amsg1', senderId: 0, text: "Good morning Mrs. Akintola, please remember to submit the Grade 11 report card drafts today.", timestamp: hoursAgo(2) },
        { id: 'amsg2', senderId: 2, text: "Yes, I'll get the reports submitted by end of day.", timestamp: hoursAgo(1) },
    ]
  },
  {
    id: 'conv-admin-2',
    participant: { id: 1001, name: 'Mr. Adewale (Adebayo\'s Parent)', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', role: 'Parent' },
    lastMessage: { text: "Thank you for the clarification on the fee structure.", timestamp: daysAgo(1) },
    unreadCount: 0,
    messages: [
      { id: 'amsg3', senderId: 0, text: "Good afternoon Mr. Adewale. Following up on your query regarding the new session fees.", timestamp: daysAgo(1) },
      { id: 'amsg4', senderId: 1001, text: "Thank you for the clarification on the fee structure.", timestamp: daysAgo(1) },
    ]
  },
  {
    id: 'conv-admin-3',
    participant: { id: 4, name: 'Fatima Bello', avatarUrl: mockStudents[3].avatarUrl, role: 'Student' },
    lastMessage: { text: "Regarding your application for the science competition...", timestamp: hoursAgo(5) },
    unreadCount: 1,
    messages: [
      { id: 'amsg5', senderId: 0, text: "Regarding your application for the science competition...", timestamp: hoursAgo(5) },
    ]
  },
];

export const mockExamsData: Exam[] = [
    { id: 1, type: 'Mid-term', date: '2024-08-15', time: '09:00 AM - 11:00 AM', className: 'Grade 10A', subject: 'Mathematics', isPublished: true, teacherId: 1 },
    { id: 2, type: 'Final', date: '2024-12-10', time: '01:00 PM - 03:00 PM', className: 'Grade 12B', subject: 'Physics', isPublished: true },
    { id: 3, type: 'Quiz', date: '2024-07-25', time: '11:30 AM', className: 'Grade 9A', subject: 'English', isPublished: false, teacherId: 2 },
    { id: 4, type: 'Test', date: '2024-09-05', time: '02:00 PM - 03:00 PM', className: 'Grade 11C', subject: 'Chemistry', isPublished: false, teacherId: 1 },
    { id: 5, type: 'Final', date: '2024-12-12', time: '09:00 AM - 12:00 PM', className: 'Grade 11A', subject: 'Biology', isPublished: true, teacherId: 3 },
    { id: 6, type: 'Assessment', date: '2024-10-20', time: '10:00 AM', className: 'Grade 10B', subject: 'Computer Science', isPublished: false },
    { id: 7, type: 'Quiz', date: '2024-11-15', time: '03:00 PM', className: 'Grade 9C', subject: 'History', isPublished: false, teacherId: 2 },
    { id: 8, type: 'Mid-term', date: '2024-08-15', time: '12:00 PM - 01:00 PM', className: 'Grade 10B', subject: 'History', isPublished: true, teacherId: 6 },
];

export const mockNotices: Notice[] = [
    {
        id: 1,
        title: "Urgent: School Closure Tomorrow",
        content: "Due to unforeseen weather conditions, the school will be closed tomorrow, Friday, July 26th. All exams and activities are postponed. Please stay safe.",
        timestamp: "2024-07-25T18:30:00Z",
        category: 'Urgent',
        isPinned: true,
        audience: ['all'],
    },
    {
        id: 2,
        title: "Annual Sports Day Meet",
        content: "Get ready for a day of fun and competition! The Annual Sports Day is scheduled for August 10th. All students are requested to register for their favorite events.",
        timestamp: "2024-07-24T10:00:00Z",
        category: 'Event',
        isPinned: false,
        imageUrl: 'https://picsum.photos/seed/sportsday/400/200',
        audience: ['students', 'parents'],
    },
    {
        id: 3,
        title: "Parent-Teacher Meeting Schedule",
        content: "The termly Parent-Teacher meeting will be held on Saturday, August 3rd. Please book your slot with your child's class teacher.",
        timestamp: "2024-07-22T14:00:00Z",
        category: 'General',
        isPinned: false,
        audience: ['parents'],
    },
    {
        id: 4,
        title: "Independence Day Holiday",
        content: "The school will remain closed on August 15th on account of Independence Day. We will have a flag hoisting ceremony at 9:00 AM.",
        timestamp: "2024-07-20T11:00:00Z",
        category: 'Holiday',
        isPinned: false,
        audience: ['all'],
    },
     {
        id: 5,
        title: "Staff Development Workshop",
        content: "A mandatory staff development workshop on 'Modern Teaching Methodologies' will be held this Saturday in the main auditorium from 10 AM to 2 PM.",
        timestamp: "2024-07-25T09:00:00Z",
        category: 'General',
        isPinned: false,
        audience: ['teachers'],
    },
    {
        id: 6,
        title: "Chemistry Practicals Schedule",
        content: "Please find the schedule for the upcoming chemistry practicals in the attached PDF. All Grade 11C students must attend.",
        timestamp: "2024-07-28T11:00:00Z",
        category: 'General',
        isPinned: false,
        audience: ['students'],
        className: 'Grade 11C',
    },
    {
        id: 7,
        title: "Reminder: Physics Assignment Due",
        content: "This is a reminder that the assignment on Newtonian Physics is due this Friday. No late submissions will be accepted.",
        timestamp: "2024-07-29T09:00:00Z",
        category: 'Urgent',
        isPinned: true,
        audience: ['students'],
        className: 'Grade 11C',
    },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: 1, date: '2024-08-10', title: 'Annual Sports Day', type: 'Sport', description: 'All students to participate in track and field events.' },
  { id: 2, date: '2024-08-15', title: 'Independence Day', type: 'Holiday', description: 'School closed for Independence Day celebrations.' },
  { id: 3, date: '2024-08-20', title: 'Mid-term Exams Begin', type: 'Exam', description: 'Mid-term examinations for Grades 9-12.' },
  { id: 4, date: '2024-08-20', title: 'Art Exhibition', type: 'Culture', description: 'Exhibition of student artwork in the main hall.' },
  { id: 5, date: '2024-09-03', title: 'Parent-Teacher Meeting', type: 'General', description: 'Meeting for parents of Grade 10 students.' },
  { id: 6, date: '2024-09-12', title: 'Inter-School Debate', type: 'Culture', description: 'Our school is hosting the annual inter-school debate competition.' },
  { id: 7, date: '2024-09-21', title: 'Science Fair', type: 'General', description: 'Annual science fair showcasing student projects.' },
  { id: 8, date: '2024-08-21', title: 'Mid-term Exam: English', type: 'Exam' },
  { id: 9, date: '2024-08-22', title: 'Mid-term Exam: Physics', type: 'Exam' },
];

export const mockBooks: Book[] = [
  { id: 1, title: 'The Lion and the Jewel', author: 'Wole Soyinka', coverUrl: 'https://picsum.photos/seed/lion/300/400', category: 'Fiction' },
  { id: 2, title: 'A Brief History of Time', author: 'Stephen Hawking', coverUrl: 'https://picsum.photos/seed/time/300/400', category: 'Science' },
  { id: 3, title: 'Things Fall Apart', author: 'Chinua Achebe', coverUrl: 'https://picsum.photos/seed/apart/300/400', category: 'Fiction' },
  { id: 4, title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', coverUrl: 'https://picsum.photos/seed/sapiens/300/400', category: 'History' },
  { id: 5, title: 'The Aké Years', author: 'Wole Soyinka', coverUrl: 'https://picsum.photos/seed/ake/300/400', category: 'History' },
  { id: 6, title: 'Garfield', author: 'Jim Davis', coverUrl: 'https://picsum.photos/seed/garfield/300/400', category: 'Comics' },
];

export const mockDigitalResources: DigitalResource[] = [
    { id: 1, title: 'Introduction to Photosynthesis', type: 'Video', subject: 'Biology', description: 'A 10-minute animated video explaining the basics of photosynthesis.', thumbnailUrl: 'https://picsum.photos/seed/photo1/400/225' },
    { id: 2, title: 'Stoichiometry Practice Problems', type: 'PDF', subject: 'Chemistry', description: 'A worksheet with 20 practice problems on stoichiometry with an answer key.', thumbnailUrl: 'https://picsum.photos/seed/chem1/400/225' },
    { id: 3, title: 'The Globe Theatre and Shakespeare', type: 'Slides', subject: 'English', description: 'Presentation slides covering the history of the Globe Theatre.', thumbnailUrl: 'https://picsum.photos/seed/eng1/400/225' },
    { id: 4, title: "Newton's Laws of Motion", type: 'Video', subject: 'Physics', description: 'A comprehensive video lecture covering all three of Newton\'s laws.', thumbnailUrl: 'https://picsum.photos/seed/phy1/400/225' },
    { id: 5, title: 'Cellular Respiration vs. Photosynthesis', type: 'Video', subject: 'Biology', description: 'A detailed comparison between the two fundamental biological processes.', thumbnailUrl: 'https://picsum.photos/seed/bio2/400/225' },
    { id: 6, title: 'Guide to Writing a Thematic Essay', type: 'PDF', subject: 'English', description: 'A step-by-step guide on structuring and writing a thematic essay for literature.', thumbnailUrl: 'https://picsum.photos/seed/eng2/400/225' },
];

export const mockVideoLessons: VideoLesson[] = [
    { 
        id: 1, 
        title: 'Introduction to Photosynthesis', 
        type: 'Video', 
        subject: 'Biology', 
        description: 'A 10-minute animated video explaining the basics of photosynthesis.', 
        thumbnailUrl: 'https://picsum.photos/seed/photo1/400/225',
        videoUrl: 'https://www.youtube.com/embed/d2R-2T21418',
        duration: '10:25',
        notes: `
### Key Concepts:
- **What is Photosynthesis?** The process used by plants, algae, and some bacteria to convert light energy into chemical energy.
- **Formula:** 6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂
- **Two Stages:**
    1.  **Light-Dependent Reactions:** Occur in the thylakoid membrane. Water is split, oxygen is released, and ATP and NADPH are produced.
    2.  **Calvin Cycle (Light-Independent):** Occurs in the stroma. ATP and NADPH are used to convert CO₂ into glucose.
        
### Important Terms:
*   **Chloroplast:** The organelle where photosynthesis takes place.
*   **Chlorophyll:** The green pigment that absorbs light energy.
*   **Stomata:** Pores on the leaf surface for gas exchange.`,
        relatedResourceIds: [5, 2]
    },
    { 
        id: 4, 
        title: "Newton's Laws of Motion", 
        type: 'Video', 
        subject: 'Physics', 
        description: 'A comprehensive video lecture covering all three of Newton\'s laws.', 
        thumbnailUrl: 'https://picsum.photos/seed/phy1/400/225',
        videoUrl: 'https://www.youtube.com/embed/kKKM8Y-u7ds',
        duration: '15:10',
        notes: `
### Newton's First Law: Inertia
An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.

### Newton's Second Law: F = ma
The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.

### Newton's Third Law: Action-Reaction
For every action, there is an equal and opposite reaction.`,
        relatedResourceIds: []
    },
     { 
        id: 5, 
        title: 'Cellular Respiration vs. Photosynthesis', 
        type: 'Video', 
        subject: 'Biology', 
        description: 'A detailed comparison between the two fundamental biological processes.', 
        thumbnailUrl: 'https://picsum.photos/seed/bio2/400/225',
        videoUrl: 'https://www.youtube.com/embed/d2R-2T21418', // Re-using video for demo
        duration: '12:45',
        notes: `
### Key Differences:
| Feature          | Photosynthesis                 | Cellular Respiration            |
|------------------|--------------------------------|---------------------------------|
| **Function**     | Energy capture                 | Energy release                  |
| **Location**     | Chloroplasts                   | Mitochondria                    |
| **Reactants**    | CO₂, H₂O, Light                | Glucose, O₂                     |
| **Products**     | Glucose, O₂                    | CO₂, H₂O, ATP                   |
| **Equation**     | 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂   | C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O    |
`,
        relatedResourceIds: [1]
    }
];


export const mockDriver: Driver = {
  name: 'Mr. Bamidele',
  avatarUrl: 'https://picsum.photos/id/1011/100/100',
  phone: '08012345678',
};

export const mockPickupPoints: PickupPoint[] = [
  { id: 1, name: 'School', position: { top: '8%', left: '10%' }, isUserStop: false },
  { id: 2, name: 'First Gate', position: { top: '25%', left: '40%' }, isUserStop: false },
  { id: 3, name: 'Main Junction', position: { top: '45%', left: '75%' }, isUserStop: false },
  { id: 4, name: 'Your Stop', position: { top: '65%', left: '50%' }, isUserStop: true },
  { id: 5, name: 'Last Stop', position: { top: '80%', left: '20%' }, isUserStop: false },
];

export const mockRolesAndPermissions: Role[] = [
  {
    id: 'Admin',
    name: 'Administrator',
    description: 'Full access to all school management features.',
    icon: AdminIcon,
    permissions: [
      { id: 'manage-users', label: 'Manage Users', enabled: true },
      { id: 'manage-finances', label: 'Manage Finances', enabled: true },
      { id: 'view-analytics', label: 'View Analytics', enabled: true },
      { id: 'send-announcements', label: 'Send Announcements', enabled: true },
    ],
  },
  {
    id: 'Teacher',
    name: 'Teacher',
    description: 'Access to classroom and student management tools.',
    icon: TeacherNavIcon,
    permissions: [
      { id: 'manage-own-exams', label: 'Manage Own Exams', enabled: true },
      { id: 'mark-attendance', label: 'Mark Attendance', enabled: true },
      { id: 'enter-results', label: 'Enter Results', enabled: true },
      { id: 'access-library', label: 'Access Library', enabled: true },
    ],
  },
  {
    id: 'Parent',
    name: 'Parent',
    description: "View child's progress and school information.",
    icon: ParentNavIcon,
    permissions: [
      { id: 'view-reports', label: "View Child's Reports", enabled: true },
      { id: 'view-attendance', label: "View Child's Attendance", enabled: true },
      { id: 'track-bus', label: 'Track School Bus', enabled: true },
      { id: 'view-fees', label: 'View Fee Status', enabled: false },
    ],
  },
  {
    id: 'Student',
    name: 'Student',
    description: 'Access to learning materials and personal records.',
    icon: StudentNavIcon,
    permissions: [
      { id: 'view-timetable', label: 'View Timetable', enabled: true },
      { id: 'view-own-results', label: 'View Own Results', enabled: true },
      { id: 'access-library', label: 'Access Library', enabled: true },
      { id: 'use-study-buddy', label: 'Use AI Study Buddy', enabled: true },
    ],
  },
];

export const mockAuditLogs: AuditLog[] = [
  { id: 1, user: { name: 'Adekunle Ciroma', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' }, action: 'Logged into the system', timestamp: minutesAgo(2), type: 'login' },
  { id: 2, user: { name: 'Mrs. Funke Akintola', avatarUrl: 'https://i.pravatar.cc/150?u=funke', role: 'Teacher' }, action: 'Created new exam: English Mid-term', timestamp: minutesAgo(35), type: 'create' },
  { id: 3, user: { name: 'Mr. Adewale (Parent)', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', role: 'Parent' }, action: 'Made a fee payment of N50,000 for Adebayo', timestamp: hoursAgo(1), type: 'payment' },
  { id: 4, user: { name: 'Adekunle Ciroma', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' }, action: 'Published all report cards for Grade 10', timestamp: hoursAgo(3), type: 'publish' },
  { id: 5, user: { name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', role: 'Student' }, action: 'Logged into the system', timestamp: hoursAgo(4), type: 'login' },
  { id: 6, user: { name: 'Dr. Tunde Bello', avatarUrl: 'https://i.pravatar.cc/150?u=tunde_bello', role: 'Teacher' }, action: 'Updated grades for Physics Final Exam', timestamp: daysAgo(1), type: 'update' },
  { id: 7, user: { name: 'Adekunle Ciroma', avatarUrl: 'https://i.pravatar.cc/150?u=admin', role: 'Admin' }, action: 'Deleted user account: John Doe (student)', timestamp: daysAgo(2), type: 'delete' },
];

export const mockPhotos: Photo[] = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/gallery1/500/500', caption: 'Annual Sports Day 2024' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/gallery2/500/500', caption: 'Science Fair Winners' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/gallery3/500/500', caption: 'Cultural Day Celebrations' },
  { id: 4, imageUrl: 'https://picsum.photos/seed/gallery4/500/500', caption: 'Inter-house Football Match' },
  { id: 5, imageUrl: 'https://picsum.photos/seed/gallery5/500/500', caption: 'Art & Craft Exhibition' },
  { id: 6, imageUrl: 'https://picsum.photos/seed/gallery6/500/500', caption: 'Graduation Ceremony' },
];

export const mockStudentFees: StudentFeeInfo[] = [
    { id: 1, name: 'Adebayo Adewale', avatarUrl: 'https://i.pravatar.cc/150?u=adebayo', grade: 10, section: 'A', totalFee: 150000, paidAmount: 150000, dueDate: '2024-07-31', status: 'Paid' },
    { id: 2, name: 'Chidinma Okoro', avatarUrl: 'https://i.pravatar.cc/150?u=chidinma', grade: 10, section: 'B', totalFee: 150000, paidAmount: 120000, dueDate: '2024-07-31', status: 'Unpaid' },
    { id: 3, name: 'Musa Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=musa', grade: 9, section: 'A', totalFee: 140000, paidAmount: 140000, dueDate: '2024-07-31', status: 'Paid' },
    { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', grade: 11, section: 'C', totalFee: 160000, paidAmount: 100000, dueDate: '2024-07-15', status: 'Overdue' },
    { id: 5, name: 'Emeka Nwosu', avatarUrl: 'https://i.pravatar.cc/150?u=emeka', grade: 12, section: 'A', totalFee: 170000, paidAmount: 170000, dueDate: '2024-07-31', status: 'Paid' },
    { id: 6, name: 'Yusuf Aliyu', avatarUrl: 'https://i.pravatar.cc/150?u=yusuf', grade: 9, section: 'B', totalFee: 140000, paidAmount: 0, dueDate: '2024-07-10', status: 'Overdue' },
    { id: 7, name: 'Ngozi Eze', avatarUrl: 'https://i.pravatar.cc/150?u=ngozi', grade: 11, section: 'A', totalFee: 160000, paidAmount: 160000, dueDate: '2024-07-31', status: 'Paid' },
    { id: 8, name: 'Bolanle Ojo', avatarUrl: 'https://i.pravatar.cc/150?u=bolanle', grade: 10, section: 'C', totalFee: 150000, paidAmount: 75000, dueDate: '2024-08-15', status: 'Unpaid' },
];

export const mockTimetableData: TimetableEntry[] = [
  // Monday
  { day: 'Monday', startTime: '09:00', endTime: '09:45', subject: 'Mathematics', className: 'Grade 10A' },
  { day: 'Monday', startTime: '09:45', endTime: '10:30', subject: 'English', className: 'Grade 10A' },
  { day: 'Monday', startTime: '10:45', endTime: '11:30', subject: 'Physics', className: 'Grade 10A' },
  { day: 'Monday', startTime: '11:30', endTime: '12:15', subject: 'English', className: 'Grade 7A' },

  // Tuesday
  { day: 'Tuesday', startTime: '09:00', endTime: '09:45', subject: 'English', className: 'Grade 11C' },
  { day: 'Tuesday', startTime: '09:45', endTime: '10:30', subject: 'Chemistry', className: 'Grade 11C' },
  { day: 'Tuesday', startTime: '10:45', endTime: '11:30', subject: 'English', className: 'Grade 8A' },
  { day: 'Tuesday', startTime: '13:45', endTime: '14:30', subject: 'English', className: 'Grade 9A' },
  
  // Wednesday
  { day: 'Wednesday', startTime: '09:00', endTime: '10:30', subject: 'Biology', className: 'Grade 11C' },
  { day: 'Wednesday', startTime: '11:30', endTime: '12:15', subject: 'English', className: 'Grade 12A' },
  
  // Friday
  { day: 'Friday', startTime: '11:30', endTime: '12:15', subject: 'History', className: 'Grade 9A' },
  { day: 'Friday', startTime: '09:00', endTime: '09:45', subject: 'English', className: 'Grade 11A' },
];

export const mockStudentAttendance: StudentAttendance[] = [
  { studentId: 3, date: '2024-07-22', status: 'Present' },
  { studentId: 3, date: '2024-07-23', status: 'Absent' },
  { studentId: 3, date: '2024-07-24', status: 'Present' },
  { studentId: 4, date: '2024-07-22', status: 'Present' },
  { studentId: 4, date: '2024-07-23', status: 'Present' },
  { studentId: 4, date: '2024-07-24', status: 'Late' },
];

export const mockProgressData: ProgressReport[] = [
  {
    studentId: 3,
    strengths: ['Shows great creativity in Art projects.', 'Improving in team collaboration during class activities.'],
    areasForImprovement: ['Needs to be more consistent with homework submission for Mathematics.', 'Should participate more actively in class discussions.'],
    generalRemark: "Musa is a pleasant student with a lot of potential. Focusing on consistency will greatly boost his academic performance."
  }
];

export const mockNotifications: Notification[] = [
  { id: 1, category: 'Fees', title: 'Fee Reminder', summary: 'The second term school fee for Fatima Bello is now overdue.', timestamp: daysAgo(2), isRead: false, audience: ['parent'], studentId: 4 },
  { id: 2, category: 'Attendance', title: 'Absence Alert', summary: 'Musa Ibrahim was marked absent today.', timestamp: hoursAgo(5), isRead: false, audience: ['parent'], studentId: 3 },
  { id: 3, category: 'Message', title: 'New Message from Mrs. Akintola', summary: "Hello, I'd like to discuss Fatima's recent English essay...", timestamp: hoursAgo(8), isRead: true, audience: ['parent'], studentId: 4 },
  { id: 4, category: 'Event', title: 'Sports Day Next Week!', summary: "Don't forget the Annual Sports Day is next Saturday. Come cheer on the students!", timestamp: daysAgo(3), isRead: true, audience: ['all'] },
  { id: 5, category: 'Homework', title: 'New Assignment Posted', summary: 'A new assignment "Macbeth Analysis" has been posted for Grade 11C.', timestamp: hoursAgo(1), isRead: false, audience: ['student'], studentId: 4 },
  { id: 6, category: 'Volunteering', title: 'Volunteers Needed', summary: 'We need parent volunteers for the upcoming bake sale.', timestamp: daysAgo(1), isRead: false, audience: ['parent'] },
];

export const mockEnrollmentData: { year: number, count: number }[] = [
    { year: 2020, count: 450 },
    { year: 2021, count: 480 },
    { year: 2022, count: 520 },
    { year: 2023, count: 550 },
    { year: 2024, count: 580 },
];

export const mockSubjectAverages: SubjectAverage[] = [
  { subject: 'Mathematics', averageScore: 82 },
  { subject: 'English', averageScore: 88 },
  { subject: 'Physics', averageScore: 78 },
  { subject: 'Chemistry', averageScore: 75 },
  { subject: 'Biology', averageScore: 80 },
  { subject: 'History', averageScore: 72 },
];

export const mockTopStudents: StudentPerformanceData[] = [
    { id: 11, name: 'Chioma Adekunle', avatarUrl: 'https://i.pravatar.cc/150?u=chioma', grade: 10, section: 'A', averageScore: 93 },
    { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', grade: 11, section: 'C', averageScore: 92 },
];

export const mockAttendanceCorrelation: AttendanceCorrelationPoint[] = [
    { attendanceBracket: '70-80%', averageScore: 72 },
    { attendanceBracket: '80-90%', averageScore: 78 },
    { attendanceBracket: '90-100%', averageScore: 85 },
];

export const mockActivities: Activity[] = [
    { id: 1, name: 'Debate Club', category: 'Club', description: 'Hone your public speaking and argumentation skills.', icon: MegaphoneIcon },
    { id: 2, name: 'Football Team', category: 'Sport', description: 'Join the school football team for practice and competitions.', icon: FootballIcon },
    { id: 3, name: 'Art Club', category: 'Cultural', description: 'Explore your creativity with painting, drawing, and sculpture.', icon: PaintBrushIcon },
    { id: 4, name: 'School Choir', category: 'Cultural', description: 'Lend your voice to our acclaimed school choir.', icon: MusicNoteIcon },
    { id: 5, name: 'Press Club', category: 'Club', description: 'Report on school events and learn about journalism.', icon: BookOpenIcon },
    { id: 6, name: 'Basketball Team', category: 'Sport', description: 'Join the school basketball team.', icon: TrophyIcon },
];

export const mockExtracurricularEvents: ExtracurricularEvent[] = [
    { id: 1, title: 'Debate Club Tryouts', date: '2024-08-05', category: 'Club' },
    { id: 2, title: 'Football Match vs. City High', date: '2024-08-12', category: 'Sport' },
    { id: 3, title: 'Annual Art Exhibition', date: '2024-08-20', category: 'Cultural' },
];

export const mockFeeBreakdown: FeeBreakdownItem[] = [
    { item: 'Tuition Fee', amount: 112000 },
    { item: 'Bus Service', amount: 16000 },
    { item: 'Lab Fee', amount: 16000 },
    { item: 'Library Fee', amount: 16000 },
];

export const mockPaymentHistory: PaymentHistoryItem[] = [
    { id: 'TXN456', date: '2024-06-20', amount: 100000, method: 'Card' },
];

export const mockBadges: Badge[] = [
    { id: 1, name: 'Perfect Attendance', description: 'Attended every school day in a term.', icon: PerfectAttendanceIcon, color: 'bg-green-100 text-green-800' },
    { id: 2, name: 'Star Student', description: 'Top of the class for the term.', icon: StarStudentIcon, color: 'bg-yellow-100 text-yellow-800' },
    { id: 3, name: 'Science Fair Winner', description: 'First place in the annual science fair.', icon: ScienceFairWinnerIcon, color: 'bg-blue-100 text-blue-800' },
    { id: 4, name: 'Sportsmanship', description: 'Demonstrated exceptional sportsmanship.', icon: SportsmanshipIcon, color: 'bg-red-100 text-red-800' },
    { id: 5, name: 'Reading Challenge', description: 'Read over 20 books in a term.', icon: ReadingChallengeIcon, color: 'bg-indigo-100 text-indigo-800' },
    { id: 6, name: 'Helping Hand', description: 'Recognized for helping peers.', icon: HelpingHandIcon, color: 'bg-sky-100 text-sky-800' },
];

export const mockCertificates: Certificate[] = [
    { id: 1, name: 'Certificate of Excellence in Mathematics', issuedDate: '2024-04-15', issuer: 'Mathematics Department', fileUrl: '#' },
    { id: 2, name: 'Participation in Inter-School Debate', issuedDate: '2024-03-22', issuer: 'Literary & Debating Society', fileUrl: '#' },
];

export const mockAwards: Award[] = [
    { id: 1, name: 'Principal\'s Award for Academic Excellence', date: '2024-07-20', description: 'Awarded for achieving the highest overall score in Grade 11 for the session.' },
];

export const mockParents: Parent[] = [
    { id: 1001, name: 'Mr. & Mrs. Bello', email: 'bello.family@example.com', phone: '08023456789', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', childIds: [4] },
    { id: 1002, name: 'Mr. Ibrahim', email: 'm.ibrahim@example.com', phone: '08034567890', avatarUrl: 'https://i.pravatar.cc/150?u=parent2', childIds: [3] },
];

export const mockComplaints: Complaint[] = [
    {
        id: 'C001',
        category: 'Bus Service',
        rating: 2,
        comment: 'The school bus is consistently late in the mornings, causing my child to miss the assembly.',
        timeline: [
            { timestamp: daysAgo(5), status: 'Submitted', comment: 'Feedback submitted by you.', by: 'You' },
            { timestamp: daysAgo(4), status: 'In Progress', comment: 'We are looking into the bus schedule and driver punctuality.', by: 'Admin' },
        ]
    },
    {
        id: 'C002',
        category: 'Academics',
        rating: 5,
        comment: 'Mrs. Akintola has been an amazing English teacher for my daughter. Her grades have improved significantly!',
        timeline: [
            { timestamp: daysAgo(10), status: 'Submitted', comment: 'Feedback submitted by you.', by: 'You' },
            { timestamp: daysAgo(9), status: 'Resolved', comment: 'Thank you for your kind words. We have passed on your feedback to Mrs. Akintola and the school management.', by: 'Admin' },
            { timestamp: daysAgo(8), status: 'Closed', comment: 'Feedback marked as closed.', by: 'Admin' },
        ]
    }
];

export const mockLearningResources: LearningResource[] = [
    { id: 1, title: 'Helping Your Child with Homework', type: 'PDF', subject: 'General', description: 'A guide for parents on creating a positive homework environment.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/lr1/400/225' },
    { id: 2, title: 'Understanding Adolescent Behavior', type: 'Video', subject: 'General', description: 'A 15-minute video from a child psychologist.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/lr2/400/225' },
    { id: 3, title: 'Key Concepts in JSS 2 Mathematics', type: 'PDF', subject: 'Mathematics', description: 'A summary sheet of important formulas and concepts for parents to review with their child.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/lr3/400/225' },
];

export const mockSchoolPolicies: SchoolPolicy[] = [
    { id: 1, title: 'Student Code of Conduct', description: 'Guidelines for student behavior, discipline, and expectations.', url: '#' },
    { id: 2, title: 'Academic Integrity Policy', description: 'Rules regarding plagiarism, cheating, and academic honesty.', url: '#' },
    { id: 3, title: 'Health and Safety Policy', description: 'Protocols for medical emergencies, campus safety, and student well-being.', url: '#' },
];

export const mockPtaMeetings: PTAMeeting[] = [
    {
        id: 1,
        title: 'End of Term Review & Planning',
        date: '2024-08-03T10:00:00Z',
        time: '10:00 AM',
        isPast: false,
        agenda: [
            { title: 'Welcome Address', presenter: 'Principal' },
            { title: 'Review of Last Term\'s Performance', presenter: 'Head of Academics' },
            { title: 'New School Policies', presenter: 'Admin Head' },
            { title: 'Open Forum / Q&A', presenter: 'All' },
        ],
    },
];

export const mockVolunteeringOpportunities: VolunteeringOpportunity[] = [
    { id: 1, title: 'Annual Sports Day Chaperone', description: 'Help supervise students and manage events during our annual sports day.', date: '2024-08-10', spotsAvailable: 10, spotsFilled: 7 },
    { id: 2, title: 'Library Book Sorting', description: 'Assist our librarian in sorting and cataloging new books.', date: '2024-09-05', spotsAvailable: 5, spotsFilled: 5 },
    { id: 3, title: 'Annual Bake Sale Fundraiser', description: 'Help bake or sell goods to raise funds for new library books.', date: '2024-09-15', spotsAvailable: 15, spotsFilled: 8 },
];

export const mockPermissionSlip: PermissionSlip = {
    id: 1,
    title: 'Excursion to National Museum',
    description: 'We are planning an educational excursion to the National Museum. This trip will enhance students\' understanding of our national heritage. Please review and provide your consent.',
    date: '2024-10-05T09:00:00Z',
    location: 'National Museum, Lagos',
    status: 'Pending',
};

export const mockStoreProducts: StoreProduct[] = [
    { id: 1, name: 'School Blazer (Size M)', category: 'Uniform', price: 15000, imageUrl: 'https://picsum.photos/seed/blazer/400/400', stock: 25 },
    { id: 2, name: 'Senior Maths Textbook', category: 'Book', price: 3500, imageUrl: 'https://picsum.photos/seed/mathsbook/400/400', stock: 50 },
    { id: 3, name: 'Pack of 12 Pencils', category: 'Stationery', price: 1200, imageUrl: 'https://picsum.photos/seed/pencils/400/400', stock: 100 },
    { id: 4, name: 'PE Shorts (Size L)', category: 'Uniform', price: 5000, imageUrl: 'https://picsum.photos/seed/shorts/400/400', stock: 0 },
];

export const mockStoreOrders: StoreOrder[] = [
    { id: 'ORD-001', customerName: 'Mrs. Bello', items: [{ productName: 'School Blazer (Size M)', quantity: 1 }], totalAmount: 15000, status: 'Delivered', orderDate: '2024-07-20T10:00:00Z' },
    { id: 'ORD-002', customerName: 'Mr. Ibrahim', items: [{ productName: 'Senior Maths Textbook', quantity: 1 }, { productName: 'Pack of 12 Pencils', quantity: 2 }], totalAmount: 5900, status: 'Shipped', orderDate: '2024-07-22T14:30:00Z' },
    { id: 'ORD-003', customerName: 'Mr. Adewale', items: [{ productName: 'PE Shorts (Size L)', quantity: 2 }], totalAmount: 10000, status: 'Pending', orderDate: '2024-07-24T09:15:00Z' },
];

export const mockForumTopics: ForumTopic[] = [
    {
        id: 1,
        title: 'Strategies for Teaching Shakespeare to JSS 2 Students',
        authorName: 'Mrs. Funke Akintola',
        createdAt: '2024-07-20T10:00:00Z',
        postCount: 2,
        lastActivity: '2024-07-21T11:30:00Z',
        posts: [
            { id: 101, author: { name: 'Mrs. Funke Akintola', avatarUrl: 'https://i.pravatar.cc/150?u=funke' }, content: "I'm looking for some fresh ideas to make Macbeth more engaging for my JSS 2 class. What has worked for you all?", timestamp: '2024-07-20T10:00:00Z' },
            { id: 102, author: { name: 'Mr. David Audu', avatarUrl: 'https://i.pravatar.cc/150?u=david_audu' }, content: "Have you tried acting out key scenes? My students loved it last year. We even used simple props. It really brought the text to life.", timestamp: '2024-07-21T11:30:00Z' },
        ]
    },
    {
        id: 2,
        title: 'Best Resources for Teaching Basic Coding Concepts',
        authorName: 'Mrs. Linda Ibeh',
        createdAt: '2024-07-18T15:00:00Z',
        postCount: 1,
        lastActivity: '2024-07-18T15:00:00Z',
        posts: [
            { id: 201, author: { name: 'Mrs. Linda Ibeh', avatarUrl: 'https://i.pravatar.cc/150?u=linda' }, content: "Looking for recommendations on online platforms or offline activities for introducing programming logic to SSS 1 students. Any suggestions?", timestamp: '2024-07-18T15:00:00Z' },
        ]
    }
];

export const mockAppointmentSlots: AppointmentSlot[] = [
    { time: '09:00 AM', isBooked: false },
    { time: '09:30 AM', isBooked: true },
    { time: '10:00 AM', isBooked: false },
    { time: '10:30 AM', isBooked: false },
    { time: '11:00 AM', isBooked: true },
    { time: '11:30 AM', isBooked: false },
    { time: '01:00 PM', isBooked: false },
    { time: '01:30 PM', isBooked: false },
    { time: '02:00 PM', isBooked: true },
];

export const mockQuizzes: Quiz[] = [
    {
        id: 1,
        subject: 'Chemistry',
        title: 'The Periodic Table Challenge',
        questionCount: 5,
        points: 100,
        questions: [
            { question: 'What is the symbol for Gold?', options: ['Ag', 'Au', 'G', 'Go'], correctAnswer: 'Au' },
            { question: 'Which element is a noble gas?', options: ['Oxygen', 'Nitrogen', 'Neon', 'Carbon'], correctAnswer: 'Neon' },
            { question: 'What is the atomic number of Hydrogen?', options: ['1', '2', '3', '4'], correctAnswer: '1' },
            { question: 'Which of these is a Halogen?', options: ['Sodium', 'Chlorine', 'Calcium', 'Iron'], correctAnswer: 'Chlorine' },
            { question: 'What does "Fe" stand for?', options: ['Fluorine', 'Fermium', 'Iron', 'Francium'], correctAnswer: 'Iron' },
        ]
    },
    {
        id: 2,
        subject: 'English',
        title: 'Literary Devices Quiz',
        questionCount: 3,
        points: 50,
        questions: [
            { question: '"The wind whispered through the trees" is an example of:', options: ['Metaphor', 'Simile', 'Personification', 'Hyperbole'], correctAnswer: 'Personification' },
            { question: 'Which is a figure of speech involving an exaggeration?', options: ['Irony', 'Hyperbole', 'Oxymoron', 'Onomatopoeia'], correctAnswer: 'Hyperbole' },
            { question: 'What is a comparison using "like" or "as"?', options: ['Metaphor', 'Simile', 'Alliteration', 'Assonance'], correctAnswer: 'Simile' },
        ]
    }
];

export const mockPdResources: PDResource[] = [
    { id: 1, type: 'Article', title: '5 Ways to Foster a Growth Mindset in the Classroom', source: 'Edutopia', summary: 'Practical strategies to help students embrace challenges and see effort as a path to mastery.', url: '#' },
    { id: 2, type: 'Video', title: 'Using Technology for Differentiated Instruction', source: 'YouTube', summary: 'A 15-minute video showcasing digital tools to cater to diverse learning needs in your classroom.', url: '#' },
    { id: 3, type: 'Workshop', title: 'Upcoming: Project-Based Learning Seminar', source: 'School Admin', summary: 'Join us next month for a hands-on workshop on implementing PBL in your subject area. Registration required.', url: '#' },
];
