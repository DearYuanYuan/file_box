



export let getParmam = (name) => {
    var after = window.location.hash.split("?")[1];
    if (after) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = after.match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        else {
            return null;
        }
    }
}
