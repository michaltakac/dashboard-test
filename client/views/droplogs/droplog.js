Template['droplog'].helpers({
	dropImages: function() {
		return ZulrahDrops;
	},
	itemCount: function() {
		return Drops.find({title: this.title}).count();
	},
	drops: function () {
		var loadDrops = Drops.find({}).fetch();
		var array = _.map(loadDrops, function(d, index) {
			return {
					_id: d._id,
					number: index+1,
					title: d.title,
					quantity: gpFormat(d.quantity), 
				    price: kmFormat(d.price), 
				    totalPrice: kmFormat(d.totalPrice), // total price by multiplying quantity and price
				    rarity: d.rarity, 
				    droprate: gpFormat(d.droprate), 
				    type: d.type, 
				    img: d.img, 
				    createdAt: moment(d.createdAt).format("HH:mm:ss")
				   };
		});	
		return array;
	},
	dropCount: function() {
	    return Drops.find().count();   
	},
	totalGp: function() {
		var total = _.reduce(_.map(Drops.find({}).fetch(), function(doc){
                  //map
                  return doc.totalPrice
                }), function(memo, num){ 
                  //reduce
                  return memo + num;
                }, 0);
		return gpFormat(total);
	}
});

Template['droplog'].events({
	"click .delete": function () {
	    Drops.remove(this._id);
	},
	"click .add-drop-to-db": function (event) {
	  	var key = event.currentTarget.title;
	  	var dropObject = getDropTitle(key);
	  	var total = dropObject.quantity * dropObject.price;

	    Drops.insert({
	      title: dropObject.title, 
	      quantity: dropObject.quantity, 
	      price: dropObject.price, 
	      totalPrice: total, // total price by multiplying quantity and price
	      rarity: dropObject.rarity, 
	      droprate: dropObject.droprate, 
	      type: dropObject.type, 
	      img: dropObject.img, 
	      createdAt: new Date() // current time
	    });
	    
	    setTimeout(function(){
		    $("#rsdl-data").scrollTo("max", 500);
		}, 100);

	    return false;
	}
});
