import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import UserDashboard from "../components/dashboard/UserDashboard";
import UserProfile from "../components/dashboard/UserProfile";
import AssessmentHistory from "../components/dashboard/AssessmentHistory";
import EditProfile from "../components/dashboard/EditProfile";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-edu-bg flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-col md:flex-row grow w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="grow p-4 sm:p-6 md:p-10 max-w-6xl mx-auto w-full">
          {activeTab === "home" && <UserDashboard />}
          {activeTab === "profile" && (
            <UserProfile setActiveTab={setActiveTab} />
          )}
          {activeTab === "edit-profile" && (
            <EditProfile setActiveTab={setActiveTab} />
          )}
          {activeTab === "history" && <AssessmentHistory />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
