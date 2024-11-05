import React, { FC } from "react";

interface SubTabsProps {
  tab: any;
  setTab: any;
}
const SubTabs: FC<SubTabsProps> = ({ tab, setTab }) => {
  return (
    <div
      className="flex space-x-4 mb-4"
      role="tablist"
      aria-label="Sub Tabs Navigation"
    >
      <button
        role="tab"
        aria-selected={tab === "new"}
        onClick={() => setTab("new")}
        tabIndex={tab === "new" ? 0 : -1}
        className={`p-2 rounded ${
          tab === "new"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
        aria-controls="newCalculationPanel"
        id="newCalculationTab"
      >
        New Calculation
      </button>
      <button
        onClick={() => setTab("history")}
        role="tab"
        aria-selected={tab === "history"}
        tabIndex={tab === "history" ? 0 : -1}
        className={`p-2 rounded ${
          tab === "history"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700"
        }`}
        aria-controls="historyPanel"
        id="historyTab"
      >
        Previous History
      </button>
    </div>
  );
};

export default SubTabs;
