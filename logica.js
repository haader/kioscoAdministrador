//https://parzibyte.me/blog/2020/06/22/leer-codigo-barras-javascript-camara/



let codigo="code_128_reader";
const mycod=["code_128_reader",
	"code_39_reader",
	"code_39_vin_reader",
	"ean_reader",
	"ean_extended_reader",
	"ean_8_reader",
	"upc_reader",
	"upc_e_reader",
	"codabar_reader",
	"i2of5_reader",
	"code_93_reader"];

	function ser(k){
		codigo=mycod[k];
		
		console.warn(codigo);
		document.getElementById("cod").innerHTML='<li id="cod">codigo2: '+codigo+'</li>';
	
		
		Quagga.init({
			inputStream: {
				constraints: {
					width: 1000,
					height: 580,
				},
				name: "Live",
				type: "LiveStream",
				target: document.querySelector('#contenedor'), // Pasar el elemento del DOM
			},
			decoder: {
				readers: [codigo]
			}
		}, function (err) {
			if (err) {
				console.log(err);
				return
			}
			console.log("Iniciado correctamente");
			Quagga.start();
		});
	};


	mycod.forEach((element,index)=>{
		document.getElementById("listItem").innerHTML+='<li onclick= "ser('+index+')">'+element+'</li>';
	});
 
	




document.addEventListener("DOMContentLoaded", () => {





	const $resultados = document.querySelector("#resultado");
	






	Quagga.onDetected((data) => {
		$resultados.textContent = data.codeResult.code;
		// Imprimimos todo el data para que puedas depurar
		console.log(data);
        
	});

	Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
			}

			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
			}
		}
	});
});

  
/*

code_128_reader
code_39_reader
code_39_vin_reader
ean_reader
ean_extended_reader
ean_8_reader
upc_reader
upc_e_reader
codabar_reader
i2of5_reader
2of5_reader
code_93_reader
*/