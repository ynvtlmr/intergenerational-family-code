import { getStorage, ref } from "firebase/storage";

export const storage = getStorage();

// create a child reference
export const videoRef = ref(storage, "videos");

// videoRef now points to 'videos'
// points to 'videos/space.mp4'
const fileName = "space.mp4";

// Note that you can use the 'spaceRef' variable to access the video file
const spaceRef = ref(videoRef, fileName);

const path = spaceRef.fullPath; // 'videos/space.mp4'
