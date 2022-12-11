$(function(){
    ($("#spinner").spinner({
        min:3,
        max:13,
        spinner: function(event, ui){
            $(this).change();
        }

    }));
});
$(function(){
    $("#Gender").selectmenu();
});

$(function(){
    $("#style").selectmenu();
});

$(function(){
    $("#colour").selectmenu();
});

$(function(){
    $("#slider-range").slider({
        range:true,
        min:20,
        max:135,
        values:[0, 135],
        slide:function(event, ui){
            $("#amount").val("£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ]);
        }
    });
    $("#amount").val(" £" + $(" #slider-range").slider( "values", 0 ) + " - £" + $("#slider-range").slider( "values", 1 ) );
});

// -----------------------filler's jquery-----------------------------------------------
$(function(){
    $( "#Search" ).on("click", function(){

        var Gender = $("#Gender").val();
        var style = $("#style").val();
        var colour = $("#colour").val();
        var size = $("#spinner").val();
        var minPrice = $("#slider-range").slider("option", "values" )[0];
        var maxPrice = $("#slider-range").slider("option", "values" )[1];

        var output="<ul class ='resultbox'>";
            for(var i in data.shoes)  {
                var a = 1;
                if(( Gender == data.shoes[i].gender) || (Gender=="Any"))
                if(( style == data.shoes[i].style) || (style=="Any"))
                if(( colour == data.shoes[i].colour) || (colour=="Any"))
                if(( data.shoes[i].sizes == size) || (size == "Any"))
                if(( data.shoes[i].price >= minPrice && data.shoes[i].price <= maxPrice ))
                {
                    {
                        {
                            {
                                var f = a++;
                                output += " <li data id = '" +f +" class ='idli'>"+"<div class = 'print'>"
                                + "<span class 'name'>"+ data.shoes[i].name +"</span>" + 
                                "<div class = 'deltailShoes'>"+ "<img src = " + data.shoes[i].picture + " >"  + 
                                "<div class = 'shortDes'> <h4> Gender &rarr;"+ data.shoes[i].gender+"</h4>  <h4> Colour &rarr;"+ data.shoes[i].colour+"</h4> <h4> Price &rarr; £"+ data.shoes[i].price+" .00 </h4><a href='" + data.shoes[i].url + "' target='blank'><button class ='button' >Buy</button></a>  " 
                                +"</div>" +"</div>" + "</div>" + "</li>";                        
                            }
                        }
                    }
                }
                
            }

        output+="</ul>";
        document.getElementById( "custom" ).innerHTML = output ;

        //---------------------- draggable & droppable jquerya---------------------

        $("li").draggable({
            revert:true,
    
            drag:function () {
                $(this).addClass("active");
                $(this).closest("li").addClass("active");
               
            },
    
            stop:function(){
                $(this).removeClass("active").closest("li").removeClass("active");
            }
        
        });
        $(".basket").droppable({
            activeClass:"active",
            hoverClass:"hover",

            tolerance:"touch",
            drop: function(event, ui){
                var basket = $(this),
                move = ui.draggable,
                itemId = basket.find(".resultbox li[data-id='" + move.attr("data-id") + "']");
                
                

                if(itemId.html() != null){
                    itemId.find("input").val(parseInt(itemId.find("input").var()) +1);
                    
                }
                else{
                    addBasket(basket, move);
                    move.find("input").val(parseInt(move.find("input").val()) + 1);
                    alert( "shose is drop in to favourites list" );
                    localStorage.setItem('favShoesDrag',move.html());

                }
            }
        });
        function addBasket(basket, move) {
            basket.find("ul").append('<li data-id="' + move.attr("data-id") + '" >'
                    + '<span class="name">' + move.find(".print span").html() + '</span>'
                    + '<input class="count" value="1" type="text">'
                    + '<button class="delete">&#10005;</button></li>');           
        }
        $(".basket ul li button.delete").live("click", function () {
			$(this).closest("li").remove();
            alert( "shose is remove in to favourites list" );

		}); 
        
        $("ul").draggable({
            revert:true,
            drag:function () {
                $(this).addClass("active");
                $(this).closest("ul").addClass("active"); 
            },
        });
        $("#custom").droppable({
            drop: function() {
                alert( "dropped out in favourites list" );
                console.log("drop out in fav list");
                $(".basket ul li").remove();
                console.log("remove in fav list");
            }
        }); 
    });
});

//-------------------------------------------- shoes add fav-----------------------------
$(function() {
	$( ".addFavourites" ).on("click", function(){
        console.log("addfav");
		
			$(this).attr('abled', true);
			
			var shoesIdToAdd = $(this).closest("p").attr("id");
			
			var myFavouriteShoes=JSON.parse(localStorage.getItem("favShoes"));
			
			if(myFavouriteShoes == null) {
				myFavouriteShoes = [];
			}
			
			if(myFavouriteShoes != null) {
				for ( var j = 0; j < myFavouriteShoes.length; j++) {
					
					if ( shoesIdToAdd == myFavouriteShoes[j]) {
						alert("This property is already in your favourites"); 
                        console.log("favmsg sent");
						myFavouriteShoes = [];
					}
				}
			}
			
			myFavouriteShoes.push(shoesIdToAdd);
			
			localStorage.setItem("favShoes", JSON.stringify(myFavouriteShoes));
			
	});
});




$(function() {
	$( ".removeFavourites" ).on("click", function(){
        console.log("work20");
		
		$(this).attr('abled', true);
			
		var ShoesIdToRemove = $(this).closest("p").attr("id");
			
		 myFavouriteShoes=JSON.parse(localStorage.getItem("favShoes"));
			
			
		if(myFavouriteShoes != null) {
			for ( var j = 0; j < myFavouriteShoes.length; j++) {
					
				if ( ShoesIdToRemove == myFavouriteShoes[j]) {
						
					alert("This Property has been removed");
                    console.log("lk");
						
                    delete myFavouriteShoes[j];
                    localStorage.setItem("favShoes", JSON.stringify(myFavouriteShoes));
                    myFavouriteShoes[j] = [];
				}
			}
		}
        if(myFavouriteShoes == null) {
            alert("You have no favourite items");
            console.log("lk012");
        }
	});
});

// -------------------------viwe all fav shoes-------------------------------------------------------------
$(function(){
    $(".showLst").on("click", function(){
        
        console.log("View btn pressed");

        console.log("Getting FavList arry Data.");
        // data assign json format
        myFavouriteShoes=JSON.parse(localStorage.getItem("favShoes"));
        console.log("Getting FavList arry Data 120.");
        var output = "<ul>";

        if (myFavouriteShoes != null) {
            for (var x in data.shoes) {
                for (let v = 0; v < myFavouriteShoes.length; v++) {
                    
                    if (data.shoes[x].id == myFavouriteShoes[v]) {
                        output += '<li id="' + data.shoes[x].id + '">'
                        + '<span class="name">' + data.shoes[x].name + '</span>'
                        + '<input class="count" value="1" type="text">'
                        + '<button class="delete">&#10005;</button>';
                        console.log("Getting FavList arry Data 185.");
                    }
                    console.log("Getting FavList arry Data 125.");
                    
                }
                
            }
        }

        output += "</ul>";
        document.getElementById("fav").innerHTML = output;
    });
});






