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
  const basePathRef = React.useRef<string | null>(null);
  
  useEffect(() => {
    if (!basePathRef.current) {
      const paths = [
        `C:\\Users\\${safeName}\\Documents\\JavaLab`,
        `C:\\Users\\${safeName}\\JavaProjects`,
        `D:\\MCA\\Semester2\\Java`,
        `C:\\Users\\${safeName}\\Desktop\\JavaPrograms`,
        `E:\\Assignments\\JavaLab`,
        `C:\\Workspace\\Java`,
        `D:\\Student\\Programs`,
        `C:\\Users\\${safeName}`
      ];
      basePathRef.current = paths[Math.floor(Math.random() * paths.length)];
    }
    
    const termPath = basePathRef.current;
    let currentLine = 0;
    
    // Split output into words or characters for realistic rendering? 
    // Simply showing complete output right away for printability, but we want a typing effect if visible?
    // According to the prompt, we need small random delays for realistic feel.
    
    const outputLines = outputResult.split("\n");
    const executionFlow = [
      `${termPath}> javac ${filename}`,
      `compiling...`,
      `${termPath}> java ${className}`,
      ...outputLines,
      ``,
      `${termPath}> `
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
        } else if (executionFlow[currentLine - 1].match(/^[A-Z]:\\/) && executionFlow[currentLine - 1].includes(">")) {
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
    <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-600 print:shadow-none print:border-gray-300 print:rounded-md mt-4 relative bg-[#1e1e1e] font-sans">
      {/* macOS Window Header */}
      <div className="bg-[#323233] print:bg-gray-100 flex items-center px-4 py-2 border-b border-[#1e1e1e] print:border-gray-300 h-9">
        <div className="flex space-x-2 absolute">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] print:bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] print:bg-gray-400"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f] print:bg-gray-400"></div>
        </div>
        <div className="w-full text-center text-[13px] font-medium text-gray-300 print:text-gray-600 tracking-wide font-sans">
          Java - Terminal
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="bg-[#1e1e1e] print:bg-gray-50 text-[#d4d4d4] print:text-gray-900 font-mono text-[13.5px] p-5 overflow-x-auto min-h-[120px]">
        {lines.map((line, idx) => (
          <div key={idx} className="min-h-[20px] whitespace-pre-wrap break-all leading-relaxed">
            {line === 'compiling...' ? <span className="text-gray-500 italic">{line}</span> : line}
          </div>
        ))}
        {typing && (
          <div className="inline-block w-2.5 h-4 animate-pulse ml-1 bg-[#d4d4d4] print:bg-gray-900"></div>
        )}
      </div>
    </div>
  );
}
