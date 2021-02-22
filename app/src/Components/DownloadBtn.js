import React from "react";
import JSZip from "jszip";
import saveAs from "file-saver";

const DownloadBtn = ({ graphSchema }) => {
 console.log(graphSchema);
 const download = () => {
  let zip = new JSZip();


  var schema = zip.folder("schemas");
  schema.file("graphQLSchema.js", graphSchema);
  schema.file("readMe.md", "hi there");

  zip.generateAsync({ type: "blob" }).then(function (content) {
   // see FileSaver.js
   saveAs(content, "QLens.zip");
  });
 };
 return (
  <button className="downloadBtn" onClick={download}>
   <span> Download </span>
  </button>
 );
};

export default DownloadBtn;
