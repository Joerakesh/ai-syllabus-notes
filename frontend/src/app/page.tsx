"use client";

import { useState } from "react";
import axios from "axios";
import { ImagePlus, Sparkles, FileText, Loader2, BookOpen } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Helper to strip markdown
const stripMarkdown = (text: string): string => {
  return text
    .replace(/[*_`#>~\-]+/g, "") // Remove common markdown chars
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove markdown links but keep text
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove image markdown
    .replace(/^\s*\n/gm, "") // Extra newlines
    .trim();
};

export default function page() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [unit, setUnit] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/upload", formData);
      setText(res.data.extractedText);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/generate", {
        unitText: unit,
      });
      setNotes(stripMarkdown(res.data.notes));
    } catch (err) {
      console.error("Note generation failed", err);
      alert("Note generation failed");
    } finally {
      setLoading(false);
    }
  };
  const exportToPDF = async () => {
    const input = document.getElementById("notes-section");
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
    pdf.save("SnapNotes.pdf");
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 font-funky flex items-center justify-center p-6"
      style={{ fontFamily: "'Fredoka', cursive" }}
    >
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 space-y-6 border border-white">
        <h1 className="text-4xl font-extrabold text-center text-purple-700 drop-shadow-sm">
          ✨ SnapNotes AI ✨
        </h1>

        {/* Upload Section */}
        <div className="space-y-2">
          <label className="text-lg font-semibold text-pink-700 flex items-center gap-2">
            <ImagePlus size={20} /> 📸 Snap it!
          </label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-200 file:text-pink-900 hover:file:bg-pink-300"
          />
          <button
            onClick={handleUpload}
            disabled={!image || loading}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-2 rounded-lg hover:scale-105 transition transform shadow-md"
          >
            🚀 Extract Text
          </button>
        </div>

        {/* Text Preview */}
        {text && (
          <div className="space-y-2">
            <label className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <FileText size={20} /> 📄 Extracted Text
            </label>
            <textarea
              rows={4}
              value={text}
              readOnly
              className="w-full border border-blue-200 rounded-lg p-3 text-sm bg-blue-50"
            />
          </div>
        )}

        {/* Generate Notes */}
        <div className="space-y-2">
          <label className="text-lg font-semibold text-green-700 flex items-center gap-2">
            <BookOpen size={20} /> 📚 Enter Unit / Topic
          </label>
          <input
            type="text"
            placeholder="e.g., Unit 1: Software Engineering"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border border-green-300 p-3 w-full rounded-lg bg-green-50"
          />
          <button
            onClick={handleGenerate}
            disabled={!unit || loading}
            className="w-full bg-gradient-to-r from-green-400 to-lime-500 font-bold py-2 rounded-lg hover:scale-105 transition transform shadow-md"
          >
            ✨ Generate Notes
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center py-2">
            <Loader2 className="animate-spin h-6 w-6 text-gray-600" />
          </div>
        )}

        {/* Notes Display */}
        {notes && (
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
              <Sparkles size={20} /> 📝 AI Magic Notes
            </h2>
            <div
              id="notes-section"
              className="bg-purple-50 border border-purple-200 p-4 rounded-lg whitespace-pre-wrap text-sm text-gray-800 shadow-inner"
            >
              {notes}
            </div>

            <button
              onClick={exportToPDF}
              className="w-full mt-2 bg-indigo-500 text-white font-bold py-2 rounded-lg hover:scale-105 transition transform shadow-md"
            >
              📥 Export to PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
