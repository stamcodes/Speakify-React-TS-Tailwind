// src/features/onboarding/Step2_Topics.tsx
import { useState } from "react";
import {
  Video as VideoIcon,
  ArrowLeft,
  X,
  Play,
  Trash2,
  Link as LinkIcon,
  Upload as UploadIcon,
  Sparkles,
  Mic,
  Clock,
  Sun,
} from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import OnboardingStepCounter from "../../components/Modules/OnboardingStepCounter";
import type { OnboardingData, VideoItem } from "./onboardingTypes";

interface Step2Props {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SAMPLE_VIDEOS = [
  {
    id: 1,
    url: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-microphone-talking-41582-large.mp4",
  },
  {
    id: 2,
    url: "https://assets.mixkit.co/videos/preview/mixkit-woman-filming-herself-with-a-smartphone-43258-large.mp4",
  },
  {
    id: 3,
    url: "https://assets.mixkit.co/videos/preview/mixkit-speaker-at-a-business-coaching-seminar-41571-large.mp4",
  },
];

function Step2_Topics({ data, updateData, onNext, onBack }: Step2Props) {
  const [showBestPractices, setShowBestPractices] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [activeSampleId, setActiveSampleId] = useState<number | null>(null);

  const processFile = (file: File) => {
    // 🛠️ Provision #3: Check for duplicate file names
    const isDuplicate = data.videos.some(
      (v) => v.name.toLowerCase() === file.name.toLowerCase(),
    );

    if (isDuplicate) {
      alert(`The video "${file.name}" has already been added.`);
      return;
    }

    addVideo({
      id: crypto.randomUUID(),
      name: file.name,
      type: "upload",
      meta: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
      // 🛠️ Bug Fix #2: Clear input value so the same file can be re-uploaded if deleted
      e.target.value = "";
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const addVideo = (item: VideoItem) => {
    updateData({ videos: [...data.videos, item] });
  };

  const removeVideo = (id: string) => {
    updateData({ videos: data.videos.filter((v) => v.id !== id) });
  };

  const handleAddLink = () => {
    const trimmedLink = linkInput.trim();
    if (!trimmedLink) return;

    // 🛠️ Provision #3: Check for duplicate URLs/names too
    const isDuplicate = data.videos.some(
      (v) => v.name.toLowerCase() === trimmedLink.toLowerCase(),
    );

    if (isDuplicate) {
      alert("This video link has already been added.");
      return;
    }

    let domain = "video link";
    try {
      domain = new URL(trimmedLink).hostname.replace("www.", "");
    } catch {
      // generic fallback
    }

    addVideo({
      id: crypto.randomUUID(),
      name: trimmedLink, // Keep original URL as name reference
      type: "link",
      meta: domain,
    });

    setLinkInput("");
  };

  return (
    <div>
      <Navbar role="auth" />
      <div className="animate-fade-slide-up">
        <OnboardingStepCounter activeStep={2} />

        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Top row: toggle + best practices link */}
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center bg-white/30 rounded-full p-1">
              <button
                type="button"
                onClick={() => updateData({ videoMethod: "upload" })}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  data.videoMethod === "upload"
                    ? "bg-white text-heading shadow-sm"
                    : "text-grey hover:text-heading"
                }`}
              >
                Upload video
              </button>
              <button
                type="button"
                onClick={() => updateData({ videoMethod: "link" })}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  data.videoMethod === "link"
                    ? "bg-white text-heading shadow-sm"
                    : "text-grey hover:text-heading"
                }`}
              >
                Link video
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowBestPractices(true)}
              className="text-sm font-medium text-heading underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              Best practices
            </button>
          </div>

          {/* Shared Queue Area: Clean, transparent items matching reference design */}
          {data.videos.length > 0 && (
            <div className="flex flex-col mb-6 divide-y divide-stone-900/10 border-b border-stone-900/10 animate-fade-in">
              {data.videos.map((video) => (
                <div
                  key={video.id}
                  className="flex items-center justify-between gap-4 py-3.5 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Subtle icon container with no harsh background */}
                    <div className="w-5 h-5 flex items-center justify-center shrink-0 text-stone-600">
                      {video.type === "link" ? (
                        <LinkIcon size={16} />
                      ) : (
                        <UploadIcon size={16} />
                      )}
                    </div>
                    <div className="min-w-0 flex items-center gap-2">
                      <p className="text-sm font-medium text-heading truncate">
                        {video.name}
                      </p>
                      {/* Play trigger sitting directly next to name */}
                      <button
                        type="button"
                        className="text-stone-500 hover:text-heading transition-colors cursor-pointer p-0.5 flex items-center"
                      >
                        <Play size={12} className="fill-current" />
                      </button>
                    </div>
                  </div>

                  {/* Clean, simple delete action */}
                  <div className="flex items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => removeVideo(video.id)}
                      className="text-stone-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-stone-900/5 transition-all cursor-pointer"
                      title="Delete video"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Input Interface Method Area */}
          <div className="mb-6">
            {data.videoMethod === "upload" ? (
              <label
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex flex-col items-center justify-center gap-3 w-full py-16 border border-grey/20 rounded-2xl bg-white/30 cursor-pointer hover:bg-white/40 transition-colors"
              >
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <VideoIcon size={20} className="text-heading" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-heading">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-grey/60 mt-1">
                    Use vertical format videos and keep them up to 90 sec length
                  </p>
                </div>
              </label>
            ) : (
              <div className="w-full">
                <label className="block text-sm font-medium text-heading mb-2">
                  Video URL
                </label>
                <div className="flex rounded-xl overflow-hidden bg-white shadow-sm border border-grey/10">
                  <input
                    type="url"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="https://youtube.com/...."
                    className="flex-1 px-4 py-3 text-sm text-heading placeholder:text-grey/60 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="px-5 text-sm font-medium text-heading border-l border-grey/10 hover:bg-grey/5 transition-colors cursor-pointer"
                  >
                    Add video
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-heading bg-white/60 hover:bg-white/80 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              onClick={onNext}
              className="px-6 py-3 rounded-xl text-sm font-medium text-heading bg-white hover:bg-white/80 transition-colors cursor-pointer"
            >
              Next step
            </button>
          </div>
        </div>
      </div>

      {/* Slide Sidebar */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          showBestPractices
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => {
            setShowBestPractices(false);
            setActiveSampleId(null);
          }}
        />

        <div
          className={`relative w-full max-w-md h-full bg-[#f7f3ee] overflow-y-auto p-6 shadow-2xl transform transition-transform duration-300 ease-in-out ${
            showBestPractices ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-start justify-between mb-1">
            <h2 className="text-lg font-semibold text-heading">
              Best practices for video
            </h2>
            <button
              type="button"
              onClick={() => {
                setShowBestPractices(false);
                setActiveSampleId(null);
              }}
              className="text-grey/60 hover:text-heading transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-grey mb-6">
            Create a compelling speaker video that gets you booked
          </p>

          <h3 className="text-sm font-semibold text-heading mb-3">
            Example Videos
          </h3>
          <div className="grid grid-cols-3 gap-2 mb-8">
            {SAMPLE_VIDEOS.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveSampleId(video.id)}
                className="aspect-[3/4] rounded-xl bg-stone-900/10 flex items-center justify-center relative overflow-hidden cursor-pointer group border border-stone-900/5"
              >
                {activeSampleId === video.id ? (
                  <video
                    src={video.url}
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center group-hover:scale-110 transition-transform z-10">
                      <Play
                        size={12}
                        className="text-heading fill-current ml-0.5"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                  </>
                )}
              </div>
            ))}
          </div>

          <hr className="border-grey/10 mb-6" />

          <h3 className="text-sm font-semibold text-heading mb-4">
            How to make a great speaker video
          </h3>
          <div className="space-y-5">
            <div className="flex gap-3">
              <Sparkles size={18} className="text-heading mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-heading">
                  Start with a Hook
                </p>
                <p className="text-xs text-grey mt-0.5">
                  Grab attention in the first 3 seconds. Introduce yourself and
                  your expertise clearly.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Mic size={18} className="text-heading mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-heading">
                  Show Your Speaking Style
                </p>
                <p className="text-xs text-grey mt-0.5">
                  Include clips from actual presentations showing your energy
                  and audience engagement.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock size={18} className="text-heading mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-heading">
                  Keep It Concise
                </p>
                <p className="text-xs text-grey mt-0.5">
                  30-90 seconds is ideal. Focus on your unique value proposition
                  and key topics.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Sun size={18} className="text-heading mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-heading">
                  Good Audio & Lighting
                </p>
                <p className="text-xs text-grey mt-0.5">
                  Clear audio is essential. Use natural lighting or proper
                  lighting setup. Film in vertical format.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step2_Topics;
