import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Top area: Blocks */}
          <div className="grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12">
            {/* 1st block */}
            <div className="md:col-span-4 lg:col-span-5">
              <div className="mb-2">
                {/* Logo */}
                <Link to="/" className="inline-block" aria-label="Cruip">
                  <img src="/logo.svg" alt="logo-icon" width={100} />
                </Link>
              </div>
              <div className="text-gray-400">
                Empowering careers. Connecting talent. Your gateway to
                opportunity. Discover, apply, and thrive with us today!
              </div>
            </div>
          </div>

          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between">
            {/* Social links */}
            {/* Copyrights note */}
            <div className="text-gray-400 text-sm mr-4">
              &copy; worksprint.com. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
