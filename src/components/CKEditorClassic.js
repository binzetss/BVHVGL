import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CKEditorClassic({
  value,
  onChange,
  height = 300,
  lineHeight = 1.8,
}) {
  return (
    <div className="ck-editor-wrapper">
      <CKEditor
        editor={ClassicEditor}
        data={typeof value === "string" ? value : ""}
        onChange={(event, editor) => onChange(editor.getData())}
      />

      <style>{`
        /* Khung editor */
        .ck-editor__editable_inline {
          min-height: ${height}px;
        }

        /* GIÃN DÒNG NGAY KHI GÕ */
        .ck-editor__editable_inline p,
        .ck-editor__editable_inline li {
          line-height: ${lineHeight};
          margin-bottom: 0.75em;
        }

        /* Trường hợp xuống dòng bằng Shift+Enter */
        .ck-editor__editable_inline br {
          content: "";
          display: block;
          margin-bottom: 0.4em;
        }
      `}</style>
    </div>
  );
}
