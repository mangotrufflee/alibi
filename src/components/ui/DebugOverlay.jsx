// src/components/ui/DebugOverlay.jsx
import React from "react";
import { useGame } from "../../state/GameContext";
import { getAllManifestEntries } from "../../assets/registry";

export default function DebugOverlay() {
  const { debugMode, toggleDebugMode, assetMode, toggleAssetMode, cameraState, selectedSuspect } =
    useGame();

  if (!debugMode) return null;

  const entries = getAllManifestEntries();

  return (
    <div className="dev-debug-panel">
      <div className="dev-debug-header">
        <strong>🛠️ ALIBI DEV PIPELINE INSPECTOR</strong>
        <button className="dev-close-btn" onClick={toggleDebugMode}>
          ✕
        </button>
      </div>

      <div className="dev-debug-stats">
        <div>
          <strong>Mode:</strong>{" "}
          <span className={`dev-badge ${assetMode === "asset" ? "green" : "amber"}`}>
            {assetMode.toUpperCase()}
          </span>
          <button className="dev-action-btn" onClick={toggleAssetMode}>
            Switch to {assetMode === "asset" ? "Placeholder" : "Asset"}
          </button>
        </div>
        <div>
          <strong>Camera:</strong> <code>{cameraState}</code>
        </div>
        <div>
          <strong>Focused Suspect:</strong> <code>{selectedSuspect || "None"}</code>
        </div>
      </div>

      <div className="dev-manifest-table-wrap">
        <table className="dev-manifest-table">
          <thead>
            <tr>
              <th>Asset ID</th>
              <th>Type</th>
              <th>Status</th>
              <th>Expected File Path</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td><code>{entry.id}</code></td>
                <td>{entry.type}</td>
                <td>
                  <span className={`status-pill ${entry.status === "ready" ? "ready" : "ph"}`}>
                    {entry.status}
                  </span>
                </td>
                <td className="path-cell">{entry.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dev-debug-footer">
        <small>To replace an asset: place file in <code>public/assets/...</code> & set <code>status: 'ready'</code> in <code>manifest.js</code>.</small>
      </div>
    </div>
  );
}
