"use client";

import { useState } from "react";
import AssignmentView from "@/components/AssignmentView";
import { User, Hash, FileText, FileCode2 } from "lucide-react";

export default function Home() {
  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [enrolmentNumber, setEnrolmentNumber] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && rollNumber.trim() && enrolmentNumber.trim()) {
      setGenerated(true);
    }
  };

  if (generated) {
    return (
      <main className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
        <AssignmentView
          studentName={studentName}
          rollNumber={rollNumber}
          enrolmentNumber={enrolmentNumber}
          onBack={() => setGenerated(false)}
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-[#fafafa]">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-300 blur-[120px] opacity-40 animate-pulse mix-blend-multiply"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-300 blur-[120px] opacity-40 animate-pulse mix-blend-multiply" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] rounded-full bg-cyan-200 blur-[100px] opacity-30 mix-blend-multiply"></div>

      <div className="relative z-10 max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-8 sm:p-10 border border-white/50">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="h-16 w-16 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 transform transition hover:scale-105 duration-300">
              <FileCode2 className="text-white w-8 h-8" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 mb-2 tracking-tight">
              Java Lab Generator
            </h1>
            <p className="text-gray-500/90 text-[15px] font-medium max-w-xs">
              Instant realistic laboratory records. Enter your details to begin.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="space-y-1.5 focus-within:text-blue-600 text-gray-500 transition-colors">
              <label htmlFor="studentName" className="block text-sm font-semibold text-gray-700 ml-1">
                Student Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  id="studentName"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm outline-none placeholder-gray-400 font-medium"
                  placeholder="e.g. HUZEFA BIN JUNED"
                />
              </div>
            </div>

            <div className="space-y-1.5 focus-within:text-blue-600 text-gray-500 transition-colors">
              <label htmlFor="rollNumber" className="block text-sm font-semibold text-gray-700 ml-1">
                Roll Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  id="rollNumber"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm outline-none placeholder-gray-400 font-medium"
                  placeholder="e.g. 25MMCA016HY"
                />
              </div>
            </div>

            <div className="space-y-1.5 focus-within:text-blue-600 text-gray-500 transition-colors">
              <label htmlFor="enrolmentNumber" className="block text-sm font-semibold text-gray-700 ml-1">
                Enrolment Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  id="enrolmentNumber"
                  value={enrolmentNumber}
                  onChange={(e) => setEnrolmentNumber(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl text-gray-900 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all duration-200 shadow-sm outline-none placeholder-gray-400 font-medium"
                  placeholder="e.g. A250015"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-[15px] font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.23)] active:scale-[0.98] overflow-hidden mt-8"
            >
              <span className="relative z-10 flex items-center gap-2">
                Generate Full 21-Program Lab Record
              </span>
              <div className="absolute inset-0 h-full w-full opacity-0 group-hover:opacity-20 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_1.5s_infinite] transition-opacity"></div>
            </button>
          </form>

          {/* Footer Text */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center justify-center gap-1">
             <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
               <span>MANUU CS & IT DEPT</span>
               <span className="w-1 h-1 rounded-full bg-gray-300"></span>
               <span>v1.0</span>
             </div>
          </div>
        </div>
      </div>

    </main>
  );
}
