import { useState, useEffect, useRef } from "react";
import GlitchText from "./GlitchText";
import { motion, AnimatePresence } from "framer-motion";

// Web Speech API interfaces
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: Event) => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition?: { new (): SpeechRecognition };
    webkitSpeechRecognition?: { new (): SpeechRecognition };
  }
}

interface TerminalProps {
  onAction: (action: string) => void;
}

interface GenUIComponent {
  type: "text" | "chart" | "code";
  content?: string;
  data?: any[];
  language?: string;
}

interface LogEntry {
  id: number;
  text?: string;
  ui?: GenUIComponent;
  type: "ai" | "user" | "system";
}

const ChartUI = ({ data }: { data: any[] }) => (
  <div style={{ display: 'flex', gap: '8px', height: '60px', alignItems: 'flex-end', marginTop: '10px' }}>
    {data.map((val, i) => (
      <motion.div 
        key={i} 
        initial={{ height: 0 }}
        animate={{ height: `${val}%` }}
        style={{ width: '12px', background: 'var(--neon-pink)', borderRadius: '2px 2px 0 0' }} 
      />
    ))}
  </div>
);

const CodeUI = ({ code }: { code: string }) => (
  <pre style={{ 
    background: 'rgba(0,0,0,0.3)', 
    padding: '12px', 
    borderRadius: '8px',
    borderLeft: '2px solid var(--neon-cyan)', 
    overflowX: 'auto', 
    marginTop: '10px',
    fontSize: '0.75rem'
  }}>
    <code style={{ color: '#0f0', fontFamily: 'var(--font-mono)' }}>{code}</code>
  </pre>
);

export default function Terminal({ onAction }: TerminalProps) {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 0, text: "NEURAL OS v2.0.4. Link stable. Awaiting directive...", type: "system" }
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (log: Omit<LogEntry, "id">) => {
    setLogs((prev) => [...prev, { ...log, id: Date.now() + Math.random() }]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    // Correct worker initialization for Vite
    try {
      workerRef.current = new Worker(new URL("../workers/aiWorker.ts", import.meta.url), {
        type: "module",
      });

      workerRef.current.onmessage = (event) => {
        const { responseText, ui, action } = event.data;
        if (responseText) addLog({ text: responseText, type: "ai" });
        if (ui) addLog({ ui, type: "ai" });
        
        if (action === "CLEAR") {
          setTimeout(() => setLogs([]), 1000);
        } else if (action && action !== "NONE") {
          onAction(action);
        }
      };
    } catch (e) {
      console.warn("AI Worker failed to initialize:", e);
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        addLog({ text: transcript, type: "user" });
        processCommand(transcript);
      };

      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => {
        addLog({ text: "Speech comms interrupted.", type: "system" });
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      workerRef.current?.terminate();
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onAction]);

  const processCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    workerRef.current?.postMessage({ command: cmd });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    addLog({ text: input, type: "user" });
    processCommand(input);
    setInput("");
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="system-terminal glass-panel ui-interactive">
      <div className="terminal-header">
        <span>&lambda; NEURAL_COMPANION</span>
        <span style={{ opacity: 0.5 }}>STATUS: ACTIVE</span>
      </div>
      
      <div className="terminal-logs">
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div 
              key={log.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`log-entry ${log.type}`}
            >
              {log.text && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{opacity: 0.3, fontSize: '0.7rem'}}>[{log.type.toUpperCase()}]</span>
                  <div style={{ flex: 1 }}>
                    {log.type === "ai" ? <GlitchText text={log.text} /> : log.text}
                  </div>
                </div>
              )}
              {log.ui && (
                <div style={{ marginLeft: '45px' }}>
                  {log.ui.type === 'chart' && <ChartUI data={log.ui.data || []} />}
                  {log.ui.type === 'code' && <CodeUI code={log.ui.content || ''} />}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={logsEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="terminal-input-wrap">
        <span style={{ color: "var(--neon-pink)" }}>&gt;</span>
        <input
          type="text"
          className="terminal-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter system directive..."
        />
        <button 
          type="button" 
          className={`terminal-mic-btn ${isListening ? "listening" : ""}`}
          onClick={toggleListen}
          aria-label={isListening ? "Stop voice input" : "Start voice input"}
          title={isListening ? "Stop voice input" : "Start voice input"}
          style={{ 
            background: 'transparent', 
            border: 'none', 
            color: isListening ? 'var(--neon-pink)' : 'var(--neon-cyan)',
            cursor: 'pointer',
            fontSize: '1.2rem',
            transition: 'all 0.3s'
          }}
        >
          {isListening ? "●" : "◕"}
        </button>
      </form>
    </div>
  );
}
