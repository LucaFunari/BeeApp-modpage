import React from "react";

const DetailsImage = ({ imageUrl }: { imageUrl: string | undefined }) => {
  const [img, setImg] = React.useState<HTMLImageElement | undefined>();

  React.useEffect(() => {
    if (imageUrl) {
      setImg(undefined);
      const tempImg = new Image();
      tempImg.src = imageUrl;

      tempImg.onload = () => setImg(tempImg);
    }
  }, [imageUrl, setImg]);

  if (img)
    return (
      <img
        // src="https://picsum.photos/1080/1920"
        src={img.src}
        loading="lazy"
        alt={"Immagine osservazione"}
        className="max-h-96 object-cover"
      ></img>
    );
  else
    return (
      <div
        className=" w-full h-full animate-pulse
      flex justify-center items-center
      "
      >
        Caricamento
      </div>
    );
};

export default DetailsImage;
