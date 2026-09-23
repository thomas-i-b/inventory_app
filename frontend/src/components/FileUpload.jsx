// import { useState } from "react";

// function FileUpload() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [sha256, setSha256] = useState("");
//   const [error, setError] = useState("");

//   const calculateSHA256 = async (file) => {
//     const buffer = await file.arrayBuffer();

//     const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);

//     const hashArray = Array.from(new Uint8Array(hashBuffer));

//     const hashHex = hashArray
//       .map((byte) => byte.toString(16).padStart(2, "0"))
//       .join("");

//     return hashHex;
//   };

//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];

//     setError("");
//     setSha256("");

//     if (!file) {
//       setSelectedFile(null);
//       return;
//     }

//     if (!file.name.toLowerCase().endsWith(".json")) {
//       setError("Please select a JSON file.");
//       setSelectedFile(null);
//       return;
//     }

//     try {
//       setSelectedFile(file);

//       const hash = await calculateSHA256(file);

//       setSha256(hash);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to calculate SHA-256.");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         accept=".json,application/json"
//         onChange={handleFileChange}
//       />

//       {selectedFile && (
//         <p>
//           <strong>Selected File:</strong> {selectedFile.name}
//         </p>
//       )}

//       {sha256 && (
//         <p>
//           <strong>SHA-256:</strong>
//           <br />
//           {sha256}
//         </p>
//       )}

//       {error && (
//         <p className="error">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

// export default FileUpload;


import { useState } from "react";
// import { verifyFile } from "../services/movementApi";

function FileUpload({ onUploadSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [sha256, setSha256] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const calculateSHA256 = async (file) => {
    const buffer = await file.arrayBuffer();

    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      buffer
    );

    const hashArray = Array.from(
      new Uint8Array(hashBuffer)
    );

    return hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    setError("");
    setMessage("");
    setSha256("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (!file.name.toLowerCase().endsWith(".json")) {
      setError("Please select a JSON file.");
      setSelectedFile(null);
      return;
    }

    try {
      setSelectedFile(file);

      const hash = await calculateSHA256(file);

      setSha256(hash);
    } catch (err) {
      console.error(err);
      setError("Failed to calculate SHA-256.");
    }
  };

  const handleVerify = async () => {
    if (!selectedFile || !sha256) {
      setError("Please select a JSON file first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await verifyFile(
        selectedFile,
        sha256
      );

      setMessage("File verified successfully.");

      if (onUploadSuccess) {
        onUploadSuccess(response);
      }

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "File verification failed."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <input
        type="file"
        accept=".json,application/json"
        onChange={handleFileChange}
      />

      {selectedFile && (
        <p>
          <strong>Selected File:</strong>{" "}
          {selectedFile.name}
        </p>
      )}

      {sha256 && (
        <p>
          <strong>SHA-256:</strong>
          <br />
          {sha256}
        </p>
      )}

      {selectedFile && sha256 && (
        <button
          type="button"
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify & Upload"}
        </button>
      )}

      {message && (
        <p>
          {message}
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

    </div>
  );
}

export default FileUpload;