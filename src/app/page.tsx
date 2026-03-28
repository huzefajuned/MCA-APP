"use client";

import { useState } from "react";
import AssignmentView from "@/components/AssignmentView";

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
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Java Lab Generator</h1>
          <p className="text-gray-500">Enter your details to generate your realistic lab record.</p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
              Student Full Name
            </label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm outline-none"
              placeholder="e.g. HUZEFA BIN JUNED "
            />
          </div>

          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Roll Number
            </label>
            <input
              type="text"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm outline-none"
              placeholder="e.g. 25MMCA016HY"
            />
          </div>

          <div>
            <label htmlFor="enrolmentNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Enrolment Number
            </label>
            <input
              type="text"
              id="enrolmentNumber"
              value={enrolmentNumber}
              onChange={(e) => setEnrolmentNumber(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm outline-none"
              placeholder="e.g. A250015"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-white py-3 px-4 rounded-lg shadow-md transition-colors duration-200 mt-4"
          >
            Generate Full 21-Program Lab Record
          </button>
        </form>

        <div className="mt-8 text-xs text-center text-gray-400">
          <p>Generates realistic terminal logs and printable PDF</p>
          <p>Format tailored for MANUU CS & IT Dept.</p>
        </div>
      </div>
    </main>
  );
}
