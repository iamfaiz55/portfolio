const Footer = () => {
  return (
    <footer className="bg-purple-900 text-purple-100 py-8 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Left - Logo + About */}
        <div className="text-center sm:text-left flex flex-col items-center sm:items-start">
          <img
            src="https://res.cloudinary.com/dpc5d15ci/image/upload/v1748712174/logo_mgkcum.png"
            alt="Shaikh Faiz Logo"
            className="w-28 h-28 mb-2 object-contain"
          />
          <h3 className="text-xl font-semibold mb-2">Shaikh Faiz</h3>
          <p className="text-sm text-purple-300 max-w-xs">
            Passionate developer crafting dynamic websites, mobile apps, and
            software solutions.
          </p>
        </div>

        {/* Center - Navigation */}
        <nav className="flex space-x-6 text-sm font-medium">
          <a href="#services" className="hover:text-white transition">
            Services
          </a>
          <a href="#projects" className="hover:text-white transition">
            Projects
          </a>
          <a href="#contact" className="hover:text-white transition">
            Contact
          </a>
        </nav>

        {/* Right - Social Links */}
        <div className="flex space-x-6">
          {/* GitHub */}
          <a
            href="https://github.com/iamfaiz55"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.58 2 12.21c0 4.53 2.87 8.37 6.84 9.74.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.49-1.1-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.9.84.09-.65.35-1.1.63-1.35-2.22-.26-4.56-1.12-4.56-4.97 0-1.1.39-2 .1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0112 7.9c.85 0 1.71.11 2.51.33 1.9-1.33 2.74-1.05 2.74-1.05.49 1.38.18 2.5.09 2.71.63.3 1.05 1.39 1.05 2.71 0 3.86-2.35 4.7-4.58 4.96.36.31.68.91.68 1.83 0 1.32-.01 2.39-.01 2.72 0 .27.18.59.69.49A10.23 10.23 0 0022 12.21C22 6.58 17.52 2 12 2z"
              />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/shaikh-faiz-3b7119270/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-.97 0-1.75-.79-1.75-1.75S5.53 4.2 6.5 4.2 8.25 5 8.25 5.95 6.97 7.7 6.5 7.7zm13.5 11.3h-3v-5.5c0-1.32-1.12-2-2-2s-2 .68-2 2v5.5h-3v-10h3v1.4c.5-.9 2-1.9 3.5-1.9 3 0 4 2 4 4.6v5.9z" />
            </svg>
          </a>

          {/* Email */}
          <a
            href="mailto:faizuddinshaikh55@gmail.com"
            aria-label="Email"
            className="hover:text-white transition"
          >
            <svg
              className="w-6 h-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-purple-400 mt-6 select-none">
        &copy; {new Date().getFullYear()} Shaikh Faiz. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
