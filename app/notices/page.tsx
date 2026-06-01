"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import styled from "styled-components"
import { 
  Calendar, Megaphone, Plus, Trash2, 
  ShieldCheck, UploadCloud, X, ArrowRight 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// --- STYLED COMPONENTS --- (UNCHANGED)

const StyledDownloadWrapper = styled.div`
  .Download-button {
    display: flex;
    align-items: center;
    text-decoration: none;
    font-family: inherit;
    font-weight: 900;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 12px 24px;
    color: white;
    background: linear-gradient(144deg, #2563eb, #3b82f6 50%, #00ddeb);
    border: none;
    box-shadow: 0 0.5em 1.5em -0.5em rgba(37, 99, 235, 0.4);
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }
  .Download-button:hover {
    box-shadow: 0 0.8em 2em -0.5em rgba(0, 221, 235, 0.5);
    border-top-left-radius: 30px;
    border-bottom-right-radius: 30px;
    transform: translateY(-2px);
  }
  .Download-button svg { margin-right: 10px; width: 20px; }
  .Download-button::before, .Download-button::after {
    content: ""; width: 4px; height: 30%; background-color: white; position: absolute; transition: all 0.3s;
  }
  .Download-button::before { border-radius: 0 5px 5px 0; left: 0; }
  .Download-button::after { border-radius: 5px 0 0 5px; right: 0; }
  .Download-button:hover::before { height: 50%; transform: translate(8px, -12px) rotate(45deg); background-color: #00ddeb; }
  .Download-button:hover::after { height: 50%; transform: translate(-8px, 12px) rotate(45deg); background-color: #00ddeb; }
`;

const StyledUploadWrapper = styled.div`
  .upload-container {
    height: 200px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .upload-header {
    flex: 1;
    width: 100%;
    border: 2px dashed #2563eb;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    transition: all 0.3s ease;
  }
  .upload-header:hover { background-color: rgba(37, 99, 235, 0.05); }
  .upload-header svg { height: 60px; stroke: #3b82f6; }
  .upload-header p { text-align: center; color: #94a3b8; font-size: 12px; margin-top: 8px; font-weight: 600; }
  .upload-footer {
    background-color: rgba(255, 255, 255, 0.05);
    width: 100%;
    height: 45px;
    padding: 8px 15px;
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  }
  .upload-footer p { flex: 1; text-align: center; font-size: 11px; color: #cbd5e1; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .upload-footer svg { height: 24px; width: 24px; fill: #3b82f6; background-color: rgba(255, 255, 255, 0.1); border-radius: 50%; padding: 4px; }
  #file-input { display: none; }
`;

// --- MAIN COMPONENT ---
export default function NoticesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState(""); // Track title input
  
  const [notices, setNotices] = useState([
    { id: 1, title: "Semester Final Examination Schedule 2023-2024", date: "2023-11-15", category: "EXAMINATION", description: "Final examination for all departments will commence from December 1st, 2023.", file: "/sample-notice.pdf" },
    { id: 2, title: "Admission Notice for New Session 2024", date: "2023-11-10", category: "ADMISSION", description: "Online applications are now open for diploma programs.", file: "/admission-guide.pdf" }
  ]);

  useEffect(() => {
    const savedStatus = localStorage.getItem("isCPIAdmin")
    if (savedStatus === "true") setIsAdmin(true)
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    if (!title || !selectedFile) {
        alert("Please provide a title and select a file!");
        return;
    }

    // Create a local URL for the file so it can be downloaded
    const fileUrl = URL.createObjectURL(selectedFile);

    const newNotice = {
        id: Date.now(),
        title: title,
        date: new Date().toISOString().split('T')[0],
        category: "GENERAL", // Default category
        description: `Official document uploaded by Admin. Filename: ${selectedFile.name}`,
        file: fileUrl
    };

    setNotices([newNotice, ...notices]);
    
    // Reset Form
    setTitle("");
    setSelectedFile(null);
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white pb-24 pt-28 px-4">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 border-b border-white/5 pb-12 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/30">
                <Megaphone className="w-5 h-5" />
              </div>
              <span className="text-blue-400 font-black tracking-[0.4em] text-[9px] uppercase">Official Portal</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase">Notice <span className="text-blue-500 not-italic tracking-normal">Board</span></h1>
          </div>
          <button onClick={() => { setIsAdmin(!isAdmin); localStorage.setItem("isCPIAdmin", (!isAdmin).toString()); }} className="rounded-full border border-white/10 bg-white/5 px-8 h-10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
            {isAdmin ? "Admin Mode Active" : "Staff Login"}
          </button>
        </motion.header>

        {/* Admin Section */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-12 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                <div>
                  <h2 className="text-2xl font-black uppercase italic">Management</h2>
                  <p className="text-blue-100/70 text-sm">Upload new routines and circulars.</p>
                </div>
                <button onClick={() => setShowUploadModal(true)} className="bg-white text-blue-700 rounded-2xl px-10 h-14 font-black uppercase text-sm shadow-xl active:scale-95 transition-all">
                   <Plus className="inline mr-2 h-5 w-5" /> Create Notice
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List */}
        <div className="space-y-6">
          {notices.map((notice) => (
            <motion.div key={notice.id} whileHover={{ y: -5 }} className="bg-white/[0.02] border border-white/5 rounded-[2.2rem] p-8 border-l-4 border-l-blue-600 flex flex-col md:flex-row justify-between gap-8 transition-all">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-4">
                  <span className="text-[9px] font-black bg-blue-600/20 text-blue-400 px-3 py-1 rounded-md tracking-widest uppercase border border-blue-500/20">{notice.category}</span>
                  <span className="text-slate-500 text-xs font-bold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {notice.date}</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">{notice.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{notice.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <StyledDownloadWrapper>
                  <a href={notice.file} download={`${notice.title}.pdf`} className="Download-button">
                    <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-167l80 80c9.4 9.4 24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-39 39V184c0-13.3-10.7-24-24-24s-24 10.7-24 24V318.1l-39-39c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9z" /></svg>
                    <span>Download</span>
                  </a>
                </StyledDownloadWrapper>
                {isAdmin && <button onClick={() => setNotices(notices.filter(n => n.id !== notice.id))} className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 text-slate-500 hover:text-red-500"><Trash2 className="w-5 h-5" /></button>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal with the Upload Component Integrated */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#1E293B] w-full max-w-lg rounded-[3rem] p-10 border border-white/10 relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">New Entry</h2>
                <button onClick={() => { setShowUploadModal(false); setSelectedFile(null); }} className="rounded-full p-2 text-white hover:bg-white/10"><X /></button>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-blue-500 tracking-widest ml-1">Notice Title</Label>
                  <Input 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Midterm Routine" 
                    className="bg-white/5 border-white/10 h-12 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-600" 
                  />
                </div>

                {/* THE UPLOAD COMPONENT */}
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase text-blue-500 tracking-widest ml-1">Attach Document</Label>
                  <StyledUploadWrapper>
                    <div className="upload-container">
                      <div className="upload-header">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <p>Drag or browse PDF/Image</p>
                      </div>
                      <label htmlFor="file-input" className="upload-footer">
                        <svg viewBox="0 0 32 32"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></svg>
                        <p>{selectedFile ? selectedFile.name : "No file selected"}</p>
                        {selectedFile && <X className="h-4 w-4 text-red-400 cursor-pointer" onClick={(e) => { e.preventDefault(); setSelectedFile(null); }} />}
                      </label>
                      <input id="file-input" type="file" onChange={handleFileChange} />
                    </div>
                  </StyledUploadWrapper>
                </div>

                <button onClick={handlePublish} className="w-full h-14 bg-blue-600 text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all">
                  Publish Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}