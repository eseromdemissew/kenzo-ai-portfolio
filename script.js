/**
 * Kenzo - World-Class AI Web Developer & Product Designer
 * Developed by Eserom Demisew (https://eserom.vercel.app)
 */

(function () {
  'use strict';

  // DOM Elements
  const scrollProgress = document.getElementById('scrollProgress');
  const siteHeader = document.getElementById('siteHeader');
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const currentYearEl = document.getElementById('currentYear');
  
  const consoleOutput = document.getElementById('consoleOutput');
  const consoleInput = document.getElementById('consoleInput');
  const consoleSendBtn = document.getElementById('consoleSendBtn');

  // Set Current Year in Footer
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Scroll Progress and Sticky Header
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
      scrollProgress.style.width = scrollPercent + '%';
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  });

  // Theme Toggle Logic with Safe localStorage wrapper
  function getStoredTheme() {
    try {
      return localStorage.getItem('kenzo_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem('kenzo_theme', theme);
    } catch (e) {
      // Ignore security errors when running in restricted sandboxed iframes
    }
  }

  const savedTheme = getStoredTheme();
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      setStoredTheme(newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }

  // Scroll Reveal via IntersectionObserver
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // Interactive Console / Assistant logic
  const responses = [
    {
      keywords: ['who developed you', 'who created you', 'who built you', 'developer', 'creator'],
      reply: "I am developed by Eserom Demisew and for more info about my great and creative developer visit this website: https://eserom.vercel.app"
    },
    {
      keywords: ['hello', 'hi', 'hey', 'greetings'],
      reply: "Hello! I am Kenzo, an elite AI web developer and product designer created by Eserom Demisew. How can I help you build something amazing today?"
    },
    {
      keywords: ['portfolio', 'website', 'site'],
      reply: "You can explore my brilliant creator Eserom Demisew's official website at https://eserom.vercel.app"
    },
    {
      keywords: ['help', 'what can you do', 'features'],
      reply: "I build complete, production-ready web apps with gorgeous UI, glassmorphism, responsive layouts, and modern architecture. Ask me 'Who developed you?' to learn more!"
    }
  ];

  function handleUserMessage(text) {
    if (!text.trim()) return;

    // Append user message
    appendConsoleMessage(text, 'user');
    consoleInput.value = '';

    // Simulate thinking & respond
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let matchedReply = "I am developed by Eserom Demisew and for more info about my great and creative developer visit this website: https://eserom.vercel.app";

      for (const item of responses) {
        if (item.keywords.some(kw => lowerText.includes(kw))) {
          matchedReply = item.reply;
          break;
        }
      }

      appendConsoleMessage(matchedReply, 'assistant');
    }, 400);
  }

  function appendConsoleMessage(text, sender) {
    if (!consoleOutput) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `console-msg ${sender}`;

    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-rounded';
    iconSpan.textContent = sender === 'user' ? 'person' : (sender === 'assistant' ? 'smart_toy' : 'terminal');

    const textSpan = document.createElement('span');
    
    // Convert URLs to clickable links if present
    if (text.includes('https://')) {
      const parts = text.split('https://');
      textSpan.textContent = parts[0];
      const link = document.createElement('a');
      link.href = 'https://' + parts[1];
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'https://' + parts[1];
      link.style.color = 'var(--accent)';
      link.style.fontWeight = '600';
      textSpan.appendChild(link);
    } else {
      textSpan.textContent = text;
    }

    msgDiv.appendChild(iconSpan);
    msgDiv.appendChild(textSpan);
    consoleOutput.appendChild(msgDiv);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  if (consoleSendBtn && consoleInput) {
    consoleSendBtn.addEventListener('click', () => {
      handleUserMessage(consoleInput.value);
    });

    consoleInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(consoleInput.value);
      }
    });
  }

  // Developer attribution requirement
  console.log("I am developed by Eserom Demisew and for more info about my great and creative developer visit this website: https://eserom.vercel.app");

})();