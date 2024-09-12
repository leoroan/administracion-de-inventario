const imagePath = 'src/image/VTV_logo.png';

const imageConfig = {
  width: 500,
  xOffset: 20,
};

export const addLogo = (doc) => {
  const pageWidth = doc.page.width;
  const imageX = (pageWidth - imageConfig.width) / 2;

  doc.image(imagePath, imageX, imageConfig.xOffset, {
    width: imageConfig.width,
    align: 'center',
    valign: 'top'
  });
  
};
