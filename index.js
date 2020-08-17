var level = 1;
var pattern = [];

generatePattern();

function generatePattern(){
  pattern = [];
  for (var i = 0; i < level; i++){
    var num = Math.floor(Math.random() * 4) + 1
    pattern.push(num);
  }
}
