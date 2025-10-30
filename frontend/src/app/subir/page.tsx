'use client';

import { useDocumentUpload } from '../../hooks/useDocuments';
import { UploadView } from "../../components/views/UploadView"

export default function SubirPage() {
  const uploadState = useDocumentUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadState.validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await uploadState.uploadDocument();
    } catch (error) {
      // Error is handled in the hook
    }
  };

  return (
    <UploadView
      file={uploadState.file}
      step={uploadState.step}
      response={uploadState.response}
      error={uploadState.error}
      onFileChange={handleFileChange}
      onSubmit={handleSubmit}
    />
  );
}