/******************************************************************************************

LANSAT 8 y 9

Bandas 	Resolución(m) 	Longitud de onda(micróm)	Nombre 
Banda 1	    30	          0.43 - 0.45	            Aerosol costero
Banda 2	    30	          0.45 - 0.51	            Azul
Banda 3	    30	          0.53 - 0.59	            Verde
Banda 4	    30	          0.64 - 0.67	            Rojo
Banda 5	    30	          0.85 - 0.88	            Infrarrojo cercano (NIR)
Banda 6	    30	          1.57 - 1.65	            SWIR 1
Banda 7	    30	          2.11 - 2.29	            SWIR 2
Banda 8	    15	          0.50 - 0.68	            Pancromático
Banda 9	    30	          1.36 - 1.38	            Cirrus
*Banda 10	    100	          10.60 - 11.19 	      Infrarrojo térmico (TIRS)
*Banda 11	    100	          11.50 - 12.51	            Infrarrojo térmico (TIRS)
Banda 12	    30		    Banda de calidad          (BQA.TIF)

*****************************************************************************************/

// LLamamos a la imagen satélite específica añadiendo su ID de la colección de imágenes
var scID1 = 'LC82300822024272LGN00'; //CAMBIAR img!!!
var Img = ee.Image('LANDSAT/LC08/C02/T1_L2/' + scID1) //CAMBIAR sensor si hace falta (8/9)!!!
.select(['SR_B7','SR_B5','SR_B2']); //CAMBIAR bandas si hace falta!!!
//Color Natural R-G-B -> 4 3 2
//Fuego SWIR 2-NIR-BLUE -> 7 5 2
//Agua SWIR 2-SWIR 1-Rojo -> 7 6 4
//Vegetación NIR, SWIR 1, Rojo -> 5 6 4
//La pancromática debe bajarse sola, por separado.

//Exportamos la imagen (En el nombre figura el sensor y el path-Row)
Export.image.toDrive({
      image: Img,
      description: 'Img_' + scID1.substr(0, 3) + '-' + scID1.substr(3, 6),
      folder:'',
      scale: 30, //En caso de pancromática poner 15
      fileFormat: 'GeoTIFF',
      maxPixels: 1e12,
    });
