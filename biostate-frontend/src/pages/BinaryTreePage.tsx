import React, { useState } from "react";
import NewCalculation from "../components/BinaryTree/NewCalculation";
import SubTabs from "../components/Substring/SubTabs";
import UserHistory from "../components/BinaryTree/UserHistory";

const BinaryTreePage: React.FC = () => {
  const [tab, setTab] = useState<"new" | "history">("new");

  return (
    <div className="p-4 bg-white dark:bg-gray-900 text-black dark:text-white h-screen">
      <SubTabs tab={tab} setTab={setTab} />

      {tab === "new" && <NewCalculation />}
      {tab === "history" && <UserHistory setTab={setTab} />}
    </div>
  );
};

export default BinaryTreePage;
