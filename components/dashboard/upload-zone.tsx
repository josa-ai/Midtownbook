'use client';

import * as React from 'react';
import { Upload, X, File as FileIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface UploadedFile {
  file: File;
  progress: number;
  error?: string;
}

interface UploadZoneProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

const UploadZone: React.FC<UploadZoneProps> = ({
  onUpload,
  accept = '*/*',
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 10,
  multiple = true,
  disabled = false,
  className,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<UploadedFile[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const dragCounterRef = React.useRef(0);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${maxSize / 1024 / 1024}MB`;
    }
    return null;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || disabled) return;

    const filesArray = Array.from(newFiles);

    // Check max files limit
    if (files.length + filesArray.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }

    // Validate and add files
    const validFiles: UploadedFile[] = [];
    filesArray.forEach((file) => {
      const error = validateFile(file);
      validFiles.push({
        file,
        progress: 0,
        error: error || undefined,
      });
    });

    setFiles((prev) => [...prev, ...validFiles]);

    // Call onUpload with valid files
    const filesToUpload = validFiles
      .filter((f) => !f.error)
      .map((f) => f.file);
    if (filesToUpload.length > 0) {
      onUpload(filesToUpload);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounterRef.current = 0;

    const droppedFiles = e.dataTransfer.files;
    handleFiles(droppedFiles);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Drop Zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 transition-colors',
          isDragging
            ? 'border-primary-600 bg-primary-50'
            : 'border-neutral-300 hover:border-primary-400',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="sr-only"
          disabled={disabled}
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
            <Upload className="h-6 w-6 text-primary-600" />
          </div>

          <h3 className="font-semibold text-body-md text-foreground mb-1">
            Drop files to upload
          </h3>
          <p className="text-body-sm text-muted-foreground mb-4">
            or click to browse from your computer
          </p>

          <Button
            variant="primary"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
          >
            Select Files
          </Button>

          <p className="mt-4 text-label-xs text-muted-foreground">
            {accept === '*/*' ? 'All files' : accept} up to {maxSize / 1024 / 1024}MB
            {multiple && `, max ${maxFiles} files`}
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((uploadedFile, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background"
            >
              <div className="shrink-0 w-10 h-10 rounded bg-neutral-100 flex items-center justify-center">
                <FileIcon className="h-5 w-5 text-neutral-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-medium text-body-sm text-foreground truncate">
                    {uploadedFile.file.name}
                  </p>
                  <button
                    onClick={() => removeFile(index)}
                    className="shrink-0 p-1 rounded hover:bg-neutral-100 transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                    <span className="sr-only">Remove</span>
                  </button>
                </div>

                <p className="text-label-xs text-muted-foreground mb-2">
                  {formatFileSize(uploadedFile.file.size)}
                </p>

                {uploadedFile.error ? (
                  <p className="text-label-sm text-error">{uploadedFile.error}</p>
                ) : uploadedFile.progress < 100 ? (
                  <Progress value={uploadedFile.progress} variant="default" size="sm" />
                ) : (
                  <p className="text-label-sm text-success">Upload complete</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

UploadZone.displayName = 'UploadZone';

export { UploadZone };
