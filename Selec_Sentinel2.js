//OPCIÓN A: Elegir la zona de interés (geometry) -> se incorporará arriba como variable
//OPCIÓN B: 

//Elegir la ventana de tiempo que quiero explorar 
var Inicio = '2024-09-20';
var Fin = '2024-10-01';

//Defino el producto que quiero buscar y selecciona las imágenes disponibles para ese sitio entre esas fechas
var S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED")
.filterBounds(geometry)
.filterDate(Inicio, Fin); 

//Imprime la lista de imágenes en la consola
print(S2);

//Parámetros de visualización (falso color y color real)
var pvS2tc = {"opacity":1,"bands":['B4','B3','B2'],'min': 0, 'max': 3000,gamma:1}; // True Color R, G, B
var pvS2veg = {"opacity":1,"bands":['B8','B11','B4'],'min': 0, 'max': 3000,gamma:1}; // Vegetación IRC, IRM, Rojo
var pvS2fu = {"opacity":1,"bands":['B12','B8','B2'],'min': 0, 'max': 3000,gamma:1}; // Fuego IRM, IRC, Azul
var pvS2ag = {"opacity":1,"bands":['B12','B11','B4'],'min': 0, 'max': 3000,gamma:1}; // Agua SWIR 2, SWIR 1, Rojo

//Función que despliega las imágnes en el mapa (si quiero otra combinación de badas cambio los param de vis)
function addImageS2(image) { 
  var id = image.id;
  image = ee.Image(image.id);
  var idF = image.get('system:index');
  Map.addLayer(image, pvS2fu, 'S2'+' - '+idF.getInfo().slice(0,4)+'-'+idF.getInfo().slice(4,6)+'-'+idF.getInfo().slice(6,8),false);
}

//Aplico la función
S2.evaluate(function(img) {  
   img.features.map(addImageS2);
   });

//Elijo que el mapa base sea Satélite y que se centre en la geometría
Map.setOptions('SATELLITE');
Map.centerObject(geometry, 10);

//Lo que me interesa para descargarla luego es el system:index: de la img. Ej system:index: 20240928T141709_20240928T142307_T20JKL
