"use client";

import React from 'react';

interface TerminalOutputProps {
  studentName: string;
  filename: string;
  outputResult: string;
  terminalColor?: string;
  forceComplete?: boolean;
}

const themes = [
  {
    type: "mac",
    bg: "bg-[#1e1e1e] print:bg-[#1e1e1e]", border: "border-gray-600 print:border-gray-600",
    headerBg: "bg-[#323233] print:bg-[#323233]", headerBorder: "border-[#1e1e1e] print:border-[#1e1e1e]",
    text: "text-[#d4d4d4] print:text-[#d4d4d4]", titleText: "text-gray-300 print:text-gray-300",
    title: "Java - Terminal", showDots: true,
  },
  {
    type: "cmd",
    bg: "bg-[#000000] print:bg-[#000000]", border: "border-gray-500 print:border-gray-500",
    headerBg: "bg-[#ffffff] print:bg-[#ffffff]", headerBorder: "border-gray-500 print:border-gray-500",
    text: "text-[#c0c0c0] print:text-[#c0c0c0]", titleText: "text-gray-900 print:text-gray-900",
    title: "C:\\WINDOWS\\system32\\cmd.exe", showDots: false,
  },
  {
    type: "powershell",
    bg: "bg-[#012456] print:bg-[#012456]", border: "border-[#012456] print:border-[#012456]",
    headerBg: "bg-[#eeeeee] print:bg-[#eeeeee]", headerBorder: "border-gray-400 print:border-gray-400",
    text: "text-[#ffffff] print:text-[#ffffff]", titleText: "text-gray-900 print:text-gray-900",
    title: "Windows PowerShell", showDots: false,
  },
  {
    type: "ubuntu",
    bg: "bg-[#300a24] print:bg-[#300a24]", border: "border-[#533549] print:border-[#533549]",
    headerBg: "bg-[#433f42] print:bg-[#433f42]", headerBorder: "border-[#300a24] print:border-[#300a24]",
    text: "text-[#ffffff] print:text-[#ffffff]", titleText: "text-gray-200 print:text-gray-200",
    title: "user@ubuntu: ~", showDots: true,
  },
  {
    type: "gitbash",
    bg: "bg-[#000000] print:bg-[#000000]", border: "border-gray-600 print:border-gray-600",
    headerBg: "bg-[#f4f4f4] print:bg-[#f4f4f4]", headerBorder: "border-gray-300 print:border-gray-300",
    text: "text-[#bfbfbf] print:text-[#bfbfbf]", titleText: "text-gray-800 print:text-gray-800",
    title: "MINGW64:/c/Users", showDots: false,
  }
];

const fonts = ["font-mono", "font-['Consolas',_monospace]", "font-['Courier_New',_monospace]", "font-['Lucida_Console',_monospace]", "font-['Menlo',_monospace]"];

export default function TerminalOutput({ studentName, filename, outputResult }: TerminalOutputProps) {
  const className = filename.replace(".java", "");
  const baseName = studentName.trim().split(" ")[0] || "User";
  
  // Real terminals format names properly (usually TitleCase for Windows, lowercase for Unix)
  const winName = baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase();
  const unixName = baseName.toLowerCase();
  
  const hash = studentName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const theme = themes[hash % themes.length];
  const font = fonts[hash % fonts.length];
  
  const winPaths = [
    `C:\\Users\\${winName}\\Documents\\JavaLab`, `C:\\Users\\${winName}\\JavaProjects`,
    `D:\\MCA\\Semester2\\Java`, `C:\\Users\\${winName}\\Desktop\\JavaPrograms`,
    `E:\\Assignments\\JavaLab`, `C:\\Workspace\\Java`
  ];
  
  const unixPaths = [
    `~/Documents/JavaLab`, `~/JavaProjects`,
    `~/Desktop/JavaPrograms`, `~/Workspace/Java`,
    `~/Assignments/JavaLab`
  ];

  const winPath = winPaths[hash % winPaths.length];
  const unixPath = unixPaths[hash % unixPaths.length];
  
  let promptText = "";
  if (theme.type === "mac") {
    // macOS: username@MacBook-Pro JavaLab %
    promptText = `${unixName}@MacBook-Pro ${unixPath.split('/').pop()} %`;
  } else if (theme.type === "ubuntu") {
    // Ubuntu: username@ubuntu:~/Documents/JavaLab$
    promptText = `${unixName}@ubuntu:${unixPath}$`;
  } else if (theme.type === "gitbash") {
    // Git Bash: username@DESKTOP MINGW64 ~/Documents/JavaLab
    // $
    promptText = `${unixName}@DESKTOP-ABC MINGW64 ${unixPath}\n$`;
  } else if (theme.type === "powershell") {
    promptText = `PS ${winPath}>`;
  } else {
    // CMD
    promptText = `${winPath}>`;
  }

  // Ensure Git Bash multiline prompt handles correctly
  const promptLines = promptText.split('\n');
  const mainPrompt = promptLines[promptLines.length - 1]; // The actual input line e.g., "$" or "C:\>"
  
  const executionFlow = [
    `${promptText} javac ${filename}`,
    `compiling...`,
    `${promptText} java ${className}`,
    ...outputResult.split("\n"),
    ``,
    promptText
  ];

  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl border print:shadow-xl mt-4 relative ${theme.bg} ${theme.border} font-sans box-border`}>
      <div className={`${theme.headerBg} flex items-center px-4 py-2 border-b ${theme.headerBorder} h-9`}>
        {theme.showDots && (
          <div className="flex space-x-2 absolute">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] print:bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] print:bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] print:bg-[#27c93f]"></div>
          </div>
        )}
        <div className={`w-full text-center text-[13px] font-medium ${theme.titleText} tracking-wide font-sans`}>
          {theme.title}
        </div>
      </div>
      
      <div className={`${theme.bg} ${theme.text} ${font} text-[13.5px] p-5 overflow-x-auto min-h-[120px]`}>
        {executionFlow.map((line, idx) => (
          <div key={idx} className="min-h-[20px] whitespace-pre-wrap break-all leading-relaxed">
            {line === 'compiling...' ? <span className="opacity-50 italic">{line}</span> : line}
          </div>
        ))}
      </div>
    </div>
  );
}
