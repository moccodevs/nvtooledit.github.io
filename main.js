let n = 0;
const coreOffset=`--coreoffset `;
const coreClockLock=`--cclk-lock `;
const mmclk=`--mmclk `;
const mmoff=`--mmoff `;
let cantidadGPU=6;
let MultiGPU=true;
let gpusdisponibles;
const red=`#eb0606`;
const green= `#00722f`;
const stableColor=`gray`;
let finalOC=``;
const MAXOC=100000;
function limpiar(identificacion){
  let gpu = document.getElementById(identificacion);
  console.log(`eliminando...`);
  // Accedemos al elemento <tr> que contiene a todos los elementos de la fila
  gpu.nombre.value = ``;
  gpu.inputSetting.coff.value = ``;
  gpu.inputSetting.coclk.value = ``;
  gpu.inputSetting.mmclk.value = ``;
  gpu.inputSetting.mmoff.value = ``;
  gpu.checkbox.disabled=true;
};

function eliminarElemento(identificacion){
    let elemento=document.getElementById(identificacion);
    console.log(`eliminad`);
    elemento.value=``;
};

function esNum(num){
  if ((/^\d+$/.test(num)) && !(typeof(num)==='undefined')){
    return true;
  }
  else{

    return false;
  }
}

function determinarOC(gpu){
  let placa=document.getElementById(gpu);
  let nvtoolString=``;
  if (esNum(placa.inputSetting.coff.value)){
    nvtoolString=nvtoolString+` `+coreOffset+placa.inputSetting.coff.value;
  };
  if (esNum(placa.inputSetting.coclk.value)){
    nvtoolString=nvtoolString+' '+coreClockLock+placa.inputSetting.coclk.value;
  };
  if (esNum(placa.inputSetting.mmclk.value)){
    nvtoolString=nvtoolString+' '+mmclk+placa.inputSetting.mmclk.value;
  }
  if (esNum(placa.inputSetting.mmoff.value)){
    nvtoolString=nvtoolString+' '+mmoff+placa.inputSetting.mmoff.value;
  };
  if (placa.nvtool!=nvtoolString){
  placa.nvtool=nvtoolString+` `;
  };
};


function createElements(cantidad) {
  if (n==1){
    
  };
  if (cantidad>0){
    let miDiv = document.getElementById('gpu');
    let info=document.createElement('p');
    
  while (n < cantidad) {
        let space = document.createElement('span');
        space.textContent=' ';
        let nuevaGPU = document.createElement('div');
        nuevaGPU.nombre = document.createElement('input');
        nuevaGPU.gpuN = document.createElement(`p`);
        nuevaGPU.gpuN.textContent=(`GPU${n}`);
        nuevaGPU.gpuN.numero = n;
        nuevaGPU.nuevoBoton = document.createElement('button');
        nuevaGPU.botonLimpiar = document.createElement('button');
        nuevaGPU.status=document.createElement(`input`);
        nuevaGPU.checkbox = document.createElement('input');
        nuevaGPU.checkbox.type=`checkbox`;
        nuevaGPU.checkbox.id=`check${n}`;
        nuevaGPU.checkbox.className=`check`;
        nuevaGPU.inputSetting={
            coff : document.createElement('input'),
            coclk : document.createElement('input'),
            mmclk : document.createElement('input'),
            mmoff : document.createElement(`input`)
        };
        nuevaGPU.inputSetting.coff.type=`number`;
        nuevaGPU.inputSetting.coclk.type=`number`;
        nuevaGPU.inputSetting.mmclk.type=`number`;
        nuevaGPU.inputSetting.mmoff.type=`number`;
        nuevaGPU.nuevoParrafo = document.createElement('p');
        nuevaGPU.nuevoBoton.textContent = `Boton GPU${n}`;
        nuevaGPU.botonLimpiar.textContent = 'Reset';
        nuevaGPU.botonLimpiar.id=`clean`;
        nuevaGPU.nombre.placeholder = 'GPU (opcional)';
        nuevaGPU.nombre.className=`inputs`;
        nuevaGPU.inputSetting.coff.placeholder = 'core-clock OFFSET';
        nuevaGPU.inputSetting.coclk.placeholder = 'core-clock LOCK';
        nuevaGPU.inputSetting.mmclk.placeholder = 'memory-clock-LOCK';
        nuevaGPU.inputSetting.mmoff.placeholder = 'memory-clock-OFFSET';
        nuevaGPU.inputSetting.coff.id= `s1${n}`;
        nuevaGPU.inputSetting.coclk.id=`s2${n}`;
        nuevaGPU.inputSetting.mmclk.id=`s3${n}`;
        nuevaGPU.inputSetting.mmoff.id=`s4${n}`;
        nuevaGPU.inputSetting.coff.className= `inputs`;
        nuevaGPU.inputSetting.coclk.className=`inputs`;
        nuevaGPU.inputSetting.mmclk.className=`inputs`;
        nuevaGPU.inputSetting.mmoff.className=`inputs`;
        nuevaGPU.id=`GPU${n}`;
        nuevaGPU.gpuN.className = 'nombres';
        nuevaGPU.cargada=false;
        miDiv.appendChild(nuevaGPU);
        miDiv.appendChild(nuevaGPU.gpuN);
        miDiv.appendChild(nuevaGPU.nombre);
        miDiv.appendChild(nuevaGPU.inputSetting.coff);
        miDiv.appendChild(nuevaGPU.inputSetting.coclk);
        miDiv.appendChild(nuevaGPU.inputSetting.mmclk);
        miDiv.appendChild(nuevaGPU.inputSetting.mmoff);
        miDiv.appendChild(nuevaGPU.botonLimpiar);
        miDiv.appendChild(nuevaGPU.checkbox);
        miDiv.appendChild(nuevaGPU.status);
        nuevaGPU.botonLimpiar.className=`botonLimpiar`;
        nuevaGPU.status.id=`status${n}`;
        nuevaGPU.status.className="status";
        document.getElementById(`status${n}`).setAttribute("readonly", "true");
        nuevaGPU.status.value=`NO OC`;         
        nuevaGPU.nvtool=``;
        nuevaGPU.status.style.backgroundColor = red;
        nuevaGPU.cargada=false;
        nuevaGPU.checkbox.disabled=true;
        colorear(nuevaGPU.id,stableColor);
        nuevaGPU.checkbox.addEventListener(`change`,function(){
          if ((nuevaGPU.checkbox.checked)){
              nuevaGPU.status.style.backgroundColor = green;
              nuevaGPU.status.value=`OK!`;
              console.log(`nvtool ENABLED`);
              nuevaGPU.cargada=true;
              console.log(`gpu cargada`);
          }
          else{
            nuevaGPU.status.value=`NO OC`;
            nuevaGPU.status.style.backgroundColor = red;
            console.log(`nvtool disabled/unchecked`);
            nuevaGPU.nvtool=``;
          };
        createFinalOC(gpusdisponibles);
        console.log(`nvtool disabled: ${nuevaGPU.id} nvtool: `+nuevaGPU.nvtool);
        });
        const elementos = document.querySelectorAll('.inputs');
        elementos.forEach(function(element) {
              element.addEventListener('input', function() {
              colorear(nuevaGPU.id,stableColor);
              console.log(`se ingreso valor`);
                if (hayValores(nuevaGPU.id)){
                  nuevaGPU.checkbox.disabled=false;
                  }
                  else{
                    nuevaGPU.status.value=`NO OC`;
                    nuevaGPU.status.style.backgroundColor=red;
                    nuevaGPU.checkbox.checked=false;
                    nuevaGPU.nvtool=``;
                    
                  };
                if ((nuevaGPU.checkbox.checked==true)){
                  }
              console.log(` ${nuevaGPU.id} nvtool: `+nuevaGPU.nvtool);
              createFinalOC(gpusdisponibles);
            });
        });
        
        nuevaGPU.botonLimpiar.onclick = function() {
            limpiar(nuevaGPU.id);
            determinarOC(nuevaGPU.id)
            nuevaGPU.checkbox.checked=false;
            nuevaGPU.status.value=`NO OC`;
            nuevaGPU.status.style.backgroundColor=red;
            colorear(nuevaGPU.id,stableColor);
            createFinalOC(nuevaGPU.id);
            };
        miDiv.appendChild(nuevaGPU.nuevoParrafo);
        n++;
        };
    miDiv.appendChild(info);
    };
};
function manejarError(variable){
  try {
    // Intenta utilizar la variable no definida
    console.log(variable);
  } catch (error) {
    // Captura y maneja el error
    console.error("Error: " + error.message);
  }
};
function hayValores(gpu){
if (gpu.startsWith(`GPU`)){
  let linea=document.getElementById(gpu);
  valores=linea.inputSetting.coff.value+linea.inputSetting.coclk.value+linea.inputSetting.mmclk.value+linea.inputSetting.mmoff.value;
  if (esNum(valores)){
    if ((okRange(linea.inputSetting.coff.value,0,MAXOC))&&(okRange(linea.inputSetting.coclk.value,0,MAXOC))&&(okRange(linea.inputSetting.mmclk.value,0,MAXOC))&&(okRange(linea.inputSetting.mmoff.value,0,MAXOC))){
      linea.checkbox.disabled=false
      return true;
    }else{
    linea.checkbox.checked=false;
    linea.checkbox.disabled=true;
    return false;
    }

  }
  else{
    linea.checkbox.checked=false;
    linea.checkbox.disabled=true;
    return false;
  };
}else{
  return false;
};
};

function manageOCInputs(gpu,status){
  let placa=document.getElementById(gpu);
  if ((status===1)||(status===0)){
    if ((status===0)){
      status='true';
    }
    else
    {
    status='false';
    }
      placa.inputSetting.coclk.readOnly=status;
      placa.inputSetting.coff.readOnly=status;
      placa.inputSetting.mmclk.readOnly=status;
      placa.inputSetting.mmoff.readOnly=status;
      console.log(`setting `+status);
    };
  };
  
function colorear(gpu,stableColor){
            let nuevaGPU=document.getElementById(gpu);
            if (esNum(nuevaGPU.inputSetting.coff.value)){
              nuevaGPU.inputSetting.coff.style.backgroundColor=green;
              if (nuevaGPU.inputSetting.coff.value>MAXOC){
                nuevaGPU.inputSetting.coff.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.coff.style.backgroundColor=stableColor;
            };
            if (esNum(nuevaGPU.inputSetting.coclk.value)){
            nuevaGPU.inputSetting.coclk.style.backgroundColor=green;
              if (nuevaGPU.inputSetting.coclk.value>MAXOC){
                nuevaGPU.inputSetting.coclk.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.coclk.style.backgroundColor=stableColor;
            }
            ;
            if (esNum(nuevaGPU.inputSetting.mmclk.value)){
              nuevaGPU.inputSetting.mmclk.style.backgroundColor=green;
                if (nuevaGPU.inputSetting.mmclk.value>MAXOC){
                  nuevaGPU.inputSetting.mmclk.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.mmclk.style.backgroundColor=stableColor;
            };
            if (esNum(nuevaGPU.inputSetting.mmoff.value)){
              nuevaGPU.inputSetting.mmoff.style.backgroundColor=green;
                if (nuevaGPU.inputSetting.mmoff.value>MAXOC){
                  nuevaGPU.inputSetting.mmoff.style.backgroundColor=red;
              }
            }else{
              nuevaGPU.inputSetting.mmoff.style.backgroundColor=stableColor;
            };
}

function esTexto(variable){
  if (!(/^\d+$/.test(variable)) && (variable!='')){
    return true;
  }else{
    return false;
  }
};

function checkedIdArray(checkedArray){
  const checkboxes = document.querySelectorAll('input[type="checkbox"][id^="check"]:checked');
  checkedArray = Array.from(checkboxes).map(checkbox => (checkbox.id).substring(5));
  return checkedArray;
  };

function createFinalOC(checkfromgpu){
  let commandString=``;
  checkfromgpu=checkedIdArray(checkfromgpu);
  for (let i=0;i<checkfromgpu.length;i++){
    let gpuid=document.getElementById(`GPU${checkfromgpu[i]}`);
    determinarOC(gpuid.id);
    if ((i>0)&&(i<checkfromgpu.length)){
      commandString=commandString+`&& `;
    }
    commandString=commandString+`nvtool -i `+checkfromgpu[i];
    commandString=commandString+gpuid.nvtool;
    };
  finalOC=commandString;
  let ocTextBox=document.getElementById(`cajaOC`);
  ocTextBox.value=finalOC;
};

function okRange(variable,minimo,maximo){
  if ((variable>=minimo) && (variable<=maximo)){
    return true
  }
  else {
    return false
  }
};
;
function reset(){
        if (n==0){
        }
        else{
        if(confirm(`RESET all data?`)){
          for (let i=0; i<cantidadGPU;i++){
            let gpu=document.getElementById(`GPU${i}`);
            clearInterval(gpu.intervalColorear);
            clearInterval(gpu.intervalCheck);
          };
        let ocTextBox=document.getElementById(`cajaOC`);
        let miDiv = document.getElementById('gpu');
        miDiv.textContent=``;
        cantidadGPU=0;
        n=0;
        ocTextBox.value=``;
        }
        }
}
function defaultGPU(cantidad){
  let cant=parseInt(document.getElementById(`cantidad`).value);
  cantidadGPU=cantidad;
  createElements(cantidad);
};
delay();
function confirmaGPU(){
    let cant=parseInt(document.getElementById(`cantidad`).value);
    if (cantidadGPU+cant<101){
    cantidadGPU=cantidadGPU+cant;
    createElements(cantidadGPU);
}
};

function delay(){
  const intervalo= setInterval(() => {
  defaultGPU(cantidadGPU);
  clearInterval.intervalo;
  }, 500);
}