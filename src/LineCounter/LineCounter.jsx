import React, { useState, useEffect } from "react";
import { useLineClassifier } from "../useLineClassifier";
import "./LineCounter.css";
import AnalysisResult from "./partials/AnalysisResult";

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

const LineCounter = () => {
  const { classify } = useLineClassifier();
  const [fileCounts, setFileCounts] = useState(null);
  const [fileName, setFileName] = useState("");
  const [testInput, setTestInput] = useState("");
  const [testCounts, setTestCounts] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const result = analyzeContent(testInput, classify);
    setTestCounts(result);
  }, [testInput, classify]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const result = analyzeContent(content, classify);
      setFileCounts(result);
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        const result = analyzeContent(content, classify);
        setFileCounts(result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="line-counter">
      <h2>📊 Lines of Code Counter</h2>
      <div className="analysis-result-container">
        <AnalysisResult
          heading="📁 Upload a Source File"
          data={fileCounts}
          text="File"
          fileName={fileName}
        >
          <div
            className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".js,.jsx,.ts,.tsx,.java,.txt"
              onChange={handleFileUpload}
              id="file-upload"
            />
            <label htmlFor="file-upload" className="file-upload-label">
              <span className="upload-icon">📁</span>
              <span>Drag & drop a file here or click to browse</span>
            </label>
          </div>
        </AnalysisResult>

        <AnalysisResult
          heading="🧪 Try Your Own Code Snippet"
          data={testCounts}
          text="Test"
        >
          <textarea
            rows={8}
            className="code-snippet-textarea"
            placeholder="// Paste or write code here to analyze..."
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
          />
        </AnalysisResult>
      </div>
    </div>
  );
};

export default LineCounter;
