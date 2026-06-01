'use client';

import React, { useState } from "react";

type Answer = {
  questionId: number;
  value: number;
};

type ResultType =
  | "Overlever"
  | "Doorzetter"
  | "Controlehouder"
  | "Overprikkelde Zorggever";

const questions = [
  "Ik voel me vaak moe, zelfs na slaap.",
  "Ik adem regelmatig hoog of door mijn mond.",
  "Ik heb moeite om te ontspannen.",
  "Ik pieker veel.",
  "Ik sta vaak 'aan'.",
  "Ik houd spanning vast in mijn lichaam.",
  "Ik vind het lastig om nee te zeggen.",
  "Ik voel me verantwoordelijk voor anderen.",
  "Ik heb weinig echte rustmomenten.",
  "Ik voel me snel overprikkeld.",
  "Ik vergeet soms bewust te ademen.",
  "Ik ervaar vaak stress of druk.",
  "Ik heb weinig energie over aan het einde van de dag.",
  "Ik zucht vaak of voel spanning in mijn borst.",
  "Ik probeer controle te houden in situaties.",
  "Ik ga vaak door, ook als mijn lichaam rust vraagt.",
  "Ik vind het moeilijk om grenzen aan te geven.",
  "Ik voel me emotioneel snel vol.",
  "Ik ben vaak bezig met wat anderen nodig hebben.",
  "Ik herstel langzaam na drukke dagen."
];

function calculateResult(score: number): ResultType {
  if (score <= 15) return "Overlever";
  if (score <= 30) return "Doorzetter";
  if (score <= 45) return "Controlehouder";
  return "Overprikkelde Zorggever";
}

function getResultText(type: ResultType) {
  switch (type) {
    case "Overlever":
      return {
        text: "Je systeem is grotendeels in balans, maar je lichaam geeft soms subtiele stresssignalen.",
        advice: "Blijf bewust ademen door je neus en neem dagelijks korte rustmomenten."
      };

    case "Doorzetter":
      return {
        text: "Je lichaam staat regelmatig in een lichte stressstand. Je gaat vaak door terwijl je systeem om pauze vraagt.",
        advice: "Je hebt herstel nodig, niet harder werken. Bouw bewuste adempauzes in."
      };

    case "Controlehouder":
      return {
        text: "Je ademhaling en energie worden beïnvloed door controle en mentale spanning.",
        advice: "Oefen met loslaten en vertrouwen. Je hoeft niet alles vast te houden."
      };

    case "Overprikkelde Zorggever":
      return {
        text: "Je systeem staat al langere tijd onder druk door emotionele en mentale belasting.",
        advice: "Jij mag eerst voor jezelf zorgen. Je ademhaling mag weer ruimte krijgen."
      };
  }
}

export default function AppToolPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);

  const handleChange = (questionId: number, value: number) => {
    const updated = answers.filter(a => a.questionId !== questionId);
    setAnswers([...updated, { questionId, value }]);
  };

  const calculateScore = () => {
    const total = answers.reduce((sum, a) => sum + a.value, 0);
    const type = calculateResult(total);
    setResult(type);
  };

  const reset = () => {
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    const data = getResultText(result);

    return (
      <div style={{ padding: 20 }}>
        <h1>Jouw ademtype: {result}</h1>
        <p>{data.text}</p>
        <p><strong>Advies:</strong> {data.advice}</p>

        <hr />

        <h3>Volgende stap</h3>
        <p>
          Wil je ontdekken wat jouw ademhaling en energie écht blokkeren?
          Plan een NEI- of ademcoaching sessie bij Praktijk Confident.
        </p>

        <button onClick={reset}>Opnieuw doen</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Adem & Energie Scan</h1>
      <p>Beantwoord alle vragen (0 = nooit, 3 = vaak)</p>

      {questions.map((q, index) => (
        <div key={index} style={{ marginBottom: 15 }}>
          <p>{q}</p>

          {[0, 1, 2, 3].map((value) => (
            <label key={value} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name={`q-${index}`}
                value={value}
                onChange={() => handleChange(index, value)}
              />
              {value}
            </label>
          ))}
        </div>
      ))}

      <button onClick={calculateScore}>Bekijk resultaat</button>
    </div>
  );
}
