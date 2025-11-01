import CKEditor from "ckeditor4-react";
import React from "react";

const HtmlEditor = ({ value, onChange, id }) => {
  const config = {
    allowedContent: true,
    versionCheck: false,
    // Remove modal-based plugins
    removePlugins:
      "dialog,dialogadvtab,image,link,table,flash,forms,iframe,about",
    // Keep toolbar minimal + include Source toggle
    toolbar: [
      { name: "document", items: ["Source"] },
      {
        name: "basicstyles",
        items: ["Bold", "Italic", "Underline", "Strike", "-", "RemoveFormat"],
      },
      {
        name: "paragraph",
        items: ["NumberedList", "BulletedList", "-", "Outdent", "Indent"],
      },
      { name: "clipboard", items: ["Undo", "Redo"] },
      { name: "editing", items: ["Find", "Replace"] },
    ],
  };
  return (
    <CKEditor
      type="classic"
      data={value}
      onChange={(event) => {
        onChange(event.editor.getData(), id, true);
      }}
      config={config}
    />
  );
};

export default HtmlEditor;
