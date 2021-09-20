/**
 * Copyright (c) 2014-2016, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 *
 * Simple CKEditor Widget (Part 1).
 *
 * Created out of the CKEditor Widget SDK:
 * http://docs.ckeditor.com/#!/guide/widget_sdk_tutorial_1
 */

function create_tab(id, label, key, index){
  let new_tab = document.createElement('li');
  new_tab.setAttribute('data-tabId', key);
  if(index && index == 0){ new_tab.classList.add('active') }
  let new_link = document.createElement('a');
  new_link.href = 'javascript:void(0)';
  new_link.setAttribute('data-content', id);
  new_link.textContent = label;
  new_tab.appendChild(new_link);

  return new_tab;
}

function create_pane(id, label, key, index){
  let new_pane = document.createElement('div');
  new_pane.classList.add('tab-pane');
  if(index && index == 0){ new_pane.classList.add('active'); }
  new_pane.id = id;
  new_pane.setAttribute('data-paneId', key);
  //Create starter text for editing
  let starter_text = document.createElement('p');
  starter_text.textContent = label + ' content.';
  new_pane.appendChild(starter_text);

  return new_pane;
}

function create_id(label){
  return label.toLowerCase().replaceAll(' ', '-');
}

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'tabs', {
  // This plugin requires the Widgets System defined in the 'widget' plugin.
  requires: 'widget',

  // Register the icon used for the toolbar button. It must be the same
  // as the name of the widget.
  icons: 'tabs',

  // The plugin initialization logic goes inside this method.
  init: function( editor ) {
    // Register the simplebox widget.

    editor.widgets.add( 'tabs', {
      // Allow all HTML elements and classes that this widget requires.
      // Read more about the Advanced Content Filter here:
      // * http://docs.ckeditor.com/#!/guide/dev_advanced_content_filter
      // * http://docs.ckeditor.com/#!/guide/plugin_sdk_integration_with_acf
      allowedContent: 'section(!utabs); header; ul; ol; li[data-tabid]; div[class, id, data-paneid]; br; p; a[!href, data-content]; dl; dt; dd; table; thead; tbody; tfoot; tr; th; td; caption; strong; em; span; h2; h3; h4; h5; h6; img[!src,alt,style,id]{width,height,float,margin}',
      // Minimum HTML which is required by this widget to work.
      requiredContent: 'section(utabs)',

      // Define two nested editable areas.
      editables: {

        title: {
          // Define a CSS selector used for finding the element inside the widget element.
          selector: '#tab-nav',
          // Define content allowed in this nested editable. Its content will be
          // filtered accordingly and the toolbar will be adjusted when this editable
          // is focused.
          allowedContent: 'a[!href,name,id,class,data-content]; li(active)[data-tabid]'
        },
        content: {
          selector: '#tab-content',
          allowedContent: 'div(tab-pane,active)[id,data-paneid]; br; p; a[!href]; dl; dt; dd; table; thead; tbody; tfoot; tr; th; td; caption; strong; em; span; h2; h3; h4; h5; h6; img[!src,alt,style,id]{width,height,float,margin};',
        },
      },

      // Define the template of a new Simple Box widget.
      template:			// The template will be used when creating new instances of the Simple Box widget.

        '<section class="widget utabs">' +
          '<header>' +
            '<ul id="tab-nav" class="nav">' +
            '</ul>' +
          '</header>' +
          '<div id="tab-content">' +
          '</div>' +
        '</section>'
      ,

      // Define the label for a widget toolbar button which will be automatically
      // created by the Widgets System. This button will insert a new widget instance
      // created from the template defined above, or will edit selected widget
      // (see second part of this tutorial to learn about editing widgets).
      //
      // Note: In order to be able to translate your widget you should use the
      // editor.lang.simplebox.* property. A string was used directly here to simplify this tutorial.
      button: 'Tabs',

      // Check the elements that need to be converted to widgets.
      //
      // Note: The "element" argument is an instance of http://docs.ckeditor.com/#!/api/CKEDITOR.htmlParser.element
      // so it is not a real DOM element yet. This is caused by the fact that upcasting is performed
      // during data processing which is done on DOM represented by JavaScript objects.
      upcast: function( element ) {
        // Return "true" (that element needs to converted to a Simple Box widget)
        // for all <div> elements with a "simplebox" class.
        return element.name == 'section' && element.hasClass( 'utabs' );
      },
      dialog: 'tabs',

      init: function() {

        let current_tab_list = {};

          let i = 0;
          let active = null;

          while( i < this.element.$.children[0].children[0].children.length){
            let tab = this.element.$.children[0].children[0].children[i];
            let tab_id = tab.dataset.tabid;
            current_tab_list[tab_id] = tab.children[0].innerText;
            if(tab.classList.contains('active')){
              active = tab_id;
            }
            i++;
          }
          if(!active){ active = 'tab_default_1'; }

          if(current_tab_list.tab_title_1){
            this.setData('tab_title_1', current_tab_list.tab_title_1);
          }
          if(current_tab_list.tab_title_2){
            this.setData('tab_title_2', current_tab_list.tab_title_2);
          }
          if(current_tab_list.tab_title_3){
            this.setData('tab_title_3', current_tab_list.tab_title_3);
          }
          if(current_tab_list.tab_title_4){
            this.setData('tab_title_4', current_tab_list.tab_title_4);
          }
          if(current_tab_list.tab_title_5){
            this.setData('tab_title_5', current_tab_list.tab_title_5);
          }
          if( active ){
            this.setData('tab_default', active );
          }
      },

      data: function() { console.log(this.data);

        let i = 0
        let tab_list = this.element.$.children[0].children[0];
        let pane_container = this.element.$.children[1];
        // The list to store new tabs
        let tab_set = document.createDocumentFragment();
        // The list to store new content panes
        let tab_panes = document.createDocumentFragment();
        let default_active = this.data.tab_default;

        let T = this.data;
        i = 0;
        const tab_pattern = RegExp('tab_title');

        for(const [key, value] of Object.entries(T)) {

          if (tab_pattern.test(`${key}`)) {

            // Set the id value for later operations
            let id = create_id(`${value}`);
            // Verify if the tab is already in the document
            let current_tab = tab_list.querySelector('li[data-tabId=' + `${key}` + ']');console.log(current_tab);

            // A corresponding tab already exists
            if(current_tab){
              let current_pane = pane_container.querySelector('div[data-paneId=' + `${key}` + ']');console.log(current_pane);
              // If the tab_title value is empty, delete the tab and its content pane
              if(`${value}` == ""){
                current_tab.remove();
                current_pane.remove();
              }else{
                // If title value is NOT empty AND a matching tab is found, verify the title values match
                // If the title values match, move to the next tab
                if(current_tab.firstChild.innerText == `${value}`){ continue; }
                // If title value doesn't match, replace the old value
                current_tab.firstChild.innerText = `${value}`;
                // Modify the tab link's data-content value
                current_tab.firstChild.dataset.content = id;
                // Modify the corresponding pane's id
                current_pane.id = id;
              }
            }else{
                // A corresponding tab does NOT exist in the document
                // If the tab_title value is empty, move to the next tab
                if(`${value}` == ""){ continue; }
                // If the tab_title value is NOT empty, create a new tab and content pane
                let new_tab = create_tab(id, `${value}`, `${key}`, i);
                let new_pane = create_pane(id, `${value}`, `${key}`, i);
                // Add the new tab to the tab_set docFragment
                tab_set.appendChild(new_tab);
                // Add the new content pane to the tab_panes docFragment
                tab_panes.appendChild(new_pane);
              }
              i++;
            }
          }
        // Attach the list of tabs and panes to the template
        tab_list.appendChild(tab_set);
        pane_container.appendChild(tab_panes);

        // Remove the default <p> inserted by CKEditor
        if(pane_container.firstChild.tagName == 'P'){
          pane_container.firstChild.remove();
        }

        // Set the active tab
        let all_tabs = this.element.$.children[0].children[0].children;console.log(all_tabs);

        Array.from(all_tabs).forEach( function (tab){
          if(tab.dataset.tabid == default_active){
           tab.classList.add('active');
          }else{
            tab.classList.remove('active');
          }
        });

        // Set the active pane
        let all_panes = this.element.$.children[1].children;console.log(all_panes);

        Array.from(all_panes).forEach( function (pane){
          if(pane.dataset.paneid == default_active){
            pane.classList.add('active');
          }else{
            pane.classList.remove('active');
          }
        });


      }
    });

    editor.ui.addButton('tabs',{
      label:'Tabs',
      command:'tabs',
      toolbar:''
    });

    CKEDITOR.dialog.add( 'tabs', this.path + 'dialogs/tabs.js' );
  }
});

