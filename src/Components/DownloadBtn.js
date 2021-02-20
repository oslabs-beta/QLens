import React from "react";
import JSZip from 'jszip'
import saveAs from 'file-saver'

const DownloadBtn = ({graphqlSchema}) => {
  console.log(graphqlSchema)
  const download = () => {
    let zip = new JSZip();

    // zip.file("graphQLSchema.txt", graphqlSchema);

    zip.generateAsync({type:"blob"}).then(function(content) {
      // see FileSaver.js
      saveAs(content, "QLens.zip");
  });
  }
 return (
  <div>
   <button onClick={download}> DOWNLOAD </button>
  </div>
 );
};

export default DownloadBtn;
