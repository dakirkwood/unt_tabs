function show_tab(event){
  let active_tabs = document.querySelectorAll('.active');
  active_tabs.forEach(function (tab){
    tab.classList.remove('active');
  });

  event.target.parentElement.classList.add('active');
  document.getElementById(event.target.dataset.content).classList.add('active');
}

(function ($, Drupal) {
  'use strict';
  Drupal.behaviors.untTabsShow = {
    attach: function (context, settings) {
      const tabs = document.getElementById('tab-nav');
      if(tabs){
        tabs.addEventListener('click', show_tab, false);
      }
    }
  };
}(window.jQuery, Drupal,));
