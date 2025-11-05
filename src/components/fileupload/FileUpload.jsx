import axios from "axios";
import React, { useState } from "react";
import { generateSignedUrl } from "../../constants";
import "./fileupload.css";

export default function FileUpload({ value, onChange, id }) {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const token = sessionStorage.getItem("token");
    if (!file) return alert("Select a file first");
    const isImage = /^image\/(png|jpe?g|gif|webp|bmp|svg\+xml|tiff?)$/i.test(
      file.type
    );
    // Step 1: get signed URL from backend
    const res = await axios.post(
      generateSignedUrl,
      {
        FileName: file.name,
        folderprefix: isImage ? "Images/" : "Documents/",
        ContentType: file.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-amz-acl": "public-read",
        },
      }
    );
    const { uploadUrl, fileUrl } = res.data;
    const uploadRes = await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
        Authorization: `Bearer ${token}`,
        "x-amz-acl": "public-read",
      },
    });
    if (uploadRes.status == 200) {
      onChange(fileUrl, id);
      if (isImage) setImgUrl(fileUrl);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imgUrl && (
        <div>
          <img className="img-preview" src={imgUrl} alt="Uploaded" width="50" />
        </div>
      )}
    </div>
  );
}
