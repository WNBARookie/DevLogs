import { Link } from 'react-router-dom';
import appPreview from '../assets/AppPreview.png';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 mt-20">
        <div className="max-w-lg space-y-6">
          <h2 className="text-4xl font-extrabold">Track Your Developer Journey</h2>
          <p className="text-gray-600 text-lg">A simple way to log projects, reflect on skills, and grow as a software engineer.</p>
          <div className="space-x-4">
            <Link to="/login" className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-700">
              Log In
            </Link>
            <Link to="/signup" className="px-6 py-3 rounded-lg border font-semibold hover:bg-gray-100">
              Sign Up
            </Link>
          </div>
        </div>
        <img src={appPreview} alt="App preview" className="w-full md:w-1/2 mt-10 md:mt-0 rounded-lg shadow-lg" />
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-4 gap-6 px-8 md:px-16">
        {[
          { title: 'Organize Projects', desc: 'Keep track of your work with structured project pages.' },
          { title: 'Track Skills', desc: 'Record skills used and lessons learned.' },
          { title: 'Visualize Growth', desc: 'Generate summaries and timelines.' },
          { title: 'Stay on Top', desc: 'Manage tasks with clarity.' },
        ].map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-bold">{f.title}</h3>
            <p className="text-gray-600 mt-2">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Tech Stack */}
      <section className="text-center">
        <h3 className="text-xl font-semibold mb-4">Built With</h3>
        <div className="flex justify-center gap-6">
          <span>⚛️ React</span>
          <span>🟢 Node.js</span>
          <span>🍃 MongoDB</span>
          <span>🎨 Tailwind</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center">
        <p>
          © {new Date().getFullYear()} DevLogs |{' '}
          <a href="https://github.com/WNBARookie/DevLogs" className="underline">
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
