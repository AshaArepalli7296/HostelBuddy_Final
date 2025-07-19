import { createRouter, createWebHistory } from 'vue-router'
import HostelBuddy from '@/pages/hostel-buddy/HostelBuddy.vue'
import AboutUs from  '@/pages/hostel-buddy/AboutUs.vue'
import ContactUs from '@/pages/hostel-buddy/ContactUs.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import ForgotPassword from '@/pages/auth/ForgotPassword.vue'
import Apply from '@/pages/hostel-buddy/student/room/Apply.vue'
import WardenDashboard from '@/pages/hostel-buddy/warden/WardenDashboard.vue'
import StudentDashboard from '@/pages/hostel-buddy/student/StudentDashboard.vue'
import StudentProfile  from '@/pages/hostel-buddy/student/profile/StudentProfile.vue'
import ApplyLeave from '@/pages/hostel-buddy/student/leave/ApplyLeave.vue'
import CancelMeal from '@/pages/hostel-buddy/student/mess/CancelMeal.vue'
import RoomDetails from '@/pages/hostel-buddy/student/room/RoomDetails.vue'
import ChangeRequest from '@/pages/hostel-buddy/student/room/ChangeRequest.vue'
import Complaints from '@/pages/hostel-buddy/student/complaints/Complaints.vue'
import Feedback from '@/pages/hostel-buddy/student/mess/Feedback.vue'
import Menu from '@/pages/hostel-buddy/student/mess/Menu.vue'
import AdminProfile from '@/pages/hostel-buddy/warden/AdminProfile.vue'
import Announcements from '@/pages/hostel-buddy/warden/Announcements.vue'
import ComplaintStatus from '@/pages/hostel-buddy/warden/ComplaintStatus.vue'
import FeePayment from '@/pages/hostel-buddy/warden/finance/FeePayment.vue'
import HostelOccupancy from '@/pages/hostel-buddy/warden/HostelOccupancy.vue'
import RoomAssignment from '@/pages/hostel-buddy/warden/RoomAssignment.vue'
import ComplaintManagement from '@/pages/hostel-buddy/warden/ComplaintManagement.vue'
import FeedbackReview from '@/pages/hostel-buddy/warden/FeedbackReview.vue'
import FeeManagement from '../pages/hostel-buddy/warden/FeeManagement.vue'
import LeaveApproval from '@/pages/hostel-buddy/warden/LeaveApproval.vue'
import MenuUpdate from '@/pages/hostel-buddy/warden/MenuUpdate.vue'
import PaymentTracking from '../pages/hostel-buddy/warden/PaymentTracking.vue'
import RoomChange from '../pages/hostel-buddy/warden/RoomChange.vue'
import AnnouncementForm from '../pages/hostel-buddy/warden/AnnouncementForm.vue'
import NotFound from '../pages/shared/NotFound.vue'
import Help from '../pages/shared/Help.vue'
import Settings from '../pages/hostel-buddy/warden/Settings.vue'
import StudentManagement from '../pages/hostel-buddy/warden/StudentManagement.vue'








// import WardenDashboard from '@/pages/hostel-buddy/warden/WardenDashboard.vue'

const routes = [
  {
    path: '/hostel-buddy',
    name: 'HostelBuddy',
    component: HostelBuddy
  },
  {
    path: '/',
    redirect: '/hostel-buddy'
  },

  {
    path: '/about',
    name :'AboutUs',
    component:AboutUs
  },
  {
    path: '/contact',
    name: 'ContactUs',
    component:ContactUs
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/apply',
    name: 'Apply',
    component: Apply
  },
  {
    path: '/student-dashboard',
    name: 'StudentDashboard',
    component: StudentDashboard
  },
  {
    path: '/warden-dashboard',
    name: 'WardenDashboard',
    component: WardenDashboard
  },
  {
    path: '/student-profile',
    name: 'StudentProfile',
    component: StudentProfile
  },
   {
      path: '/apply-leave',
      name: 'ApplyLeave',
      component: ApplyLeave
    },
     {
      path: '/cancel-meal',
      name: 'CancelMeal',
      component: CancelMeal
    },
     {
      path: '/room-details',
      name: 'RoomDetails',
      component: RoomDetails
    },
     {
      path: '/change-request',
      name: 'ChangeRequest',
      component: ChangeRequest
    },
     {
      path: '/complaints',
      name: 'Complaints',
      component: Complaints
    },
     {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
     {
      path: '/menu',
      name: 'Menu',
      component: Menu
    },
     {
    path: '/admin-profile',
    name: 'AdminProfile',
    component: AdminProfile,
    meta: { requiresAuth: true, role: 'warden' }
  },
  {
    path: '/announcements',
    name: 'Announcements',
    component: Announcements
  },
   {
    path: '/complaints-status',
    name: 'ComplaintStatus',
    component: ComplaintStatus
  }
  ,
  {
    path: '/payments',
    name: 'FeePayment',
    component: FeePayment
  },
  {
    path: '/hostel-occupancy',
    name: 'HostelOccupancy',
    component: HostelOccupancy
  }
  ,
  {
    path: '/room-assignment',
    name: 'RoomAssignment',
    component: RoomAssignment,
    meta: { requiresAuth: true } // Optional: add if authentication is required
  },
  {
    path: '/warden-dashboard',
    name: 'WardenDashboard',
    component: WardenDashboard,
    meta: { requiresAuth: true, role: 'warden' }
  },
    { 
    path: '/complaint-management',
    name: 'ComplaintManagement', 
    component: ComplaintManagement
  },
   { 
    path: '/feedback-review',
    name: 'FeedbackReview',
    component: FeedbackReview 
  },
  { 
    path: '/fee-management',
    name: 'FeeManagement',
    component: FeeManagement 
  },
   { 
    path: '/leave-approval',
    name: 'LeaveApproval',
    component: LeaveApproval 
  },
   { 
    path: '/menu-update',
    name: 'MenuUpdate',
    component: MenuUpdate 
  },
  { 
    path: '/payment-tracking',
    name: 'PaymentTracking',
    component: PaymentTracking
  },
  { 
    path: '/room-change',
    name: 'RoomChange', 
    component: RoomChange 
  }
,
  { 
    path: '/announcement-form',
    name: 'AnnouncementForm', 
    component: AnnouncementForm 
  }
  ,
  { 
    path: '/error',
    name: 'NotFound', 
    component: NotFound
  },
  { 
    path: '/help',
    name: 'Help', 
    component: Help
  },
  { 
    path: '/rules',
    name: 'Settings', 
    component: Settings
  }
  ,
  { 
    path: '/student-management',
    name: 'StudentManagement', 
    component: StudentManagement
  },
  { path: '/:catchAll(.*)',
     component: NotFound } 

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router