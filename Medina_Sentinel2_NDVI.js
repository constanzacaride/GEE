// ANTES DE CORRER EL SCRIPT -> Elegir la zona de interés (geometry) 
// Se incorporará arriba como variable
// Para descargar los resultados al drive ir a la solapa "Tasks" y ejecutar.

//**************************ABRE Y CORTA LA IMAGEN******************************************

// LLamamos a la imagen satélite específica añadiendo su ID de la colección de imágenes
var sysID1 = '20241203T134701_20241203T135920_T21HUB'; //CAMBIAR!!!
var Img = ee.Image('COPERNICUS/S2/' + sysID1);

// Recorto la imágen
var Img_s = Img.clip(geometry); 
print(Img_s);

//**************************CALCULA EL INDICE VERDE*****************************************

// Función para calcular el NDVI y nombrar la banda generada como 'NDVI' agregándola a la img original
var CalcNDVI = function(img){
            var ndvi = img.normalizedDifference(["B8", "B4"]).rename('NDVI');
            return img.addBands(ndvi);
};

// Calculo el NDVI (aplico la función)
var S2_NDVI = CalcNDVI(Img_s);

// Defino la paleta de colores para la visualización
var NDVIpalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01', '012E01', '011D01', '011301'];

// Muestro la banda de NDVI en pantalla
Map.addLayer(S2_NDVI.select('NDVI'), {palette: NDVIpalette}, 'Sentinel NDVI');

//Exportamos la imagen (En el nombre figura el sensor y la fecha de la img)
Export.image.toDrive({
      image: S2_NDVI.select('NDVI'),
      description: 'NDVI-S2_' + sysID1.substr(0, 8),
      folder:'',
      scale: 10,
      fileFormat: 'GeoTIFF',
      maxPixels: 1e12,
    });

//**********HACE LA CLASIFICACIÓN (MÁSCARA) DE LOS VALORES DE NDVI > AL THRESHOLD**********

// Genro la máscara
var threshold = 0.4;
var classified = (S2_NDVI.select('NDVI')).gt(threshold); //Les pone el valor 1, el resto queda en 0.

var clasif_palette = ['000000', '008F39']; //0 -> negro; 1 -> verde

// Muestro la clasif de NDVI en pantalla
Map.addLayer(classified, {palette: clasif_palette}, 'Sentinel NDVI_clasif');

//Exportamos la imagen (En el nombre figura el sensor y la fecha de la img)
Export.image.toDrive({
      image: classified,
      description: 'CLASIF-S2_' + sysID1.substr(0, 8),
      folder:'',
      scale: 10,
      fileFormat: 'GeoTIFF',
      maxPixels: 1e12,
    });


//Activo el siguiente código si quiero guardar la imagen original también.
/*
// Me quedo solo con las bandas 'B'
Img_s = Img_s.select('B.+');
    
//Exportamos la imagen (En el nombre figura el sensor y la fecha de la img)
Export.image.toDrive({
      image: Img_s,
      description: 'ORIG-S2_' + sysID1.substr(0, 8),
      folder:'',
      scale: 10,
      fileFormat: 'GeoTIFF',
      maxPixels: 1e12,
    });
*/

