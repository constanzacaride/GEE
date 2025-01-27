/*************************************************************************************** 

SENTINEL 2

Bandas 	Resolución(m) 	Longitud de onda(micróm)	Nombre 
Banda 1	    60	          0.43 - 0.45	            Aerosol
Banda 2	    10	          0.45 - 0.52	            Azul
Banda 3	    10	          0.54 - 0.57	            Verde
Banda 4	    10	          0.65 - 0.68	            Rojo
Banda 5	    20	          0.69 - 0.71	            Red edge 1
Banda 6	    20	          0.73 - 0.74	            Red edge 2
Banda 7	    20	          0.77 - 0.79	            Red edge 3
Banda 8	    10	          0.78 - 0.90	            Infrarrojo cercano 1 (NIR1)
Banda 8A	    20	          0.85 - 0.87	            Infrarrojo cercano 2 (NIR2)
Banda 9	    60	          0.93 - 0.95	            Vapor de agua
Banda 10	    60	          1.36 - 1.39 	            Cirrus
Banda 11	    20	          1.56 - 1.65	            SWIR 1
Banda 12	    20		    2.10 - 2.28               SWIR 2

***************************************************************************************/

// LLamamos a la imagen satélite específica añadiendo su ID de la colección de imágenes
var sysID1 = '20240928T141709_20240928T142307_T20JKL'; //CAMBIAR img!!!
var Img = ee.Image('COPERNICUS/S2/' + sysID1)
.select(['B12','B8','B2']); //CAMBIAR bandas!!!
//Color Natural R,G,B -> 4,3,2 
//Fuego SWIR2,NIR1,BLUE -> 12,8,2
//Agua SWIR2,SWIR1,Rojo -> 12,11,4
//Vegetación NIR1,SWIR 1,Rojo -> 8,11,4

//Exportamos la imagen (En el nombre figura el sensor y la fecha de la img)
Export.image.toDrive({
      image: Img,
      description: 'Img_S2' + sysID1.substr(0, 8),
      folder:'',
      scale: 10,
      fileFormat: 'GeoTIFF',
      maxPixels: 1e12,
    });
