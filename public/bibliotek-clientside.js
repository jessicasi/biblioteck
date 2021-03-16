function searchByBook(){
    console.log("Searching by book...");
var book = $("#book").val();
console.log("Book: " + book);

$.get("/filter", function(data){
    console.log("Back from the server with: ");
    console.log(data);
})

}

function searchByMovie(){
    console.log("Searching by movie...");
}