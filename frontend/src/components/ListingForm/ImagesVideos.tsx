import { useEffect, useState } from "react";
import styled from "styled-components";

import { FieldHeader, Margin32 } from "./CommonStyles";

import {
  FullMetadata,
  MAX_VIDEO_SIZE,
  deleteFile,
  getFileMetadata,
  uploadFiles,
} from "@/api/images";

const SubmitRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
  margin-bottom: 10px;
`;

const SubmitButton = styled.label`
  display: flex;
  flex-direction: row;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid var(--Text, #111010);
  background: var(--Background, #fbf7f3);
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  width: 145px;
  height: 40px;
`;

const FilesWrapper = styled.div`
  width: 50vw;
  display: flex;
  flex-flow: wrap;
  row-gap: 12px;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const FileCard = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  border: 1px solid var(--Text, #111010);
  color: var(--Text, #111010);
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: 0.32px;
  margin-right: 16px;
`;

const XButton = styled.img`
  cursor: pointer;
`;

const Error = styled.div`
  color: red;
`;

type ImagesVideosProps = {
  unit_id: string;
  onChange: (newFiles: File[] | null) => void;
};

export const ImagesVideos = ({ unit_id, onChange }: ImagesVideosProps) => {
  const [allImages, setAllImages] = useState<FullMetadata[]>();
  const [allVideos, setAllVideos] = useState<FullMetadata[]>();

  const [uploadingState, setUploadingState] = useState<string>();
  const [uploadError, setUploadError] = useState<string>();

  const [newImages, setNewImages] = useState<File[]>([]);
  const [newVideos, setNewVideos] = useState<File[]>([]);

  const handleGetFiles = () => {
    getFileMetadata(unit_id, "images")
      .then((data) => {
        setAllImages(data);
      })
      .catch(console.error);
    getFileMetadata(unit_id, "videos")
      .then((data) => {
        setAllVideos(data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    handleGetFiles();
  }, []);

  const handleUploadFiles = (files: FileList | null) => {
    uploadFiles(
      files,
      unit_id,
      allImages,
      allVideos,
      setUploadingState,
      setUploadError,
      handleGetFiles,
    );
  };

  const handleNewUnitUpload = (files: FileList | null) => {
    if (files) {
      setUploadError("");
      const images = [];
      const videos = [];
      for (const file of files) {
        if (file.type.includes("video")) {
          if (newVideos.length + videos.length < 2) {
            if (file.size < MAX_VIDEO_SIZE) {
              videos.push(file);
            } else {
              setUploadError("Videos must be smaller than 200MB!");
            }
          } else {
            setUploadError("A maximum of 2 videos can be uploaded!");
          }
        } else {
          if (newImages.length + images.length < 10) {
            images.push(file);
          } else {
            setUploadError("A maximum of 10 photos can be uploaded!");
          }
        }
      }
      setNewImages(newImages.concat(images));
      setNewVideos(newVideos.concat(videos));
    }
  };

  const handleDelete = (file: FullMetadata) => {
    deleteFile(file)
      .then(() => {
        handleGetFiles();
      })
      .catch(console.error);
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (unit_id) {
      handleUploadFiles(files);
    } else {
      handleNewUnitUpload(files);
    }
  };

  useEffect(() => {
    onChange(newImages.concat(newVideos));
  }, [newImages, newVideos]);

  return (
    <Margin32>
      <FieldHeader>Add photos and videos of your listing</FieldHeader>
      <FilesWrapper>
        {unit_id &&
          allImages?.map((file, index) => (
            <FileCard key={index}>
              <img src="/image_icon.svg" alt="" />
              <div>{file.name + "." + file.contentType?.split("/")[1]}</div>
              <XButton
                src="/x_symbol.svg"
                onClick={() => {
                  handleDelete(file);
                }}
                alt=""
              />
            </FileCard>
          ))}
        {unit_id &&
          allVideos?.map((file, index) => (
            <FileCard key={index}>
              <img src="/video_icon.svg" alt="" />
              <div>{file.name + "." + file.contentType?.split("/")[1]}</div>
              <XButton
                src="/x_symbol.svg"
                onClick={() => {
                  handleDelete(file);
                }}
                alt=""
              />
            </FileCard>
          ))}

        {!unit_id &&
          newImages?.map((file, index) => (
            <FileCard key={index}>
              <img src="/image_icon.svg" alt="" />
              <div>{file.name}</div>
              <XButton
                src="/x_symbol.svg"
                onClick={() => {
                  const newImgs = newImages.filter((_image, i) => {
                    return i !== index;
                  });
                  setNewImages(newImgs);
                }}
                alt=""
              />
            </FileCard>
          ))}

        {!unit_id &&
          newVideos?.map((file, index) => (
            <FileCard key={index}>
              <img src="/video_icon.svg" alt="" />
              <div>{file.name}</div>
              <XButton
                src="/x_symbol.svg"
                onClick={() => {
                  const newVids = newVideos.filter((_video, i) => i !== index);
                  setNewVideos(newVids);
                }}
                alt=""
              />
            </FileCard>
          ))}
      </FilesWrapper>
      <SubmitRow>
        <SubmitButton htmlFor="formId">
          <img src="/upload.svg" alt="upload" />
          Add Files
          <input
            value={""}
            type="file"
            id="formId"
            accept="image/*, video/*"
            onChange={handleFormChange}
            multiple
            hidden
          />
        </SubmitButton>
        <div>{uploadingState}</div>
      </SubmitRow>
      <Error>{uploadError}</Error>
    </Margin32>
  );
};
