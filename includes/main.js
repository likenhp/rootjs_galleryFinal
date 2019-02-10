/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
	'images/landscape-1.jpg',
	'images/landscape-10.jpg',
	'images/landscape-11.jpg',
	'images/landscape-13.jpg',
	'images/landscape-15.jpg',
	'images/landscape-17.jpg',
	'images/landscape-18.jpg',
	'images/landscape-19.jpg',
	'images/landscape-2.jpg',
	'images/landscape-3.jpg',
	'images/landscape-8.jpg',
	'images/landscape-9.jpg',
	'images/pexels-photo-132037.jpeg',
	'images/pretty.jpg',
];

function initiateApp(){
	//debugger;
	//advanced: add jquery sortable call here to make the gallery able to be sorted
	$("#gallery").sortable({
	//on change, rebuild the images array into the new order
			"stop": function(){
				console.log("stopped")
				var dynamicArray = [];
				var dynamicGallery = $(".imageGallery");
				for (indexOfDynamicGallery = 0; indexOfDynamicGallery < dynamicGallery.length; indexOfDynamicGallery++){
					//console.log(dynamicGallery[indexOfDynamicGallery]);
					var imageDynamic = $(dynamicGallery[indexOfDynamicGallery]).css("background-image");
					console.log(imageDynamic);
					//change the src of the image in the modal to the url of the image that was clicked on
					/*
					<div class="modal-body">
						  <img src="images/landscape-10.jpg">
						</div>
					*/
					var dynamicLastSlash = imageDynamic.lastIndexOf("/");
					var dynamicLastSlash2 = imageDynamic.lastIndexOf("/", dynamicLastSlash-1);
					var newDynamicImageSource = imageDynamic.slice(dynamicLastSlash2+1, -2);
					
					dynamicArray.push(newDynamicImageSource);
				}
				console.log(dynamicArray);
				var stringDynamic = JSON.stringify(dynamicArray);
				localStorage.newImageGallery = stringDynamic;
			}
		});
	
//is there a localStorage.newImageGallery?
if(localStorage.newImageGallery){
	pictures=JSON.parse(localStorage.newImageGallery)
}
		//if yes, get it
		//store it into pictures
	
	
	makeGallery(pictures);
	addModalCloseHandler();
}
// START WITH THIS
function makeGallery(imageArray){
	//use loops and jquery dom creation to make the html structure inside the #gallery section

	//create a loop to go through the pictures
	/*
	<figure class="imageGallery col-xs-12 col-sm-6 col-md-4" style="background-image:url(images/landscape-1.jpg);">
			<figcaption>landscape-1.jpg</figcaption>
	</figure>
	 */

	for (var figure = 0; figure < imageArray.length; figure++){
		
		//create the elements needed for each picture, store the elements in variable
		//debugger;
		var newFigure = $("<figure>")
			.addClass("imageGallery col-xs-12 col-sm-6 col-md-4")
			.css("background-image", "url("+imageArray[figure]+")")
			.click(displayImage)
		var newFigcaption = $("<figcaption>")
		var imageStr = imageArray[figure].substring(7, imageArray[figure].length+1)
		newFigcaption.text(imageStr)
		console.log("newFigCaption after .text: ", newFigcaption);
		
		//attach a click handler to the figure you create.  call the "displayImage" function.
		// $("<figure>").click(displayImage);

		//append the element to the #gallery section
		newFigure.append(newFigcaption);
		$("#gallery").append(newFigure);
	
	}
	
}

function addModalCloseHandler(){
	//add a click handler to the img element in the image modal. 
	//When the element is clicked, close the modal
	/*
	<div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">landscape-10</h4>
        </div>
        <div class="modal-body">
          <img src="images/landscape-10.jpg">
	 */
	// debugger;
	
		$("#galleryModal").click(function(){
		 $("#galleryModal").modal("hide");
		 
	 });
	

	//for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp	
}

function displayImage(){
	console.log('Display Image Called', this);
	//debugger;
	//find the url of the image by grabbing the background-image source, store it in a variable
	//grab the direct url of the image by getting rid of the other pieces you don't need
	var imageDisplayed = $(this).css("background-image")

	//grab the name from the file url, ie the part without the path.
	//"url("file:///C:/Users/liken/Desktop/lfz/rootjs_galleryFinal/images/landscape-11.jpg") <== imageDisplayed
	  
	//so "images/pexels-photo-132037.jpeg" would become
		// pexels-photo-132037
		//take a look at the lastIndexOf method

	var lastSlash = imageDisplayed.lastIndexOf("/");
	var lastSlash2 = imageDisplayed.lastIndexOf("/", lastSlash-1);
	var lastPeriod = imageDisplayed.lastIndexOf(".");
	var imgUrl = imageDisplayed.slice(lastSlash+1 , lastPeriod);

	//change the modal-title text to the name you found above
	//<h4 class="modal-title">landscape-10</h4>
	$("#galleryModal .modal-title").text(imgUrl);
	
	//change the src of the image in the modal to the url of the image that was clicked on
	/*
	<div class="modal-body">
          <img src="images/landscape-10.jpg">
        </div>
	*/
	// debugger;

	var displayTheImage = imageDisplayed.slice(lastSlash2+1 ,-2);
	$("#galleryModal .modal-body img").attr("src", displayTheImage);

	// use jquery to select the modal
	// use modal method to show modal

	$('#galleryModal').modal('show')
	

	//show the modal with JS.  Check for more info here: 
	//https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp
}





