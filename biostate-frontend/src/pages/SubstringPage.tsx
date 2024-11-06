import React, { useState } from "react";
import SubTabs from "../components/Substring/SubTabs";
import NewCalculation from "../components/Substring/NewCalculation";
import UserHistory from "../components/Substring/UserHistory";

const SubstringPage: React.FC = () => {
  const [tab, setTab] = useState<"new" | "history">("new"); // Tab state

  return (
    <div className="p-4 h-screen">
      <SubTabs tab={tab} setTab={setTab} />

      {tab === "new" && <NewCalculation />}
      {tab === "history" && <UserHistory />}
    </div>
  );
};

export default SubstringPage;
