import { FullMetadata, getMetadata, listAll, ref, uploadBytesResumable } from "firebase/storage";

import { storage } from "@/firebase";

export async function getFiles(id: string) {
  const data: FullMetadata[][] = [];
  await listAll(ref(storage, `${id}/images/`))
    .then(async (res) => {
      const images = res.items;
      const imageMetadata = await Promise.all(images.map((item) => getMetadata(item)));
      data.push(imageMetadata);
    })
    .catch(console.error);
  await listAll(ref(storage, `${id}/videos/`))
    .then(async (res2) => {
      const videos = res2.items;
      const videoMetadata = await Promise.all(videos.map((item) => getMetadata(item)));
      data.push(videoMetadata);
    })
    .catch(console.error);
  return data;
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
  currImages: FullMetadata[] | undefined,
  currVideos: FullMetadata[] | undefined,
  setUploadingState?: (a: string) => void,
  onCompletion?: () => void,
) {
  if (files && id) {
    for (const file of files) {
      const folder = file.type.includes("video") ? "videos" : "images";
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
