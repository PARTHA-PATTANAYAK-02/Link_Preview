import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LinkPreviewer = ({ url, children }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPreviewDimensions = () => {
    if (url.includes("instagram.com")) return { width: 500, height: 400 };
    if (url.includes("facebook.com")) return { width: 500, height: 400 };
    if (url.includes("linkedin.com")) return { width: 500, height: 400 };
    return { width: 500, height: 400 };
  };

  const { width, height } = getPreviewDimensions();

  const previewUrl = `https://api.microlink.io/?${new URLSearchParams({
    url,
    screenshot: true,
    meta: false,
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": false,
    "viewport.width": width * 2,
    "viewport.height": height * 2,
  }).toString()}`;

  return (
    <span className="relative inline-block mx-1">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
        onMouseEnter={() => setShowPreview(true)}
        onMouseLeave={() => {
          setShowPreview(false);
          setIsLoading(true);
          setError(null);
        }}
      >
        {children}
      </a>

      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-[500px] h-[400px] shadow-2xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {isLoading && !error && (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full mb-2" />
                  <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            )}

            {error && (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 p-4">
                <div className="text-center text-red-500 dark:text-red-400">
                  <svg
                    className="w-10 h-10 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p>Preview unavailable</p>
                </div>
              </div>
            )}

            {!error && (
              <img
                src={previewUrl}
                alt={`${url} preview`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIsLoading(false);
                  setError("Failed to load preview");
                }}
              />
            )}

            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm truncate">
                {url.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default LinkPreviewer;
