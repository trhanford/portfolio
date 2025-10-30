(function(){
  "use strict";

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init(){
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const source = (typeof window !== 'undefined' && window.ProjectData) || {};
    const project = projectId && typeof source === 'object' ? source[projectId] : null;

    const titleEl = document.getElementById('reportTitle');
    const summaryEl = document.getElementById('reportSummary');
    const categoryEl = document.getElementById('reportCategory');
    const crumbEl = document.getElementById('reportCrumb');
    const breadcrumbLinkEl = document.getElementById('reportBreadcrumbLink');
    const backLinkEl = document.getElementById('reportBackLink');
    const navTitleEl = document.getElementById('navTitle');
    const frameEl = document.getElementById('reportFrame');
    const statusEl = document.getElementById('reportStatus');
    const downloadEl = document.getElementById('reportDownload');
    const viewerEl = frameEl ? frameEl.parentElement : null;

    if (!project){
      handleUnavailable({
        titleEl,
        summaryEl,
        categoryEl,
        crumbEl,
        breadcrumbLinkEl,
        backLinkEl,
        navTitleEl,
        viewerEl,
        frameEl,
        downloadEl,
        statusEl
      });
      return;
    }

    document.title = `Project Report — ${project.title}`;
    if (navTitleEl) navTitleEl.textContent = 'Project Report';
    updateText(titleEl, project.title);
    updateText(summaryEl, project.summary || '');
    if (categoryEl) categoryEl.textContent = project.category || '';
    if (crumbEl) crumbEl.textContent = project.title;

    const anchorTargets = {
      'Automotive': '#automotive',
      'CAD': '#cad',
      'Computer & Electrical': '#computer-electrical'
    };
    const anchor = anchorTargets[project.category] || '#';
    const destination = anchor === '#' ? 'portfolio.html' : `portfolio.html${anchor}`;
    if (backLinkEl) backLinkEl.href = destination;
    if (breadcrumbLinkEl) breadcrumbLinkEl.href = destination;

    const reportSpec = project.report;
    if (!reportSpec || !reportSpec.href){
      showStatus(statusEl, 'This project does not have a report available yet.');
      if (viewerEl) viewerEl.dataset.empty = 'true';
      if (downloadEl) downloadEl.style.display = 'none';
      return;
    }

    const encodedHref = encodeURI(reportSpec.href);
    if (frameEl){
      frameEl.src = `${encodedHref}#view=FitH`;
      frameEl.setAttribute('title', `${project.title} report`);
    }
    if (viewerEl) viewerEl.dataset.empty = 'false';
    if (downloadEl){
      downloadEl.href = encodedHref;
      const fileName = extractFileName(reportSpec.href);
      if (fileName) downloadEl.setAttribute('download', fileName);
      downloadEl.textContent = 'Download report';
      downloadEl.style.display = '';
    }

    showStatus(statusEl, 'Report viewer ready. Zoom or page through the PDF as needed.');
  }

  function handleUnavailable(elements){
    showStatus(elements.statusEl, 'No report found for that project identifier.');
    updateText(elements.titleEl, 'Report unavailable');
    updateText(elements.summaryEl, 'We could not find a matching project report. Return to the portfolio to explore other projects.');
    if (elements.categoryEl) elements.categoryEl.textContent = '';
    if (elements.crumbEl) elements.crumbEl.textContent = 'Unavailable';
    if (elements.navTitleEl) elements.navTitleEl.textContent = 'Project Report';
    if (elements.breadcrumbLinkEl) elements.breadcrumbLinkEl.href = 'portfolio.html';
    if (elements.backLinkEl) elements.backLinkEl.href = 'portfolio.html';
    if (elements.viewerEl) elements.viewerEl.dataset.empty = 'true';
    if (elements.frameEl) elements.frameEl.removeAttribute('src');
    if (elements.downloadEl) elements.downloadEl.style.display = 'none';
    document.title = 'Project Report — Tristan Hanford';
  }

  function showStatus(element, message){
    if (!element) return;
    element.textContent = message || '';
  }

  function updateText(element, value){
    if (!element) return;
    element.textContent = value || '';
  }

  function extractFileName(path){
    if (!path) return '';
    try {
      const url = new URL(path, window.location.origin);
      return url.pathname.split('/').pop() || '';
    } catch (error){
      const parts = path.split('/');
      return parts[parts.length - 1] || '';
    }
  }
})();
