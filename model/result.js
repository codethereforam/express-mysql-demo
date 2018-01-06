exports.createResult = function(success, data) {
    var result = {};
    result.success = success;
    result.data = data;
    /*o.sayName = function () {
        alert(this.name);
    };*/
    return result;
};

