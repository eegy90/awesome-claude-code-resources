/**
 * Emoji Filter - Premium Edition
 * Enables filtering resources by emoji type with smooth animations
 */

(function() {
  'use strict';

  let buttonList = [];
  let activeFilter = '';
  let showAllBtn = null;

  function initEmojiFilter() {
    // Find all emoji elements in the emoji legend table
    const emojis = document.querySelectorAll('table .emoji');
    
    // Get the first 6 emojis (the legend icons)
    const emojiArray = Array.from(emojis).slice(0, 6);

    if (emojiArray.length === 0) {
      console.log('No emojis found for filtering');
      return;
    }

    // Create filter buttons container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'emoji-filter-container';
    filterContainer.id = 'emoji-filter';

    // Add label
    const label = document.createElement('span');
    label.className = 'filter-label';
    label.innerHTML = '<i class="fas fa-filter"></i> Filter by type:';
    label.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-right: 8px;
    `;
    filterContainer.appendChild(label);

    // Create buttons container
    const buttonsWrapper = document.createElement('div');
    buttonsWrapper.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center;';

    // Create buttons for each emoji
    emojiArray.forEach(function(emoji) {
      const button = document.createElement('button');
      button.className = 'emoji-button';
      button.innerHTML = emoji.outerHTML;
      button.title = getEmojiTitle(emoji.alt || emoji.src);
      button.setAttribute('data-filter', emoji.src);
      
      buttonList.push({ button, src: emoji.src });
      
      button.addEventListener('click', function() {
        handleFilterClick(emoji.src);
      });
      
      buttonsWrapper.appendChild(button);
    });

    // Add "Show All" button
    showAllBtn = document.createElement('button');
    showAllBtn.className = 'emoji-button show-all-btn';
    showAllBtn.innerHTML = '<i class="fas fa-layer-group"></i> All';
    showAllBtn.title = 'Show all resources';
    showAllBtn.style.cssText = `
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-primary);
    `;
    showAllBtn.addEventListener('click', function() {
      resetFilter();
    });
    buttonsWrapper.appendChild(showAllBtn);

    filterContainer.appendChild(buttonsWrapper);

    // Add result count
    const resultCount = document.createElement('span');
    resultCount.className = 'filter-result-count';
    resultCount.id = 'filter-count';
    resultCount.style.cssText = `
      margin-left: auto;
      font-size: 0.8rem;
      color: var(--text-tertiary);
      padding: 4px 12px;
      background: var(--bg-tertiary);
      border-radius: var(--radius-full);
    `;
    filterContainer.appendChild(resultCount);

    // Insert filter container after the emoji legend table
    const contentSection = document.getElementById('contents') || document.querySelector('h2');
    if (contentSection) {
      contentSection.parentNode.insertBefore(filterContainer, contentSection);
    }

    // Update initial count
    updateResultCount();
  }

  function getEmojiTitle(src) {
    const titles = {
      'file_folder': '📁 Documentation',
      'books': '📚 Courses & Collections',
      'green_book': '📗 Articles & Tutorials',
      'video_camera': '🎥 Videos',
      'wrench': '🔧 Tools & Utilities',
      'bulb': '💡 Community'
    };
    
    for (const [key, value] of Object.entries(titles)) {
      if (src.includes(key)) return value;
    }
    return 'Filter';
  }

  function handleFilterClick(src) {
    // Toggle filter
    if (activeFilter === src) {
      resetFilter();
      return;
    }

    activeFilter = src;

    // Update button styles with animation
    buttonList.forEach(function(item) {
      if (item.src === activeFilter) {
        item.button.style.opacity = '1';
        item.button.style.transform = 'scale(1.1)';
        item.button.style.borderColor = 'var(--accent-primary)';
        item.button.style.boxShadow = '0 0 12px var(--accent-glow)';
      } else {
        item.button.style.opacity = '0.4';
        item.button.style.transform = 'scale(1)';
        item.button.style.borderColor = 'var(--border-default)';
        item.button.style.boxShadow = 'none';
      }
    });

    // Style show all button
    if (showAllBtn) {
      showAllBtn.style.opacity = '0.4';
    }

    // Filter list items with animation
    filterListItems();

    // Hide contents section when filtering
    const contentOverview = document.getElementById('contents');
    if (contentOverview) {
      contentOverview.style.opacity = '0.3';
      contentOverview.style.pointerEvents = 'none';
    }

    // Update count
    updateResultCount();
  }

  function resetFilter() {
    activeFilter = '';

    // Reset button styles
    buttonList.forEach(function(item) {
      item.button.style.opacity = '1';
      item.button.style.transform = 'scale(1)';
      item.button.style.borderColor = 'var(--border-default)';
      item.button.style.boxShadow = 'none';
    });

    if (showAllBtn) {
      showAllBtn.style.opacity = '1';
    }

    // Show all items with animation
    const allItems = document.querySelectorAll('li');
    allItems.forEach(function(li) {
      li.style.display = '';
      li.style.opacity = '1';
    });

    // Show contents section
    const contentOverview = document.getElementById('contents');
    if (contentOverview) {
      contentOverview.style.opacity = '1';
      contentOverview.style.pointerEvents = 'auto';
    }

    // Update count
    updateResultCount();
  }

  function filterListItems() {
    const allItems = document.querySelectorAll('li');
    
    allItems.forEach(function(li) {
      const img = li.querySelector('img.emoji');
      
      if (img) {
        if (img.src === activeFilter || activeFilter === '') {
          li.style.display = '';
          li.style.opacity = '1';
        } else {
          li.style.display = 'none';
          li.style.opacity = '0';
        }
      }
    });
  }

  function updateResultCount() {
    const countEl = document.getElementById('filter-count');
    if (!countEl) return;

    const allItems = document.querySelectorAll('li');
    let visibleCount = 0;
    let totalCount = 0;

    allItems.forEach(function(li) {
      const img = li.querySelector('img.emoji');
      if (img) {
        totalCount++;
        if (li.style.display !== 'none') {
          visibleCount++;
        }
      }
    });

    if (activeFilter) {
      countEl.textContent = `${visibleCount} of ${totalCount} resources`;
      countEl.style.display = 'block';
    } else {
      countEl.textContent = `${totalCount} resources`;
      countEl.style.display = 'block';
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmojiFilter);
  } else {
    initEmojiFilter();
  }
})();
