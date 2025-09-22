import appPreview from '../assets/AppPreview.png';
import { Link } from 'react-router-dom';
import { SiMongodb, SiExpress, SiTailwindcss } from 'react-icons/si';
import { FaDocker, FaNodeJs, FaReact } from 'react-icons/fa';

export default function LandingPage() {
  const highlightsCardContent = [
    { title: 'Organize Projects', description: 'Keep track of your work with structured project pages.' },
    { title: 'Track Items', description: 'Record items completed, as well as reflections.' },
    { title: 'Summarize Growth', description: 'Generate summaries to get a quick overview on things.' },
    { title: 'Authentication', description: 'Create an account and have a customized experience as a user.' },
  ];
  return (
    <div className="font-sans text-gray-900">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-20 text-center flex flex-col items-center gap-10">
        <h1 className="text-5xl font-extrabold">DevLogs</h1>
        <p className="text-xl px-10">A simple way to log projects, reflect on skills, and grow as a software engineer.</p>
        <div className="space-x-4">
          <Link to="/login" className="text-white bg-blue-500 px-6 py-3 rounded-xl shadow hover:bg-blue-700 font-medium" data-testid="live-demo-button">
            Live Demo
          </Link>
          <a href="https://github.com/WNBARookie/DevLogs" target="_blank" className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-gray-900 font-medium">
            View Code
          </a>
        </div>
      </section>
      {/* Problem & Solution */}
      <section className="py-16 px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">The Problem</h2>
          <p className="text-gray-600 mb-6">
            Developers track their progress in scattered places, such as notes, random sheets of paper, or memory. This makes it hard to showcase or reflect on growth.
          </p>
          <h2 className="text-3xl font-bold mb-4">The Solution</h2>
          <p className="text-gray-600">Provide a centralized place for progress tracking with projects, tasks, and summaries all in one place.</p>
        </div>
        <img src={appPreview} alt="App preview" className="rounded-2xl shadow-lg" />
      </section>
      {/* Features */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <section className="grid md:grid-cols-4 gap-6 px-16">
          {highlightsCardContent.map((highlight, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold">{highlight.title}</h3>
              <p className="text-gray-600 mt-2">{highlight.description}</p>
            </div>
          ))}
        </section>
      </section>
      <div className="grid md:grid-cols-2 gap-10 place-items-center">
        {/* Skills used */}
        <section className="py-16 px-8">
          <h2 className="text-3xl font-bold mb-8">Skills Used</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Designing a secure full-stack app with JWT-based authentication
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Writing tests across multiple levels (unit, integration, end-to-end)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Integrating external APIs (Gemini AI) to extend functionality
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Structuring a project with Docker for deployment
            </li>
          </ul>
        </section>

        {/* What I demonstrated  */}
        <section className="py-16 px-8">
          <h2 className="text-3xl font-bold mb-8">What I Demonstrated</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Building a complete and responsive full-stack application from scratch
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Implementing authentication, CRUD functionality, and testing
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Deploying a production-ready app using modern tools
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-600">✔</span> Balancing technical detail with a clean user experience
            </li>
          </ul>
        </section>
      </div>
      {/* Tech Stack */}
      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
            <FaReact className="text-6xl" />
            <p>React</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
            <FaNodeJs className="text-6xl" />
            <p>Node.js</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
            <SiMongodb className="text-6xl" />
            <p>MongoDB</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
            <SiExpress className="text-6xl" />
            <p>Express</p>
          </div>
          <div className="hidden md:block"></div>
          <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
            <SiTailwindcss className="text-6xl" />
            <p>TailwindCSS</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center gap-4">
            <FaDocker className="text-6xl" />
            <p>Docker</p>
          </div>
          <div className="hidden md:block"></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center bg-gray-900 text-white">
        <p className="mb-4">Built by Trinity Robinson</p>
        <div className="space-x-4">
          <a href="https://github.com/WNBARookie/DevLogs" target="_blank" className="underline hover:text-blue-500">
            GitHub Repo
          </a>
          <a href="https://www.linkedin.com/in/trinity--robinson/" target="_blank" className="underline hover:text-blue-500">
            LinkedIn
          </a>
          <Link to="/login" className="underline hover:text-blue-500">
            Live Demo
          </Link>
        </div>
      </footer>
    </div>
  );
}
