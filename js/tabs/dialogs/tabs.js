// JavaScript Document

CKEDITOR.dialog.add( 'tabs', function( editor ) {
  return {
    title: 'Tabs Widget',
    minWidth: 450,
    minHeight: 100,
    onLoad: function(){

    },

    contents: [
      {
        id: 'tab_titles',
        label:'Tab Titles',
        elements: [
          {
            id: 'tab_title_1',
            type: 'text',
            label: '<strong>First Tab Title</strong>',
            width: '300px',
            setup: function( widget ) {
              this.setValue( widget.data.tab_title_1 );

            },
            commit: function( widget ) {
              widget.setData( 'tab_title_1', this.getValue() );
            }
          },
          {
            id: 'tab_title_2',
            type: 'text',
            label: '<strong>Second Tab Title</strong>',
            width: '300px',
            setup: function( widget ) {
              this.setValue( widget.data.tab_title_2 );

            },
            commit: function( widget ) {
              widget.setData( 'tab_title_2', this.getValue() );
            }
          },
          {
            id: 'tab_title_3',
            type: 'text',
            label: '<strong>Third Tab Title</strong>',
            width: '300px',
            setup: function( widget ) {
              this.setValue( widget.data.tab_title_3 );

            },
            commit: function( widget ) {
              widget.setData( 'tab_title_3', this.getValue() );
            }
          },
          {
            id: 'tab_title_4',
            type: 'text',
            label: '<strong>Fourth Tab Title</strong>',
            width: '300px',
            setup: function( widget ) {
              this.setValue( widget.data.tab_title_4 );

            },
            commit: function( widget ) {
              widget.setData( 'tab_title_4', this.getValue() );
            }
          },
          {
            id: 'tab_title_5',
            type: 'text',
            label: '<strong>Fifth Tab Title</strong>',
            width: '300px',
            setup: function( widget ) {
              this.setValue( widget.data.tab_title_5 );

            },
            commit: function( widget ) {
              widget.setData( 'tab_title_5', this.getValue() );
            }
          },
          {
            id: 'tab_default',
            type: 'radio',
            label: 'Set the default active tab',
            items: [
              ['Tab 1', 'tab_title_1'],
              ['Tab 2', 'tab_title_2'],
              ['Tab 3', 'tab_title_3'],
              ['Tab 4', 'tab_title_4'],
              ['Tab 5', 'tab_title_5'],
            ],
            'default': 'tab_title_1',
            setup: function( widget ) {
              this.setValue( widget.data.tab_default );
            },
            commit: function( widget ) {
              widget.setData( 'tab_default', this.getValue() );
            }
          },
        ]
      },
    ],

    onShow: function(){
      var widget = editor.widgets.selected[0];

      if(!widget){
        return false;
      }

    },
    onHide: function(){
      var widget = editor.widgets.selected[0];

      // If the active tab setting is for a tab that does not exist, set the first tab to active.
      if( widget && (!widget.element.$.querySelector('li.active')) ){
        widget.element.$.children[0].children[0].children[0].classList.add('active');
        widget.element.$.children[1].children[0].classList.add('active');
        widget.setData('tab_default', 'tab_title_1');
      };
    },
    onCancel: function(){

    },
    onLoad: function(){

    },
  };
});
