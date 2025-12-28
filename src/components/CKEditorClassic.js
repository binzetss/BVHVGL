import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CKEditorClassic({
  value,
  onChange,
  height = 300,
  lineHeight = 1.8,
}) {
  const handleReady = (editor) => {
    const viewDoc = editor.editing.view.document;

    // 🔥 ÉP Shift+Enter = Enter
    viewDoc.on(
      "keydown",
      (evt, data) => {
        if (data.keyCode === 13 && data.shiftKey) {
          data.preventDefault();

          editor.execute("enter");
        }
      },
      { priority: "high" }
    );
  };

  return (
    <div className="ck-editor-wrapper">
      <CKEditor
        editor={ClassicEditor}
        data={typeof value === "string" ? value : ""}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "link",
            "blockQuote",
            "|",
            "undo",
            "redo",
          ],
        }}
        onReady={handleReady}
        onChange={(event, editor) => onChange(editor.getData())}
      />

      <style>{`
        .ck-editor__editable_inline {
          min-height: ${height}px;
        }

        .ck-editor__editable_inline p,
        .ck-editor__editable_inline li {
          line-height: ${lineHeight};
          margin-bottom: 0.75em;
        }
      `}</style>
    </div>
  );
}
