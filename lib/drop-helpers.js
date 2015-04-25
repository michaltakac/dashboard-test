getAllZulrahDrops = function() {
    return ZulrahDrops;   
}
getDropTitle = function(name) {
    var dropTitle = _.findWhere( ZulrahDrops, {title: name});
    return dropTitle;   
}
getDropImg = function(image) {
    var dropImg = _.findWhere( ZulrahDrops, {img: image});
    return dropImg;   
}
kmFormat = function(input) {
	return numeral(input).format('0.0a');
}
gpFormat = function(input) {
	return numeral(input).format('0,0');
}