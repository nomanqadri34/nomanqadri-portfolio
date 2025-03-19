import React, { forwardRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = forwardRef(({ value, onChange, placeholder, readOnly = false }, ref) => {
  const modules = {
    toolbar: readOnly ? false : [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    },
    keyboard: {
      bindings: {
        tab: false
      }
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
    'color', 'background'
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={ref}
        theme="snow"
        value={value || ''}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        readOnly={readOnly}
        preserveWhitespace
        bounds=".rich-text-editor"
      />
    </div>
  );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor; 