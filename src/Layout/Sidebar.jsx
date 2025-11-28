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
  faCogs
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);
  const [userRole, setUserRole] = useState("admin");

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

  // ------------------ MENUS ------------------
  const allMenus = {
    // superadmin: [
    //   { name: "Dashboard", icon: faChartBar, path: "/superadmin/dashboard" },
    //   { name: "Owner", icon: faUsers, path: "/superadmin/Owner" },
    //   { name: "Plans & Pricing", icon: faStarOfDavid, path: "/superadmin/Plans&Pricing" },
    //   { name: "Payments", icon: faMoneyBillAlt, path: "/superadmin/payments" }
    //   //  { name: "Setting", icon: faMoneyBillAlt, path: "/superadmin/setting" },
      
    // ],
   superadmin: [
  { name: "Dashboard", icon: faChartBar, path: "/superadmin/dashboard" },
  { name: "Admin", icon: faUsers, path: "/superadmin/Admin" },
  { name: "Request Plan", icon:  faClipboardCheck, path: "/superadmin/request-plan" },
  { name: "Plans & Pricing", icon: faChartLine, path: "/superadmin/Plans&Pricing" },
  { name: "Payments", icon: faMoneyBillAlt, path: "/superadmin/payments" },
  { name: "Setting", icon:  faCogs, path: "/superadmin/setting" },
  
],



    admin: [
      { name: "Dashboard", icon: faChartBar, path: "/admin/admin-dashboard" },
      { name: "Branches", icon: faGear, path: "/admin/AdminBranches" },
      { name: "Members", icon: faUsers, path: "/admin/AdminMember" },
      { name: "Create Plan", icon: faUsers, path: "/admin/createplan" },

      { name: "Classes Schedule", icon: faUsers, path: "/admin/classesSchedule" },
      { name: "Session Bookings", icon: faCalendarAlt, path: "/admin/bookings" },

      {
        name: "Staff",
        icon: faUsers,
        key: "Staff",
        subItems: [
          { label: "Manage Staff", path: "/admin/staff/manage-staff" },
          { label: "Attendance", path: "/admin/staff/attendance" },
          { label: "Salary Calculator", path: "/admin/staff/salary-calculator" }
        ]
      },

      {
        name: "Personal Training Details",
        icon: faFileAlt,
        path: "/admin/booking/personal-training"
      },

      {
        name: "Payments",
        icon: faCalculator,
        path: "/admin/payments/membership",
        // subItems: [{ label: "Membership Payment", path: "/admin/payments/membership" }]
      },

      {
        name: "Reports",
        icon: faChartLine,
        key: "reports",
        subItems: [
          { label: "Sales Report", path: "/admin/reports/sales" },
          { label: "Attendance Report", path: "/admin/reports/AttendanceReport" }
        ]
      },

      {
        name: "Settings",
        icon: faGear,
        key: "settings",
        subItems: [
          { label: "Role Management", path: "/admin/settings/RoleManagement" },
          { label: "Branch Management", path: "/admin/settings/BranchManagement" }
        ]
      }
    ],

    housekeeping: [
      { name: "Dashboard", icon: faChartBar, path: "/housekeeping/dashboard" },
      { name: "QR Check-in", icon: faGear, path: "/housekeeping/qrcheckin" },
      { name: "Duty Roster", icon: faUsers, path: "/housekeeping/members" },
      { name: "Attendance Marking", icon: faUserTag, path: "/housekeeping/membership-plan" },
      { name: "Task Checklist", icon: faCalendarAlt, path: "/housekeeping/duty-roster" },
      { name: "Notifications", icon: faCalendarDays, path: "/housekeeping/class-schedule" }
    ],

    generaltrainer: [
      { name: "Dashboard", icon: faChartBar, path: "/generaltrainer/dashboard" },
      { name: "Qr Check-in", icon: faGear, path: "/generaltrainer/qrcheckin" },
      { name: "GroupPlans & Bookings", icon: faUserGroup, path: "/generaltrainer/groupplansbookings" },
      { name: "Daily Schedule", icon: faChartArea, path: "/generaltrainer/DailyScedule" },
      { name: "Attendance", icon: faClipboardCheck, path: "/generaltrainer/attendance" },
      { name: "Reports Classes", icon: faFileAlt, path: "/generaltrainer/Reports" }
    ],

    personaltrainer: [
      { name: "Dashboard", icon: faChartBar, path: "/personaltrainer/dashboard" },
      { name: "QR Check-in", icon: faGear, path: "/personaltrainer/qrcheckin" },
      { name: "Plans & Bookings", icon: faBookAtlas, path: "/personaltrainer/PersonalPlansBookings" }
    ],

    receptionist: [
      { name: "Dashboard", icon: faChartBar, path: "/receptionist/dashboard" },
      { name: "QR Check-in", icon: faGear, path: "/receptionist/qrcheckin" },
      { name: "Walk-in Registration", icon: faFileAlt, path: "/receptionist/walk-in-registration" },
      { name: "New Sign-ups", icon: faFileAlt, path: "/receptionist/new-sign-ups" },
      { name: "QR Attendance", icon: faFileAlt, path: "/receptionist/qr-attendance" },
      { name: "Book Classes & Sessions", icon: faFileAlt, path: "/receptionist/book-classes-sessions" },
      { name: "Payment", icon: faFileAlt, path: "/receptionist/payemnet" }
    ],

    member: [
      { name: "Dashboard", icon: faChartBar, path: "/member/dashboard" },
      { name: "QR Check-in", icon: faGear, path: "/member/qrcheckin" },
      { name: "View Plan", icon: faEye, path: "/member/viewplan" },
      { name: "Class Schedule", icon: faClapperboard, path: "/member/classSchedule" },
      { name: "My Account", icon: faMoneyBillAlt, path: "/member/account" }
    ]
  };

  const userMenus = allMenus[userRole] || allMenus.admin;

  return (
    <div className={`sidebar-container ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar">
        <ul className="menu">
          {userMenus.map((menu, index) => {
            if (!menu.subItems) {
              return (
                <li key={index} className="menu-item">
                  <div
                    className={`menu-link ${isActive(menu.path) ? "active" : ""}`}
                    onClick={() => handleNavigate(menu.path)}
                  >
                    <FontAwesomeIcon icon={menu.icon} className="menu-icon" />
                    {!collapsed && <span className="menu-text">{menu.name}</span>}
                  </div>
                </li>
              );
            }

            return (
              <li key={index} className="menu-item">
                <div
                  className="menu-link mb-2"
                  onClick={() => toggleMenu(menu.key)}
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

                {!collapsed && activeMenu === menu.key && (
                  <ul className="submenu">
                    {menu.subItems.map((sub, i) => (
                      <li
                        key={i}
                        className={`submenu-item mb-2 ${isActive(sub.path) ? "active-sub" : ""}`}
                        onClick={() => handleNavigate(sub.path)}
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
