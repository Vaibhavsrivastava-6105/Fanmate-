export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-border-subtle)] text-slate-600 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-slate-900 font-bold text-xl flex items-center gap-2">
            <span className="w-6 h-6 bg-[var(--color-primary)] rounded-full inline-block"></span>
            FanMate AI
          </h2>
          <p className="text-sm mt-2 max-w-sm text-slate-500">
            Your premium smart stadium companion for FIFA World Cup 2026. Powered by AI.
          </p>
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors">GitHub</a>
          <a href="#" className="hover:text-[var(--color-primary)] transition-colors">LinkedIn</a>
        </div>
      </div>
      <div className="text-center text-xs mt-8 text-slate-400">
        &copy; {new Date().getFullYear()} FanMate AI. All rights reserved.
      </div>
    </footer>
  );
}
