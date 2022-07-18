import * as THREE from "https://unpkg.com/three/build/three.module.js"; //https://cdn.skypack.dev/three
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js'; //https://cdn.skypack.dev/@three-ts/orbit-controls
import * as Tweakpane from 'https://cdn.skypack.dev/tweakpane';

var headerHeight = document.getElementById('header').clientHeight;
let raycaster1
let raycaster2
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 10, window.innerWidth / (window.innerHeight - headerHeight), 0.1, 1000 ); //10,...,0.1, 1000
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( window.innerWidth, window.innerHeight - headerHeight);
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 15;

scene.background = new THREE.Color(0x10171E)

// https://i.imgur.com/2dxaFs9.jpeg
camera.position.set( 0, 0, 10 );
controls.update();

//Raycasting 
const pointer = new THREE.Vector2();
raycaster1 = new THREE.Raycaster();
raycaster2 = new THREE.Raycaster();
document.addEventListener( 'mousemove', onPointerMove );
window.addEventListener( 'resize', onWindowResize );
raycaster1.layers.set( 1 );
raycaster2.layers.set( 2 );

const geometry = new THREE.SphereGeometry( 1, 50, 50 );
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.layers.enable( 1 );


let ControlPanelContainer = document.getElementById("ControlPanel");

const pane = new Tweakpane.Pane({title: 'ControlPanel', container: ControlPanelContainer});
const Par = {
    "Setup": "Agaris"

}
pane.addInput(Par, "Setup", {
    options: {
    Agaris: 'Agaris',
    Custom: 'custom',
 
    }}).on("change", (ev) =>{
        UpdatePlanetTexture(Par.Setup)
    }); 

const p1 = pane.addFolder({
    title: 'Planet Info',
  });

  
function UpdatePlanetTexture(PlanetName){
    console.log(`images/${PlanetName}.png`);
    cube.material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load(`images/${PlanetName}.png`)}) 
}

UpdatePlanetTexture(Par.Setup)




var PlanetInfo={
    name:"Johnson Planet"
};
var listofmarkers = [];
var addingmarkerbool = false;

AddMarkerId.addEventListener("click", function(){
    addingmarkerbool= true
    if (document.addEventListener) {
        document.addEventListener('contextmenu', addmarkertoplanet)


    }
})

function addmarkertoplanet(){
    document.removeEventListener('contextmenu', addmarkertoplanet)
    addingmarkerbool = false
    decoyplane.position.set( 0, 0, 0 );
    raycaster1.setFromCamera(pointer, camera);
    let intersects = raycaster1.intersectObjects(scene.children)
    if (intersects[ 0 ].object){
        console.log(intersects[ 0 ].point);
        var templist = [];
        templist.push(intersects[ 0 ].point.x)
        templist.push(intersects[ 0 ].point.y)
        templist.push(intersects[ 0 ].point.z)
        addMarker(templist);
    }
}



//add Maker function
window.addMarker= addMarker;
function addMarker(coord, Name = "", color = 16777215, symbol = "images/HQ.png", symbolsize =  0.1, opacity = 1){
    console.log("Adding Marker")
    if (coord[0] >=0){
        coord[0] += 0.001
    }
    else{
        coord[0] -= 0.001
    }
    if (coord[1] >=0){
        coord[1] += 0.001
    }
    else{
        coord[1] -= 0.001
    }
    if (coord[2] >=0){
        coord[2] += 0.001
    }else{
        coord[2] -= 0.001
    }


    var vargeometry = new THREE.PlaneGeometry(0.1,0.1)
    var varmaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: new THREE.TextureLoader().load(symbol)});
    varmaterial.transparent = true
    varmaterial.color = new THREE.Color(color)
    var plane = new THREE.Mesh( vargeometry, varmaterial);
    plane.position.set(coord[0],coord[1],coord[2]);
    plane.lookAt(10*coord[0],10*coord[1],10*coord[2]);
    scene.add(plane);
    plane.layers.enable( 2 );
    var markerdata = {"Name": Name, "coords": [plane.position.x,plane.position.y,plane.position.z], "color": 16777215, "symbol": symbol, "symbolsize": symbolsize, "opacity": opacity};  
    listofmarkers.push(markerdata)


}

//Select Marker object
window.addEventListener("click", clickonlayer2, false)

 
function clickonlayer2(){
    raycaster2.setFromCamera(pointer, camera);
    let intersects = raycaster2.intersectObjects(scene.children, false)
    if(intersects[0] != null){
        if (intersects[ 0 ].object){
            var object = intersects[ 0 ].object;
            var markercoords = [object.position.x,object.position.y,object.position.z]
            for (let i = 0; i < listofmarkers.length; i++) {
                if(JSON.stringify(listofmarkers[i].coords) == JSON.stringify(markercoords) ){
                    editmode(object,listofmarkers[i], i)
                }
              }
         }
    }
}

function editmode(object, Jsonmarker, i){

    console.log("entering edit mode")
    const PARAMS = Jsonmarker;


    const f1 = pane.addFolder({
        title: 'Marker Information',
      });
      f1.addInput(PARAMS, "Name");
      f1.addInput(PARAMS, 'color' , {view: 'color',} );
      f1.addInput(PARAMS, 'symbol' , {options: {
        HQ: "images/HQ.png",
        RegionOutpost: "images/RegionOutpost.png",
        Colony: "images/Colony.png",
        Outpost: "images/Outpost.png",
        MiningOutpost: "images/MiningOutpost.png",    
        TradeOutpost: "images/TradeOutpost.png",
        Shipyard: "images/Shipyard.png",
        Ship: "images/Ship.png",
        SupplyDepot: "images/SupplyDepot.png",             
      },}  );
      f1.addInput(PARAMS, 'symbolsize' , {
    min: 0.05,
    max: 0.2,
    }   )
    f1.addInput(PARAMS, 'opacity' , {
        min: 0.05,
        max: 1,
        }   )  
    
    const btn1 = f1.addButton({
        title: 'Save',
        });
    const btn2 = f1.addButton({
    title: 'Delete',
    });
    
    btn1.on('click', () => {
        console.log("Saving shit");
        object.material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: new THREE.TextureLoader().load(Jsonmarker.symbol)});
        object.material.transparent = true
        object.material.color = new THREE.Color(Jsonmarker.color);
        object.material.opacity = Jsonmarker.opacity
        object.geometry = new THREE.PlaneGeometry(Jsonmarker.symbolsize,Jsonmarker.symbolsize)
        });

    btn2.on('click', () => {
    f1.dispose();
    window.removeEventListener("click", disposepan, false)
    listofmarkers.splice(i,1)
    object.geometry.dispose();
    object.material.dispose();
    scene.remove( object );

    return
    });

    window.addEventListener("click", disposepan, false)

    function disposepan(){
        raycaster2.setFromCamera( pointer, camera );
    
        let intersects = raycaster2.intersectObjects( scene.children, false );
        if(intersects == null){
            console.log("poe poe nou nou sjongejoge")
            return
        }
        if ( intersects.length > 0 ) {
            window.removeEventListener("click", disposepan, false)
            f1.dispose();
            console.log("Pane disposed")
        }
    }
}

//The menu itself
ExportId.addEventListener("click", function(){
    console.log("Trying to download johnson")
    var JsonData = {
        "PlanetInfo": PlanetInfo,
        "listofmarkers": listofmarkers
    };

    exportToJsonFile(JsonData);
    }
, false)


function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}




function onWindowResize() {

    camera.aspect = window.innerWidth / (window.innerHeight-headerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight- headerHeight );

}

const vargeometry = new THREE.PlaneGeometry(.1,.1)
const varmaterial = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: new THREE.TextureLoader().load("images/HQ.png")});
varmaterial.transparent = true;
varmaterial.color = new THREE.Color( 0xffffff );
const decoyplane = new THREE.Mesh( vargeometry, varmaterial);
scene.add(decoyplane)


function onPointerMove( event ) {

    pointer.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    pointer.y = - ( (event.clientY - headerHeight) / renderer.domElement.clientHeight ) * 2 + 1;

    if(addingmarkerbool){
        raycaster1.setFromCamera( pointer, camera );

        const intersects = raycaster1.intersectObject( cube );
    
            if ( intersects.length > 0 ) {
                decoyplane.position.set( 0, 0, 0 );
                decoyplane.lookAt( intersects[ 0 ].point);
    
                decoyplane.position.copy( intersects[ 0 ].point )
        
            }
    }

}

///
ImportId.addEventListener("click", function(){
    var selectedFile = document.getElementById('inputFile').files[0];
    
    // Create a new FileReader() object
    let reader = new FileReader()

    // run function JSONfileHandler when file is loaded
    reader.onload = JSONfileHandler;

    // read file
    reader.readAsText(selectedFile)

    }
, false)

function JSONfileHandler(file) {
    let fileData = file.target.result;
    let json = JSON.parse(fileData);
    let jsonMarkers = json["listofmarkers"];
    
    jsonMarkers.forEach(marker => {
        addMarker(marker["coords"], marker["Name"], marker["color"], marker["symbol"], marker["symbolsize"], marker["opacity"]);
    });
    
    console.log("File imported");
}





function animate() {
    requestAnimationFrame(animate)
    controls.update();


    renderer.render(scene,camera)
};

animate();