// LLamamos a la imagen satélite específica añadiendo su ID de la colección de imágenes
var sysID1 = '20240928T141709_20240928T142307_T20JKL'; //CAMBIAR!!!
var Img = ee.Image('COPERNICUS/S2/' + sysID1)
.select(['B12','B8','B2']); //Fuego Bandas SWIR-NIR-BLUE

//Exportamos la imagen (En el nombre figura el sensor y la fecha de la img)
Export.image.toDrive({
      image: Img,
      description: 'Img_S2' + sysID1.substr(0, 8),
      folder:'',
      scale: 10,
      fileFormat: 'GeoTIFF',
      maxPixels: 1e12,
    });
