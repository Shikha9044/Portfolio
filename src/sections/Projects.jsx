import React from 'react';
import PinnedScrollFanProjects from '../components/PinnedScrollFanProjects';

export default function Projects() {
  return (
    <section className="ftco-section" id="project-section">
      <div className="container">
        {/* Main Section Header */}
        <div className="row justify-content-center mb-5 pb-2">
          <div className="col-md-8 heading-section text-center">
            <h1 className="big big-2">Projects</h1>
            <h2 className="mb-4">Featured Projects</h2>
            <p>
              Interactive project showcase animated with GSAP radial fan physics. Click any card to inspect full details, tech stack, live demos, and source code.
            </p>
          </div>
        </div>

        {/* GSAP Tutorial 076: Pinned Scroll Fan Showcase */}
        <PinnedScrollFanProjects />
      </div>
    </section>
  );
}

