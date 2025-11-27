import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faCalendarAlt,
  faClipboardCheck,
  faDollarSign,
  faComments,
  faChalkboardTeacher,
  faGear,
  faChevronDown,
  faUserTag,
  faFileAlt,
  faUserGear,
  faCalculator,
  faChartLine,
  faAddressBook,
  faCalendarDays,
  faClapperboard,
  faStarOfDavid,
  faMoneyBillAlt,
  faNetworkWired,
  faChartArea,
  faCaretRight,
  faEye,
  faBookAtlas,
  faUserGroup,
  faQrcode,
  faUserPlus,
  faDumbbell,
  faBell,
  faUser  // Added this import
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { icon } from "@fortawesome/fontawesome-svg-core";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [userRole, setUserRole] = useState("admin");

  // Load user role from localStorage
  useEffect(() => {
    const role = localStorage.getItem("userRole") || "admin";
    setUserRole(role);
  }, []);

  const toggleMenu = (menuKey) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey);
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) setCollapsed(true);
  };

  // Define menus for each role
  const allMenus = {
    superadmin: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/superadmin/dashboard",
      },
      {
        name: "Admin",
        icon: faUserGear,
        path: "/superadmin/Owner",
      },
      {
        name: "Plans & Pricing",
        icon: faMoneyBillAlt,
        path: "/superadmin/Plans&Pricing",
      },
      {
        name: "Payments",
        icon: faCalculator,
        key: "Payments",
        subItems: [
          { label: "Invoices", path: "superadmin/payments/invoices" },
          { label: "Razorpay Reports", path: "superadmin/payments/razorpayReports" },
        ],
      },
    ],
    
    admin: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "admin/admin-dashboard",
      },
      {
        name: "Branches",
        icon: faAddressBook,
        path: "/admin/SuperAdminBranches",
      },
      {
        name: "Members",
        icon: faUsers,
        path: "/admin/AdminMember",
      },
      {
        name: "Create Plan",
        icon: faFileAlt,
        path: "admin/createplan"
      },
      {
        name: "Classes Schedule",
        icon: faCalendarAlt,
        path: "/admin/classesSchedule",
      },
      {
        name: "Session Bookings",
        icon: faCalendarAlt,
        path: "/admin/bookings",
      },
      {
        name: "Staff",
        icon: faUserGear,
        key: "Staff",
        subItems: [
          { label: "Manage Staff", path: "/admin/staff/manage-staff" },
          { label: "Roles & Permissions", path: "/admin/staff/roles-permissions" },
          { label: "Attendance", path: "/admin/staff/attendance" },
          { label: "Duty Roster", path: "/admin/staff/duty-roster" },
          { label: "Salary Calculator", path: "/admin/staff/salary-calculator" },
        ],
      },
      {
        name: "Personal Training Details",
        icon: faDumbbell,
        path: "/admin/booking/personal-training",
      },
      {
        name: "Payments",
        icon: faCalculator,
        key: "payment",
        subItems: [
          { label: "Membership Payment", path: "/admin/payments/membership" },
        ],
      },
      {
        name: "Reports",
        icon: faChartLine,
        key: "reports",
        subItems: [
          { label: "Sales Report", path: "/admin/reports/sales" },
          { label: "Attendance Report", path: "/admin/reports/AttendanceReport" },
        ],
      },
      {
        name: "Settings",
        icon: faGear,
        key: "settings",
        subItems: [
          { label: "Role Management", path: "admin/settings/RoleManagement" },
          { label: "Branch Management", path: "admin/settings/BranchManagement" },
        ],
      },
    ],
    
    housekeeping: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/housekeeping/dashboard",
      },
      {
        name: "QR Check-in",
        icon: faQrcode,
        path: "/housekeeping/qrcheckin",
      },
      {
        name: "Duty Roster",
        icon: faCalendarAlt,
        path: "/housekeeping/members",
      },
      {
        name: "Attendance Marking",
        icon: faClipboardCheck,
        path: "/housekeeping/membership-plan",
      },
      {
        name: "Task Checklist",
        icon: faClipboardCheck,
        path: "/housekeeping/duty-roster",
      },
      {
        name: "Notifications",
        icon: faBell,
        path: "/housekeeping/class-schedule",
      },
    ],
    
    generaltrainer: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/generaltrainer/dashboard",
      },
      {
        name: "Qr Check-in",
        icon: faQrcode,
        path: "/generaltrainer/qrcheckin",
      },
      {
        name: "GroupPlans & Bookings",
        icon: faUserGroup,
        path: "/generaltrainer/groupplansbookings"
      },
      {
        name: "Daily Schedule",
        icon: faCalendarAlt,
        path: "/generaltrainer/DailyScedule",
      },
      {
        name: "Attendance",
        icon: faClipboardCheck,
        path: "/generaltrainer/attendance",
      },
      {
        name: "Reports Classes",
        icon: faFileAlt,
        path: "/generaltrainer/Reports",
      },
    ],
    
    personaltrainer: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/personaltrainer/dashboard",
      },
      {
        name: "QR Check-in",
        icon: faQrcode,
        path: "/personaltrainer/qrcheckin",
      },
      {
        name: "Plans & Bookings",
        icon: faBookAtlas,
        path: "/personaltrainer/PersonalPlansBookings",
      },
    ],
    
    receptionist: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/receptionist/dashboard",
      },
      {
        name: "QR Check-in",
        icon: faQrcode,
        path: "/receptionist/qrcheckin",
      },
      {
        name: "Walk-in Registration",
        icon: faUserPlus,
        path: "/receptionist/walk-in-registration"
      },
      {
        name: "New Sign-ups",
        icon: faUserPlus,
        path: "/receptionist/new-sign-ups"
      },
      {
        name: "QR Attendance",
        icon: faQrcode,
        path: "/receptionist/qr-attendance"
      },
      {
        name: "Book Classes & Sessions",
        icon: faCalendarAlt,
        path: "/receptionist/book-classes-sessions"
      },
      {
        name: "Payment",
        icon: faMoneyBillAlt,
        path: "/receptionist/payemnet"
      },
    ],
    member: [
      {
        name: "Dashboard",
        icon: faChartBar,
        path: "/member/dashboard",
      },
      {
        name: "QR Check-in",
        icon: faQrcode,
        path: "/member/qrcheckin",
      },
      {
        name: "View Plan",
        icon: faEye,
        path: "/member/viewplan"
      },
      {
        name: "Class Schedule",
        icon: faCalendarAlt,
        path: "/member/classSchedule",
      },
      {
        name: "My Account",
        icon: faUser,
        path: "/member/account",
      },
    ],
  };

  const userMenus = allMenus[userRole] || allMenus.admin;

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {userMenus.map((menu, index) => {
            // If no subItems → direct link
            if (!menu.subItems) {
              return (
                <li key={index} className="menu-item">
                  <div
                    className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                    onClick={() => handleNavigate(menu.path)}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                    {!collapsed && <span className="menu-text">{menu.name}</span>}
                  </div>
                </li>
              );
            }

            // If has subItems → show dropdown
            return (
              <li key={index} className="menu-item">
                <div
                  className="menu-link mb-2"
                  onClick={() => toggleMenu(menu.key)}
                  style={{ cursor: "pointer" }}
                >
                  <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                  {!collapsed && <span className="menu-text">{menu.name}</span>}
                  {!collapsed && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`arrow-icon ${activeMenu === menu.key ? "rotate" : ""}`}
                    />
                  )}
                </div>

                {/* Show submenu only if menu is active and not collapsed */}
                {!collapsed && activeMenu === menu.key && (
                  <ul className="submenu">
                    {menu.subItems.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        className={`submenu-item mb-2 ${isActive(sub.path) ? "active-sub" : ""}`}
                        onClick={() => handleNavigate(sub.path)}
                        style={{ cursor: "pointer" }}
                      >
                        {sub.label}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;