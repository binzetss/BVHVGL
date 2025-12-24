import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";

import Font from "@ckeditor/ckeditor5-font/src/font";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";

import List from "@ckeditor/ckeditor5-list/src/list";
import Link from "@ckeditor/ckeditor5-link/src/link";

import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";

export default class ClassicEditor extends ClassicEditorBase {}

ClassicEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Font,
  Alignment,
  List,
  Link,
  Image,
  ImageToolbar,
  ImageStyle,
  ImageUpload,
  Base64UploadAdapter,
  PasteFromOffice
];

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "fontFamily",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "alignment",
      "|",
      "numberedList",
      "bulletedList",
      "|",
      "link",
      "uploadImage",
      "|",
      "undo",
      "redo"
    ]
  },
  language: "vi"
};
