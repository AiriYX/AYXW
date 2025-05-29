
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import Vara from "vara";

const SignatureSection = () => {
  const { theme } = useTheme();
  const [varaLoaded, setVaraLoaded] = useState(false);
  const [varaError, setVaraError] = useState(false);
  const signatureRef = useRef<HTMLDivElement>(null);
  const varaInstanceRef = useRef<Vara | null>(null);

  useEffect(() => {
    if (signatureRef.current) {
      try {
        signatureRef.current.innerHTML = "";
        varaInstanceRef.current = new Vara(
          "#signature",
          "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
          [
            {
              text: "Airi W.",
              textAlign: "center",
              fromCurrentPosition: {
                y: false,
              },
              duration: 3500,
            },
          ],
          {
            strokeWidth: 1.5,
            color: theme === "dark" ? "#e5e5e5" : "#404040",
            fontSize: 48,
          }
        );

        const loadTimer = setTimeout(() => {
          setVaraLoaded(true);
        }, 100);
        return () => clearTimeout(loadTimer);
      } catch (error) {
        console.error("Vara.js failed to load:", error);
        setVaraError(true);
      }
    }
  }, [theme]);

  useEffect(() => {
    return () => {
      if (varaInstanceRef.current) {
        try {
          varaInstanceRef.current.destroy?.();
        } catch (error) {
          console.log("Vara cleanup error:", error);
        }
      }
    };
  }, []);

  return (
    <>
      {/* Signature animation container */}
      <div
        id="signature"
        ref={signatureRef}
        className="mx-auto w-full max-w-md min-h-[120px] flex items-center justify-center text-center"
        style={{
          opacity: varaLoaded && !varaError ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      />
      {/* Fallback for when Vara fails to load */}
      {(varaError || (!varaLoaded && signatureRef.current)) && (
        <div className="w-full flex justify-center mb-6">
          <h1
            className={`font-playwrite text-2xl xxs:text-3xl xs:text-4xl md:text-5xl xl:text-6xl ${theme === "dark" ? "text-neutral-200" : "text-neutral-700"} animate-fade-in text-center mx-auto`}
            style={{
              opacity: varaError ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
              fontFamily: "Playwrite HU, cursive",
            }}
          >
            Airi W.
          </h1>
        </div>
      )}
    </>
  );
};

export default SignatureSection;
