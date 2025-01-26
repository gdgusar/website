"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";

const ScrambleText = () => {
  const textRefs = useRef([]);
  const containerRef = useRef(null);
  const [isAlternateSet, setIsAlternateSet] = useState(false);
  const [displayTexts, setDisplayTexts] = useState([
    "CODE CRAFT",
    "TECH PULSE",
    "BUILD NEXT",
    "AI FUTURE",
    "DEV SPARK",
    "INNOVATE",
    "CLOUD PRO",
    "QUANTUM",
    "DATA FLOW",
    "APP FORGE",
    "FULL STACK",
    "ML VISION",
    "CYBER OPS",
    "DEV TOOLS",
    "CODE LIFE",
    "LEVEL UP",
  ]);

  const alternateTexts = useMemo(
    () => [
      "NEXT WAVE",
      "THINK BIG",
      "START NOW",
      "GO BEYOND",
      "TECH EDGE",
      "CODE ART",
      "WEB THREE",
      "INSPIRE",
      "API CRAFT",
      "APP MAKER",
      "DEV GURU",
      "AI MASTER",
      "SEC MIND",
      "SYS ARCH",
      "LIVE CODE",
      "EVOLVE",
    ],
    []
  );

  const defaultTexts = useMemo(
    () => [
      "CODE CRAFT",
      "TECH PULSE",
      "BUILD NEXT",
      "AI FUTURE",
      "DEV SPARK",
      "INNOVATE",
      "CLOUD PRO",
      "QUANTUM",
      "DATA FLOW",
      "APP FORGE",
      "FULL STACK",
      "ML VISION",
      "CYBER OPS",
      "DEV TOOLS",
      "CODE LIFE",
      "LEVEL UP",
    ],
    []
  );

  const validateText = (text) => {
    return (
      typeof text === "string" &&
      text.length <= 10 &&
      text.length >= 2 &&
      /^[A-Z0-9\s]*$/.test(text)
    );
  };

  const validateTextArray = useMemo(
    () => (texts) => {
      return (
        Array.isArray(texts) && texts.length === 16 && texts.every(validateText)
      );
    },
    []
  );

  useEffect(() => {
    const chars = "!<>-_\\/[]{}—=+*^?#________{}@@#}@";
    let activeIndices = new Set();
    let isTransitioning = false;
    let timeline;

    const createGlowEffect = (element) => {
      return gsap
        .timeline()
        .to(element, {
          duration: 0.2,
          textShadow:
            "0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.4)",
          color: "white",
          ease: "power2.inOut",
        })
        .to(element, {
          duration: 0.3,
          textShadow: "none",
          color: "rgba(255, 255, 255, 0.8)",
          ease: "power2.out",
        });
    };

    const scrambleText = (element, targetText, isTransition = false) => {
      return new Promise((resolve) => {
        const duration = isTransition ? 0.6 : 1.2;
        const steps = Math.floor(duration * 60); // 60fps
        let frame = 0;

        const tl = gsap.timeline({
          onComplete: () => {
            element.innerText = targetText;
            if (!isTransition) createGlowEffect(element);
            resolve();
          },
        });

        if (!isTransition) {
          tl.to(element, {
            duration: 0.15,
            scale: 1.05,
            ease: "power2.out",
          });
        }

        tl.to(
          {},
          {
            duration: duration,
            onUpdate: function () {
              frame = Math.floor(this.progress() * steps);
              let newText = "";
              const progressIndex = Math.floor(
                this.progress() * targetText.length
              );

              for (let i = 0; i < targetText.length; i++) {
                if (i < progressIndex) {
                  newText += targetText[i];
                } else if (i === progressIndex) {
                  const randomChar =
                    chars[Math.floor((Date.now() / 30 + i) % chars.length)];
                  newText += randomChar;
                } else {
                  const randomChar =
                    chars[
                      Math.floor((Date.now() / 50 + i * frame) % chars.length)
                    ];
                  newText +=
                    Math.random() > 0.7
                      ? randomChar
                      : element.innerText[i] || randomChar;
                }
              }
              element.innerText = newText;
            },
            ease: "power1.inOut",
          }
        );

        if (!isTransition) {
          tl.to(
            element,
            {
              duration: 0.15,
              scale: 1,
              ease: "power2.in",
            },
            "-=0.15"
          );
        }
      });
    };

    const getNextIndex = () => {
      if (activeIndices.size >= 1 || isTransitioning) return undefined;

      const columns = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
      ];

      const availableColumns = columns.filter(
        (col) => !col.some((idx) => activeIndices.has(idx))
      );

      if (availableColumns.length > 0) {
        const randomColumn =
          availableColumns[Math.floor(Math.random() * availableColumns.length)];
        return randomColumn[Math.floor(Math.random() * randomColumn.length)];
      }

      activeIndices.clear();
      return Math.floor(Math.random() * displayTexts.length);
    };

    const switchTexts = async () => {
      if (isTransitioning) return;
      isTransitioning = true;

      try {
        // Reset any active animations
        activeIndices.clear();

        const nextTexts = isAlternateSet ? defaultTexts : alternateTexts;

        if (!validateTextArray(nextTexts)) {
          console.error("Invalid text format detected");
          isTransitioning = false;
          return;
        }

        const promises = textRefs.current.map((element, idx) => {
          return scrambleText(element, nextTexts[idx], true);
        });

        await Promise.all(promises);

        setDisplayTexts(nextTexts);
        setIsAlternateSet(!isAlternateSet);
      } catch (error) {
        console.error("Switch texts error:", error);
      } finally {
        isTransitioning = false;
      }
    };

    const startRandomScramble = async () => {
      const idx = getNextIndex();
      if (idx === undefined) return;

      activeIndices.add(idx);
      const element = textRefs.current[idx];
      const targetText = displayTexts[idx];

      if (element) {
        try {
          await scrambleText(element, targetText);
          await new Promise((resolve) => setTimeout(resolve, 300));
        } catch (error) {
          console.error("Animation error:", error);
        } finally {
          activeIndices.delete(idx);
        }
      }
    };

    const initialDelay = setTimeout(() => {
      startRandomScramble();
    }, 500);

    const scrambleInterval = setInterval(() => {
      startRandomScramble();
    }, 2000);

    const switchInterval = setInterval(() => {
      switchTexts();
    }, 15000);

    const handleHover = (element, isEnter) => {
      if (!activeIndices.has(element) && !isTransitioning) {
        gsap.to(textRefs.current[element], {
          duration: 0.3,
          textShadow: isEnter ? "0 0 10px rgba(255, 255, 255, 0.4)" : "none",
          scale: isEnter ? 1.05 : 1,
          color: isEnter ? "white" : "rgba(255, 255, 255, 0.8)",
          ease: isEnter ? "power2.out" : "power2.in",
        });
      }
    };

    textRefs.current.forEach((element, idx) => {
      let hoverTimeout;
      element.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => handleHover(idx, true), 50);
      });

      element.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => handleHover(idx, false), 50);
      });
    });

    return () => {
      clearTimeout(initialDelay);
      clearInterval(scrambleInterval);
      clearInterval(switchInterval);
      gsap.killTweensOf({});
    };
  }, [displayTexts, alternateTexts, defaultTexts, validateTextArray]);

  return (
    <div
      className="w-full max-w-7xl mx-auto py-4 sm:py-8 md:py-12"
      ref={containerRef}
    >
      {/* Top Boxes */}
      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8 md:mb-12">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Square */}
          <div className="w-full sm:w-48 md:w-56 lg:w-64 aspect-square bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm"></div>
          {/* Rectangle */}
          <div className="w-full h-48 sm:h-48 md:h-56 lg:h-64 sm:flex-1 max-w-2xl bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Matrix Text Grid */}
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-4 pointer-events-none">
          <div className="border-r border-white/10"></div>
          <div className="border-r border-white/10"></div>
          <div className="hidden sm:block border-r border-white/10"></div>
        </div>

        <div className="absolute inset-0 grid grid-rows-8 sm:grid-rows-4 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border-b border-white/10"></div>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 max-w-5xl mx-auto">
          {displayTexts.map((text, index) => (
            <div
              key={index}
              className="p-3 sm:p-4 md:p-6 min-h-[100px] sm:min-h-[120px] md:min-h-[140px] flex items-center justify-center"
            >
              <div
                ref={(el) => (textRefs.current[index] = el)}
                className="text-sm sm:text-base md:text-lg font-mono text-white/80 hover:text-white text-center transition-colors duration-300 cursor-pointer select-none"
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Boxes */}
      <div className="container mx-auto px-4 sm:px-6 mt-6 sm:mt-8 md:mt-12">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          {/* Rectangle First */}
          <div className="w-full h-48 sm:h-48 md:h-56 lg:h-64 sm:flex-1 max-w-2xl bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm"></div>
          {/* Square Second */}
          <div className="w-full sm:w-48 md:w-56 lg:w-64 aspect-square bg-black/10 rounded-lg border border-white/10 backdrop-blur-sm">
          
          <iframe
              src="data:text/html;base64,PGh0bWw+CiAgICAgICAgPGhlYWQ+CiAgICAgICAgICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSI+CiAgICAgICAgICAgIDxzdHlsZT4KICAgICAgICAgICAgICAgIGh0bWwsIGJvZHl7CiAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwOwogICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7CiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7CiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMDsKICAgICAgICAgICAgICAgIH0KICAgICAgICAgICAgPC9zdHlsZT4KICAgICAgICAgICAgPHNjcmlwdCB0eXBlPSJpbXBvcnRtYXAiPgp7CiAgICAiaW1wb3J0cyI6IHsKICAgICAgICAicmVhY3QiOiAiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvcmVhY3RAMTguMC4yIiwKICAgICAgICAicmVhY3QtZG9tIjogImh0dHBzOi8vY2RuLnNreXBhY2suZGV2L3JlYWN0LWRvbUAxOC4wLjIiLAogICAgICAgICJ0aHJlZSI6ICJodHRwczovL2Nkbi5za3lwYWNrLmRldi90aHJlZUAwLjE0OC4wIiwKICAgICAgICAicmVhY3QtdGhyZWUvZmliZXIiOiAiaHR0cHM6Ly9jZG4uc2t5cGFjay5kZXYvQHJlYWN0LXRocmVlL2ZpYmVyQDcuMC4yNCIKICAgIH0KfQo8L3NjcmlwdD4KPHN0eWxlPgogICAgaHRtbCwgYm9keXsKICAgICAgICBtYXJnaW46IDA7CiAgICAgICAgcGFkZGluZzogMDsKICAgICAgICB3aWR0aDogMTAwJTsKICAgICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgICAgYm9yZGVyOiAwOwogICAgfQogICAgLm50LWVtYmVkewogICAgICAgIHdpZHRoOiAxMDAlOwogICAgICAgIGhlaWdodDogMTAwJTsKICAgIH0KICAgIC5udC1lbWJlZCBjYW52YXN7CiAgICAgICAgd2lkdGg6IDEwMCU7CiAgICAgICAgaGVpZ2h0OiAxMDAlOwogICAgfQo8L3N0eWxlPgo8c2NyaXB0IHR5cGU9Im1vZHVsZSI+CiAgICBpbXBvcnQgUmVhY3QsIHt1c2VSZWYsdXNlTWVtb30gZnJvbSAncmVhY3QnOwogICAgaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7CiAgICBpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7CiAgICBpbXBvcnQge0NhbnZhcywgdXNlRnJhbWUsIHVzZVRocmVlfSBmcm9tICdyZWFjdC10aHJlZS9maWJlcic7CgogICAgbGV0IGVtYmVkUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgZW1iZWRSb290LmNsYXNzTmFtZSA9ICJudC1lbWJlZCI7CiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVtYmVkUm9vdCk7CgogICAgY29uc3QgVGV4dHVyZU1lc2ggPSAoKSA9PiB7CiAgICAgICAgY29uc3QgbWVzaCA9IHVzZVJlZihudWxsKQogICAgICAgIHVzZUZyYW1lKHN0YXRlID0+IHsKICAgICAgICAgICAgY29uc3QgeyBjbG9jaywgbW91c2UsIGdsLCBzY2VuZSwgY2FtZXJhIH0gPSBzdGF0ZQogICAgICAgICAgICBpZihtZXNoLmN1cnJlbnQpewogICAgICAgICAgICAgICAgbWVzaC5jdXJyZW50Lm1hdGVyaWFsLnVuaWZvcm1zLnVfbW91c2UudmFsdWUgPSBbbW91c2UueCAvIDIgKyAwLjUsIG1vdXNlLnkgLyAyICsgMC41XQogICAgICAgICAgICAgICAgbWVzaC5jdXJyZW50Lm1hdGVyaWFsLnVuaWZvcm1zLnVfdGltZS52YWx1ZSA9IGNsb2NrLmdldEVsYXBzZWRUaW1lKCkKICAgICAgICAgICAgICAgIGxldCBjID0gZ2wuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKQogICAgICAgICAgICAgICAgbWVzaC5jdXJyZW50Lm1hdGVyaWFsLnVuaWZvcm1zLnVfcmVzb2x1dGlvbi52YWx1ZSA9IFtjLndpZHRoLGMuaGVpZ2h0XQogICAgICAgICAgICB9CiAgICAgICAgfSkKICAgICAgICAKICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCgnbWVzaCcsCiAgICAgICAgICAgIHsKICAgICAgICAgICAgICAgIHJlZjptZXNoLAogICAgICAgICAgICAgICAgcG9zaXRpb246IFswLDAsMF0sCiAgICAgICAgICAgICAgICBzY2FsZTogMSwKICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBbMCwwLDBdCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ3BsYW5lR2VvbWV0cnknLHthcmdzOlsyNDAsNDkzXX0pLCAKICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnc2hhZGVyTWF0ZXJpYWwnLHsKICAgICAgICAgICAgICAgIGZyYWdtZW50U2hhZGVyOiBgCi8vIFVOSUZPUk1TCnVuaWZvcm0gdmVjMiB1X3Jlc29sdXRpb247CnVuaWZvcm0gdmVjMiB1X21vdXNlOwp1bmlmb3JtIGZsb2F0IHVfdGltZTsKdW5pZm9ybSB2ZWMzIHVfY29sb3JzWzRdOwp1bmlmb3JtIGludCB1X2xheWVyczsgLy9taW46MSwgbWF4OjIwCnVuaWZvcm0gZmxvYXQgdV9zY2FsZTsgLy91bml0czolCgoKbWF0MiByb2F0KGZsb2F0IGEpewogIGZsb2F0IHMgPSBzaW4oYSk7CiAgZmxvYXQgYyA9IGNvcyhhKTsKICByZXR1cm4gbWF0MihjLCAtcywgcywgYyk7Cn0KCmZsb2F0IFN0YXIodmVjMiB1diwgZmxvYXQgZmxhcmUpewogIAogIGZsb2F0IGQgPSBsZW5ndGgodXYpOwogIGZsb2F0IG0gPSAuMDUvZDsKICAKICAKICBmbG9hdCByYXlzID0gbWF4KDAuLCAxLiAtIGFicyh1di54ICogdXYueSAqIDEwMDAuKSk7CiAgbSArPSByYXlzKmZsYXJlOwogIAogIHV2ICo9IHJvYXQoMy4xNDUvNC4pOwogIAogIHJheXMgPSBtYXgoMC4sIDEuIC0gYWJzKHV2LnggKiB1di55ICogMTAwMC4pKTsKICBtICs9IHJheXMgKi4zKmZsYXJlOwogIAogIG0gKj0gc21vb3Roc3RlcCgxLiwgLjIsIGQpOwogIHJldHVybiBtOwp9CiAgICAKZmxvYXQgSGFzaDIxKHZlYzIgcCl7CiAgcCA9IGZyYWN0KHAqIHZlYzIoMTIzLjM0LCA0NTYuMjEpKTsKICBwICs9IGRvdChwLCBwKzQ1LjMyKTsKICAKICByZXR1cm4gZnJhY3QocC54KnAueSk7Cn0KCnZlYzMgU3RhckxheWVyKHZlYzIgdXYsIHZlYzMgYzEpewogIHZlYzMgY29sID0gdmVjMygwKTsKICAKICB2ZWMyIGd2ID0gZnJhY3QodXYpLS41OwogIAogIAogIC8vIGNvbC5yZyA9IGd2OwogIAogIHZlYzIgaWQgPSBmbG9vcih1dik7CiAgCiAgZm9yKGludCB5PS0xOyB5PD0xOyB5KyspewogICAgZm9yKGludCB4PS0xOyB4PD0xOyB4KyspewogICAgICB2ZWMyIG9mZnMgPSB2ZWMyKHgseSk7CiAgICAgIAogICAgICBmbG9hdCBuID0gSGFzaDIxKGlkK29mZnMpOwogICAgICAvLyBjb2wgKz0gU3Rhcihndi1vZmZzLXZlYzIobiwgZnJhY3QobiozNC4pKSsuNSwgMS4pOwogICAgICBmbG9hdCBzaXplID0gZnJhY3QobiAqIDEzNDUuMzIpOwogICAgICBmbG9hdCBzdGFyID0gU3Rhcihndi1vZmZzLXZlYzIobiwgZnJhY3QobiozNC4pKSsuNSwgc21vb3Roc3RlcCguOSwgMS4sIHNpemUpKi42KTsKICAgICAgCiAgICAgIC8vIHZlYzMgY29sb3IgPSBzaW4odmVjMyguMiwuMywuOSkqdV90aW1lKTsKICAgICAgdmVjMyBjb2xvciA9IHNpbihjMSpmcmFjdChuKjIzNDUuMikqMTIuMjgzKSouNSsuNTsKICAgICAgCiAgICAgIGNvbG9yID0gY29sb3IqdmVjMygxLiwuNSwxLitzaXplKTsKICAgICAgc3RhciAqPSBzaW4odV90aW1lKjMuK24qNi4zMjMpKi41KzEuOwogICAgICBjb2wgKz0gc3RhcipzaXplKmMxOwogICAgfSAgCiAgfQogIHJldHVybiBjb2w7Cn0Kdm9pZCBtYWluKCkgewogIHZlYzIgdXYgPSAoZ2xfRnJhZ0Nvb3JkLnh5IC0gLjUgKiB1X3Jlc29sdXRpb24ueHkpL3VfcmVzb2x1dGlvbi55OwogIAogIHZlYzIgTSA9ICh1X21vdXNlLnh5IC0gdV9yZXNvbHV0aW9uLnh5Ki41KS91X3Jlc29sdXRpb24ueTsKICAKICB1dio9KDMuKigxLjAtdV9zY2FsZSkpLS41OwogIAogIGZsb2F0IHQgPSB1X3RpbWUqLjA1OyAKICB1diAqPSByb2F0KHQpOwoKICB2ZWMzIGNvbCA9IHZlYzMoMCk7CiAgCiAgZm9yKGZsb2F0IGk9MC47IGk8ZmxvYXQodV9sYXllcnMpOyBpKz0xLil7CiAgICB2ZWMzIGMgPSB1X2NvbG9yc1tpbnQobW9kKGZsb2F0KGkpLGZsb2F0KHVfY29sb3JzLmxlbmd0aCgpKSkpXTsKICAgIGZsb2F0IGRlcHRoID0gZnJhY3QoaS9mbG9hdCh1X2xheWVycykrdCk7CiAgICBmbG9hdCBzY2FsZSA9IG1peCgyMC4sIC41LCBkZXB0aCk7CiAgICBmbG9hdCBmYWRlID0gZGVwdGgqc21vb3Roc3RlcCgxLiwgLjksIGRlcHRoKTsKICAgIGNvbCs9IFN0YXJMYXllcih1dipzY2FsZStpKjQ1NS4yLGMpICpmYWRlOwogIH0KICAKICAKICBnbF9GcmFnQ29sb3IgPSB2ZWM0KGNvbCwxLjApOwp9YCwKICAgICAgICAgICAgICAgIHZlcnRleFNoYWRlcjogYAogICAgICAgICAgICB2b2lkIG1haW4oKSB7CiAgICAgICAgICAgICAgICBnbF9Qb3NpdGlvbiA9IHByb2plY3Rpb25NYXRyaXggKiBtb2RlbFZpZXdNYXRyaXggKiB2ZWM0KHBvc2l0aW9uLCAxLjApOwogICAgICAgIH1gLAogICAgICAgICAgICAgICAgdW5pZm9ybXM6IHt1X2NvbG9yczoge3ZhbHVlOiBbbmV3IFRIUkVFLlZlY3RvcjQoMC43MDk4MDM5MjE1Njg2Mjc1LDAuNTA5ODAzOTIxNTY4NjI3NCwwLjA3ODQzMTM3MjU0OTAxOTYsMSksbmV3IFRIUkVFLlZlY3RvcjQoMSwwLjQ1NDkwMTk2MDc4NDMxMzcsMC45MzMzMzMzMzMzMzMzMzMzLDEpLG5ldyBUSFJFRS5WZWN0b3I0KDAsMC4xODgyMzUyOTQxMTc2NDcwNiwxLDEpLG5ldyBUSFJFRS5WZWN0b3I0KDAuNTkyMTU2ODYyNzQ1MDk4LDAuMTg4MjM1Mjk0MTE3NjQ3MDYsMSwxKV19LHVfbGF5ZXJzOiB7dmFsdWU6IDR9LHVfc2NhbGU6IHt2YWx1ZTogMC40MTl9LHVfdGltZToge3ZhbHVlOiAwfSx1X21vdXNlOiB7dmFsdWU6IFswLDBdfSx1X3Jlc29sdXRpb246IHt2YWx1ZTogWzI0MCw0OTNdfX0sCiAgICAgICAgICAgICAgICB3aXJlZnJhbWU6IGZhbHNlLCAKICAgICAgICAgICAgICAgIHdpcmVmcmFtZUxpbmV3aWR0aDogMCwKICAgICAgICAgICAgICAgIGRpdGhlcmluZzogZmFsc2UsCiAgICAgICAgICAgICAgICBmbGF0U2hhZGluZzogdHJ1ZSwKICAgICAgICAgICAgICAgIGRvdWJsZVNpZGVkOiB0cnVlLAogICAgICAgICAgICAgICAgZ2xzbFZlcnNpb246ICIxMDAiCiAgICAgICAgICAgIH0pCiAgICAgICAgKTsgIAogICAgfQoKICAgIFJlYWN0RE9NLnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KENhbnZhcyx7CiAgICAgICAgICAgIGdsOiB7CiAgICAgICAgICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsCiAgICAgICAgICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IGZhbHNlLAogICAgICAgICAgICAgICAgYWxwaGE6IHRydWUsCiAgICAgICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSwKICAgICAgICAgICAgICAgIGFudGlhbGlhczogdHJ1ZSwKICAgICAgICAgICAgICAgIHByZWNpc2lvbjogImhpZ2hwIiwKICAgICAgICAgICAgICAgIHBvd2VyUHJlZmVyZW5jZTogImhpZ2gtcGVyZm9ybWFuY2UiCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIHJlc2l6ZTp7CiAgICAgICAgICAgICAgICBkZWJvdW5jZTogMCwKICAgICAgICAgICAgICAgIHNjcm9sbDogZmFsc2UsCiAgICAgICAgICAgICAgICBvZmZzZXRTaXplOiB0cnVlCiAgICAgICAgICAgIH0sCiAgICAgICAgICAgIGRwcjogMSwKICAgICAgICAgICAgY2FtZXJhOiB7CiAgICAgICAgICAgICAgICBmb3Y6IDc1LAogICAgICAgICAgICAgICAgbmVhcjogMC4xLAogICAgICAgICAgICAgICAgZmFyOiAxMDAwLAogICAgICAgICAgICAgICAgcG9zaXRpb246IFswLDAsNV0KICAgICAgICAgICAgfSwKICAgICAgICAgICAgc3R5bGU6eyBoZWlnaHQ6ICIxMDAlIiwgd2lkdGg6ICIxMDAlIiB9CiAgICAgICAgfSwKICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFRleHR1cmVNZXNoKSAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgKSwgZW1iZWRSb290KTsKPC9zY3JpcHQ+CiAgICAgICAgPC9oZWFkPgogICAgICAgIDxib2R5Pgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvYm9vay41ZmIxMWI4ZC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvbHlnaWEuZjc0OTA1OTQuc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL292ZXJmbG93LjhkNTA0MTVkLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy90cmFzaC41MjRkYmNkMy5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvdmVydGljYWwuOTA2MTA4NDkuc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL2hvcml6b250YWwuNDRmNzcxZjguc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL2FkZC5hNTUyNDBkZC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvc2lnLjg1MGE4NWU3LnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9taW51cy4xZTFhMGFiZC5zdmcgLS0+Cgo8IS0tIEFTU0VUIE5PVCBJTkxJTkVEOiBhc3NldHMvZWZmZWN0LjQ1NTcyNDNmLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy92aXNpYmxlLmM2ZDRlMWMwLnN2ZyAtLT4KCjwhLS0gQVNTRVQgTk9UIElOTElORUQ6IGFzc2V0cy9oaWRkZW4uNWE0ZmMyNTQuc3ZnIC0tPgoKPCEtLSBBU1NFVCBOT1QgSU5MSU5FRDogYXNzZXRzL3dvcmtlci5iNzYxZmIxMS5qcyAtLT4KPC9ib2R5PgogICAgICAgIDwvaHRtbD4="
              className="w-full h-full"
            />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrambleText;
