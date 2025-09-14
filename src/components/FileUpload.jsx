import { useState, useRef } from 'react'
import { Upload, File, X, CheckCircle } from 'lucide-react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/config'
import './FileUpload.css'

const FileUpload = ({ onFileUpload, uploadedFiles }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('')
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    const file = files[0]
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
      setUploadStatus('Please upload only PDF files')
      return
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus('File size must be less than 10MB')
      return
    }

    uploadFile(file)
  }

  const uploadFile = async (file) => {
    setUploading(true)
    setUploadProgress(0)
    setUploadStatus('Uploading...')

    // Create a reference to the file in Firebase Storage
    const timestamp = Date.now()
    const fileName = `pdfs/${timestamp}_${file.name}`
    const storageRef = ref(storage, fileName)

    try {
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed',
        (snapshot) => {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(Math.round(progress))
        },
        (error) => {
          console.error('Upload error:', error)
          setUploadStatus('Upload failed. Please try again.')
          setUploading(false)
        },
        async () => {
          // Upload completed successfully
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            const fileInfo = {
              name: file.name,
              size: file.size,
              url: downloadURL,
              path: fileName,
              uploadedAt: new Date().toISOString()
            }
            
            onFileUpload(fileInfo)
            setUploadStatus('Upload successful!')
            setUploading(false)
            
            // Clear status after 3 seconds
            setTimeout(() => {
              setUploadStatus('')
              setUploadProgress(0)
            }, 3000)
          } catch (error) {
            console.error('Error getting download URL:', error)
            setUploadStatus('Upload failed. Please try again.')
            setUploading(false)
          }
        }
      )
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('Upload failed. Please try again.')
      setUploading(false)
    }
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="file-upload">
      {uploadedFiles && uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <div className="files-header">
            <h3>Documents ({uploadedFiles.length})</h3>
          </div>
          <div className="files-list">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="file-item">
                <File size={16} className="file-icon" />
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        
        {uploading ? (
          <div className="upload-progress">
            <div className="progress-circle">
              <div className="progress-bar" style={{ '--progress': `${uploadProgress}%` }}>
                <span>{uploadProgress}%</span>
              </div>
            </div>
            <p>Uploading document...</p>
          </div>
        ) : (
          <div className="upload-content">
            <Upload size={32} className="upload-icon" />
            <p className="upload-text">
              <strong>Add PDF documents</strong>
            </p>
            <p className="upload-subtext">Drag & drop or click to browse • Max 10MB</p>
          </div>
        )}
      </div>
      
      {uploadStatus && (
        <div className={`upload-status ${uploadStatus.includes('successful') ? 'success' : uploadStatus.includes('failed') ? 'error' : 'info'}`}>
          {uploadStatus.includes('successful') && <CheckCircle size={16} />}
          {uploadStatus.includes('failed') && <X size={16} />}
          <span>{uploadStatus}</span>
        </div>
      )}
    </div>
  )
}

export default FileUpload
