---
layout: default
title: Home
---

<section class="hero">
  <div class="hero-content">
    <!-- Hero Claude Code Icon -->
    <div class="hero-icon">
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hero-icon-grad" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stop-color="#d97757"/>
            <stop offset="100%" stop-color="#c4623e"/>
          </linearGradient>
          <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="120" height="120" rx="28" fill="url(#hero-icon-grad)" filter="url(#hero-glow)"/>
        <!-- Claude sunburst symbol -->
        <g transform="translate(60, 60)">
          <line x1="0" y1="-32" x2="0" y2="32" stroke="#faf9f5" stroke-width="8" stroke-linecap="round"/>
          <line x1="-32" y1="0" x2="32" y2="0" stroke="#faf9f5" stroke-width="8" stroke-linecap="round"/>
          <line x1="-22.6" y1="-22.6" x2="22.6" y2="22.6" stroke="#faf9f5" stroke-width="8" stroke-linecap="round"/>
          <line x1="22.6" y1="-22.6" x2="-22.6" y2="22.6" stroke="#faf9f5" stroke-width="8" stroke-linecap="round"/>
          <circle cx="0" cy="0" r="9" fill="#faf9f5"/>
        </g>
      </svg>
    </div>
    
    <div class="hero-badges">
      <a href="https://awesome.re" target="_blank" rel="noopener">
        <img src="https://awesome.re/badge.svg" alt="Awesome">
      </a>
      <a href="http://makeapullrequest.com" target="_blank" rel="noopener">
        <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
      </a>
      <a href="http://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener">
        <img src="https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg" alt="License: CC0-1.0">
      </a>
      <a href="https://github.com/shahshrey/awesome-claude-code-resources/stargazers" target="_blank" rel="noopener">
        <img src="https://img.shields.io/github/stars/shahshrey/awesome-claude-code-resources?style=social" alt="GitHub stars">
      </a>
    </div>
    
    <h1 class="hero-title">
      Awesome <span class="gradient-text">Claude Code</span> Resources
    </h1>
    
    <p class="hero-subtitle">
      A curated collection of the best resources, tools, tutorials, and community content for mastering Claude Code — the agentic coding tool from Anthropic.
    </p>
    
    <div class="hero-actions">
      <a href="#contents" class="btn btn-primary">
        <i class="fas fa-compass"></i>
        Explore Resources
      </a>
      <a href="https://github.com/shahshrey/awesome-claude-code-resources" class="btn btn-secondary" target="_blank" rel="noopener">
        <i class="fab fa-github"></i>
        View on GitHub
      </a>
      <a href="{{ '/CONTRIBUTING' | relative_url }}" class="btn btn-ghost">
        <i class="fas fa-heart"></i>
        Contribute
      </a>
    </div>
  </div>
  
  <div class="hero-visual">
    <div class="hero-glow"></div>
  </div>
</section>

{% capture readme_content %}
{% include_relative README.MD %}
{% endcapture %}

<div class="readme-content">
{{ readme_content | markdownify }}
</div>
