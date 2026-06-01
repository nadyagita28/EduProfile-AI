import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserDashboard from "../components/UserDashboard";
import UserProfile from "../components/UserProfile";
import AssessmentHistory from "../components/AssessmentHistory";
import EditProfile from "../components/EditProfile";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-edu-bg flex flex-col font-sans">
      <Navbar />

      <div className="flex grow w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="grow p-10 max-w-6xl mx-auto w-full">
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
