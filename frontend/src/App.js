import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [rules, setRules] = useState([]);
  const [pendingChanges, setPendingChanges] = useState([]);

  const loginSalesforce = () => {
    window.location.href = "https://salesforce-validation-manager-w3it.onrender.com/auth/login";
  };

  const getRules = async () => {
    try {
      const res = await axios.get(
        "https://salesforce-validation-manager-w3it.onrender.com/validation-rules"
      );

      setRules(res.data);
      setPendingChanges([]);

    } catch (err) {
      console.error(err);
      alert("Login first");
    }
  };

  const toggleRule = (rule) => {

    const updatedRules = rules.map((r) =>
      r.Id === rule.Id
        ? { ...r, Active: !r.Active }
        : r
    );

    setRules(updatedRules);

    setPendingChanges((prev) => {
      const existing = prev.find(
        (item) => item.Id === rule.Id
      );

      if (existing) {
        return prev.map((item) =>
          item.Id === rule.Id
            ? {
                ...item,
                Active: !item.Active,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          Id: rule.Id,
          ValidationName: rule.ValidationName,
          Active: !rule.Active,
        },
      ];
    });
  };


  const toggleAll = (active) => {

    const updatedRules = rules.map((rule) => ({
      ...rule,
      Active: active,
    }));

    setRules(updatedRules);

    const changes = updatedRules.map((rule) => ({
      Id: rule.Id,
      ValidationName: rule.ValidationName,
      Active: active,
    }));

    setPendingChanges(changes);
  };

  const deployChanges = async () => {
    try {

      for (const rule of pendingChanges) {
        await axios.post(
          "https://salesforce-validation-manager-w3it.onrender.com/toggle-rule",
          {
            ruleName: rule.ValidationName,
            active: rule.Active,
          }
        );
      }

      await getRules();

      setPendingChanges([]);

      alert("Changes deployed successfully!");

    } catch (err) {
      console.error(err);
      alert("Deployment failed");
    }
  };


  return (
    <div className="container">
      <h1>Salesforce Validation Manager</h1>
      {pendingChanges.length > 0 && (
        <h3 className="pending-count">
          Pending Changes: {pendingChanges.length}
        </h3>
      )}

      <div className="button-group">
        <button onClick={loginSalesforce}>
          Login With Salesforce
        </button>

        <button onClick={getRules}>
          Get Validation Rules
        </button>

        <button
          className="enable-all-btn"
          disabled={rules.length === 0}
          onClick={() => toggleAll(true)}
        >
          Enable All
        </button>

        <button
          className="disable-all-btn"
          disabled={rules.length === 0}
          onClick={() => toggleAll(false)}
        >
          Disable All
        </button>

        <button
          className="deploy-btn"
          disabled={pendingChanges.length === 0}
          onClick={deployChanges}
        >
          Deploy Changes
        </button>

      </div>

      {rules.length > 0 ? (
        <>
          <h3 className="rule-count">
            Total Validation Rules: {rules.length}
          </h3>
        <table>
          <thead>
            <tr>
              <th>Validation Rule</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {rules.map((rule) => (
              <tr key={rule.Id}>
                <td>{rule.ValidationName}</td>

                <td>
                  <span
                    className={
                      rule.Active
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {rule.Active
                      ? "🟢 Active"
                      : "🔴 Inactive"}
                  </span>
                </td>

                <td>
                  <button
                    className={
                      rule.Active
                        ? "disable-btn"
                        : "enable-btn"
                    }
                    onClick={() => toggleRule(rule)}
                  >
                    {rule.Active
                      ? "Disable"
                      : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
      ) : (
        <p className="empty-message">
          No validation rules loaded. Click "Get Validation Rules".
        </p>
      )}
    </div>
  );
}

export default App;