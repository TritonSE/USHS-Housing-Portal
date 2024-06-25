import { useEffect, useState } from "react";
import styled from "styled-components";

import { FieldHeader, Margin32 } from "./CommonStyles";

import { FullMetadata, deleteFile, getFileMetadata, uploadThumbnail } from "@/api/images";

const SubmitRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
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
  margin-bottom: 10px;
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

type ImagesVideosProps = {
  unit_id: string;
  onChange: (thumbnail: File[] | null) => void;
};

export const Thumbnail = ({ unit_id, onChange }: ImagesVideosProps) => {
  const [thumbnail, setThumbnail] = useState<FullMetadata>();
  const [newThumbnail, setNewThumbnail] = useState<File[] | null>(null);

  const [uploadingState, setUploadingState] = useState<string>();

  const handleGetFiles = () => {
    getFileMetadata(unit_id, "thumbnail")
      .then((data) => {
        setThumbnail(data[0]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    handleGetFiles();
  }, []);

  useEffect(() => {
    onChange(newThumbnail);
  }, [newThumbnail]);

  const handleDelete = (file: FullMetadata) => {
    deleteFile(file)
      .then(() => {
        handleGetFiles();
      })
      .catch(console.error);
  };

  const handleUpload = (files: File[]) => {
    uploadThumbnail(files, unit_id, setUploadingState, handleGetFiles).catch(console.error);
  };

  return (
    <Margin32>
      <FieldHeader>Choose thumbnail (optional)</FieldHeader>
      <FilesWrapper>
        {unit_id && thumbnail && (
          <FileCard>
            <img src="/image_icon.svg" alt="" />
            <div>{thumbnail?.name + "." + thumbnail?.contentType?.split("/")[1]}</div>
            <XButton
              src="/x_symbol.svg"
              onClick={() => {
                handleDelete(thumbnail);
              }}
              alt=""
            />
          </FileCard>
        )}

        {!unit_id && newThumbnail && (
          <FileCard>
            <img src="/image_icon.svg" alt="" />
            <div>{newThumbnail[0].name}</div>
            <XButton
              src="/x_symbol.svg"
              onClick={() => {
                setNewThumbnail(null);
              }}
              alt=""
            />
          </FileCard>
        )}
      </FilesWrapper>
      <SubmitRow>
        <SubmitButton htmlFor="thumbnailId">
          <img src="/upload.svg" alt="upload" />
          Add Files
          <input
            value={""}
            type="file"
            id="thumbnailId"
            accept="image/*, video/*"
            onChange={(event) => {
              const files = event.target.files;
              if (files && !files[0].type.includes("video")) {
                if (unit_id) {
                  handleUpload(Array.from(files));
                } else {
                  if (files) setNewThumbnail([...files]);
                }
              }
            }}
            hidden
          />
        </SubmitButton>
        <div>{uploadingState}</div>
      </SubmitRow>
    </Margin32>
  );
};
