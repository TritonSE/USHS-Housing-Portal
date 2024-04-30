import {
  FullMetadata,
  deleteObject,
  getDownloadURL,
  getMetadata,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "@/firebase";

export type { FullMetadata };

export async function getFileMetadata(id: string, folder: string) {
  let metadata: FullMetadata[] = [];
  await listAll(ref(storage, `${id}/${folder}/`))
    .then(async (res) => {
      const images = res.items;
      metadata = await Promise.all(
        images.map((item) =>
          getMetadata(item).then((value) => {
            return value;
          }),
        ),
      );
    })
    .catch(console.error);
  return metadata;
}

export async function getFileURLS(id: string, folder: string) {
  let urls: string[] = [];
  await listAll(ref(storage, `${id}/${folder}/`))
    .then(async (res) => {
      const images = res.items;
      urls = await Promise.all(
        images.map((item) =>
          getDownloadURL(item).then((value) => {
            return value;
          }),
        ),
      );
    })
    .catch(console.error);
  return urls;
}

export async function deleteFile(file: FullMetadata) {
  await deleteObject(ref(storage, file.fullPath));
}

export async function deleteFolder(id: string, folder: string) {
  await listAll(ref(storage, `${id}/${folder}/`))
    .then(async (res) => {
      const { items } = res;
      await Promise.all(items.map((item) => deleteObject(item)));
    })
    .catch(console.error);
}

export const handleRepeatName = (
  folder: string,
  fileName: string,
  currImages: FullMetadata[] | undefined,
  currVideos: FullMetadata[] | undefined,
) => {
  let count = 0;
  let newName = fileName;
  if (folder === "images") {
    while (currImages?.some((e) => e.name === newName)) {
      count++;
      newName = `${fileName}_${count}`;
    }
    return count === 0 ? fileName : newName;
  } else {
    while (currVideos?.some((e) => e.name === newName)) {
      count++;
      newName = `${fileName}_${count}`;
    }
    return count === 0 ? fileName : newName;
  }
};

export function uploadFiles(
  files: FileList | File[] | null | undefined,
  id: string,
  currImages?: FullMetadata[] | undefined,
  currVideos?: FullMetadata[] | undefined,
  setUploadingState?: (a: string) => void,
  onCompletion?: () => void,
  thumbnail?: boolean,
) {
  if (files && id) {
    for (const file of files) {
      const folder = thumbnail ? "thumbnail" : file.type.includes("video") ? "videos" : "images";
      const fileName = handleRepeatName(
        folder,
        file.name.replace(/\.[^/.]+$/, ""),
        currImages,
        currVideos,
      );
      const storageRef = ref(storage, `${id}/${folder}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      if (setUploadingState) {
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
            setUploadingState("Uploaded!");
            if (onCompletion) onCompletion();
          },
        );
      }
    }
  }
}

export async function uploadThumbnail(
  files: File[],
  id: string,
  setUploadingState?: (a: string) => void,
  onCompletion?: () => void,
) {
  await deleteFolder(id, "thumbnail").then(() => {
    uploadFiles(files, id, undefined, undefined, setUploadingState, onCompletion, true);
  });
}
