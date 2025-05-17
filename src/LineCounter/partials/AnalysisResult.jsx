import React from "react";
import StatsGrid from "./StatsGrid";

const AnalysisResult = ({ heading, children, data, text, fileName }) => {
  return (
    <section className="analysis-section">
      <h3>{heading}</h3>
      {children}
      {data && (
        <div
          className="result-section"
          style={{ backgroundColor: text === "File" ? "#f8f8f8" : "#eef6f6" }}
        >
          <div className="result-header">
            <p>
              <strong>{text} Analysis Result:</strong>
            </p>
            {fileName && (
              <p className="file-name">
                <span className="file-icon">📄</span>
                {fileName}
              </p>
            )}
          </div>
          <StatsGrid data={data} />
        </div>
      )}
    </section>
  );
};

export default AnalysisResult