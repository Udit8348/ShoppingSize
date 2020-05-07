//  Get Version Data from manifest and display where needed
var manifestData = chrome.runtime.getManifest();
document.getElementById("project-version").innerHTML = manifestData.version;

//  View Controller: toggles between the main views depending on the state of the page
var viewNum = 0;
switch (viewNum) {
    case 0:         //  Welcome  View
        document.getElementById("install").style.display = "block";
        document.getElementById("settings-title").style.display = "none";   //refactor to input-view
        document.getElementById("extension-body").style.display = "none";
        break;
    case 1:         //  Input View
        document.getElementById("install").style.display = "none";
        document.getElementById("settings-title").style.display = "block";  //refactor to input-view
        document.getElementById("extension-body").style.display = "none";
        break;
    case 2:         //  Results View
        document.getElementById("install").style.display = "none";
        document.getElementById("settings-title").style.display = "none";   //refactor to input-view
        document.getElementById("extension-body").style.display = "block";
        
        break;    
    default:
        document.getElementById("install").style.display = "none";
        document.getElementById("settings-title").style.display = "none";   //refactor to input-view
        document.getElementById("extension-body").style.display = "none";
        break;
}

//  Determines if an Internet connection is present, and if not, hides main section of extension and instead shows a no internet GIF. 
if (navigator.onLine == false) {
    document.getElementById("install").style.display = "none";
    document.getElementById("extension-body").style.display = "block";
    document.getElementById("main").innerHTML = "";
    document.getElementById("no-internet").style.display = "block";
}


