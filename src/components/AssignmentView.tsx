"use client";

import React from 'react';
import TerminalOutput from './TerminalOutput';
import programs from '@/data/programs.json';
import { generateRandomizedOutput } from '@/utils/generateOutput';
import { Download } from 'lucide-react';

interface AssignmentViewProps {
  studentName: string;
  rollNumber: string;
  enrolmentNumber: string;
  onBack: () => void;
}

export default function AssignmentView({ studentName, rollNumber, enrolmentNumber, onBack }: AssignmentViewProps) {

  const handleDownloadPDF = () => {
    // Change document title to force PDF download name
    const originalTitle = document.title;
    document.title = `${studentName.trim() || 'Student_Lab_Record'}.pdf`;
    window.print();
    setTimeout(() => { document.title = originalTitle; }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center mb-6 no-print">
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          &larr; Back to Edit
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 transition"
        >
          <Download size={16} />
          Print / Save as PDF
        </button>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page { size: A4; margin: 0; }
          html, body {
            width: 210mm;
            height: auto;
            margin: 0;
            padding: 0;
            overflow: visible;
          }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}} />

      <div
        id="printable-lab-record"
        className="bg-white shadow-xl print:shadow-none print:w-full"
      >
        {/* COVER PAGE */}
        <div className="flex flex-col items-center min-h-[1050px] print:min-h-[260mm] text-center pb-12 break-after-page font-sans bg-white relative print:p-0 print:border-none box-border">
          <h3 className="text-[1.1rem] font-bold mt-[2.5rem] print:mt-[2rem] mb-2 text-gray-900">A Lab Manual For</h3>
          <h1 className="text-[1.8rem] font-extrabold text-[#3a5b88] mb-2 uppercase tracking-wide">JAVA PROGRAMMING LAB</h1>
          <h2 className="text-[1.2rem] font-bold text-[#3a5b88] mb-8 tracking-widest">{rollNumber}</h2>

          <p className="text-[1.05rem] font-medium text-gray-900 mb-6 max-w-3xl mx-auto uppercase leading-snug">
            A RECORD SUBMITTED IN PARTIAL FULFILLMENT OF THE REQUIREMENTS<br />FOR &quot;JAVA PROGRAMMING LAB&quot; OF
          </p>

          <h3 className="text-[1.15rem] font-bold text-[#b54646] uppercase mb-6 tracking-wide">MASTER OF COMPUTER APPLICATION</h3>

          <div className="text-[1.1rem] font-medium mb-3">1<sup className="text-xs">ST</sup> Year /2<sup className="text-xs">ND</sup> Semester</div>
          <div className="text-[1.1rem] font-medium mb-4">2025-27</div>

          <h4 className="text-[1.1rem] font-medium mb-4">By</h4>

          {/* Highlighted sections */}
          <div className="mb-4 text-lg">
            <span className="bg-yellow-200 px-3 py-1 font-bold inline-block whitespace-nowrap">{studentName}</span>
          </div>
          <div className="mb-4 text-[1.1rem]">
            Roll Number: <span className="bg-yellow-200 px-3 py-1 font-bold">{rollNumber}</span>
          </div>
          <div className="mb-8 text-[1.1rem]">
            Enrolment Number: <span className="bg-yellow-200 px-3 py-1 font-bold">{enrolmentNumber}</span>
          </div>

          <div className="mb-[1.5rem]">
            <div className="text-[1.1rem] font-medium mb-[1.5rem]">Submitted to</div>
            <h3 className="text-[1.15rem] font-bold mb-1">Mr. Mohatesham Pasha Quadri</h3>
            <p className="text-[1.1rem] mb-1">Assistant Professor</p>
            <p className="text-[1.1rem]">Department of CS & IT, MANUU</p>
          </div>

          {/* Logo */}
          <div className="my-[1.5rem]">
            <img src="/logo.png" alt="MANUU Logo" className="h-[120px] object-contain" />
          </div>

          <div className="text-center w-full relative z-10 px-8">
            <h3 className="text-[1.2rem] font-medium text-[#b54646] uppercase mb-4 tracking-wide border-b-[1.5px] border-[#b54646] inline-block pb-1">SCHOOL OF TECHNOLOGY</h3>
            <div className="text-[0.95rem] font-medium mb-1 tracking-wide">DEPARTMENT OFCOMPUTERSCIENCE&INFORMATIONTECHNOLOGY</div>
            {/* <h2 className="text-[1.7rem] font-extrabold uppercase mb-2">MAULANA AZAD NATIONAL URDU UNIVERSITY</h2> */}
            <h2 className="text-[1.7rem] font-extrabold uppercase mb-2">MAULANA AZAD NATIONAL URDU UNIVERSITY</h2>
            <p className="text-[0.95rem] font-medium leading-tight">(A Central University established by an Act of Parliament in 1998)</p>
            <p className="text-[0.95rem] font-medium">Accredited Grade &quot;A+&quot; by NAAC</p>
          </div>

          {/* Urdu Footer Details on Cover Page */}
          {/* <div className="w-full flex justify-between absolute bottom-[2rem] px-16 text-[0.95rem] font-bold">
            <span>جاوا پروگرامنگ</span>
            <span>اسکول برائے ٹیکنالوجی</span>
          </div> */}
          <div className="absolute right-8 bottom-4 text-xs font-sans">1</div>
        </div>

        {/* CERTIFICATE PAGE */}
        <div className="flex flex-col min-h-[1050px] print:min-h-[260mm] pt-[3rem] text-center pb-12 break-after-page font-sans bg-white relative px-10 print:p-0 print:border-none box-border">
          {/* <div className="text-[0.95rem] font-medium mb-8 text-center w-full tracking-wide">
            Gachibowli, Hyderabad-500032, T.S. <a href="http://www.mannu.edu.in" className="text-[#3a5b88] underline">www.mannu.edu.in</a>
          </div> */}
          <div className="flex justify-center mb-10">
            <img src="/logo.png" alt="MANUU Logo" className="h-[130px] object-contain" />
          </div>
          <h2 className="text-[1.35rem] font-extrabold text-[#002060] uppercase mb-10 tracking-wide leading-snug">
            DEPARTMENT OF<br />COMPUTER SCIENCE & INFORMATION TECHNOLOGY
          </h2>

          <h1 className="text-[3.5rem] font-normal mb-20 leading-none">Certificate</h1>

          <div className="text-[1.25rem] leading-[2.6] text-justify px-10 mb-28 italic">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Certified that this is the Bonafide <strong className="font-bold">Java Programming Lab ({rollNumber})</strong> Record of Mr./Ms. <strong className="font-bold bg-yellow-200 px-2 py-1">{studentName}</strong>, Roll No <strong className="font-bold bg-yellow-200 px-2 py-1">{rollNumber}</strong>, <strong className="font-bold">MCA I Year, II Semester</strong>, of the academic year <em className="not-italic">2025-26</em>.
          </div>

          <div className="flex justify-center font-bold text-[1.1rem] mb-40 italic mt-8">
            <div className="text-center">
              <div>Head,</div>
              <div>Department of CS & IT</div>
            </div>
          </div>

          <div className="w-full flex justify-between font-bold text-[1.1rem] px-12 mt-auto mb-20 italic">
            <div className="text-left">
              <div className="mb-1">Internal</div>
              <div>Examiner</div>
            </div>
            <div className="text-left">
              <div className="mb-1">External</div>
              <div>Examiner</div>
            </div>
          </div>

          {/* <div className="w-full flex justify-between absolute bottom-[2rem] px-16 text-[0.95rem] font-bold">
            <span>جاوا پروگرامنگ</span>
            <span>اسکول برائے ٹیکنالوجی</span>
          </div> */}
          <div className="absolute right-8 bottom-4 text-xs font-sans">2</div>
        </div>

        {/* INDEX PAGE 1 */}
        <div className="flex flex-col min-h-[1050px] print:min-h-[260mm] pt-12 pb-12 break-after-page font-sans bg-white relative px-10 print:p-0 print:border-none box-border">
          <div className="text-center mb-6">
            <h2 className="text-[1.6rem] font-bold text-[#1f4e79] mb-3">انڈیکس / INDEX</h2>
            <h2 className="text-[1.6rem] font-bold text-[#1f4e79]">ریکارڈ عملی لیب / LAB PRACTICE RECORD</h2>
          </div>

          <div className="w-full border-[1.5px] border-black">
            <div className="grid grid-cols-[8%_13%_59%_9%_11%] w-full border-b-[1.5px] border-black font-bold text-center items-center divide-x-[1.5px] divide-black" style={{ minHeight: '65px' }}>
              <div className="p-1 leading-tight text-[15px]">سیریل<br />نمبر</div>
              <div className="p-1 leading-tight text-[15px]">تاریخ</div>
              <div className="p-1 leading-tight text-[16px]">پروگرام کا نام</div>
              <div className="p-1 leading-tight text-[14px]">صفحہ<br />نمبر</div>
              <div className="p-1 leading-tight text-[15px]">ریمار<br />کس</div>
            </div>

            {Array.from({ length: 18 }).map((_, i) => {
              const program = programs[i];
              const hasTitle = program?.title;
              return (
                <div key={i} className="grid grid-cols-[8%_13%_59%_9%_11%] w-full border-b border-black text-center divide-x divide-black" style={{ minHeight: '42px' }}>
                  <div className="p-1 flex items-center justify-center font-semibold text-[14px]">{hasTitle ? i + 1 : ''}</div>
                  <div className="p-1 flex items-center justify-center"></div>
                  <div className="p-2 flex items-center justify-center text-center text-[13px] leading-snug px-3">{hasTitle ? program.title : ''}</div>
                  <div className="p-1 flex items-center justify-center"></div>
                  <div className="p-1 flex items-center justify-center"></div>
                </div>
              )
            })}
          </div>

          {/* <div className="w-full flex justify-between absolute bottom-[2.5rem] px-14 text-[0.95rem] font-bold">
            <span>جاوا پروگرامنگ</span>
            <span>اسکول برائے ٹیکنالوجی</span>
          </div> */}
          <div className="absolute right-8 bottom-4 text-xs font-sans">3</div>
        </div>

        {/* INDEX PAGE 2 */}
        <div className="flex flex-col min-h-[1050px] print:min-h-[260mm] pt-[3rem] pb-12 break-after-page font-sans bg-white relative px-10 print:p-0 print:border-none print:mt-0 box-border mt-[0.5rem]">
          <div className="w-full border-[1.5px] border-black border-t-[1.5px]">
            {Array.from({ length: 24 }).map((_, i) => {
              const programIndex = i + 18;
              const program = programs[programIndex];
              const hasTitle = program?.title;
              return (
                <div key={programIndex} className="grid grid-cols-[8%_13%_59%_9%_11%] w-full border-b border-black text-center divide-x divide-black text-sm" style={{ minHeight: '35px' }}>
                  <div className="p-1 flex items-center justify-center font-semibold text-[14px]">{hasTitle ? programIndex + 1 : ''}</div>
                  <div className="p-1 flex items-center justify-center"></div>
                  <div className="p-2 flex items-center justify-center text-center text-[13px] leading-snug px-3">{hasTitle ? program.title : ''}</div>
                  <div className="p-1 flex items-center justify-center"></div>
                  <div className="p-1 flex items-center justify-center"></div>
                </div>
              )
            })}
          </div>
          <div className="w-full flex justify-between absolute bottom-[2.5rem] px-14 text-[0.95rem] font-bold">
            <span>جاوا پروگرامنگ</span>
            <span>اسکول برائے ٹیکنالوجی</span>
          </div>
          <div className="absolute right-8 bottom-4 text-xs font-sans">4</div>
        </div>

        {/* PROGRAMS LIST */}
        <div className="p-8 sm:p-12 print:p-8 pt-[3rem] print:pt-[1rem] break-inside-avoid">

          {programs.map((prog, index) => {
            // Generate the dynamic output using the utility function
            const actualCode = prog.code.replace(/{studentName}/g, studentName).replace(/{rollNumber}/g, rollNumber);
            const generatedOutput = generateRandomizedOutput(prog.outputTemplate, studentName, rollNumber);

            return (
              <div key={prog.id} className={`${index > 0 ? 'mt-16 pt-16 border-t border-gray-300' : ''} program-container break-inside-avoid shadow-sm print:shadow-none p-6 border rounded-lg print:border-none print:p-0 mb-12 page-break-after-auto`} style={{ pageBreakInside: 'avoid' }}>
                <h3 className="text-xl font-bold mb-6 text-gray-900 border-b border-gray-200 pb-3">
                  <span className="text-blue-700 mr-2">Program {index + 1}:</span>
                  {prog.title}
                </h3>

                <div className="mb-8">
                  <h4 className="font-bold text-gray-800 mb-3 border-l-4 border-gray-400 pl-2">Source Code:</h4>
                  <pre className="bg-white border border-gray-300 rounded p-5 text-[15px] font-mono text-gray-900 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                    <code>{actualCode}</code>
                  </pre>
                </div>

                <div className="mt-6">
                  <TerminalOutput
                    studentName={studentName}
                    filename={prog.filename}
                    outputResult={generatedOutput}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
