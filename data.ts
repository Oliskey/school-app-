import React from 'react';
import { Exam, Notice, CalendarEvent, Book, Driver, PickupPoint, Role, AuditLog, Photo, ClassInfo, Student, BehaviorNote, AcademicRecord, Assignment, Submission, Department, Teacher, StudentFeeInfo, Conversation, TimetableEntry, DigitalResource, StudentPerformanceData, SubjectAverage, AttendanceCorrelationPoint, StudentAttendance, Message, VideoLesson, Activity, ExtracurricularEvent, Badge, Certificate, Award, FeeBreakdownItem, PaymentHistoryItem, ProgressReport, BehaviorAlert, Parent, Complaint, Notification, PTAMeeting, LearningResource, SchoolPolicy, VolunteeringOpportunity, PermissionSlip, StoreProduct, StoreOrder, ForumTopic, AppointmentSlot, Quiz, LessonPlan } from './types';
import { AdminIcon, TeacherNavIcon, ParentNavIcon, StudentNavIcon, FootballIcon, PaintBrushIcon, MusicNoteIcon, BookOpenIcon, BeakerIcon, TrophyIcon, MaskIcon, PerfectAttendanceIcon, StarStudentIcon, ScienceFairWinnerIcon, SportsmanshipIcon, ReadingChallengeIcon, HelpingHandIcon, MegaphoneIcon } from './constants';

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
    behaviorNotes: [{id: 1, date: '2024-07-10', type: 'Positive', title: 'Helpful in Class', note: 'Very helpful during group activities.', by: 'Mr. John Adeoye'}],
    reportCards: [
        {
            term: "First Term",
            session: "2023/2024",
            isPublished: true,
            academicRecords: [
                { subject: 'English', ca: 35, exam: 55, total: 90, grade: 'A', remark: 'Excellent grasp of literary concepts.' },
                { subject: 'Mathematics', ca: 32, exam: 53, total: 85, grade: 'B', remark: 'Good effort.' },
                { subject: 'Physics', ca: 30, exam: 52, total: 82, grade: 'B', remark: 'Shows potential.' },
                { subject: 'Computer Science', ca: 38, exam: 58, total: 96, grade: 'A', remark: 'Outstanding logical skills.' },
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
                { subject: 'English', ca: 36, exam: 56, total: 92, grade: 'A', remark: 'Excellent.' },
                { subject: 'Mathematics', ca: 33, exam: 54, total: 87, grade: 'B', remark: 'Consistent improvement.' },
                { subject: 'Physics', ca: 31, exam: 53, total: 84, grade: 'B', remark: 'Good practical skills.' },
                { subject: 'Computer Science', ca: 37, exam: 57, total: 94, grade: 'A', remark: 'Top of the class.' },
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
                { subject: 'English', ca: 38, exam: 57, total: 95, grade: 'A', remark: 'Outstanding performance.' },
                { subject: 'Mathematics', ca: 35, exam: 55, total: 90, grade: 'A', remark: 'Excellent problem-solving.' },
                { subject: 'Physics', ca: 33, exam: 54, total: 87, grade: 'B', remark: 'Very good understanding.' },
                { subject: 'Computer Science', ca: 39, exam: 59, total: 98, grade: 'A', remark: 'Exceptional talent.' },
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
                { subject: 'Chemistry', ca: 35, exam: 57, total: 92, grade: 'A', remark: 'Excellent start.' },
                { subject: 'Biology', ca: 32, exam: 56, total: 88, grade: 'B', remark: 'Good understanding.' },
                { subject: 'English', ca: 30, exam: 55, total: 85, grade: 'B', remark: 'Solid performance.' },
                { subject: 'Physics', ca: 33, exam: 57, total: 90, grade: 'A', remark: 'Grasps concepts quickly.' },
                { subject: 'Mathematics', ca: 38, exam: 58, total: 96, grade: 'A', remark: 'Outstanding logical skills.' },
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
                { subject: 'Chemistry', ca: 38, exam: 57, total: 95, grade: 'A', remark: 'Exceptional understanding.' },
                { subject: 'Biology', ca: 35, exam: 56, total: 91, grade: 'A', remark: 'Very detailed lab reports.' },
                { subject: 'English', ca: 32, exam: 57, total: 89, grade: 'B', remark: 'Excellent analytical skills.' },
                { subject: 'Physics', ca: 35, exam: 57, total: 92, grade: 'A', remark: 'Consistently scores high.' },
                { subject: 'Mathematics', ca: 37, exam: 56, total: 93, grade: 'A', remark: 'Very impressive work.' },
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
  { id: 11, name: 'Chioma Adekunle', avatarUrl: 'https://i.pravatar.cc/150?u=chioma', grade: 10, section: 'A', department: 'Science', attendanceStatus: 'Present', 
    academicPerformance: [{subject: 'Mathematics', score: 95, term: 'Term 2'}, {subject: 'English', score: 91, term: 'Term 2'}], 
    behaviorNotes: [],
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
            principalComment: "Excellent work, Chioma. Keep it up."
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

export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participant: { id: 4, name: 'Fatima Bello', avatarUrl: mockStudents[3].avatarUrl, role: 'Student' },
    lastMessage: { text: "Yes Mrs. Akintola, I've submitted the essay. Could you please check it?", timestamp: minutesAgo(5) },
    unreadCount: 2,
    messages: [
        { id: 'msg1', senderId: 2, text: "Hello Fatima, please remember the deadline for the Macbeth essay is tomorrow.", timestamp: hoursAgo(26) },
        { id: 'msg2', senderId: 4, text: "Yes Mrs. Akintola, I've submitted the essay. Could you please check it?", timestamp: minutesAgo(5) },
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
  }
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
    { id: 2, name: 'Chidinma Okoro', avatarUrl: 'https://i.pravatar.cc/150?u=chidinma', grade: 10, section: 'B', totalFee: 150000, paidAmount: 100000, dueDate: '2024-07-31', status: 'Unpaid' },
    { id: 3, name: 'Musa Ibrahim', avatarUrl: 'https://i.pravatar.cc/150?u=musa', grade: 9, section: 'A', totalFee: 120000, paidAmount: 50000, dueDate: '2024-07-20', status: 'Overdue' },
    { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', grade: 11, section: 'C', totalFee: 180000, paidAmount: 180000, dueDate: '2024-07-31', status: 'Paid' },
    { id: 5, name: 'Emeka Nwosu', avatarUrl: 'https://i.pravatar.cc/150?u=emeka', grade: 12, section: 'A', totalFee: 200000, paidAmount: 100000, dueDate: '2024-07-31', status: 'Unpaid' },
    { id: 6, name: 'Yusuf Aliyu', avatarUrl: 'https://i.pravatar.cc/150?u=yusuf', grade: 9, section: 'B', totalFee: 120000, paidAmount: 120000, dueDate: '2024-07-31', status: 'Paid' },
];

export const mockTimetableData: TimetableEntry[] = [
    { day: 'Monday', startTime: '09:00', endTime: '10:00', subject: 'Mathematics', className: 'Grade 10A' },
    { day: 'Monday', startTime: '10:00', endTime: '11:00', subject: 'English', className: 'Grade 10A' },
    { day: 'Monday', startTime: '11:00', endTime: '12:00', subject: 'Physics', className: 'Grade 10A' },
    { day: 'Tuesday', startTime: '09:00', endTime: '10:00', subject: 'English', className: 'Grade 9C' },
    { day: 'Wednesday', startTime: '11:00', endTime: '12:00', subject: 'Chemistry', className: 'Grade 11C' },
    { day: 'Friday', startTime: '13:00', endTime: '14:00', subject: 'P.E.', className: 'Grade 10A' },
];

export const mockSubjectAverages: SubjectAverage[] = [
  { subject: 'Mathematics', averageScore: 85 },
  { subject: 'English', averageScore: 78 },
  { subject: 'Physics', averageScore: 82 },
  { subject: 'Chemistry', averageScore: 75 },
  { subject: 'Biology', averageScore: 88 },
  { subject: 'Computer Science', averageScore: 92 },
];

export const mockTopStudents: StudentPerformanceData[] = [
  { id: 11, name: 'Chioma Adekunle', avatarUrl: 'https://i.pravatar.cc/150?u=chioma', grade: 10, section: 'A', averageScore: 93 },
  { id: 5, name: 'Emeka Nwosu', avatarUrl: 'https://i.pravatar.cc/150?u=emeka', grade: 12, section: 'A', averageScore: 96 },
  { id: 4, name: 'Fatima Bello', avatarUrl: 'https://i.pravatar.cc/150?u=fatima', grade: 11, section: 'C', averageScore: 92 },
];

export const mockAttendanceCorrelation: AttendanceCorrelationPoint[] = [
  { attendanceBracket: '50-60%', averageScore: 55 },
  { attendanceBracket: '60-70%', averageScore: 62 },
  { attendanceBracket: '70-80%', averageScore: 71 },
  { attendanceBracket: '80-90%', averageScore: 85 },
  { attendanceBracket: '90-100%', averageScore: 91 },
];

export const mockStudentAttendance: StudentAttendance[] = [
    { studentId: 1, date: '2024-07-22', status: 'Present' },
    { studentId: 1, date: '2024-07-23', status: 'Present' },
    { studentId: 3, date: '2024-07-22', status: 'Absent' },
    { studentId: 3, date: '2024-07-23', status: 'Present' },
    { studentId: 4, date: '2024-07-22', status: 'Late' },
    { studentId: 4, date: '2024-07-23', status: 'Present' },
    ...Array.from({ length: 20 }, (_, i) => ({ studentId: 4, date: `2024-07-${(i + 1).toString().padStart(2, '0')}`, status: i % 5 === 0 ? 'Absent' : i % 7 === 0 ? 'Late' : 'Present' as 'Present' | 'Absent' | 'Late' })),
];

export const mockProgressData: ProgressReport[] = [
    {
        studentId: 3,
        strengths: ["Shows great enthusiasm in group discussions.", "Creative problem solver in practical tasks."],
        areasForImprovement: ["Consistency in homework submission.", "Needs to pay more attention to details in written work."],
        generalRemark: "Musa has a lot of potential. With a bit more focus on his independent work, he can achieve excellent results."
    },
    {
        studentId: 4,
        strengths: ["Exceptional analytical skills in scientific subjects.", "Consistently high performer across the board.", "Great leadership qualities in group projects."],
        areasForImprovement: ["Can sometimes be hesitant to ask for help when facing a challenge.", "Could benefit from exploring more creative writing styles in English."],
        generalRemark: "Fatima is a model student whose dedication is commendable. She has a bright future ahead."
    }
];

export const mockNotifications: Notification[] = [
    { id: 1, category: 'Fees', title: 'Fee Reminder', summary: 'The second term school fees for Fatima Bello are now overdue. Please pay now to avoid penalties.', timestamp: daysAgo(2), isRead: false, audience: ['parent'], studentId: 4 },
    { id: 2, category: 'Attendance', title: 'Absence Alert', summary: 'Musa Ibrahim was marked absent today, July 22nd. Please contact the school office if this is an error.', timestamp: daysAgo(3), isRead: true, audience: ['parent'], studentId: 3 },
    { id: 3, category: 'Message', title: 'New Message from Mr. Adeoye', summary: 'You have a new message regarding Adebayo Adewale\'s progress in Mathematics.', timestamp: hoursAgo(5), isRead: false, audience: ['parent'], studentId: 1 },
    { id: 4, category: 'Event', title: 'Sports Day Next Week', summary: 'Annual Sports Day is happening next Friday. Don\'t forget your sports gear!', timestamp: daysAgo(1), isRead: false, audience: ['student', 'parent', 'teacher', 'admin'] },
    { id: 5, category: 'Homework', title: 'English Assignment Graded', summary: 'Your Macbeth essay has been graded by Mrs. Akintola.', timestamp: hoursAgo(1), isRead: false, audience: ['student'], studentId: 4 },
    { id: 6, category: 'Volunteering', title: 'Call for Volunteers', summary: 'We need parent volunteers for the upcoming school fair. Sign up now!', timestamp: daysAgo(4), isRead: true, audience: ['parent'] },
    { id: 7, category: 'Fees', title: 'Urgent Fee Notice', summary: 'Final reminder for all outstanding fees for the term.', timestamp: hoursAgo(1), isRead: false, audience: ['admin'] },
    { id: 8, category: 'Message', title: 'Staff Meeting Reminder', summary: 'A brief staff meeting will be held today at 3:30 PM in the staff room.', timestamp: hoursAgo(3), isRead: false, audience: ['teacher'] },
];

export const mockEnrollmentData: { year: number, count: number }[] = [
    { year: 2020, count: 450 },
    { year: 2021, count: 480 },
    { year: 2022, count: 520 },
    { year: 2023, count: 550 },
    { year: 2024, count: 610 },
];

export const mockActivities: Activity[] = [
  { id: 1, name: 'Debate Club', category: 'Club', description: 'Hone your public speaking and critical thinking skills.', icon: MegaphoneIcon },
  { id: 2, name: 'Football Team', category: 'Sport', description: 'Join the school football team and compete with other schools.', icon: FootballIcon },
  { id: 3, name: 'Art Club', category: 'Cultural', description: 'Explore your creativity through painting, drawing, and sculpture.', icon: PaintBrushIcon },
  { id: 4, name: 'School Choir', category: 'Cultural', description: 'Lend your voice to the melodious school choir.', icon: MusicNoteIcon },
  { id: 5, name: 'Press Club', category: 'Club', description: 'Be the voice of the students. Report on school events and news.', icon: HelpingHandIcon },
];

export const mockExtracurricularEvents: ExtracurricularEvent[] = [
  { id: 1, title: 'Inter-House Football Match', date: '2024-08-10', category: 'Sport' },
  { id: 2, title: 'Annual Cultural Day', date: '2024-08-18', category: 'Cultural' },
  { id: 3, title: 'Debate Club Finals', date: '2024-08-25', category: 'Club' },
];

export const mockFeeBreakdown: FeeBreakdownItem[] = [
    { item: 'Tuition Fee', amount: 150000 },
    { item: 'Bus Service', amount: 20000 },
    { item: 'Lab Fee', amount: 5000 },
    { item: 'Library Fee', amount: 5000 },
];

export const mockPaymentHistory: PaymentHistoryItem[] = [
    { id: 'TXN12345', date: '2024-07-01', amount: 180000, method: 'Card' },
];

export const mockBadges: Badge[] = [
    { id: 1, name: 'Perfect Attendance', description: 'Awarded for 100% attendance in a term.', icon: PerfectAttendanceIcon, color: 'bg-green-100 text-green-800' },
    { id: 2, name: 'Star Student', description: 'Top of the class for the term.', icon: StarStudentIcon, color: 'bg-yellow-100 text-yellow-800' },
    { id: 3, name: 'Science Fair Winner', description: 'First place in the annual science fair.', icon: ScienceFairWinnerIcon, color: 'bg-blue-100 text-blue-800' },
    { id: 4, name: 'Sportsmanship Award', description: 'Exemplary conduct during sports activities.', icon: SportsmanshipIcon, color: 'bg-red-100 text-red-800' },
    { id: 5, name: 'Reading Challenge', description: 'Completed the termly reading challenge.', icon: ReadingChallengeIcon, color: 'bg-purple-100 text-purple-800' },
];

export const mockCertificates: Certificate[] = [
    { id: 1, name: 'Certificate of Excellence in Mathematics', issuedDate: '2024-04-12', issuer: 'Smart School Academy', fileUrl: '#' },
    { id: 2, name: 'Inter-School Debate Competition - 1st Runner Up', issuedDate: '2024-03-20', issuer: 'State Education Board', fileUrl: '#' },
];

export const mockAwards: Award[] = [
    { id: 1, name: 'Principal\'s Honor Roll', date: '2024-04-15', description: 'For achieving an overall average above 90% in the second term.' },
];

export const mockParents: Parent[] = [
    { id: 1001, name: 'Mr. Adewale (Parent)', avatarUrl: 'https://i.pravatar.cc/150?u=parent1', email: 'parent1@example.com', phone: '080-PARENT-1', childIds: [1] },
];

export const mockComplaints: Complaint[] = [
    { id: 'C001', category: 'Bus Service', rating: 3, comment: 'The school bus was 20 minutes late today without any prior notification. This has happened a few times.', timeline: [{ timestamp: daysAgo(2), status: 'Submitted', comment: 'The school bus was 20 minutes late today without any prior notification.', by: 'You'}, { timestamp: daysAgo(1), status: 'In Progress', comment: 'We are looking into the issue with the transport coordinator.', by: 'Admin'}] },
];

export const mockLearningResources: LearningResource[] = [
    { id: 1, title: 'How to Solve Quadratic Equations', type: 'Video', subject: 'Mathematics', description: 'A 15-minute tutorial on factoring and using the quadratic formula.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/lr1/400/225' },
    { id: 2, title: 'Guide to Writing a Thematic Essay', type: 'PDF', subject: 'English', description: 'A step-by-step guide on structuring and writing a thematic essay for literature.', url: '#', thumbnailUrl: 'https://picsum.photos/seed/lr2/400/225' },
];

export const mockSchoolPolicies: SchoolPolicy[] = [
    { id: 1, title: 'Student Code of Conduct', description: 'Rules and regulations regarding student behavior, discipline, and expectations.', url: '#' },
    { id: 2, title: 'Uniform & Dress Code Policy', description: 'Guidelines for appropriate school attire for all students.', url: '#' },
];

export const mockPtaMeetings: PTAMeeting[] = [
    { id: 1, title: 'Second Term PTA General Meeting', date: daysAgo(-15), time: '10:00 AM', agenda: [{ title: 'Review of Term 1 Performance', presenter: 'Principal' }, { title: 'Upcoming School Events', presenter: 'Vice Principal' }], isPast: false },
];

export const mockVolunteeringOpportunities: VolunteeringOpportunity[] = [
    { id: 1, title: 'Annual School Fair Chaperone', description: 'Help supervise students and manage a game stall at our fun-filled annual fair.', date: daysAgo(-20), spotsAvailable: 10, spotsFilled: 7 },
];

export const mockPermissionSlip: PermissionSlip = {
    id: 1,
    title: 'Excursion to National Museum',
    description: 'We are pleased to announce an educational excursion for all Grade 11 students to the National Museum. This trip will enhance their understanding of our nation\'s history and culture. Please grant your permission for your child to attend.',
    date: daysAgo(-10),
    location: 'National Museum, Lagos',
    status: 'Pending',
};

export const mockStoreProducts: StoreProduct[] = [
    { id: 1, name: 'Boys Uniform (Senior)', category: 'Uniform', price: 15000, imageUrl: 'https://picsum.photos/seed/uniform1/300/300', stock: 50 },
    { id: 2, name: 'Girls Uniform (Junior)', category: 'Uniform', price: 12000, imageUrl: 'https://picsum.photos/seed/uniform2/300/300', stock: 45 },
    { id: 3, name: 'New General Mathematics for SS1', category: 'Book', price: 3500, imageUrl: 'https://picsum.photos/seed/book1/300/300', stock: 120 },
    { id: 4, name: 'School Crested Notebooks (Pack of 5)', category: 'Stationery', price: 2500, imageUrl: 'https://picsum.photos/seed/stat1/300/300', stock: 8 },
];

export const mockStoreOrders: StoreOrder[] = [
    { id: 'ORD-001', customerName: 'Mr. Adewale (Parent)', items: [{ productName: 'Boys Uniform (Senior)', quantity: 2 }], totalAmount: 30000, status: 'Delivered', orderDate: daysAgo(5) },
];

export const mockForumTopics: ForumTopic[] = [
    { id: 1, title: 'Strategies for Teaching Shakespeare to JSS3', authorName: 'Mrs. Funke Akintola', createdAt: daysAgo(5), posts: [{ id: 1, author: { name: 'Mrs. Funke Akintola', avatarUrl: mockTeachers[1].avatarUrl }, content: 'I\'m looking for some fresh ideas to make Macbeth more engaging for my JSS3 students. What has worked for you all?', timestamp: daysAgo(5) }], postCount: 3, lastActivity: hoursAgo(2) },
];

export const mockAppointmentSlots: AppointmentSlot[] = [
    { time: '09:00 AM', isBooked: false },
    { time: '09:30 AM', isBooked: true },
    { time: '10:00 AM', isBooked: false },
];

export const mockQuizzes: Quiz[] = [
    { id: 1, subject: 'English', title: 'Literary Devices Challenge', questionCount: 10, points: 500, questions: [{ question: 'What is a metaphor?', options: ['A comparison using like or as', 'A direct comparison', 'Giving human qualities to objects', 'An exaggeration'], correctAnswer: 'A direct comparison' }, { question: 'What is "onomatopoeia"?', options: ['A word that imitates a sound', 'A type of poem', 'A character in a play', 'A figure of speech'], correctAnswer: 'A word that imitates a sound' }] },
];

export const mockLessonPlans: LessonPlan[] = [
    {
        id: 1,
        title: 'Introduction to Shakespearean Language',
        grade: 'JSS 3',
        subject: 'English',
        objectives: ['Identify common Shakespearean words', 'Understand the use of iambic pentameter'],
        materials: ['Whiteboard', 'Markers', 'Handouts of Romeo and Juliet excerpts'],
        activities: [{ title: 'Warm-up: "Translate" modern slang', description: 'Students translate modern slang into formal English to understand language evolution.' }],
        assessment: 'Short quiz on identifying Shakespearean terms.'
    }
];
