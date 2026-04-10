self.onmessage = async (event: MessageEvent) => {
  const { command } = event.data;

  // We are mocking a complex Generative AI / LLM integration here
  // In a real environment, this would hit an API endpoint (e.g. OpenAI/Gemini)
  // and return structured JSON instructing the UI what to render.
  
  setTimeout(() => {
    let responseText = "Command not recognized. Try 'show skills', 'generate code', or 'open terminal'.";
    let action = "NONE";
    let ui = null;

    const lowerCmd = command.toLowerCase();

    if (lowerCmd.includes("skill") || lowerCmd.includes("stack")) {
      responseText = "Analyzing technical capabilities...";
      ui = {
        type: "chart",
        data: [80, 95, 60, 90, 75, 85, 40] // Mock skill levels
      };
      action = "SHOW_SKILLS";
    } else if (lowerCmd.includes("hello") || lowerCmd.includes("hi")) {
      responseText = "Neural link established. Companion drone ready.";
      action = "GREETING";
    } else if (lowerCmd.includes("project") || lowerCmd.includes("work")) {
      responseText = "Decrypting project vault...";
      action = "SHOW_PROJECTS";
    } else if (lowerCmd.includes("code") || lowerCmd.includes("function")) {
      responseText = "Generating optimized algorithm...";
      ui = {
        type: "code",
        language: "typescript",
        content: `function optimizeSubroutine(data: Float32Array) {\n  // SIMD processing simulation\n  for(let i=0; i<data.length; i++) {\n    data[i] = Math.sqrt(data[i]) * 1.618;\n  }\n  return data;\n}`
      };
    } else if (lowerCmd.includes("clear")) {
      responseText = "Terminal cache cleared.";
      action = "CLEAR";
    }

    self.postMessage({ responseText, action, ui });
  }, 1000 + Math.random() * 1000); // Simulate network/LLM latency
};
