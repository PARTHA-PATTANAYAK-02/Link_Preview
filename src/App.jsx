import React from "react";
import LinkPreviewer from "./LinkPreviewer";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-end justify-center p-4">
      <div className="max-w-md w-full bg-black rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          My Social Profiles
        </h1>

        <div className="space-y-2">
          <p className="text-gray-600">
            Check my{" "}
            <LinkPreviewer url="https://www.instagram.com/iamparthapattanayak/">
              Instagram
            </LinkPreviewer>{" "}
            profile
          </p>

          <p className="text-gray-600">
            Check my{" "}
            <LinkPreviewer url="https://www.facebook.com/iamparthapattanayak">
              Facebook
            </LinkPreviewer>{" "}
            profile
          </p>

          <p className="text-gray-600">
            Check my{" "}
            <LinkPreviewer url="https://www.linkedin.com/in/partha-pattanayak-082a46320/">
              Linkedin
            </LinkPreviewer>{" "}
            profile
          </p>
        </div>
      </div>
    </div>
  );
}
