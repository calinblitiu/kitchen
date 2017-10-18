class ProcessImageListItem
{
	contstructor()
	{
		this.image;
		this.image_kind;
	}

	init()
	{
		var me = this;
		main_img_process.attr('src', me.image.attr('src'));
	}
}

class ParameterItem
{
	contstructor()
	{
		this.em_body;
		this.parameter_kind;
		this.cur_parameter_no;
	}

	init()
	{
		var me = this;
		me.cur_parameter_no = 1;
		var temp = me.em_body.find(".parameter-img");

		// var image_string_tmp = current_process_image_list_item.image_kind+"/"+me.parameter_kind+"/"+me.cur_parameter_no+".png";
		// $("."+me.parameter_kind+"-img-process").attr("src", image_string_tmp);

		temp.each(function(){
			var temp_me = $(this);
			temp_me.click(function(){
				//alert(temp_me.data("parameter-no"));
				me.cur_parameter_no = temp_me.data("parameter-no");

				var image_string = current_process_image_list_item.image_kind+"/"+me.parameter_kind+"/"+me.cur_parameter_no+".png";
				$("."+me.parameter_kind+"-img-process").attr("src", image_string);
			});
		});
	}
}


var current_process_image_list_item;
var main_img_process 			= $(".main-img-process");
var countertop_img_process 		= $(".countertop-img-process");
var floor_img_process 			= $(".floor-img-process");
var backsplash_img_process 		= $(".backsplash-img-process");
var cabinet_img_process 		= $(".cabinet-img-process");


var cur_parameter_countertop = new ParameterItem();
cur_parameter_countertop.em_body = $('.parameter-item-countertop');
cur_parameter_countertop.parameter_kind = "countertop";
cur_parameter_countertop.init();

var cur_parameter_backsplash = new ParameterItem();
cur_parameter_backsplash.em_body = $('.parameter-item-backsplash');
cur_parameter_backsplash.parameter_kind = "backsplash";
cur_parameter_backsplash.init();

var cur_parameter_cabinet = new ParameterItem();
cur_parameter_cabinet.em_body = $('.parameter-item-cabinet');
cur_parameter_cabinet.parameter_kind = "cabinet";
cur_parameter_cabinet.init();

var cur_parameter_floor = new ParameterItem();
cur_parameter_floor.em_body = $('.parameter-item-floor');
cur_parameter_floor.parameter_kind = "floor";
cur_parameter_floor.init();


$(".process-list-image-div").click(function(){
	current_process_image_list_item = new ProcessImageListItem();
	current_process_image_list_item.image_kind = $(this).data("image-kind");
	current_process_image_list_item.image = $(this).children("img");
	current_process_image_list_item.init();

	cur_parameter_countertop.cur_parameter_no = 1;
	cur_parameter_backsplash.cur_parameter_no = 1;
	cur_parameter_cabinet.cur_parameter_no = 1;
	cur_parameter_floor.cur_parameter_no = 1;

	countertop_img_process.attr("src", current_process_image_list_item.image_kind+"/"+"countertop/"+cur_parameter_countertop.cur_parameter_no+".png");
	backsplash_img_process.attr("src", current_process_image_list_item.image_kind+"/"+"backsplash/"+cur_parameter_backsplash.cur_parameter_no+".png");
	cabinet_img_process.attr("src", current_process_image_list_item.image_kind+"/"+"cabinet/"+cur_parameter_cabinet.cur_parameter_no+".png");
	floor_img_process.attr("src", current_process_image_list_item.image_kind+"/"+"floor/"+cur_parameter_floor.cur_parameter_no+".png");


});


interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    onstart : function(event){
    	console.log(event);
    
    	//target.setAttribute('data-x', event.clientX);
    	//target.setAttribute('data-y', event.clientY);
    	console.log(event.clientX);
    	console.log(event.clientY);
    },
    // call this function on every dragmove event
    onmove: function(event){
    	var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    target.style.background="#eee";
    target.style.width = "100px";
    target.style.height = "100px";

    // update the posiion attributes
    target.setAttribute('data-x', event.clientX);
    target.setAttribute('data-y', event.clientY-100);
    },
    // call this function on every dragend event
    onend: function (event) {
    	console.log(event);
    	var target = event.target;
    	target.style.width = "100%";
    	target.style.height = "100%";
    	target.style.position="absolute";
    	target.style.top="0";
    	target.style.left="0";
    	target.setAttribute('data-x', 0);
    	target.setAttribute('data-y', 0);
    	//target.classList.remove('draggable');
    	  target.style.background="";
    	 target.style.transform =
      'translate(' + 0 + 'px, ' + 0 + 'px)';
      // var textEl = event.target.querySelector('p');

      // textEl && (textEl.textContent =
      //   'moved a distance of '
      //   + (Math.sqrt(event.dx * event.dx +
      //                event.dy * event.dy)|0) + 'px');
    }
  });


  interact('.dropzone').dropzone({
  // only accept elements matching this CSS selector
  accept: '.draggable',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.75,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
    console.log("ondropactivate");
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;


    console.log("ondragenter");
    //console.log(dropzoneElement.children);

    dropzoneElement.children[1].setAttribute('src', dropzoneElement.getAttribute("data-image-kind")+"/"+"countertop/"+cur_parameter_countertop.cur_parameter_no+".png");
    dropzoneElement.children[2].setAttribute('src', dropzoneElement.getAttribute("data-image-kind")+"/"+"floor/"+cur_parameter_floor.cur_parameter_no+".png")
    dropzoneElement.children[3].setAttribute('src', dropzoneElement.getAttribute("data-image-kind")+"/"+"backsplash/"+cur_parameter_backsplash.cur_parameter_no+".png")
    dropzoneElement.children[4].setAttribute('src', dropzoneElement.getAttribute("data-image-kind")+"/"+"cabinet/"+cur_parameter_cabinet.cur_parameter_no+".png")
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
    //event.relatedTarget.textContent = 'Dragged out';
     console.log("ondragleave");
  },
  ondrop: function (event) {
    event.relatedTarget.textContent = 'Dropped';
    console.log("ondrop");
  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
     console.log("ondropdeactivate");
  }
});