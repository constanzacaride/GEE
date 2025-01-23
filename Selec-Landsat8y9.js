//Elegir la zona de interés (geometry) -> Se incorporará arriba como variable

//Elegir la ventana de tiempo que quiero explorar 
var Inicio = '2024-09-20';
var Fin = '2024-09-30';

//Busca todas las imgs L8 disponibles para ese sitio entre esas fechas
var L8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
//.filter(ee.Filter.eq('WRS_PATH', 44))
//.filter(ee.Filter.eq('WRS_ROW', 34))
//.filter(ee.Filter.lt('CLOUD_COVER', 20))
.filterDate(Inicio, Fin)
.filterBounds(geometry);

//Busca todas las imgs L9 disponibles para ese sitio entre esas fechas
var L9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
//.filter(ee.Filter.eq('WRS_PATH', 44))
//.filter(ee.Filter.eq('WRS_ROW', 34))
//.filter(ee.Filter.lt('CLOUD_COVER', 20))
.filterDate(Inicio, Fin)
.filterBounds(geometry);

//Imprimo las imágenes en la consola
print(L8);
print(L9);

//Parámetros de visualización
var pvL89c2tc = {"opacity":1,"bands":["SR_B4","SR_B3","SR_B2"],"min":7230,"max":41434,"gamma":1}; 
var pvL89c2veg = {"opacity":1,"bands":["SR_B5","SR_B6","SR_B4"],"min":7230,"max":41434,"gamma":1}; //IRC, IRM, Rojo
var pvL89c2fu = {"opacity":1,"bands":["SR_B7","SR_B5","SR_B2"],"min":7230,"max":41434,"gamma":1}; //IRM, IRC, Azul

//Función que despliega las imágnes en el mapa (si quiero otra combinación de badas cambio los param de vis)
function addImageL8(image) { 
  var id = image.id;
  image = ee.Image(image.id);
  var idF = image.get('DATE_ACQUIRED');
  Map.addLayer(image, pvL89c2fu, 'L8'+' - '+idF.getInfo().slice(0,10),false);
  }

function addImageL9(image) { 
  var id = image.id;
  image = ee.Image(image.id);
  var idF = image.get('DATE_ACQUIRED');
  Map.addLayer(image, pvL89c2fu, 'L9'+' - '+idF.getInfo().slice(0,10),false);
  }

//Aplico la función
L8.evaluate(function(img) {  
  img.features.map(addImageL8);
  });
L9.evaluate(function(img) {  
  img.features.map(addImageL9);
  });

//Elijo que el mapa base sea Satélite y que se centre en la geometría
Map.setOptions('SATELLITE');
Map.centerObject(geometry, 10);

//Lo que me interesa para descargarla luego es el LANDSAT_SCENE_ID: de la img. Ej LANDSAT_SCENE_ID: LC82290822024185LGN00
