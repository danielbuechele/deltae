"use client";

import { getDeltaE00, LAB } from "delta-e";
import convert from "color-convert";
import { useState } from "react";

const REFERENCE_COLOR = "61DAFB";

function lab(color: string): LAB {
  const [L, A, B] = convert.hex.lab(color);
  return { L, A, B };
}

export default function Home() {
  const [color, setColor] = useState("");

  const deltaE = getDeltaE00(lab(REFERENCE_COLOR), lab(color));
  const points = Math.round((100 - deltaE) / 20);
  return (
    <main className="flex flex-col gap-4 row-start-2 font-mono max-w-sm p-6 m-auto">
      <div className="p-2 border-2 rounded-md w-full flex flex-row items-center">
        <svg
          width="100%"
          height="100%"
          viewBox="-10.5 -9.45 21 18.9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 mr-2"
        >
          <circle cx="0" cy="0" r="2" fill={`#${REFERENCE_COLOR}`}></circle>
          <g stroke={`#${REFERENCE_COLOR}`} stroke-width="1" fill="none">
            <ellipse rx="10" ry="4.5"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
          </g>
        </svg>
        #{REFERENCE_COLOR}
      </div>
      <div className="text-center">compared to…</div>
      <div className="flex flex-row relative">
        <div className="top-2 absolute left-2 flex items-center">
          <div
            className="w-8 h-8 rounded-sm border flex justify-center font-mono items-center text-gray-400 mr-2"
            style={{ background: color.length === 6 ? `#${color}` : "white" }}
          >
            {color.length !== 6 && "?"}
          </div>
          #
        </div>
        <input
          className="h-12 pl-14 border-2 rounded-md w-full"
          type="text"
          value={color}
          maxLength={6}
          autoFocus
          placeholder="your hex code"
          onChange={(e) =>
            setColor(e.target.value.toUpperCase().replace(/[^0-9A-F]/g, ""))
          }
        />
      </div>
      {color.length === 6 && (
        <div className="text-center">
          ΔE = {deltaE.toFixed(2)}
          <small className="block">
            calculation based on{" "}
            <a
              className="underline"
              href="https://en.wikipedia.org/wiki/Color_difference#CIEDE2000"
              target="_blank"
            >
              CIEDE2000
            </a>
          </small>
          <div className="mt-4">
            <small className="block">Math.round((100 - ΔE)/20)=</small>
            {points}
            &nbsp;point{points === 1 ? "" : "s"}
          </div>
        </div>
      )}
    </main>
  );
}
