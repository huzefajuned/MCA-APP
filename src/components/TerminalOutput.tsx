"use client";

import React, { useState, useEffect } from 'react';

interface TerminalOutputProps {
  studentName: string;
  filename: string;
  outputResult: string;
  terminalColor?: string;
  forceComplete?: boolean;
}

export default function TerminalOutput({ studentName, filename, outputResult, forceComplete = false }: TerminalOutputProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [typing, setTyping] = useState(true);

  // Derive class name from filename (e.g. "HelloWorld.java" -> "HelloWorld")
  const className = filename.replace(".java", "");
  
  // Create a safe username for path e.g. C:\Users\Name>
  const safeName = studentName.trim().split(" ")[0] || "User";
  
  useEffect(() => {
    let currentLine = 0;
    
    // Split output into words or characters for realistic rendering? 
    // Simply showing complete output right away for printability, but we want a typing effect if visible?
    // According to the prompt, we need small random delays for realistic feel.
    
    const outputLines = outputResult.split("\n");
    const executionFlow = [
      `C:\\Users\\${safeName}> javac ${filename}`,
      `compiling...`,
      `C:\\Users\\${safeName}> java ${className}`,
      ...outputLines,
      ``,
      `C:\\Users\\${safeName}> `
    ];

    if (forceComplete) {
      setLines(executionFlow);
      setTyping(false);
      return;
    }

    const showNextLine = () => {
      if (currentLine < executionFlow.length) {
        setLines(prev => [...prev, executionFlow[currentLine]]);
        currentLine++;
        
        let delay = 100;
        if (executionFlow[currentLine - 1] === 'compiling...') {
          delay = Math.floor(Math.random() * 800) + 400; // 400-1200ms
        } else if (executionFlow[currentLine - 1].startsWith("C:\\")) {
          delay = Math.floor(Math.random() * 500) + 300;
        } else {
          delay = Math.floor(Math.random() * 150) + 50; 
        }

        setTimeout(showNextLine, delay);
      } else {
        setTyping(false);
      }
    };

    // Clean up if component restarts
    setLines([]);
    setTyping(true);
    
    // Small initial delay
    const initialTimer = setTimeout(showNextLine, 300);
    return () => clearTimeout(initialTimer);
  }, [outputResult, filename, safeName]);

  return (
    <div className="bg-gray-100 text-gray-900 font-mono text-[13.5px] p-5 rounded-md mt-4 overflow-x-auto min-h-[120px] border border-gray-300 print:bg-gray-50 print:border-gray-300">
      {lines.map((line, idx) => (
        <div key={idx} className="min-h-[20px] whitespace-pre-wrap break-all leading-relaxed">
          {line === 'compiling...' ? <span className="text-gray-500 italic">{line}</span> : line}
        </div>
      ))}
      {typing && (
        <div className="inline-block w-2.5 h-4 animate-pulse ml-1 bg-gray-900"></div>
      )}
    </div>
  );
}
