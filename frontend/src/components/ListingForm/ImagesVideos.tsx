import { FullMetadata, deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { FieldHeader, Margin32 } from "./CommonStyles";

import { getFiles, uploadFiles } from "@/api/images";
import { storage } from "@/firebase";

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

type ImagesVideosProps = {
  unit_id: string;
  onChange: (newFiles: File[] | null) => void;
  onGetFiles: (currFiles: FullMetadata[][]) => void;
};

export const ImagesVideos = ({ unit_id, onChange, onGetFiles }: ImagesVideosProps) => {
  const [allImages, setAllImages] = useState<FullMetadata[]>();
  const [allVideos, setAllVideos] = useState<FullMetadata[]>();

  const [uploadingState, setUploadingState] = useState<string>();

  const handleGetFiles = () => {
    getFiles(unit_id)
      .then((value) => {
        if (value) {
          setAllImages(value[0]);
          setAllVideos(value[1]);
          onGetFiles(value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetFiles();
  }, []);

  const handleUploadFiles = (files: FileList | null) => {
    uploadFiles(files, unit_id, allImages, allVideos, setUploadingState, handleGetFiles);
  };

  const handleDelete = (file: FullMetadata) => {
    deleteObject(ref(storage, file.fullPath))
      .then(() => {
        handleGetFiles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Margin32>
      <FieldHeader>Add photos and videos of your listing</FieldHeader>
      <FilesWrapper>
        {allImages?.map((file, index) => (
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
        {allVideos?.map((file, index) => (
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
      </FilesWrapper>
      <SubmitRow>
        <SubmitButton htmlFor="formId">
          <img src="/upload.svg" alt="upload" />
          Add Files
          <input
            value={""}
            type="file"
            id="formId"
            onChange={(event) => {
              const files = event.target.files;
              handleUploadFiles(files);
              if (files) onChange(Array.from(files));
            }}
            multiple
            hidden
          />
        </SubmitButton>
        <div>{uploadingState}</div>
      </SubmitRow>
    </Margin32>
  );
};
