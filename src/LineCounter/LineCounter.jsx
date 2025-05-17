import React, { useState, useEffect } from "react";
import { useLineClassifier } from "../useLineClassifier";
import "./LineCounter.css";

// ------------ Analyzer Function ------------
const analyzeContent = (content, classifyFn) => {
  const lines = content.split("\n");
  const counts = {
    blank: 0,
    comment: 0,
    code: 0,
    total: lines.length,
  };

  for (const line of lines) {
    const type = classifyFn(line);
    if (counts[type] !== undefined) {
      counts[type]++;
    }
  }

  return counts;
};

const AnalysisResult = ({ heading, children, data, text }) => {
  return (
    <section>
      <h3>{heading}</h3>
      {children}
      {data && (
        <div
          className="result-section"
          style={{ backgroundColor: text === "File" ? "#f8f8f8" : "#eef6f6" }}
        >
          <p>
            <strong>{text} Analysis Result:</strong>
          </p>
          <p>Blank: {data.blank}</p>
          <p>Comments: {data.comment}</p>
          <p>Code: {data.code}</p>
          <p>Total lines: {data.total}</p>
        </div>
      )}
    </section>
  );
};

const LineCounter = () => {
  const { classify } = useLineClassifier();
  const [fileCounts, setFileCounts] = useState(null);
  const [testInput, setTestInput] = useState("");
  const [testCounts, setTestCounts] = useState(null);

  // Auto-analyze test input when it changes
  useEffect(() => {
    const result = analyzeContent(testInput, classify);
    setTestCounts(result);
  }, [testInput, classify]); // <-- classify identity is now stable

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const result = analyzeContent(content, classify);
      setFileCounts(result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="line-counter">
      <h2>📊 Lines of code counter</h2>
      {/* File Upload Section */}
      <div className="analysis-result-container">
        <AnalysisResult
          heading="📁 Upload a Source File"
          data={fileCounts}
          text="File"
        >
          <input
            type="file"
            accept=".js,.jsx,.ts,.tsx,.java,.txt"
            onChange={handleFileUpload}
          />
        </AnalysisResult>
        {/* Test Input Section */}
        <AnalysisResult
          heading="🧪 Try Your Own Code Snippet"
          data={testCounts}
          text="Test"
        >
          <textarea
            rows={8}
            className="code-snippet-textarea"
            placeholder="// Paste or write code here"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
          />
        </AnalysisResult>
      </div>
    </div>
  );
};

export default LineCounter;
