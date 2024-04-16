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
};

export const ImagesVideos = ({ unit_id }: ImagesVideosProps) => {
  const [allImages, setAllImages] = useState<FullMetadata[]>();
  const [allVideos, setAllVideos] = useState<FullMetadata[]>();

  const [uploadingState, setUploadingState] = useState<string>();

  const getFiles = () => {
    listAll(ref(storage, `${unit_id}/images/`))
      .then(async (res) => {
        const { items } = res;
        const metadata = await Promise.all(items.map((item) => getMetadata(item)));
        setAllImages(metadata);
      })
      .catch(console.error);

    listAll(ref(storage, `${unit_id}/videos/`))
      .then(async (res) => {
        const { items } = res;
        const metadata = await Promise.all(items.map((item) => getMetadata(item)));
        setAllVideos(metadata);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleRepeatName = (folder: string, fileName: string) => {
    let count = 0;
    let newName = fileName;
    if (folder === "images") {
      while (allImages?.some((e) => e.name === newName)) {
        count++;
        newName = `${fileName}_${count}`;
      }
      return count === 0 ? fileName : newName;
    } else {
      while (allVideos?.some((e) => e.name === newName)) {
        count++;
        newName = `${fileName}_${count}`;
      }
      return count === 0 ? fileName : newName;
    }
  };

  const uploadFiles = (files: FileList | null) => {
    if (files !== null) {
      for (const file of files) {
        const folder = file.type.includes("video") ? "videos" : "images";
        const fileName = handleRepeatName(folder, file.name.replace(/\.[^/.]+$/, ""));
        const storageRef = ref(storage, `${unit_id}/${folder}/${fileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
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
    }
  };

  const handleDelete = (file: FullMetadata) => {
    deleteObject(ref(storage, file.fullPath))
      .then(() => {
        getFiles();
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
              uploadFiles(files);
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
