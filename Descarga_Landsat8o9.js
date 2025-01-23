// LLamamos a la imagen satélite específica añadiendo su ID de la colección de imágenes
var scID1 = 'LC82300822024272LGN00'; //CAMBIAR!!!
var Img = ee.Image('LANDSAT/LC08/C02/T1_L2/' + scID1) //CAMBIAR SI ES LANDSAT 8 o 9!!!
.select(['SR_B7','SR_B5','SR_B2']); //Fuego Bandas SWIR-NIR-BLUE

//Exportamos la imagen (En el nombre figura el sensor y el path-Row)
Export.image.toDrive({
      image: Img,
      description: 'Img_' + scID1.substr(0, 3) + '-' + scID1.substr(3, 6),
      folder:'',
      scale: 30,
      fileFormat: 'GeoTIFF',
      maxPixels: 1e12,
    });
