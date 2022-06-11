export const getYouTubeVideoId = (videoUrl: string) => {
  // https://youtu.be/rT7DgCr-3pg
  // https://www.youtube.com/watch?v=rT7DgCr-3pg
  const urlTypeOne = "youtu.be/";
  const urlTypeTwo = "youtube.com/watch?v=";
  let videoId = "";

  if (videoUrl.includes(urlTypeOne)) {
    const splitUrl = videoUrl.split(urlTypeOne);
    videoId = splitUrl[splitUrl.length - 1];
  }

  if (videoUrl.includes(urlTypeTwo)) {
    const splitUrl = videoUrl.split(urlTypeTwo);
    videoId = splitUrl[splitUrl.length - 1];
  }

  return videoId;
};

export const getYouTubeVideoThumbUrl = (
  videoUrl: string,
  quality: "hq" | "mq"
) => {
  const videoId = getYouTubeVideoId(videoUrl);

  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};
