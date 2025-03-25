document.addEventListener("DOMContentLoaded", () => {
    const isExamplesPage = window.location.pathname.includes('/examples/role/');
    if (!isExamplesPage) return;
  
    const loadMermaid = () => {
      if (window.mermaid) {
        console.log("[Docsible] Mermaid already loaded.");
        initMermaid();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.min.js";
      script.onload = () => {
        console.log("[Docsible] Mermaid script loaded.");
        initMermaid();
      };
      document.head.appendChild(script);
    };
  
    const initMermaid = () => {
      window.mermaid.initialize({ startOnLoad: false });
      requestAnimationFrame(() => {
        const blocks = document.querySelectorAll("pre code.language-mermaid, code.language-mermaid");
        blocks.forEach((block) => {
          const parent = block.closest("pre");
          if (parent) {
            const graphCode = block.textContent.trim();
            const container = document.createElement("div");
            container.classList.add("mermaid");
            // Use innerHTML so the diagram markup is interpreted correctly
            container.innerHTML = graphCode;
            parent.parentNode.replaceChild(container, parent);
          }
        });
        window.mermaid.run();
        console.log("[Docsible] Mermaid rendered.");
      });
    };
  
    loadMermaid();
  
    // Observe changes in the main content container
    const contentContainer = document.querySelector("#main-content"); // adjust selector as needed
    if (contentContainer) {
      const observer = new MutationObserver(() => {
        // Reinitialize Mermaid when content changes
        initMermaid();
      });
      observer.observe(contentContainer, { childList: true, subtree: true });
    }
  });
  