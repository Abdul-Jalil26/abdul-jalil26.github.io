'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

type ChatRole = 'user' | 'assistant';
type ChatMessage = { who: 'user' | 'bot'; html: string };

type Project = {
  name: string;
  aliases?: string[];
  year: number;
  status: string;
  tagline: string;
  description: string;
  impact: string;
  stack: string[];
  links: Record<string, string>;
};

type Experience = {
  company: string;
  aliases?: string[];
  role: string;
  period: string;
  description: string;
  achievements: string[];
};

const USE_API = true;
// OpenRouter API key (safe to expose - designed for frontend use)
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY ?? '';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

const PROFILE = {
  name: 'Abdul Jalil Tamjid',
  role: 'Software Engineer & ML Researcher',
  yearsExperience: 6,
  location: { area: 'Nikunjo-2', city: 'Dhaka', country: 'Bangladesh' },
  contact: { email: 'ajtamjid@gmail.com', phone: '+880 1700 000 000' },
  skills: {
    primaryLangs: ['Python', 'TypeScript'],
    otherLangs: ['Go', 'Rust', 'C++', 'SQL', 'Bash'],
    ml: ['PyTorch', 'JAX', 'HuggingFace', 'scikit-learn', 'LangChain', 'vLLM'],
    infra: ['Docker', 'Kubernetes', 'AWS', 'GCP', 'Postgres', 'Redis'],
  },
  projects: [
    {
      name: 'AI Powered Medical Education Platform',
      aliases: ['ai powered medical education platform', 'ai-lms', 'medical education platform'],
      year: 2026,
      status: 'Production',
      tagline: 'AI-assisted medical learning platform',
      description: 'A production medical education platform with an AI-driven experience for learners and instructors.',
      impact: 'Deployed publicly at ai-lms.eatlbd.com.',
      stack: ['LLM', 'CUDA', 'Python'],
      links: { Source: 'https://ai-lms.eatlbd.com/', 'Live demo': 'https://ai-lms.eatlbd.com/' },
    },
    {
      name: 'Basic LLM Agent',
      aliases: ['basic llm agent', 'llm agent'],
      year: 2025,
      status: 'Production',
      tagline: 'Practical LLM assistant',
      description: 'A basic LLM agent built as a production project and demonstrated with an external live endpoint.',
      impact: 'Published on GitHub with a live demo link.',
      stack: ['LLM', 'CUDA', 'Python'],
      links: { GitHub: 'https://github.com/Abdul-Jalil26/Basic-LLM-Agent', 'Live demo': '#' },
    },
    {
      name: 'Inventory Management System',
      aliases: ['inventory management system', 'inventory'],
      year: 2024,
      status: 'Open Source',
      tagline: 'Inventory tracking workflow',
      description: 'A Django-based inventory management system built to track and manage stock workflows.',
      impact: 'Shared publicly as an open-source repository.',
      stack: ['Rust', 'Arrow', 'SQL'],
      links: { GitHub: 'https://github.com/Abdul-Jalil26/django_app', Docs: '#' },
    },
    {
      name: 'Vector Embeddings Project',
      aliases: ['vector embeddings project', 'vector embeddings', 'embedding project'],
      year: 2023,
      status: 'Open Source',
      tagline: 'Vector embedding tools',
      description: 'A Python and TypeScript project around vector embeddings and reusable model workflows.',
      impact: 'Released on GitHub for public use.',
      stack: ['Python', 'TypeScript', 'Docker'],
      links: { GitHub: 'https://github.com/Abdul-Jalil26/Vector_Embedding', 'Try it': '#' },
    },
    {
      name: 'Responsive Travel Website',
      aliases: ['responsive travel website', 'travel website'],
      year: 2021,
      status: 'Course Project',
      tagline: 'Responsive travel experience',
      description: 'A mobile-friendly travel website built as a course project and deployed for conservation-related work.',
      impact: 'Used across multiple conservation projects.',
      stack: ['React Native', 'SQLite'],
      links: { GitHub: 'https://github.com/Abdul-Jalil26/Responsive_Travel_Website_Desing', 'Project page': '#' },
    },
    {
      name: 'On-Campus Job Management System',
      aliases: ['on-campus job management system', 'job management system'],
      year: 2022,
      status: 'Course Project',
      tagline: 'Campus job postings and applications',
      description: 'A web-based application for managing job postings and applications for students and employers on campus.',
      impact: 'Published as a course project repository.',
      stack: ['Python', 'Django'],
      links: { GitHub: 'https://github.com/Abdul-Jalil26/On-Campus-Job-Management-System', Paper: '#' },
    },
  ] as Project[],
  experience: [
    {
      company: 'Mawlana Bhashani Science and Technology University',
      aliases: ['mbstu', 'mawlana bhashani science and technology university'],
      role: 'Research Assistant',
      period: 'May 2024 - Aug 2025',
      description: 'Worked on retrieval-augmented generation and evaluation methods for long-context models.',
      achievements: ['Shipped a grounded-QA dataset adopted by three university courses', 'First author on three peer-reviewed papers'],
    },
    {
      company: 'Ethics Advance Technology Limited',
      aliases: ['ethics advance technology limited', 'eatl'],
      role: 'AI/ML Engineer',
      period: 'Aug 2025 - Ongoing',
      description: 'Built a real-time fraud-detection backend and helped migrate a legacy stack into a smaller typed service set.',
      achievements: ['Built the real-time fraud-detection backend serving 11M+ users', 'Migrated a 14-service legacy stack to four well-typed services'],
    },
  ] as Experience[],
};

const TECH_ALIASES: Record<string, string> = {
  py: 'python',
  ts: 'typescript',
  k8s: 'kubernetes',
  pg: 'postgres',
  rs: 'rust',
  cpp: 'c++',
};

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

function detectProject(q: string): Project | null {
  for (const p of PROFILE.projects) {
    const names = [p.name, ...(p.aliases || [])].map((s) => s.toLowerCase());
    if (names.some((n) => new RegExp(`\\b${n}\\b`, 'i').test(q))) return p;
  }
  return null;
}

function detectCompany(q: string): Experience | null {
  for (const e of PROFILE.experience) {
    const names = [e.company, ...(e.aliases || [])].map((s) => s.toLowerCase());
    if (names.some((n) => q.includes(n))) return e;
  }
  return null;
}

function detectTechnology(q: string): string | null {
  const allTechs = [...PROFILE.skills.primaryLangs, ...PROFILE.skills.otherLangs, ...PROFILE.skills.ml, ...PROFILE.skills.infra];
  for (const tech of allTechs) {
    const escaped = tech.toLowerCase().replace(/([.*+?^${}()|[\]\\])/g, '\\$1');
    if (new RegExp(`\b${escaped}\b`, 'i').test(q)) return tech;
  }
  for (const [alias, real] of Object.entries(TECH_ALIASES)) {
    if (new RegExp(`\\b${alias}\\b`, 'i').test(q)) {
      const found = allTechs.find((t) => t.toLowerCase() === real);
      if (found) return found;
    }
  }
  return null;
}

function getDemoResponse(input: string): string {
  const q = input.toLowerCase().trim();

  if (/^hi|hello|hey/.test(q)) {
    return `Hey there! Ask me about <strong>${PROFILE.name}</strong>'s work, projects, research, or contact details.`;
  }

  const project = detectProject(q);
  if (project) {
    const links = Object.entries(project.links)
      .map(([k, v]) => `<a href='${v}'>${k}</a>`)
      .join(' · ');
    return `<strong>${project.name}</strong> - ${project.tagline} <em>(${project.year}, ${project.status})</em><br>${project.description}<br><strong>Impact:</strong> ${project.impact}<br><strong>Stack:</strong> ${project.stack.join(', ')}<br>Links: ${links}`;
  }

  const company = detectCompany(q);
  if (company) {
    return `At <strong>${company.company}</strong> (${company.period}) I worked as <strong>${company.role}</strong>.<br>${company.description}<ul>${company.achievements
      .map((a) => `<li>${a}</li>`)
      .join('')}</ul>`;
  }

  const tech = detectTechnology(q);
  if (tech) {
    return `Yes - I work regularly with <strong>${tech}</strong>.`;
  }

  if (q.includes('rate') || q.includes('cost') || q.includes('price')) {
    return `Project-based; rates available on request. Email <a href='mailto:${PROFILE.contact.email}'>${PROFILE.contact.email}</a>.`;
  }

  if (q.includes('where') || q.includes('based') || q.includes('location')) {
    return `Based in <strong>${PROFILE.location.area}, ${PROFILE.location.city}, ${PROFILE.location.country}</strong>.`;
  }

  if (q.includes('email') || q.includes('contact')) {
    return `Reach me at <a href='mailto:${PROFILE.contact.email}'><strong>${PROFILE.contact.email}</strong></a> or ${PROFILE.contact.phone}.`;
  }

  return `I do not have a precise answer for that yet. Ask me about <em>projects</em> (AI Powered Medical Education Platform, Basic LLM Agent, Inventory Management System), <em>experience</em>, <em>skills</em>, or <em>contact</em>.`;
}

async function callApi(history: { role: ChatRole; content: string }[]): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    const latestUserMessage = [...history].reverse().find((turn) => turn.role === 'user')?.content ?? '';
    return getDemoResponse(latestUserMessage);
  }

  const portfolioContext = `You are a concise portfolio assistant for Abdul Jalil Tamjid. Use first-person voice and only discuss verified profile facts.

Name: Abdul Jalil Tamjid
Role: Software Engineer & ML Researcher
Location: Nikunjo-2, Dhaka, Bangladesh
Email: ajtamjid@gmail.com
Phone: +880 1700 000 000

Projects:
- AI Powered Medical Education Platform (2026): AI-assisted medical learning platform. Live at ai-lms.eatlbd.com. Stack: LLM, CUDA, Python
- Basic LLM Agent (2025): Practical LLM assistant. GitHub: Abdul-Jalil26/Basic-LLM-Agent. Stack: LLM, CUDA, Python
- Inventory Management System (2024): Django-based inventory management system. GitHub: Abdul-Jalil26/django_app. Stack: Rust, Arrow, SQL
- Vector Embeddings Project (2023): Vector embedding tools. GitHub: Abdul-Jalil26/Vector_Embedding. Stack: Python, TypeScript, Docker
- Responsive Travel Website (2021): Mobile-friendly travel website. GitHub: Abdul-Jalil26/Responsive_Travel_Website_Desing. Stack: React Native, SQLite
- On-Campus Job Management System (2022): Campus job postings and applications. GitHub: Abdul-Jalil26/On-Campus-Job-Management-System. Stack: Python, Django

Experience:
- Mawlana Bhashani Science and Technology University (May 2024 - Aug 2025): Research Assistant
- Ethics Advance Technology Limited (Aug 2025 - Ongoing): AI/ML Engineer

Skills: Python, TypeScript, Rust, Go, C++, Docker, Kubernetes, AWS, GCP, Postgres, Redis, PyTorch, JAX, HuggingFace`;

  const messages = [
    {
      role: 'system',
      content: portfolioContext,
    },
    ...history.slice(-12),
  ];

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Portfolio Chat',
    },
    body: JSON.stringify({
      model: 'openai/gpt-4-turbo',
      messages,
      temperature: 0.6,
      max_tokens: 600,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${error}`);
  }

  const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('Empty response from API');
  return reply;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [welcomed, setWelcomed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const historyRef = useRef<{ role: ChatRole; content: string }[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  function openChat() {
    setIsOpen(true);
    if (!welcomed) {
      setWelcomed(true);
      setMessages((prev) => [...prev, { who: 'bot', html: `Hey there! What would you like to know about <strong>${PROFILE.name}</strong>?` }]);
    }
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { who: 'user', html: escapeHtml(trimmed) }]);
    historyRef.current.push({ role: 'user', content: trimmed });
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    let reply = getDemoResponse(trimmed);

    if (USE_API) {
      try {
        reply = await callApi(historyRef.current);
      } catch (error) {
        console.error('OpenRouter request failed, using local fallback instead.', error);
      }
    }

    setMessages((prev) => [...prev, { who: 'bot', html: reply }]);
    historyRef.current.push({ role: 'assistant', content: reply });
    setIsTyping(false);
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="chat-widget">
      <button className={`chat-toggle${isOpen ? ' active' : ''}`} aria-label="Open chat" type="button" onClick={() => (isOpen ? setIsOpen(false) : openChat())}>
        <i className="fas fa-comment-dots icon-open"></i>
        <i className="fas fa-times icon-close"></i>
        {!isOpen && (
          <span className="chat-badge">
            1
          </span>
        )}
      </button>

      <div className={`chat-window${isOpen ? ' open' : ''}`} role="dialog" aria-label="Portfolio assistant">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <img src="/jalil2.jpeg" alt="Abdul Jalil Tamjid" />
            </div>
            <div>
              <div className="chat-title">Ask Tamjid</div>
              <div className="chat-status">
                <span className="dot"></span> Portfolio assistant · Online
              </div>
            </div>
          </div>
          <button className="chat-close" aria-label="Close chat" type="button" onClick={() => setIsOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((m, idx) => (
            <div key={`${m.who}-${idx}`} className={`msg ${m.who}`} dangerouslySetInnerHTML={{ __html: m.html }}></div>
          ))}
          {isTyping && (
            <div className="typing-bubble">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={endRef}></div>
        </div>

        {showSuggestions && (
          <div className="chat-suggestions">
            {['Tell me about your experiance', 'Do you know Rust?', 'What\'s your rate?', 'Show publications', 'Where are you based?', 'Fun fact?'].map((s) => (
              <button key={s} className="suggestion" type="button" onClick={() => void sendMessage(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        <form className="chat-input-row" onSubmit={onSubmit}>
          <input type="text" placeholder="Ask anything about my work..." autoComplete="off" value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className="chat-send" aria-label="Send">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>

       
      </div>
    </div>
  );
}
