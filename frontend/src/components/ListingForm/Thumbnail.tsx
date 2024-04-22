import {
  FullMetadata,
  deleteObject,
  getMetadata,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { FieldHeader, Margin32 } from "./CommonStyles";

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
};

export const Thumbnail = ({ unit_id }: ImagesVideosProps) => {
  const [thumbnail, setThumbnail] = useState<FullMetadata>();

  const [uploadingState, setUploadingState] = useState<string>();

  const getFiles = () => {
    listAll(ref(storage, `${unit_id}/thumbnail/`))
      .then(async (res) => {
        const { items } = res;
        const metadata = await Promise.all(items.map((item) => getMetadata(item)));
        setThumbnail(metadata[0]);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleDelete = (file: FullMetadata) => {
    deleteObject(ref(storage, file.fullPath))
      .then(() => {
        getFiles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadFiles = (files: FileList | null) => {
    if (files !== null && !files[0].type.includes("video")) {
      if (thumbnail) handleDelete(thumbnail);
      const fileName = files[0].name.replace(/\.[^/.]+$/, "");
      const storageRef = ref(storage, `${unit_id}/thumbnail/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingState(`Uploading: ${progress.toFixed(0)}% done`);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getFiles();
          setUploadingState("Uploaded!");
        },
      );
    }
  };

  return (
    <Margin32>
      <FieldHeader>Choose thumbnail (optional)</FieldHeader>
      <FilesWrapper>
        {thumbnail && (
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
      </FilesWrapper>
      <SubmitRow>
        <SubmitButton htmlFor="thumbnailId">
          <img src="/upload.svg" alt="upload" />
          Add Files
          <input
            value={""}
            type="file"
            id="thumbnailId"
            onChange={(event) => {
              const files = event.target.files;
              uploadFiles(files);
            }}
            hidden
          />
        </SubmitButton>
        <div>{uploadingState}</div>
      </SubmitRow>
    </Margin32>
  );
};
